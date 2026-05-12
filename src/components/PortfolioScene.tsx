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

export function PortfolioScene({ variant, imageUrl }: { variant: SceneVariant; imageUrl?: string }) {
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
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
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
              new THREE.MeshBasicMaterial({ map: texture }),
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
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.7, 48, 32), materials[1])
      head.position.set(0, 0.88, 0)
      head.castShadow = true
      head.receiveShadow = true
      group.add(head)
      addBox([2.5, 1.55, 0.38], [0, -0.72, 0])
      addBox([1.42, 0.12, 0.08], [0, -0.25, 0.25], materials[3])
      addBox([1.9, 0.1, 0.08], [0, -0.55, 0.25], materials[4])
      addBox([1.48, 0.1, 0.08], [0, -0.8, 0.25], materials[4])

      if (imageUrl) {
        const textureLoader = new THREE.TextureLoader()
        textureLoader.setCrossOrigin('anonymous')
        textureLoader.load(imageUrl, (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          const photo = new THREE.Mesh(
            new THREE.PlaneGeometry(1.08, 1.08),
            new THREE.MeshBasicMaterial({ map: texture }),
          )
          photo.position.set(-0.74, -0.56, 0.42)
          group.add(photo)
        })
      }
    }

    if (variant === 'heroPhoto') {
      const frame = addBox([3.24, 3.72, 0.2], [0, 0, -0.08], materials[0])
      const backPlate = addBox([3.48, 3.96, 0.14], [0.18, -0.16, -0.24], materials[3])
      const sideAccent = addBox([0.16, 3.46, 0.18], [-1.74, 0, 0.02], materials[1])
      const bottomAccent = addBox([1.48, 0.12, 0.12], [0.42, -1.98, 0.06], materials[2])

      frame.rotation.z = -0.035
      backPlate.rotation.z = 0.055
      sideAccent.rotation.z = -0.035
      bottomAccent.rotation.z = -0.035

      if (imageUrl) {
        const textureLoader = new THREE.TextureLoader()
        textureLoader.setCrossOrigin('anonymous')
        textureLoader.load(
          imageUrl,
          (texture) => {
            texture.colorSpace = THREE.SRGBColorSpace
            texture.anisotropy = renderer.capabilities.getMaxAnisotropy()
            const photo = new THREE.Mesh(
              new THREE.PlaneGeometry(2.92, 3.38),
              new THREE.MeshBasicMaterial({ map: texture }),
            )
            photo.position.set(0.04, 0.04, 0.04)
            photo.rotation.z = -0.035
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
              new THREE.MeshBasicMaterial({ map: texture }),
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
      addBox([3.2, 2.04, 0.18], [0, 0.1, 0], materials[0])
      addBox([3.2, 0.28, 0.2], [0, 1.02, 0.08], materials[1])
      addBox([0.22, 0.1, 0.08], [-1.32, 1.02, 0.22], materials[2])
      addBox([0.22, 0.1, 0.08], [-1.02, 1.02, 0.22], materials[3])
      addLine(1.18, 0.42, -0.52, materials[2])
      addLine(1.62, 0.08, -0.2)
      addLine(1.02, -0.26, -0.5, materials[1])
      addBox([0.92, 0.96, 0.08], [0.92, 0, 0.18], materials[3])
      addBox([1.18, 0.12, 0.08], [0, -1.18, 0.08], materials[4])
      addBox([0.36, 0.5, 0.18], [0, -0.88, 0], materials[4])
    }

    if (variant === 'skillBackend') {
      const serverA = addBox([2.62, 0.58, 0.92], [0, 0.72, 0], materials[1])
      const serverB = addBox([2.62, 0.58, 0.92], [0, 0, 0.04], materials[0])
      const serverC = addBox([2.62, 0.58, 0.92], [0, -0.72, 0.08], materials[3])
      serverA.rotation.z = -0.03
      serverB.rotation.z = 0.02
      serverC.rotation.z = -0.02
      addBox([0.22, 0.12, 0.08], [-1.02, 0.72, 0.52], materials[3])
      addBox([0.22, 0.12, 0.08], [-0.64, 0.72, 0.52], materials[2])
      addBox([1.16, 0.08, 0.08], [0.46, 0.72, 0.52], materials[4])
      addBox([0.22, 0.12, 0.08], [-1.02, 0, 0.56], materials[1])
      addBox([1.42, 0.08, 0.08], [0.34, 0, 0.56], materials[4])
      addBox([0.22, 0.12, 0.08], [-1.02, -0.72, 0.6], materials[2])
      addBox([1.04, 0.08, 0.08], [0.14, -0.72, 0.6], materials[4])
    }

    if (variant === 'skillData') {
      const cylinderMaterial = materials[1]
      const database = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.18, 1.76, 64), cylinderMaterial)
      database.rotation.x = Math.PI / 2
      database.position.set(0, 0.02, 0)
      database.castShadow = true
      database.receiveShadow = true
      group.add(database)

      const capTop = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.05, 12, 72), materials[3])
      capTop.position.set(0, 0.92, 0)
      capTop.rotation.x = Math.PI / 2
      capTop.castShadow = true
      group.add(capTop)

      const capBottom = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.05, 12, 72), materials[2])
      capBottom.position.set(0, -0.92, 0)
      capBottom.rotation.x = Math.PI / 2
      capBottom.castShadow = true
      group.add(capBottom)

      addBox([2.3, 0.1, 0.08], [0, 0.36, 1.1], materials[4])
      addBox([1.72, 0.1, 0.08], [0, 0, 1.1], materials[0])
      addBox([2.02, 0.1, 0.08], [0, -0.36, 1.1], materials[4])
      addBox([0.5, 0.5, 0.5], [-1.56, -0.82, 0], materials[3])
      addBox([0.5, 0.5, 0.5], [1.56, 0.82, 0], materials[2])
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
    group.scale.setScalar(
      variant === 'cv' ? 0.92 : variant === 'heroPhoto' ? 1 : variant === 'projectImage' ? 0.96 : skillVariants.includes(variant) ? 1.34 : 1.08,
    )

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
      camera.updateProjectionMatrix()
    }

    let frame = 0
    const clock = new THREE.Clock()
    const animate = () => {
      const elapsed = clock.getElapsedTime()
      group.rotation.y = Math.sin(elapsed * 0.55) * 0.28
      group.rotation.x = -0.1 + Math.sin(elapsed * 0.38) * 0.04
      ring.rotation.z = elapsed * 0.34
      innerRing.rotation.z = -elapsed * 0.22
      floatingAccents.forEach((accent) => {
        accent.position.y = accent.userData.baseY + Math.sin(elapsed * accent.userData.floatSpeed + accent.userData.floatOffset) * 0.08
        accent.rotation.x += 0.004 * accent.userData.spin
        accent.rotation.y += 0.006 * accent.userData.spin
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
      renderer.dispose()
    }
  }, [variant, imageUrl])

  return <Box ref={mountRef} aria-label={`${variant} 3D visual`} style={{ width: '100%', height: '100%' }} />
}
