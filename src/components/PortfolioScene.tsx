import { useEffect, useRef } from 'react'
import { Box } from '@radix-ui/themes'
import * as THREE from 'three'
import { colors } from '../design'

export type SceneVariant =
  | 'cv'
  | 'profile'
  | 'heroPhoto'
  | 'academic'
  | 'projects'
  | 'projectImage'
  | 'skillFrontend'
  | 'skillBackend'
  | 'skillData'
  | 'contact'

function usePortfolioScene({ variant, imageUrl }: { variant: SceneVariant; imageUrl?: string }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100)
    camera.position.set(0, 0.35, 7.4)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.92
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const createMaterial = (color: string, roughness = 0.5, metalness = 0.04) =>
      new THREE.MeshPhysicalMaterial({
        color,
        roughness,
        metalness,
        clearcoat: 0.36,
        clearcoatRoughness: 0.34,
      })

    const materials = [
      new THREE.MeshStandardMaterial({ color: colors.amber, roughness: 0.82, metalness: 0 }),
      createMaterial(colors.teal, 0.46, 0.03),
      createMaterial(colors.ink, 0.5, 0.02),
      new THREE.MeshPhysicalMaterial({
        color: colors.teal,
        roughness: 0.68,
        metalness: 0,
        transparent: true,
        opacity: 0.28,
      }),
      new THREE.MeshStandardMaterial({ color: colors.ink, roughness: 0.66 }),
      new THREE.MeshBasicMaterial({ color: colors.teal, transparent: true, opacity: 0.28 }),
    ]
    const transientMaterials: THREE.Material[] = []

    const addBox = (size: [number, number, number], position: [number, number, number], material = materials[0]) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material)
      mesh.position.set(...position)
      mesh.castShadow = true
      mesh.receiveShadow = true
      group.add(mesh)
      return mesh
    }

    const addMesh = (
      geometry: THREE.BufferGeometry,
      position: [number, number, number],
      material = materials[0],
      rotation: [number, number, number] = [0, 0, 0],
      scale = 1,
    ) => {
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(...position)
      mesh.rotation.set(...rotation)
      mesh.scale.setScalar(scale)
      mesh.castShadow = true
      mesh.receiveShadow = true
      group.add(mesh)
      return mesh
    }

    const addAccentCluster = (style: 'portrait' | 'cards' | 'data' | 'mail' | 'skills') => {
      const cluster = new THREE.Group()
      group.add(cluster)

      const styleOffset = {
        portrait: 0,
        cards: 0.8,
        data: 1.55,
        mail: 2.3,
        skills: 3.05,
      }[style]

      const accents = [
        addMesh(
          new THREE.IcosahedronGeometry(0.24, 0),
          [-2.05, 1.42, -0.1],
          style === 'data' ? materials[2] : materials[1],
          [0.4, 0.18, -0.24],
        ),
        addMesh(
          new THREE.ConeGeometry(0.24, 0.58, 3),
          [2.05, 1.18, 0.08],
          style === 'mail' ? materials[3] : materials[2],
          [0.18, 0.6, 0.72],
        ),
        addMesh(
          new THREE.CylinderGeometry(0.12, 0.12, 0.7, 24),
          [-2.04, -1.38, 0.12],
          materials[0],
          [Math.PI / 2.8, 0.12, 0.64],
        ),
        addMesh(
          new THREE.TorusKnotGeometry(0.2, 0.045, 64, 8),
          [1.92, -1.42, -0.06],
          materials[1],
          [0.65, 0.18, -0.2],
        ),
        addMesh(new THREE.SphereGeometry(0.1, 24, 16), [0.22, 2.03, 0.2], materials[3]),
      ]

      if (style === 'portrait' || style === 'cards') {
        accents.push(
          addMesh(new THREE.OctahedronGeometry(0.2, 0), [-1.42, 1.9, 0.22], materials[0], [0.35, 0.2, 0.4]),
          addMesh(new THREE.TorusGeometry(0.34, 0.035, 12, 48), [1.4, 1.88, -0.12], materials[5], [1.1, 0.1, 0.1]),
        )
      }

      if (style === 'data' || style === 'skills') {
        accents.push(
          addMesh(new THREE.DodecahedronGeometry(0.24, 0), [1.48, 1.78, 0.2], materials[0], [0.28, 0.72, 0.1]),
          addMesh(new THREE.CylinderGeometry(0.08, 0.08, 0.92, 18), [-1.4, 1.82, 0.18], materials[2], [1.2, 0.22, -0.24]),
        )
      }

      if (style === 'mail') {
        accents.push(
          addMesh(new THREE.ConeGeometry(0.18, 0.48, 4), [-1.28, 1.82, 0.16], materials[1], [0.6, 0.2, 0.8]),
          addMesh(new THREE.SphereGeometry(0.13, 24, 16), [1.3, 1.88, 0.14], materials[0]),
        )
      }

      accents.forEach((accent, index) => {
        accent.userData.floatSpeed = 0.72 + index * 0.09
        accent.userData.floatOffset = styleOffset + index * 0.58
        accent.userData.baseY = accent.position.y
        accent.userData.spin = index % 2 === 0 ? 1 : -1
        cluster.attach(accent)
      })

      return accents
    }

    const addLine = (width: number, y: number, x = 0.18, material = materials[4]) => {
      addBox([width, 0.08, 0.05], [x, y, 0.18], material)
    }

    const addConnector = (
      from: THREE.Vector3,
      to: THREE.Vector3,
      radius = 0.035,
      material = materials[5],
    ) => {
      const direction = new THREE.Vector3().subVectors(to, from)
      const length = direction.length()
      const connector = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 18), material)
      connector.position.copy(from).add(to).multiplyScalar(0.5)
      connector.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize())
      connector.castShadow = true
      connector.receiveShadow = true
      group.add(connector)
      return connector
    }

    const createPhotoMaterial = (texture: THREE.Texture, opacity = 1, color = '#ffffff') => {
      const material = new THREE.MeshBasicMaterial({
        color,
        map: texture,
        transparent: true,
        alphaTest: 0.08,
        opacity,
        depthWrite: opacity === 1,
        side: THREE.DoubleSide,
      })
      transientMaterials.push(material)
      return material
    }

    if (variant === 'cv') {
      const card = addBox([3.2, 4.3, 0.16], [0, 0, 0])

      if (imageUrl) {
        const textureLoader = new THREE.TextureLoader()
        textureLoader.setCrossOrigin('anonymous')
        textureLoader.load(
          imageUrl,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
            const imagePlane = new THREE.Mesh(
              new THREE.PlaneGeometry(3.02, 4.08),
              createPhotoMaterial(texture),
            )
            imagePlane.position.set(0, 0, 0.095)
            group.add(imagePlane)
          },
          undefined,
          () => {
            addBox([0.12, 3.62, 0.06], [-1.33, 0, 0.14], materials[2])
            addLine(1.4, 1.28, 0.34, materials[3])
            addLine(1.82, 0.92)
            addLine(2.12, 0.6)
            addLine(1.72, 0.31)
            addLine(2.02, -0.11)
            addLine(1.58, -0.4)
            addLine(2.1, -0.68)
            addLine(1.28, -1.12, 0.02, materials[3])
          },
        )
      } else {
        addBox([0.12, 3.62, 0.06], [-1.33, 0, 0.14], materials[2])
        addLine(1.4, 1.28, 0.34, materials[3])
        addLine(1.82, 0.92)
        addLine(2.12, 0.6)
        addLine(1.72, 0.31)
        addLine(2.02, -0.11)
        addLine(1.58, -0.4)
        addLine(2.1, -0.68)
        addLine(1.28, -1.12, 0.02, materials[3])
      }

      card.castShadow = true
    }

    if (variant === 'profile') {
      const halo = addMesh(new THREE.TorusGeometry(1.38, 0.035, 18, 112), [0, 0.24, -0.32], materials[5], [0.08, 0.02, -0.06])
      const backDisc = addMesh(
        new THREE.CircleGeometry(1.28, 80),
        [0.08, 0.2, -0.36],
        new THREE.MeshPhysicalMaterial({
          color: colors.teal,
          roughness: 0.72,
          metalness: 0,
          transparent: true,
          opacity: 0.13,
        }),
        [0, 0, 0],
      )
      transientMaterials.push(backDisc.material as THREE.Material)

      const base = addMesh(new THREE.CylinderGeometry(1.12, 1.34, 0.18, 64), [0, -1.48, -0.08], materials[1])
      base.scale.z = 0.28
      addBox([1.58, 0.1, 0.08], [0, -1.25, 0.06], materials[2])
      addBox([1.05, 0.08, 0.06], [0.12, -1.04, 0.08], materials[3])

      halo.userData.extraSpin = 0.12

      if (imageUrl) {
        const textureLoader = new THREE.TextureLoader()
        textureLoader.setCrossOrigin('anonymous')
        textureLoader.load(imageUrl, (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
          const shadow = new THREE.Mesh(new THREE.PlaneGeometry(2.18, 2.18), createPhotoMaterial(texture, 0.16, colors.ink))
          shadow.position.set(0.12, -0.04, 0.08)
          shadow.scale.set(1.03, 1.03, 1)
          group.add(shadow)

          const photo = new THREE.Mesh(new THREE.PlaneGeometry(2.12, 2.12), createPhotoMaterial(texture))
          photo.position.set(-0.02, -0.02, 0.34)
          group.add(photo)
        })
      }
    }

    if (variant === 'heroPhoto') {
      const backDisc = addMesh(
        new THREE.CircleGeometry(1.62, 96),
        [0.22, 0.25, -0.28],
        new THREE.MeshPhysicalMaterial({
          color: colors.teal,
          roughness: 0.64,
          metalness: 0,
          transparent: true,
          opacity: 0.18,
          clearcoat: 0.18,
        }),
        [0, 0, 0.05],
      )
      transientMaterials.push(backDisc.material as THREE.Material)

      const halo = addMesh(new THREE.TorusGeometry(1.78, 0.052, 18, 128), [0.02, 0.16, -0.18], materials[1], [0.12, 0.08, -0.12])
      const haloSoft = addMesh(new THREE.TorusGeometry(1.36, 0.018, 12, 96), [-0.12, 0.32, -0.08], materials[5], [0.3, -0.18, 0.38])
      const sideAccent = addBox([0.13, 2.84, 0.18], [-1.38, -0.08, -0.02], materials[1])
      const diagonalAccent = addBox([1.62, 0.14, 0.12], [0.8, -1.3, 0.06], materials[2])
      const pedestal = addMesh(new THREE.CylinderGeometry(1.34, 1.58, 0.22, 72), [0.08, -1.62, -0.06], materials[0], [0, 0, 0])
      const pedestalTrim = addMesh(new THREE.TorusGeometry(1.31, 0.035, 12, 96), [0.08, -1.5, 0.01], materials[1], [Math.PI / 2, 0, 0])

      sideAccent.rotation.z = -0.06
      diagonalAccent.rotation.z = -0.1
      pedestal.scale.z = 0.34
      pedestalTrim.scale.y = 0.34

      if (imageUrl) {
        const textureLoader = new THREE.TextureLoader()
        textureLoader.setCrossOrigin('anonymous')
        textureLoader.load(
          imageUrl,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
            const shadow = new THREE.Mesh(new THREE.PlaneGeometry(2.86, 2.86), createPhotoMaterial(texture, 0.2, colors.ink))
            shadow.position.set(0.18, -0.18, 0.12)
            shadow.scale.set(1.04, 1.04, 1)
            shadow.rotation.z = -0.035
            group.add(shadow)

            const photo = new THREE.Mesh(new THREE.PlaneGeometry(2.78, 2.78), createPhotoMaterial(texture))
            photo.position.set(0.02, -0.14, 0.28)
            photo.rotation.z = -0.025
            group.add(photo)
          },
          undefined,
          () => {
            addBox([1.15, 1.15, 0.12], [-0.5, 0.56, 0.06], materials[1])
            addLine(1.6, -0.5, 0.2, materials[2])
            addLine(1.25, -0.86, 0.02, materials[4])
          },
        )
      }

      halo.userData.extraSpin = 0.12
      haloSoft.userData.extraSpin = -0.18
    }

    if (variant === 'academic') {
      const bookA = addBox([2.7, 0.42, 1.9], [0, -0.75, 0], materials[1])
      bookA.rotation.z = -0.08
      const bookB = addBox([2.45, 0.38, 1.72], [0.18, -0.28, 0.02], materials[3])
      bookB.rotation.z = 0.08
      addBox([1.9, 1.5, 0.16], [0, 0.82, 0])
      addLine(1.22, 1.12, 0, materials[2])
      addLine(1.56, 0.82, 0)
      addLine(1.22, 0.56, 0)
    }

    if (variant === 'projects') {
      const cubeA = addBox([1.2, 1.2, 1.2], [-0.9, 0.46, 0], materials[1])
      const cubeB = addBox([1.28, 1.28, 1.28], [0.7, 0.1, 0.18], materials[2])
      const cubeC = addBox([1, 1, 1], [0, -1, -0.15], materials[3])
      cubeA.rotation.set(0.28, 0.24, -0.18)
      cubeB.rotation.set(-0.18, -0.28, 0.18)
      cubeC.rotation.set(0.2, 0.52, 0.12)
      addBox([2.7, 0.08, 0.08], [0, -1.82, 0], materials[4])
    }

    if (variant === 'projectImage') {
      const backPlate = addBox([3.95, 2.34, 0.16], [0, 0, -0.08], materials[0])
      const accentPlate = addBox([3.72, 2.1, 0.12], [0.22, -0.18, -0.22], materials[1])
      const labelLine = addBox([1.6, 0.1, 0.08], [-0.76, -1.32, 0.08], materials[3])
      const shortLine = addBox([0.86, 0.1, 0.08], [0.58, -1.32, 0.08], materials[2])

      backPlate.rotation.z = -0.03
      accentPlate.rotation.z = 0.08
      labelLine.rotation.z = -0.03
      shortLine.rotation.z = -0.03

      if (imageUrl) {
        const textureLoader = new THREE.TextureLoader()
        textureLoader.setCrossOrigin('anonymous')
        textureLoader.load(
          imageUrl,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
            const imagePlane = new THREE.Mesh(
              new THREE.PlaneGeometry(3.62, 2.04),
              createPhotoMaterial(texture),
            )
            imagePlane.position.set(0, 0.08, 0.04)
            imagePlane.rotation.z = -0.03
            group.add(imagePlane)
          },
          undefined,
          () => {
            addLine(2.4, 0.42, 0)
            addLine(2.05, 0.08, 0)
            addLine(1.5, -0.26, 0)
          },
        )
      }
    }

    if (variant === 'skillFrontend') {
      const browser = addBox([3.12, 1.88, 0.18], [0, 0.1, -0.04], materials[0])
      const header = addBox([3.12, 0.28, 0.22], [0, 1.04, 0.08], materials[1])
      const heroPanel = addBox([1.24, 0.72, 0.12], [-0.68, 0.32, 0.2], materials[3])
      const previewPanel = addBox([0.82, 1.12, 0.12], [0.86, 0.04, 0.24], materials[1])
      const bottomDock = addBox([1.74, 0.18, 0.14], [-0.28, -0.78, 0.22], materials[2])
      const stand = addBox([0.34, 0.48, 0.18], [0, -1.2, -0.04], materials[4])
      const foot = addMesh(new THREE.CylinderGeometry(0.78, 0.96, 0.12, 48), [0, -1.5, -0.02], materials[1])

      browser.rotation.set(-0.08, -0.16, 0.02)
      header.rotation.copy(browser.rotation)
      heroPanel.rotation.copy(browser.rotation)
      previewPanel.rotation.copy(browser.rotation)
      bottomDock.rotation.copy(browser.rotation)
      stand.rotation.z = 0.02
      foot.scale.z = 0.28

      addBox([0.18, 0.09, 0.08], [-1.28, 1.04, 0.27], materials[2]).rotation.copy(browser.rotation)
      addBox([0.18, 0.09, 0.08], [-1.02, 1.04, 0.27], materials[3]).rotation.copy(browser.rotation)
      addBox([0.18, 0.09, 0.08], [-0.76, 1.04, 0.27], materials[0]).rotation.copy(browser.rotation)
      addBox([0.9, 0.09, 0.08], [-0.8, 0.5, 0.34], materials[2]).rotation.copy(browser.rotation)
      addBox([0.68, 0.09, 0.08], [-0.9, 0.18, 0.34], materials[4]).rotation.copy(browser.rotation)
      addBox([0.74, 0.09, 0.08], [-0.76, -0.12, 0.34], materials[1]).rotation.copy(browser.rotation)
      addBox([0.38, 0.38, 0.12], [0.82, 0.35, 0.38], materials[0]).rotation.copy(browser.rotation)
      addBox([0.56, 0.08, 0.08], [0.86, -0.17, 0.38], materials[2]).rotation.copy(browser.rotation)
      addBox([0.42, 0.08, 0.08], [0.86, -0.42, 0.38], materials[4]).rotation.copy(browser.rotation)

      const orbit = addMesh(new THREE.TorusGeometry(1.82, 0.018, 10, 112), [0, 0.04, -0.12], materials[5], [1.12, 0.08, 0.18])
      const spark = addMesh(new THREE.OctahedronGeometry(0.18, 0), [1.72, 0.92, 0.18], materials[1], [0.2, 0.5, 0.1])
      orbit.userData.extraSpin = 0.22
      spark.userData.extraSpin = -0.5
    }

    if (variant === 'skillBackend') {
      const core = addMesh(new THREE.IcosahedronGeometry(0.58, 1), [0, 0.1, 0.16], materials[1], [0.32, 0.24, -0.14])
      const nodePositions = [
        new THREE.Vector3(-1.62, 0.92, 0),
        new THREE.Vector3(1.62, 0.78, 0.04),
        new THREE.Vector3(-1.5, -0.82, 0.08),
        new THREE.Vector3(1.42, -0.88, 0),
        new THREE.Vector3(0, 1.5, -0.08),
      ]

      nodePositions.forEach((position, index) => {
        addConnector(new THREE.Vector3(0, 0.1, 0.16), position, index === 4 ? 0.026 : 0.032, index % 2 === 0 ? materials[5] : materials[3])
        const node = addMesh(
          index % 2 === 0 ? new THREE.SphereGeometry(0.24, 32, 18) : new THREE.OctahedronGeometry(0.3, 0),
          [position.x, position.y, position.z],
          index % 3 === 0 ? materials[0] : index % 3 === 1 ? materials[2] : materials[1],
          [0.2 * index, 0.36, -0.16],
        )
        node.userData.extraSpin = index % 2 === 0 ? 0.2 : -0.28
      })

      const serverRack = addBox([1.64, 1.34, 0.18], [0, -0.34, -0.22], materials[0])
      const topSlot = addBox([1.26, 0.16, 0.08], [0, 0.02, -0.06], materials[4])
      const middleSlot = addBox([1.04, 0.16, 0.08], [0.08, -0.34, -0.04], materials[1])
      const bottomSlot = addBox([1.36, 0.16, 0.08], [-0.02, -0.7, -0.02], materials[3])
      serverRack.rotation.set(-0.18, 0.2, 0.02)
      topSlot.rotation.copy(serverRack.rotation)
      middleSlot.rotation.copy(serverRack.rotation)
      bottomSlot.rotation.copy(serverRack.rotation)
      core.userData.extraSpin = 0.18
    }

    if (variant === 'skillData') {
      const database = addMesh(new THREE.CylinderGeometry(0.92, 0.92, 1.72, 72), [0, 0, 0], materials[1], [Math.PI / 2, 0, 0])
      const topRing = addMesh(new THREE.TorusGeometry(0.92, 0.05, 12, 96), [0, 0.86, 0], materials[0], [Math.PI / 2, 0, 0])
      const midRing = addMesh(new THREE.TorusGeometry(0.92, 0.035, 10, 96), [0, 0.12, 0.02], materials[3], [Math.PI / 2, 0, 0])
      const bottomRing = addMesh(new THREE.TorusGeometry(0.92, 0.05, 12, 96), [0, -0.86, 0], materials[2], [Math.PI / 2, 0, 0])

      addBox([1.34, 0.08, 0.08], [0, 0.42, 0.94], materials[4])
      addBox([1.12, 0.08, 0.08], [0, 0.1, 0.96], materials[0])
      addBox([1.5, 0.08, 0.08], [0, -0.24, 0.94], materials[4])

      const orbitA = addMesh(new THREE.TorusGeometry(1.55, 0.018, 10, 112), [0, 0, 0], materials[5], [1.08, 0.2, 0.36])
      const orbitB = addMesh(new THREE.TorusGeometry(1.16, 0.014, 10, 96), [0, 0.04, 0], materials[5], [0.72, -0.42, -0.24])
      const cubeA = addMesh(new THREE.BoxGeometry(0.32, 0.32, 0.32), [-1.42, -0.78, 0.12], materials[0], [0.3, 0.42, -0.2])
      const cubeB = addMesh(new THREE.DodecahedronGeometry(0.26, 0), [1.42, 0.76, 0.16], materials[2], [0.08, 0.7, 0.24])
      const chip = addBox([0.62, 0.4, 0.12], [1.32, -0.62, 0.22], materials[3])

      database.userData.extraSpin = 0.08
      topRing.userData.extraSpin = -0.16
      midRing.userData.extraSpin = 0.2
      bottomRing.userData.extraSpin = -0.12
      orbitA.userData.extraSpin = 0.28
      orbitB.userData.extraSpin = -0.22
      cubeA.userData.extraSpin = 0.32
      cubeB.userData.extraSpin = -0.3
      chip.rotation.set(-0.08, -0.3, 0.2)
    }

    if (variant === 'contact') {
      addBox([3.1, 2.05, 0.2], [0, 0, 0])
      const flap = addBox([2.05, 0.08, 0.12], [0, 0.34, 0.2], materials[2])
      flap.rotation.z = -0.62
      const flapTwo = addBox([2.05, 0.08, 0.12], [0, 0.34, 0.21], materials[3])
      flapTwo.rotation.z = 0.62
      addBox([1.55, 0.1, 0.08], [0, -0.48, 0.24], materials[4])
      addBox([1.1, 0.1, 0.08], [0, -0.78, 0.24], materials[1])
    }

    const accentStyle: Record<SceneVariant, 'portrait' | 'cards' | 'data' | 'mail' | 'skills'> = {
      cv: 'cards',
      profile: 'portrait',
      heroPhoto: 'portrait',
      academic: 'cards',
      projects: 'cards',
      projectImage: 'cards',
      skillFrontend: 'skills',
      skillBackend: 'skills',
      skillData: 'data',
      contact: 'mail',
    }
    const floatingAccents = addAccentCluster(accentStyle[variant])

    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.15, 0.018, 12, 96), materials[5])
    ring.rotation.x = Math.PI / 2.5
    group.add(ring)

    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.56, 0.012, 10, 96), materials[5])
    innerRing.rotation.x = Math.PI / 2.1
    innerRing.rotation.y = 0.26
    group.add(innerRing)

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(2.45, 72),
      new THREE.ShadowMaterial({ color: colors.ink, transparent: true, opacity: 0.12 }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -2.15
    floor.receiveShadow = true
    group.add(floor)

    const skillVariants: SceneVariant[] = ['skillFrontend', 'skillBackend', 'skillData']
    const wideScreenVariants: SceneVariant[] = ['projectImage', 'skillFrontend']
    const baseScale =
      variant === 'cv' ? 0.92 : variant === 'heroPhoto' ? 1.42 : variant === 'profile' ? 1.34 : variant === 'projectImage' ? 1.22 : skillVariants.includes(variant) ? 1.34 : 1.08
    group.scale.setScalar(baseScale)

    const keyLight = new THREE.DirectionalLight(colors.amber, 3.4)
    keyLight.position.set(3.6, 5.2, 5)
    keyLight.castShadow = true
    keyLight.shadow.mapSize.set(1024, 1024)
    keyLight.shadow.camera.near = 0.5
    keyLight.shadow.camera.far = 18
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(colors.teal, 0.75)
    fillLight.position.set(-4, 1.8, 3)
    scene.add(fillLight)
    scene.add(new THREE.AmbientLight(colors.amber, 1.8))

    const resize = () => {
      const width = mount.clientWidth
      const height = mount.clientHeight
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      const mobileScale = width < 360 ? 0.62 : width < 480 ? 0.72 : width < 768 ? 0.86 : 1
      const heroScale = variant === 'heroPhoto' ? Math.max(mobileScale, 0.7) : Math.max(mobileScale, wideScreenVariants.includes(variant) ? 0.86 : 0.76)
      group.scale.setScalar(baseScale * heroScale)
      group.position.x = 0
      group.position.y = variant === 'heroPhoto' && width < 480 ? -0.02 : 0
      camera.position.z = width < 480 ? 8.4 : width < 768 ? 7.9 : 7.4
      camera.updateProjectionMatrix()
    }

    let frame = 0
    const startTime = performance.now()
    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000
      group.rotation.y = Math.sin(elapsed * 0.55) * 0.28
      group.rotation.x = -0.1 + Math.sin(elapsed * 0.38) * 0.04
      ring.rotation.z = elapsed * 0.34
      innerRing.rotation.z = -elapsed * 0.22
      floatingAccents.forEach((accent) => {
        accent.position.y = accent.userData.baseY + Math.sin(elapsed * accent.userData.floatSpeed + accent.userData.floatOffset) * 0.08
        accent.rotation.x += 0.004 * accent.userData.spin
        accent.rotation.y += 0.006 * accent.userData.spin
      })
      group.children.forEach((child) => {
        if (child.userData.extraSpin) {
          child.rotation.z += 0.0018 * child.userData.extraSpin
        }
      })
      renderer.render(scene, camera)
      frame = window.requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(frame)
      mount.removeChild(renderer.domElement)
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose()
        }
      })
      materials.forEach((material) => material.dispose())
      transientMaterials.forEach((material) => material.dispose())
      renderer.dispose()
    }
  }, [variant, imageUrl])

  return mountRef
}

export function PortfolioScene({ variant, imageUrl }: { variant: SceneVariant; imageUrl?: string }) {
  const mountRef = usePortfolioScene({ variant, imageUrl })

  return <Box ref={mountRef} aria-label={`${variant} 3D visual`} style={{ width: '100%', height: '100%' }} />
}
