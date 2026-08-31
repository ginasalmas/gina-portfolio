// Local Storage Database Service for Gina's Portfolio & Journal CMS

const STORAGE_KEYS = {
  SETTINGS: 'gina_portfolio_settings',
  PROJECTS: 'gina_portfolio_projects',
  BLOG: 'gina_portfolio_blog',
  CERTIFICATES: 'gina_portfolio_certificates',
  ACHIEVEMENTS: 'gina_portfolio_achievements',
  WRITINGS: 'gina_portfolio_writings',
  EXPERIENCES: 'gina_portfolio_experiences',
  SKILLS: 'gina_portfolio_skills',
  AUTH: 'gina_portfolio_auth',
};

// Initial Seed Data based on Gina Salma Sabilla's Latest CV
const INITIAL_SETTINGS = {
  name: "Gina",
  fullName: "Gina Salma Sabilla, S.Kom.",
  heroTitle: "UI/UX Designer & Operational Specialist",
  subtitle: "Lulusan Teknik Informatika dengan pengalaman di bidang administrasi, operasional, pelayanan pelanggan, serta desain produk digital.",
  intro: "Memadukan kemampuan analitis, pemahaman teknologi, dan ketelitian tinggi untuk meningkatkan efisiensi kerja dan kualitas pengalaman pengguna.",
  aboutTitle: "Memadukan Teknologi, Administrasi & Desain Produk Digital.",
  aboutText: "Lulusan Teknik Informatika yang memiliki pengalaman di bidang administrasi, operasional, pelayanan pelanggan, serta desain produk digital. Memadukan kemampuan analitis, pemahaman teknologi, dan ketelitian tinggi untuk meningkatkan efisiensi kerja dan kualitas pengalaman pengguna. Terbiasa mengelola administrasi, menyusun laporan, mengoordinasikan kegiatan operasional, serta merancang solusi berbasis desain antarmuka dan pengalaman pengguna. Cepat beradaptasi, mampu bekerja mandiri maupun dalam tim, serta berkomitmen memberikan hasil kerja yang rapi, tepat waktu, dan berkualitas.",
  email: "gina.s.sabilla18@gmail.com",
  phone: "+6285117231817",
  location: "Depok, Jawa Barat, Indonesia",
  linkedin: "https://linkedin.com/in/ginasalmas",
  instagram: "https://instagram.com",
  github: "https://github.com",
  behance: "https://behance.net",
  dribbble: "https://dribbble.com",
  cvUrl: "mailto:gina.s.sabilla18@gmail.com",
  profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  heroImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  themeAccent: "#C59B4E",
};

