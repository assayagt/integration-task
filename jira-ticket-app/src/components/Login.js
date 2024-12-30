import React, { useState } from 'react';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [api_token, setApiToken] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, api_token });
            alert(response.data.status === 'success' ? 'Logged in!' : 'Login failed');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div>
            <h1>Login to Jira</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>API Token:</label>
                    <input
                        type="password"
                        value={api_token}
                        onChange={(e) => setApiToken(e.target.value)}
                        required
                    />
                </div>
                <button onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
}

export default Login;
