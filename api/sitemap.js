import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  try {
    const baseUrl = 'https://gina-portfolio-delta.vercel.app';
    
    // Fetch projects and blog posts from the database
    let projects = [];
    let blogPosts = [];
    
    try {
      const projectsResult = await sql`SELECT data FROM collections WHERE type = 'projects'`;
      if (projectsResult.rowCount > 0) {
        projects = projectsResult.rows[0].data || [];
      }
    } catch (e) {
      console.error('Error fetching projects for sitemap:', e);
    }
    
    try {
      const blogResult = await sql`SELECT data FROM collections WHERE type = 'blog'`;
      if (blogResult.rowCount > 0) {
        blogPosts = blogResult.rows[0].data || [];
      }
    } catch (e) {
      console.error('Error fetching blog posts for sitemap:', e);
    }

    // Filter to only include published items
    const publishedProjects = projects.filter(p => p.status !== 'draft');
    const publishedBlogs = blogPosts.filter(p => p.status !== 'draft');

    // Generate XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static URLs
    const staticPages = [
      { url: '/', priority: '1.0' },
      { url: '/portfolio', priority: '0.9' },
      { url: '/blog', priority: '0.8' },
      { url: '/about', priority: '0.7' },
      { url: '/certificates', priority: '0.7' },
      { url: '/achievements', priority: '0.7' }
    ];

    staticPages.forEach(page => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
      xml += `    <changefreq>weekly</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    });

    // Dynamic Portfolio URLs
    publishedProjects.forEach(project => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/portfolio/${project.id}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.8</priority>\n`;
      xml += `  </url>\n`;
    });

    // Dynamic Blog URLs
    publishedBlogs.forEach(post => {
      xml += `  <url>\n`;
      xml += `    <loc>${baseUrl}/blog/${post.id}</loc>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;
      xml += `  </url>\n`;
    });

    xml += `</urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}