const INITIAL_PROJECTS = [
  {
    id: "rutan-depok-web",
    title: "Sistem Tiket & Profil Web Rutan Kelas 1 Depok",
    templateType: "ui-ux",
    category: "UI/UX",
    subcategory: "Web Application",
    date: "2025-12",
    role: "UI/UX Designer & Web Architect",
    timeline: "Nov 2025 – Apr 2026",
    platform: "Web & Mobile Browser",
    team: "Tim IT Rutan Depok & Intern UI/UX",
    tools: ["Figma", "Web Systems", "UX Research", "HTML/CSS"],
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Perancangan sistem tiket & antrean berbasis web untuk layanan kunjungan dan poliklinik serta struktur situs profil instansi guna efisiensi alur kerja & transparansi publik.",
    
    // UI/UX 24 Sections Structured Data
    snapshot: "Role: Lead UI/UX Designer • Timeline: 5 Bulan • Platform: Responsive Web • Scope: Research, IA, Flow, Wireframes, Hi-Fi, Prototype, Testing",
    overview: "Sistem ini dirancang untuk mendigitalkan antrean kunjungan dan pendaftaran poliklinik di Rutan Kelas 1 Depok, serta memperbarui struktur situs profil publik instansi agar transparan dan mudah diakses masyarakat.",
    problem: "Antrean fisik kunjungan dan poliklinik sering menimbulkan penumpukan pengunjung di loket, waktu tunggu yang tidak pasti, serta ketidakjelasan syarat pengajuan berkas kunjungan bagi masyarakat umum.",
    designGoals: "1) Mengurangi waktu tunggu antrean fisik hingga 50%. 2) Menyediakan transparansi kuota kunjungan harian secara real-time. 3) Memudahkan verifikasi dokumen pengajuan kunjungan.",
    userResearch: "Riset dilakukan melalui observasi langsung di loket pelayanan kunjungan Rutan Kelas 1 Depok dan wawancara mendalam dengan 12 pengunjung serta petugas administrasi sarpras.",
    researchFindings: "83% pengunjung mengeluhkan ketiadaan informasi pasti mengenai sisa kuota kunjungan harian sebelum tiba di lokasi, dan 65% bingung mengenai berkas administrasi yang wajib dibawa.",
    userPersona: "Bapak Herman (45 thn) & Ibu Ratna (38 thn) — Pengunjung yang membutuhkan kepastian kuota antrean, informasi persyaratan yang jelas, serta alur pendaftaran digital yang sederhana.",
    defineProblem: "Bagaimana kita bisa membantu pengunjung Rutan Depok mengetahui status antrean dan mendaftar jadwal kunjungan secara online tanpa harus mengantre sejak pagi di lokasi?",
    infoArchitecture: "Sitemap terbagi menjadi 3 pilar utama: 1) Portal Layanan Publik (Tiket Kunjungan & Poliklinik), 2) Profil & Berita Instansi, 3) Transparansi Layanan & Kontak Pengaduan.",
    userFlow: "Landing Page -> Pilih Jenis Kunjungan -> Cek Ketersediaan Tanggal & Kuota -> Isi Data Pengunjung & Upload Berkas -> Dapatkan Tiket QR Code Digital -> Verifikasi di Loket.",
    wireframes: "Penyusunan low-fidelity layout dengan hierarki teks visual yang kontras, tombol CTA berukuran besar, serta langkah registrasi bertahap (stepper form).",
    designSystem: "Primary Color: Deep Navy (#1E293B) & Gold Accent (#D97706), Typography: Inter & Plus Jakarta Sans, Component Library: Stepper Buttons, QR Ticket Cards, Alert Badges.",
    highFidelity: "Interface bersih dengan kontras tinggi, navigasi yang intuitif untuk semua rentang usia, serta visualisasi indikator sisa kuota antrean yang responsif.",
    prototypeUrl: "https://figma.com",
    usabilityTesting: "Pengujian dilakukan kepada 8 pengguna sasaran dengan 3 skenario tugas utama: 1) Mengambil tiket kunjungan online, 2) Memeriksa status kuota hari ini, 3) Mengunduh bukti tiket.",
    designIteration: "Iterasi berdasarkan UT: Menambahkan konfirmasi SMS/WhatsApp otomatis dan tombol cetak bukti fisik bagi pengunjung lansia.",
    finalSolution: "Portal web pelayanan publik terpadu yang memadukan reservasi tiket online real-time, verifikasi berkas digital, dan portal transparansi publik Rutan Kelas 1 Depok.",
    productShowcase: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    outcome: "Meningkatkan efisiensi pelayanan kunjungan hingga 40%, menghilangkan penumpukan fisik di loket pendaftaran, serta meningkatkan skor kepuasan masyarakat.",
    keyLearnings: "Desain antarmuka instansi publik harus mengedepankan prinsip inklusivitas, kemudahan akses bagi awam teknologi, serta kejelasan informasi hukum.",
    futureImprovements: "Pengembangan fitur notifikasi WhatsApp gateway real-time dan integrasi pemindai QR Code otomatis di pintu masuk loket.",
    reflection: "Proyek ini mengajarkan pentingnya empati mendalam terhadap masyarakat dan bagaimana logika sistem informatika dapat langsung menyelesaiakan masalah sosial nyata.",
    gallery: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80"
    ],
    externalUrl: "",
    isFeatured: true,
    status: "published"
  },
  {
    id: "hrd-bacot-ux-research",
    title: "Salary Survey & Platform UI/UX Research — PT Hikayat Rakyat Digital",
    templateType: "ui-ux",
    category: "UI/UX",
    subcategory: "UX Research & Wireframing",
    date: "2024-07",
    role: "Intern UI/UX Designer & Researcher",
    timeline: "Juni 2024 – Sep 2024",
    platform: "Web App & Data Dashboard",
    team: "Product Manager, UI/UX Lead, Data Analyst",
    tools: ["Figma", "UX Research", "Benchmark Analysis", "Survey Questionnaires"],
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Riset pengguna berbasis data riil, analisis survey gaji industri, benchmark kompetitor, serta perancangan wireframe solutif untuk platform HRDBacot.",
    
    snapshot: "Role: UI/UX Researcher & Wireframer • Timeline: 3 Bulan • Scope: Competitive Benchmark, Questionnaire Survey, Persona, Wireframes",
    overview: "Proyek riset UX komprehensif untuk memetakan kebutuhan persona pengguna berdasarkan laporan survey gaji industri dan kuesioner riset UX riil.",
    problem: "Pengguna kesulitan membandingkan rentang gaji industri secara objektif akibat tampilan data yang kompleks dan kurang terstruktur.",
    designGoals: "Merancang visualisasi data gaji yang interaktif, mudah disaring berdasarkan level & lokasi, serta aman menjaga kerahasiaan data.",
    userResearch: "Menganalisis 500+ data tanggapan survey gaji industri, menyebarkan kuesioner kualitatif ke 45 profesional HR & pencari kerja.",
    researchFindings: "78% responden mengharapkan kalkulator pembanding gaji yang interaktif dan filter industri yang spesifik.",
    userPersona: "Rian (26 thn) — Software Engineer yang ingin mengevaluasi penawaran gaji berdasarkan benchmark pasar industri terkini.",
    defineProblem: "How Might We menyajikan data gaji yang sensitif menjadi grafik yang interaktif, menyenangkan, dan mudah dipahami dalam 3 detik?",
    infoArchitecture: "Struktur navigasi data: Filter Industri -> Pilihan Pengalaman -> Visualisasi Modus Gaji -> Detail Benchmarking.",
    userFlow: "Pilih Industri -> Masukkan Role & Exp -> Lihat Grafik Sebaran Gaji -> Bandingkan dengan Rata-rata Industri.",
    wireframes: "Eksplorasi tata letak widget grafik, kartu rangkuman statistik gaji, dan filter multi-select.",
    designSystem: "Modern Data Theme: Slate Navy (#0F172A), Emerald Metric (#10B981), Card Shadow Depth UI.",
    highFidelity: "Dashboard visualisasi data interaktif dengan statistik min/max/median gaji yang jelas dan estetik.",
    prototypeUrl: "https://figma.com",
    usabilityTesting: "Pengujian prototype wireframe pada 6 responden menunjukkan kepuasan tinggi dalam membaca grafik gaji.",
    designIteration: "Penyempurnaan posisi toggle pembanding gaji bulanan vs tahunan berdasarkan feedback usability.",
    finalSolution: "Wireframe solutif dan sistem visualisasi data salary survey yang siap diimplementasikan oleh tim developer.",
    productShowcase: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    outcome: "Hasil rekomendasi desain diterima 100% oleh tim produk untuk menjadi standar fitur baru platform.",
    keyLearnings: "Riset berbasis data kuantitatif yang solid mempermudah pengambilan keputusan desain antarmuka.",
    futureImprovements: "Integrasi fitur AI Salary Estimator berdasarkan skill & sertifikasi pengguna.",
    reflection: "Pengalaman di HRDBacot memperkuat keahlian riset berbasis emosional dan analitis pengguna secara berimbang.",
    gallery: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80"
    ],
    externalUrl: "",
    isFeatured: true,
    status: "published"
  },
  {
    id: "rumah-teras-baca-branding",
    title: "Identitas Visual & Konten Digital — Rumah Teras Baca",
    templateType: "graphic-design",
    category: "Graphic Design",
    subcategory: "Social Media & Print Branding",
    date: "2024-09",
    role: "Desainer Grafis & Branding Lead",
    timeline: "Agu 2024 – Nov 2024",
    client: "Komunitas Rumah Teras Baca",
    tools: ["Adobe Illustrator", "Photoshop", "Canva"],
    thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Pembuatan 23 konten carousel edukatif, 8 poster IG story, spanduk 3x2m outdoor, merchandise kaos/tote bag, & 4 sertifikat resmi.",
    
    // Graphic Design 13 Sections Structured Data
    overview: "Perancangan kampanye visual lengkap untuk menguatkan branding dan engagement kegiatan literasi masyarakat di Rumah Teras Baca, mencakup aset media sosial digital hingga materi promosi cetak luar ruangan.",
    creativeBrief: "Kebutuhan awal mencakup rebranding identitas visual kegiatan literasi, meningkatkan engagement pemuda melalui Instagram, serta menyediakan materi cetak luar ruangan yang menarik untuk acara offline.",
    designDirection: "Konsep visual yang hangat, inklusif, dan mengedepankan nuansa edukatif yang ramah. Keywords: Friendly, Inspiring, Educational, Warm Earth Tone.",
    visualExploration: "Moodboard berbasis estetika ilustrasi buku, warna-warna terakota dan botanical sage, serta eksplorasi sketsa tata letak postingan carousel Instagram.",
    designDevelopment: "Pemilihan palet warna terracotta hangat (#C59B4E & #8B4513), tipografi serif klasik yang mudah dibaca, serta penyusunan grid sistem untuk 23 konten carousel.",
    finalDesign: "Hasil desain final terdiri dari 23 slide carousel edukatif, 8 poster IG Story komunikatif, 3 spanduk outdoor 3x2 meter, merchandise eksklusif (kaos & tote bag), serta 4 template sertifikat penghargaan resmi.",
    mockups: "Penerapan visual pada mockup kaos katun premium, tote bag kain kanvas, spanduk vinyl 3x2m di lokasi kegiatan, serta tampilan feed Instagram responsif.",
    designAssets: "Asset System: Color Palette (Terracotta Gold, Earth Brown, Soft Cream), Serif & Sans-Serif Fonts, Icon Pack Literasi, Botanical Illustration Elements.",
    deliverables: "1) 23 File Slide Carousel IG. 2) 8 File Story IG High-Res. 3) 3 Design Cetak Spanduk 3x2m Ready-Print. 4) Vector Mockup Kaos & Tote Bag. 5) 4 Printable Certificate Templates.",
    outcome: "Meningkatkan engagement Instagram hingga 140%, memperkuat kehadiran brand visual komunitas, serta sukses menyelenggarakan kegiatan edukasi dengan 200+ peserta.",
    reflection: "Desain grafis bukan hanya tentang estetika visual semata, namun bagaimana pesan komunikatif mampu menyentuh audiens dan menggerakkan partisipasi aktif komunitas.",
    gallery: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80"
    ],
    externalUrl: "",
    isFeatured: true,
    status: "published"
  }
];

