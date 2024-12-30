import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [api_token, setApiToken] = useState('');
    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, api_token });
            if (response.data.status === 'success') {
                alert('Logged in!');
                navigate('/ticket-submission'); // Navigate to TicketSubmission page on success
            } else {
                alert('Login failed');
            }
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
