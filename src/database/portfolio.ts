export const profile = {
  name: 'Bình An',
  role: 'Frontend Developer',
  avatarUrl: '/image-removebg-preview.png',
  homePhotoUrl: '/image-removebg-preview.png',
  cvImageUrl: '/cv-image.jpg',
  cvUrl: 'https://drive.google.com/file/d/11C4dzqYtXHewVmbw9pjZMxMsLe8x1mLq/view?usp=sharing',
  headline: 'Frontend Developer',
  headlineAccent: 'Bình An Portfolio',
  eyebrow: 'Sẵn sàng nhận việc',
  intro:
    'Mình xây dựng giao diện web gọn, rõ và dễ dùng bằng React, Vue cùng các công cụ frontend hiện đại.',
  about:
    'Xin chào, mình là Bình An, một Frontend Developer tại Thành phố Hồ Chí Minh. Mình thích biến ý tưởng thành giao diện mượt, dễ đọc và thân thiện trên nhiều thiết bị.',
  objective:
    'Mục tiêu của mình là phát triển thành Frontend Developer có khả năng xây dựng sản phẩm thực tế, phối hợp tốt với backend và luôn cải thiện trải nghiệm người dùng.',
  email: 'dev.dobinhan@gmail.com',
  phone: '0329.104.253',
  location: 'Thành phố Hồ Chí Minh, Việt Nam',
  github: 'https://github.com/binhantt',
  facebook: 'https://web.facebook.com/profile.php?id=100055981183341',
  zalo: 'https://zalo.me/0329104253',
}

export const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Giới thiệu', href: '#about' },
  { label: 'Kỹ năng', href: '#skills' },
  { label: 'Học vấn', href: '#academic' },
  { label: 'Dự án', href: '#projects' },
  { label: 'Liên hệ', href: '#contact' },
]

export const skillGroups = [
  {
    title: 'Frontend',
    items: ['Vue.js', 'React', 'JavaScript', 'HTML5', 'Tailwind CSS', 'Bootstrap'],
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
  { label: '2021 - hiện tại', value: 'Đại học Công nghệ TP.HCM (HUTECH)' },
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
    name: 'ChatApp Matching Platform',
    stack: 'Next.js, React, NestJS, TypeORM, PostgreSQL, JWT, Socket.IO',
    detail:
      'Website chat và matching có đăng nhập, hồ sơ người dùng, ghép đôi, nhắn tin real-time, report và khu vực admin moderation.',
    imageUrl: '/chat.png',
    githubUrl: 'https://github.com/binhantt/chat',
  },
  {
    name: 'Vue-AnatonLandingPage',
    stack: 'HTML, CSS, JavaScript, Tailwind CSS',
    detail:
      'Landing page giới thiệu sản phẩm với giao diện hiện đại, chuyển động mượt và tương thích tốt trên nhiều thiết bị.',
    imageUrl: 'https://binhan.vercel.app/bt.png',
    demoUrl: 'https://binhantt.github.io/Vue-AnatonLandingPage/',
    githubUrl: 'https://github.com/binhantt/Vue-AnatonLandingPage',
  },
  {
    name: 'Backend API Service',
    stack: 'Node.js, TypeScript, Express.js, MySQL, JWT, Bcrypt',
    detail:
      'RESTful API service cho xác thực người dùng và quản lý danh mục, tích hợp JWT, mã hóa mật khẩu và xác thực captcha.',
    imageUrl: 'https://binhan.vercel.app/sever.png',
    githubUrl: 'https://github.com/binhantt/bankend',
  },
  {
    name: 'CV Portfolio Website',
    stack: 'Vue 3, Bootstrap Vue, AOS Animation, Font Awesome',
    detail:
      'Website CV cá nhân với timeline kinh nghiệm, form liên hệ, theme động, hiệu ứng chuyển động và thiết kế responsive.',
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
    name: 'Nuxt Minimal Starter Website',
    stack: 'Nuxt 3, Vue 3, Vite, Pinia, Bulma',
    detail:
      'Trang người dùng xây bằng Nuxt 3, hiển thị sản phẩm hot, quản lý thông tin cá nhân và tối ưu SEO.',
    imageUrl: 'https://binhan.vercel.app/bai2.png',
    githubUrl: 'https://github.com/binhantt/nuxt-user-page',
  },
]