const INITIAL_BLOG = [
  {
    id: "efisiensi-layanan-teknologi",
    title: "Mengintegrasikan Logika Informatika dalam Pengelolaan Administrasi & Desain Produk Digital",
    category: "Artikel & Pemikiran",
    tags: ["Informatika", "Administrasi", "UI/UX", "Efisiensi"],
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
    publishedAt: "2025-01-10",
    readTime: "5 min read",
    excerpt: "Bagaimana latar belakang Teknik Informatika dan ketelitian operasional membentuk pendekatan solutif dalam merancang antarmuka layanan publik yang transparan dan efisien.",
    content: `
### Memadukan Teknologi & Ketelitian Operasional

Sebagai lulusan Teknik Informatika yang memiliki pengalaman di bidang administrasi dan pelayanan publik, saya percaya bahwa **teknologi terbaik adalah teknologi yang mempermudah kehidupan manusia secara nyata**.

### 3 Pilar Utama dalam Merancang Solusi Layanan:

1. **Struktur Data & Alur Kerja Transparan**: Pengarsipan digital dan pendataan yang rapi memastikan informasi selalu mudah diakses dan akurat.
2. **Desain Antarmuka Berbasis Pengguna (Human-Centered UX)**: Mengurangi kerumitan langkah antrean maupun formulir online agar mudah dipahami masyarakat umum.
3. **Efisiensi & Akuntabilitas**: Sistem tiket digital dan laporan operasional yang terstruktur membantu evaluasi pimpinan serta kepuasan pengguna jasa.
    `,
    isFeatured: true,
    status: "published"
  }
];

