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


    // Himoyalangan SQL so‘rovi
    const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    const values = [username, password];

    try {
        const result = await pool.query(query, values);
        console.log('SQL Query:', query);

        if (result.rows.length > 0) {
            res.json({ success: true, user: result.rows[0] });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
