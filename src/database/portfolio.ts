export const profile = {
  name: 'Bình An',
  role: 'Lập trình viên Frontend',
  avatarUrl: '/image-removebg-preview.png',
  homePhotoUrl: '/image-removebg-preview.png',
  cvImageUrl: '/cv-image.jpg',
  cvUrl: 'https://drive.google.com/file/d/11C4dzqYtXHewVmbw9pjZMxMsLe8x1mLq/view?usp=sharing',
  headline: 'Frontend Developer',
  headlineAccent: 'Bình An Portfolio',
  eyebrow: 'Sẵn sàng nhận việc',
  intro:
    'Portfolio cá nhân của Bình An, lập trình viên Frontend yêu thích xây dựng giao diện web đẹp, thân thiện và tương thích trên nhiều thiết bị.',
  about:
    'Xin chào! Tôi là Bình An, một lập trình viên Frontend đang sinh sống và làm việc tại Thành phố Hồ Chí Minh. Tôi đam mê tạo ra những trải nghiệm web đẹp, rõ ràng và thân thiện với người dùng.',
  objective:
    'Mục tiêu của tôi là phát triển thành Frontend Developer có khả năng xây dựng sản phẩm thực tế, kết nối tốt với backend, tối ưu trải nghiệm người dùng và luôn học hỏi công nghệ mới.',
  email: 'doan44503@gmail.com',
  phone: '0329.104.253',
  location: 'Thành phố Hồ Chí Minh, Việt Nam',
  github: 'https://github.com/binhantt',
  facebook: 'https://web.facebook.com/profile.php?id=100055981183341',
}

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Tôi', href: '#about' },
  { label: 'Skill', href: '#skills' },
  { label: 'Học', href: '#academic' },
  { label: 'Dự án', href: '#projects' },
  { label: 'LH', href: '#contact' },
]

export const skillGroups = [
  {
    title: 'Frontend',
    items: ['Vue.js', 'React', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'PHP', 'Express.js', 'RESTful API', 'JWT'],
  },
  {
    title: 'Database / Tools',
    items: ['MySQL', 'MongoDB', 'GitHub', 'Vite', 'Pinia'],
  },
]

export const academics = [
  { label: '2021 - Hiện tại', value: 'Đại học Công nghệ TP.HCM (HUTECH)' },
  { label: 'Ngành học', value: 'Công nghệ Thông tin' },
  { label: 'Trọng tâm', value: 'Lập trình Web, Cơ sở dữ liệu, Phân tích thiết kế hệ thống' },
  { label: 'Tự học', value: 'React, Vue.js, Node.js, UI/UX qua dự án cá nhân' },
]

export const learnedTopics = [
  'Lập trình Web',
  'Cơ sở dữ liệu',
  'Phân tích thiết kế hệ thống',
  'React và Vue.js',
  'Node.js và RESTful API',
  'UI/UX và responsive design',
]

export const projects = [
  {
    name: 'Vue-AnatonLandingPage',
    stack: 'HTML, CSS, JavaScript, Tailwind CSS',
    detail:
      'Trang landing page giới thiệu sản phẩm với giao diện hiện đại, hiệu ứng chuyển động mượt mà và tương thích trên mọi thiết bị.',
    imageUrl: 'https://binhan.vercel.app/bt.png',
    demoUrl: 'https://binhantt.github.io/Vue-AnatonLandingPage/',
    githubUrl: 'https://github.com/binhantt/Vue-AnatonLandingPage',
  },
  {
    name: 'Backend API Service',
    stack: 'Node.js, TypeScript, Express.js, MySQL, JWT, Bcrypt',
    detail:
      'RESTful API service cung cấp xác thực người dùng và quản lý danh mục. Tích hợp JWT, mã hóa mật khẩu và xác thực captcha.',
    imageUrl: 'https://binhan.vercel.app/sever.png',
    githubUrl: 'https://github.com/binhantt/bankend',
  },
  {
    name: 'CV Portfolio Website',
    stack: 'Vue 3, Bootstrap Vue, AOS Animation, Font Awesome',
    detail:
      'Website CV cá nhân hiện đại với timeline kinh nghiệm, form liên hệ, theme động, hiệu ứng chuyển động và thiết kế responsive.',
    imageUrl: 'https://binhan.vercel.app/cv-portfolio.png',
    demoUrl: 'https://du-an-trang-4rj3uoxuk-binhantts-projects.vercel.app/',
    githubUrl: 'https://github.com/binhantt/du_an_trang-can',
  },
  {
    name: 'Quản lý hệ thống',
    stack: 'React 18, Vite, React Bootstrap, React Router',
    detail:
      'Ứng dụng fullstack quản lý người dùng, tích hợp đăng nhập, xác thực JWT, form validation và RESTful API kết nối MySQL.',
    imageUrl: 'https://binhan.vercel.app/sever2.png',
    demoUrl: 'https://sever-react-rgp0cuaj9-binhantts-projects.vercel.app/',
    githubUrl: 'https://github.com/binhantt/sever_react',
  },
  {
    name: 'ChatApp Matching Platform',
    stack: 'Next.js, React, NestJS, TypeORM, PostgreSQL, JWT, Socket.IO',
    detail: 'Ứng dụng chat/matching có auth, hồ sơ, ghép đôi, nhắn tin, report và admin moderation.',
    imageUrl: '/chat.png',
    githubUrl: 'https://github.com/binhantt/chat',
  },
  {
    name: 'Nuxt Minimal Starter Website',
    stack: 'Nuxt 3, Vue 3, Vite, Pinia, Bulma',
    detail:
      'Trang người dùng xây dựng bằng Nuxt 3, hiển thị sản phẩm hot, quản lý thông tin cá nhân và tối ưu SEO.',
    imageUrl: 'https://binhan.vercel.app/bai2.png',
    githubUrl: 'https://github.com/binhantt/nuxt-user-page',
  },
]
