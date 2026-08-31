import { sql } from '@vercel/postgres';

export default async function handler(request, response) {
  const { method, query } = request;
  const type = query.type;

  if (!type) {
    return response.status(400).json({ error: 'Type is required' });
  }

  try {
    if (method === 'GET') {
      let result;
      if (type === 'settings') {
        result = await sql`SELECT data FROM settings WHERE key = 'app_settings'`;
      } else {
        result = await sql`SELECT data FROM collections WHERE type = ${type}`;
      }

      if (result.rowCount > 0) {
        return response.status(200).json(result.rows[0].data);
      } else {
        return response.status(404).json({ error: 'Data not found' });
      }
    } else if (method === 'POST') {
      const data = request.body;
      
      if (type === 'settings') {
        await sql`
          INSERT INTO settings (key, data)
          VALUES ('app_settings', ${JSON.stringify(data)})
          ON CONFLICT (key) DO UPDATE SET data = ${JSON.stringify(data)};
        `;
      } else {
        await sql`
          INSERT INTO collections (type, data)
          VALUES (${type}, ${JSON.stringify(data)})
          ON CONFLICT (type) DO UPDATE SET data = ${JSON.stringify(data)};
        `;
      }
      
      return response.status(200).json({ message: 'Data saved successfully' });
    } else {
      response.setHeader('Allow', ['GET', 'POST']);
      return response.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    console.error('Database Error:', error);
    return response.status(500).json({ error: error.message });
  }
}
