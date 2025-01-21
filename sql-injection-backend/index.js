import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pkg from 'pg';

const { Pool } = pkg;

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
    user: 'postgres',      // pgAdmin foydalanuvchi nomi (odatda postgres)
    host: 'localhost',              // Server manzili
    database: 'sql_injection_demo', // Yangi yaratilgan ma’lumotlar bazasi
    password: '123456', // pgAdmin paroli
    port: 5432,                     // PostgreSQL standarti porti
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Zaif SQL so'rovi
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    console.log('SQL Query:', query); // SQL so'rovini ko'rish

    try {
        const result = await pool.query(query);

        // Foydalanuvchilar ro‘yxatini chop etish
        console.log('User List:', result.rows);

        if (result.rows.length > 0) {
            res.json({ success: true, user: result.rows });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