const INITIAL_CERTIFICATES = [
  {
    id: "cert-1",
    name: "Certificate in Agile Scrum Fundamentals",
    issuer: "MindMagine",
    date: "Mei 2025 – Mei 2028",
    credentialId: "AGILE-SCRUM-MM-2025",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    description: "Sertifikasi keahlian dalam manajemen proyek berbasis metode Agile dan Scrum."
  },
  {
    id: "cert-2",
    name: "Junior Graphic Designer",
    issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
    date: "Oktober 2024 – Oktober 2027",
    credentialId: "BNSP-JGD-2024",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=800&q=80",
    description: "Sertifikasi kompetensi resmi sebagai Junior Graphic Designer terlisensi BNSP."
  },
  {
    id: "cert-3",
    name: "Intro to UI/UX (Gold Distinction)",
    issuer: "Skilvul",
    date: "Juni 2024 – Juni 2026",
    credentialId: "SKILVUL-GOLD-2024",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80",
    description: "Predikat Gold dalam perancangan antarmuka dan riset pengalaman pengguna UI/UX."
  },
  {
    id: "cert-4",
    name: "Belajar Dasar Data Science",
    issuer: "Dicoding Indonesia",
    date: "Januari 2024 – Januari 2027",
    credentialId: "DICODING-DS-2024",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    description: "Pemahaman dasar eksplorasi data, analisis statistik, dan visualisasi data."
  },
  {
    id: "cert-5",
    name: "Memulai Pemrograman dengan Python",
    issuer: "Dicoding Indonesia",
    date: "Januari 2024 – Januari 2027",
    credentialId: "DICODING-PY-2024",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    description: "Dasar sintaksis, struktur data, dan logika pemrograman Python."
  },
  {
    id: "cert-6",
    name: "Belajar Prinsip Pemrograman SOLID",
    issuer: "Dicoding Indonesia",
    date: "Januari 2024 – Januari 2027",
    credentialId: "DICODING-SOLID-2024",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    description: "Penerapan prinsip desain perangkat lunak berorientasi objek yang rapi dan terstruktur."
  },
  {
    id: "cert-7",
    name: "Belajar Pemrograman Prosedural dengan Python",
    issuer: "Dicoding Indonesia",
    date: "Januari 2024 – Januari 2027",
    credentialId: "DICODING-PYPROC-2024",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    description: "Konsep algoritma prosedural dan pengolahan fungsi dalam bahasa Python."
  },
  {
    id: "cert-8",
    name: "Belajar Dasar Structured Query Language (SQL)",
    issuer: "Dicoding Indonesia",
    date: "Januari 2024 – Januari 2027",
    credentialId: "DICODING-SQL-2024",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80",
    description: "Pengelolaan basis data relasional, query manipulasi data, dan join tabel."
  },
  {
    id: "cert-9",
    name: "Belajar Membuat Aplikasi Android untuk Pemula",
    issuer: "Dicoding Indonesia",
    date: "Desember 2023 – Desember 2026",
    credentialId: "DICODING-AND-2023",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?auto=format&fit=crop&w=800&q=80",
    description: "Pengembangan aplikasi Android native menggunakan Kotlin dan Android Studio."
  },
  {
    id: "cert-10",
    name: "Belajar Dasar Manajemen Proyek",
    issuer: "Dicoding Indonesia",
    date: "Desember 2023 – Desember 2026",
    credentialId: "DICODING-PM-2023",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=800&q=80",
    description: "Konsep siklus proyek, perencanaan, eksekusi, dan manajemen risiko."
  },
  {
    id: "cert-11",
    name: "Memulai Pemrograman dengan Kotlin",
    issuer: "Dicoding Indonesia",
    date: "November 2023 – November 2026",
    credentialId: "DICODING-KT-2023",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    description: "Dasar bahasa pemrograman Kotlin untuk pengembangan aplikasi modern."
  }
];

