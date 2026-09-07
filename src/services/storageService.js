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
export const INITIAL_SETTINGS = {
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
  cvUrl: "https://drive.google.com/file/d/1ru1HI4NE_A2IfCPaChafOKUfkFUqPvKy/view?usp=drive_link",
  profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  heroImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  themeAccent: "#C59B4E",
};

export const INITIAL_PROJECTS = [
  {
    id: "rutan-depok-web",
    title: "Sistem Tiket & Profil Web Rutan Kelas 1 Depok",
    templateType: "dynamic",
    tags: ["UI/UX", "Web Application"],
    date: "2025-12",
    role: "UI/UX Designer & Web Architect",
    timeline: "Nov 2025 – Apr 2026",
    platform: "Web & Mobile Browser",
    team: "Tim IT Rutan Depok & Intern UI/UX",
    tools: ["Figma", "Web Systems", "UX Research", "HTML/CSS"],
    thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Perancangan sistem tiket & antrean berbasis web untuk layanan kunjungan dan poliklinik serta struktur situs profil instansi guna efisiensi alur kerja & transparansi publik.",
    heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
    sections: [
      {
        id: "sec-overview",
        title: "Project Overview",
        useHighlight: false,
        content: "Sistem ini dirancang untuk mendigitalkan antrean kunjungan dan pendaftaran poliklinik di Rutan Kelas 1 Depok, serta memperbarui struktur situs profil publik instansi agar transparan dan mudah diakses masyarakat.",
        images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80"],
        captions: []
      },
      {
        id: "sec-problem",
        title: "The Problem",
        useHighlight: true,
        highlightColor: "navy",
        content: "Antrean fisik kunjungan dan poliklinik sering menimbulkan penumpukan pengunjung di loket, waktu tunggu yang tidak pasti, serta ketidakjelasan syarat pengajuan berkas kunjungan bagi masyarakat umum.",
        images: [],
        captions: []
      },
      {
        id: "sec-goals",
        title: "Design Goals",
        useHighlight: true,
        highlightColor: "gold",
        content: "1) Mengurangi waktu tunggu antrean fisik hingga 50%.\n2) Menyediakan transparansi kuota kunjungan harian secara real-time.\n3) Memudahkan verifikasi dokumen pengajuan kunjungan.",
        images: [],
        captions: []
      },
      {
        id: "sec-research",
        title: "User Research",
        useHighlight: false,
        content: "Riset dilakukan melalui observasi langsung di loket pelayanan kunjungan Rutan Kelas 1 Depok dan wawancara mendalam dengan 12 pengunjung serta petugas administrasi sarpras.",
        images: [],
        captions: []
      },
      {
        id: "sec-findings",
        title: "Key Findings & Insights",
        useHighlight: true,
        highlightColor: "white",
        content: "83% pengunjung mengeluhkan ketiadaan informasi pasti mengenai sisa kuota kunjungan harian sebelum tiba di lokasi, dan 65% bingung mengenai berkas administrasi yang wajib dibawa.",
        images: [],
        captions: []
      },
      {
        id: "sec-solution",
        title: "Final Solution",
        useHighlight: false,
        content: "Portal web pelayanan publik terpadu yang memadukan reservasi tiket online real-time, verifikasi berkas digital, dan portal transparansi publik Rutan Kelas 1 Depok.",
        images: ["https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80", "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80"],
        captions: ["Landing Page", "Sistem Tiket"]
      }
    ],
    externalUrl: "",
    isFeatured: true,
    status: "published"
  },
  {
    id: "hrd-bacot-ux-research",
    title: "Salary Survey & Platform UI/UX Research — PT Hikayat Rakyat Digital",
    templateType: "dynamic",
    tags: ["UI/UX", "UX Research", "Wireframing"],
    date: "2024-07",
    role: "Intern UI/UX Designer & Researcher",
    timeline: "Juni 2024 – Sep 2024",
    platform: "Web App & Data Dashboard",
    team: "Product Manager, UI/UX Lead, Data Analyst",
    tools: ["Figma", "UX Research", "Benchmark Analysis", "Survey Questionnaires"],
    thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Riset pengguna berbasis data riil, analisis survey gaji industri, benchmark kompetitor, serta perancangan wireframe solutif untuk platform HRDBacot.",
    heroImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80",
    sections: [
      {
        id: "sec-overview",
        title: "Project Overview",
        useHighlight: false,
        content: "Proyek riset UX komprehensif untuk memetakan kebutuhan persona pengguna berdasarkan laporan survey gaji industri dan kuesioner riset UX riil.",
        images: ["https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=80"],
        captions: []
      },
      {
        id: "sec-problem",
        title: "The Problem",
        useHighlight: true,
        highlightColor: "navy",
        content: "Pengguna kesulitan membandingkan rentang gaji industri secara objektif akibat tampilan data yang kompleks dan kurang terstruktur.",
        images: [],
        captions: []
      },
      {
        id: "sec-solution",
        title: "Final Solution",
        useHighlight: false,
        content: "Wireframe solutif dan sistem visualisasi data salary survey yang siap diimplementasikan oleh tim developer.",
        images: [],
        captions: []
      }
    ],
    externalUrl: "",
    isFeatured: true,
    status: "published"
  },
  {
    id: "rumah-teras-baca-branding",
    title: "Identitas Visual & Konten Digital — Rumah Teras Baca",
    templateType: "dynamic",
    tags: ["Graphic Design", "Branding", "Social Media"],
    date: "2024-09",
    role: "Desainer Grafis & Branding Lead",
    timeline: "Agu 2024 – Nov 2024",
    client: "Komunitas Rumah Teras Baca",
    tools: ["Adobe Illustrator", "Photoshop", "Canva"],
    thumbnail: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80",
    shortDescription: "Pembuatan 23 konten carousel edukatif, 8 poster IG story, spanduk 3x2m outdoor, merchandise kaos/tote bag, & 4 sertifikat resmi.",
    heroImage: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80",
    sections: [
      {
        id: "sec-overview",
        title: "Overview",
        useHighlight: false,
        content: "Perancangan kampanye visual lengkap untuk menguatkan branding dan engagement kegiatan literasi masyarakat di Rumah Teras Baca, mencakup aset media sosial digital hingga materi promosi cetak luar ruangan.",
        images: ["https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1000&q=80"],
        captions: []
      },
      {
        id: "sec-deliverables",
        title: "Deliverables",
        useHighlight: true,
        highlightColor: "white",
        content: "1) 23 File Slide Carousel IG.\n2) 8 File Story IG High-Res.\n3) 3 Design Cetak Spanduk 3x2m Ready-Print.\n4) Vector Mockup Kaos & Tote Bag.\n5) 4 Printable Certificate Templates.",
        images: [],
        captions: []
      }
    ],
    externalUrl: "",
    isFeatured: true,
    status: "published"
  }
];

