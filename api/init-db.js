import { sql } from '@vercel/postgres';

// Initial seed data
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
  cvUrl: "https://drive.google.com/file/d/1ru1HI4NE_A2IfCPaChafOKUfkFUqPvKy/view?usp=drive_link",
  profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  heroImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
  themeAccent: "#C59B4E",
};

export default async function handler(request, response) {
  try {
    // 1. Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        data JSONB NOT NULL
      );
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS collections (
        id SERIAL PRIMARY KEY,
        type VARCHAR(255) UNIQUE NOT NULL,
        data JSONB NOT NULL
      );
    `;

    // 2. Seed settings (only if not exists)
    const existing = await sql`SELECT id FROM settings WHERE key = 'app_settings'`;
    if (existing.rowCount === 0) {
      await sql`INSERT INTO settings (key, data) VALUES ('app_settings', ${JSON.stringify(INITIAL_SETTINGS)})`;
    }

    return response.status(200).json({ 
      message: 'Database initialized and seeded successfully!',
      tables: ['settings', 'collections']
    });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
}