const INITIAL_ACHIEVEMENTS = [
  {
    id: "ach-1",
    title: "Top 33 Hipster (Designer Talent) — IndonesiaNEXT",
    issuer: "Telkomsel IndonesiaNEXT",
    date: "Juli 2025",
    category: "Recognition",
    description: "Terpilih sebagai Top 33 Designer Talent (Hipster) dalam program pengembangan talenta digital nasional IndonesiaNEXT oleh Telkomsel.",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "ach-2",
    title: "Best Merge Product — Infinite Learning Indonesia",
    issuer: "Infinite Learning Indonesia",
    date: "Januari 2024",
    category: "Award",
    description: "Penghargaan Best Merge Product untuk karya perancangan aplikasi seluler terbaik pada program MSIB Android Mobile Application Development.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
  }
];

const INITIAL_WRITINGS = [
  {
    id: "training-1",
    title: "Pelatihan IndonesiaNEXT – Telkomsel",
    publication: "Telkomsel IndonesiaNEXT",
    date: "April 2025 – Juli 2025",
    category: "Pelatihan Digital",
    link: "#",
    summary: "Program pelatihan talenta digital nasional berfokus pada keahlian desain produk (Hipster/Designer Talent)."
  },
  {
    id: "training-2",
    title: "Bootcamp UI/UX Designer – Luarsekolah",
    publication: "Belajar Bekerja Bootcamp Luarsekolah",
    date: "Februari 2025 – Oktober 2025",
    category: "Pelatihan UI/UX",
    link: "#",
    summary: "Pelatihan intensif perancangan antarmuka, riset pengguna, wireframing, dan prototyping produk digital."
  },
  {
    id: "training-3",
    title: "Junior Graphic Designer – Politeknik Negeri Jakarta",
    publication: "Politeknik Negeri Jakarta (PNJ)",
    date: "Juli 2024 – Agustus 2024",
    category: "Pelatihan Desain Grafis",
    link: "#",
    summary: "Pelatihan vokasi keahlian desain grafis, komposisi tata letak, dan komunikasi visual."
  },
  {
    id: "training-4",
    title: "MSIB Android Mobile Application Development – Infinite Learning",
    publication: "Infinite Learning Indonesia",
    date: "Agustus 2023 – Desember 2023",
    category: "Studi Independen MSIB",
    link: "#",
    summary: "Pengembangan aplikasi seluler Android native dengan Kotlin, perancangan UI/UX, dan kolaborasi produk tim."
  },
  {
    id: "training-5",
    title: "Women In Tech Python and Cybersecurity – Digital Talent Scholarship",
    publication: "DTS Kominfo & Cisco",
    date: "Mei 2023 – Juni 2023",
    category: "Pelatihan Teknis",
    link: "#",
    summary: "Pelatihan logika pemrograman Python dan konsep dasar keamanan siber (cybersecurity)."
  }
];

