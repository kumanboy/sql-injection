import  { useState } from 'react';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await res.json();
            if (data.success) {
                setResponse(`Welcome, ${data.user.username}`);
            } else {
                setResponse('Invalid credentials');
            }
        } catch (error) {
            console.error('Error:', error);
            setResponse('Something went wrong!');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>SQL Injection Demo</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>
                    Login
                </button>
            </form>
            <p style={styles.response}>{response}</p>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
        margin: 0,
        padding: '0 20px',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        fontSize: '48px', // Katta ekranlar uchun kattaroq sarlavha
        color: '#333',
        marginBottom: '30px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '40%', // Laptoplar uchun kengroq forma
        minWidth: '400px', // Juda kichik bo‘lmasligi uchun
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
    },
    input: {
        width: '100%', // Formaning kengligi bo‘ylab to‘liq
        padding: '15px',
        marginBottom: '20px',
        fontSize: '18px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        outline: 'none',
    },
    button: {
        width: '100%',
        padding: '15px',
        fontSize: '18px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#4CAF50',
        color: '#fff',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s',
    },
    buttonHover: {
        backgroundColor: '#45a049',
    },
    response: {
        marginTop: '20px',
        fontSize: '20px',
        color: 'red',
    },
};

export default App;