export const INITIAL_BLOG = [
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

export const INITIAL_CERTIFICATES = [
  {
    id: "cert-1",
    name: "Certificate in Agile Scrum Fundamentals",
    issuer: "MindMagine",
    category: "Administrasi & Manajemen",
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
    category: "Desain Grafis",
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
    category: "UI/UX",
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
    category: "Pemrograman & Data",
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
    category: "Pemrograman & Data",
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
    category: "Pemrograman & Data",
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
    category: "Pemrograman & Data",
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
    category: "Pemrograman & Data",
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
    category: "Pemrograman & Data",
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
    category: "Administrasi & Manajemen",
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
    category: "Pemrograman & Data",
    date: "November 2023 – November 2026",
    credentialId: "DICODING-KT-2023",
    credentialUrl: "#",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    description: "Dasar bahasa pemrograman Kotlin untuk pengembangan aplikasi modern."
  }
];

export const INITIAL_ACHIEVEMENTS = [
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

export const INITIAL_WRITINGS = [
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

export const INITIAL_EXPERIENCES = [
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

export const INITIAL_SKILLS = [
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
  const localKey = `gina_portfolio_${type}`;
  
  // Always try localStorage first — it's the source of truth for local dev
  const localData = localStorage.getItem(localKey);
  
  try {
    const res = await fetch(`/api/data?type=${type}`);
    const contentType = res.headers.get('content-type') || '';
    
    // CRITICAL: Vite dev server serves /api/data.js as text/javascript, NOT JSON.
    // Only trust the response if it's actually JSON from a real serverless function.
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      // Sync API data to localStorage
      localStorage.setItem(localKey, JSON.stringify(data));
      return data;
    }
    
    // API returned non-JSON (Vite dev) or failed — use localStorage
    return localData ? JSON.parse(localData) : defaultData;
  } catch (e) {
    // Network error — use localStorage
    return localData ? JSON.parse(localData) : defaultData;
  }
};

export const setApiData = async (type, data) => {
  const localKey = `gina_portfolio_${type}`;
  
  try {
    // Always save to localStorage immediately — this is the local dev source of truth
    localStorage.setItem(localKey, JSON.stringify(data));
  } catch (e) {
    console.warn(`Failed to save ${type} to localStorage (possibly quota exceeded).`, e);
    alert('GAGAL MENYIMPAN: Penyimpanan penuh! Pastikan Anda memasukkan URL/Link gambar (http...), BUKAN file gambar yang di-copy-paste langsung (Base64).');
  }
  
  try {
    // Attempt to sync to Vercel API (only works when deployed)
    const res = await fetch(`/api/data?type=${type}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    // Silently ignore non-JSON responses (Vite dev)
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return;
  } catch (e) {
    // Silently ignore — localStorage already has the data
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