const INITIAL_EXPERIENCES = [
  {
    id: "exp-bkd-depok",
    company: "Badan Keuangan Daerah Pemerintah Kota Depok",
    position: "Operator Layanan Operasional (PPPK Paruh Waktu)",
    type: "Full-time / PPPK",
    startDate: "Jul 2022",
    endDate: "Sekarang",
    description: "Mengelola operasional, administrasi, jadwal, serta pelayanan pelanggan untuk fasilitas umum Gedung Aula Umum Mekarsari secara akuntabel dan profesional.",
    responsibilities: [
      "Menjaga kebersihan, keamanan, dan kelayakan fasilitas Gedung Aula Umum Mekarsari agar selalu siap digunakan.",
      "Mengelola jadwal pemakaian lapangan olahraga dan pemesanan aula serbaguna tanpa tumpang tindih jadwal.",
      "Melayani pemesanan, menyusun dokumen administrasi, dan memproses pembayaran biaya pemakaian fasilitas secara tertib dan akuntabel.",
      "Menyusun laporan kinerja dan laporan operasional secara berkala untuk diserahkan kepada pimpinan sebagai bahan evaluasi.",
      "Memberikan pelayanan yang ramah, informatif, dan membantu kelancaran acara mulai dari kegiatan rutin hingga acara berskala besar seperti pernikahan.",
      "Mengoordinasikan persiapan tempat, perlengkapan, dan logistik acara agar berjalan lancar dan memuaskan pengguna jasa."
    ]
  },
  {
    id: "exp-rutan-depok",
    company: "Kementerian Imigrasi dan Pemasyarakatan (Rutan Kelas 1 Depok)",
    position: "Magang Administrasi Kepegawaian Dan Fasilitas Umum",
    type: "Internship",
    startDate: "Nov 2025",
    endDate: "Apr 2026",
    description: "Mengelola sistem administrasi, digitalisasi data kepegawaian, pemeliharaan sarana prasarana, serta merancang sistem antrean & situs web instansi.",
    responsibilities: [
      "Mengelola surat-menyurat masuk dan keluar, mulai dari penerimaan, pencatatan, pengarsipan hingga pendistribusian.",
      "Memverifikasi, memperbarui, dan mendigitalkan data kepegawaian agar data selalu akurat, mudah dicari, dan aman.",
      "Mengoordinasikan pemakaian dan pemeliharaan ruang rapat, kendaraan dinas, peralatan kantor, serta kebutuhan kegiatan.",
      "Memantau penggunaan dan perawatan rutin sarana prasarana kantor guna menunjang produktivitas harian.",
      "Memberikan pelayanan informasi dan penerimaan tamu di loket kunjungan dengan sikap sigap dan sopan.",
      "Merancang sistem tiket dan antrean berbasis web untuk layanan kunjungan dan poliklinik, sehingga alur kerja menjadi lebih efisien.",
      "Merancang tampilan dan struktur situs profil instansi guna meningkatkan akses informasi dan transparansi publik."
    ]
  },
  {
    id: "exp-hrd-bacot",
    company: "PT Hikayat Rakyat Digital (HRDBacot)",
    position: "Intern UI/UX Designer",
    type: "Internship",
    startDate: "Jun 2024",
    endDate: "Sep 2024",
    description: "Bertanggung jawab penuh dalam melakukan riset pengguna dan perancangan pengalaman pengguna (user experience) berbasis data riil.",
    responsibilities: [
      "Menganalisis laporan salary survey industri sebagai fondasi memetakan kebutuhan & target persona pengguna.",
      "Melakukan benchmark research terhadap platform kompetitor sejenis untuk mengidentifikasi peluang pengembangan fitur baru.",
      "Menyusun & menyebarkan kuesioner UX Research untuk memetakan preferensi, kendala, & pola perilaku pengguna.",
      "Menghasilkan rekomendasi desain (wireframe) yang solutif berdasarkan hasil temuan riset pengguna."
    ]
  },
  {
    id: "exp-teras-baca",
    company: "Rumah Teras Baca",
    position: "Desainer Grafis",
    type: "Part-time",
    startDate: "Agu 2024",
    endDate: "Nov 2024",
    description: "Merancang aset visual digital, materi cetak luar ruangan, merchandise, dan sertifikat resmi kegiatan organisasi.",
    responsibilities: [
      "Memproduksi 8 aset konten poster Instagram story yang komunikatif untuk meningkatkan engagement dan mempromosikan kegiatan organisasi.",
      "Merancang 23 konten edukatif format carousel Instagram guna memperkenalkan narasumber, panitia, serta detail acara secara visual.",
      "Mendesain material cetak promosi luar ruangan berupa 3 spanduk kegiatan ukuran 3x2 meter dengan tata letak yang proporsional.",
      "Menciptakan desain merchandise eksklusif berupa kaos dan tote bag untuk keperluan pelaksana kegiatan.",
      "Merancang template 4 sertifikat resmi penghargaan bagi peserta dan pembicara kegiatan."
    ]
  }
];

const INITIAL_SKILLS = [
  {
    category: "Desain & UI/UX",
    items: ["Perancangan Antarmuka (UI)", "Pengalaman Pengguna (UX)", "Riset Pengguna", "Usability Testing", "Wireframing", "Prototyping", "Desain Grafis", "Desain Web", "Desain Aplikasi Seluler", "Design Thinking", "Arsitektur Informasi"]
  },
  {
    category: "Alat & Perangkat Lunak",
    items: ["Figma", "Canva", "Adobe Photoshop", "Adobe Illustrator", "CapCut", "Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint", "Microsoft Office", "Google Docs", "Google Slides"]
  },
  {
    category: "Manajemen & Kolaborasi",
    items: ["Metode Agile & SCRUM", "Manajemen Produk", "Kepemimpinan Tim Lintas Fungsi", "Kerja Sama Tim", "Manajemen Waktu", "Perencanaan Kegiatan", "Koordinasi Tim", "Manajemen Proyek Dasar"]
  },
  {
    category: "Administrasi & Operasional",
    items: ["Pengelolaan Arsip", "Penyusunan Laporan", "Pengaturan Jadwal", "Pelayanan Pelanggan", "Pemeliharaan Fasilitas", "Pemrosesan Data", "Pendokumentasian & Pengarsipan"]
  },
  {
    category: "Dasar Teknis",
    items: ["Pemrograman Python", "Pemrograman Kotlin", "Bahasa SQL", "Pengembangan Aplikasi Android", "Keamanan Siber Dasar"]
  }
];

export const getApiData = async (type, defaultData) => {
  try {
    const res = await fetch(`/api/data?type=${type}`);
    if (res.ok) return await res.json();
    return defaultData;
  } catch (e) {
    console.error(`Error reading ${type} from API:`, e);
    return defaultData;
  }
};

export const setApiData = async (type, data) => {
  try {
    await fetch(`/api/data?type=${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  } catch (e) {
    console.error(`Error writing ${type} to API:`, e);
  }
};

// Storage Service API (Async)
export const StorageService = {
  getSettings: () => getApiData('settings', INITIAL_SETTINGS),
  saveSettings: async (settings) => {
    await setApiData('settings', settings);
    return settings;
  },

  getProjects: () => getApiData('projects', INITIAL_PROJECTS),
  saveProjects: async (projects) => {
    await setApiData('projects', projects);
    return projects;
  },

  getBlogPosts: () => getApiData('blog', INITIAL_BLOG),
  saveBlogPosts: async (posts) => {
    await setApiData('blog', posts);
    return posts;
  },

  getCertificates: () => getApiData('certificates', INITIAL_CERTIFICATES),
  saveCertificates: async (certs) => {
    await setApiData('certificates', certs);
    return certs;
  },

  getAchievements: () => getApiData('achievements', INITIAL_ACHIEVEMENTS),
  saveAchievements: async (achievements) => {
    await setApiData('achievements', achievements);
    return achievements;
  },

  getWritings: () => getApiData('writings', INITIAL_WRITINGS),
  saveWritings: async (writings) => {
    await setApiData('writings', writings);
    return writings;
  },

  getExperiences: () => getApiData('experiences', INITIAL_EXPERIENCES),
  saveExperiences: async (exps) => {
    await setApiData('experiences', exps);
    return exps;
  },

  getSkills: () => getApiData('skills', INITIAL_SKILLS),
  saveSkills: async (skills) => {
    await setApiData('skills', skills);
    return skills;
  },

  resetAllData: async () => {
    await setApiData('settings', INITIAL_SETTINGS);
    await setApiData('projects', INITIAL_PROJECTS);
    await setApiData('blog', INITIAL_BLOG);
    await setApiData('certificates', INITIAL_CERTIFICATES);
    await setApiData('achievements', INITIAL_ACHIEVEMENTS);
    await setApiData('writings', INITIAL_WRITINGS);
    await setApiData('experiences', INITIAL_EXPERIENCES);
    await setApiData('skills', INITIAL_SKILLS);
    return true;
  }
};
