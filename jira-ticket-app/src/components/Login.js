import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [email, setEmail] = useState('');
    const [api_token, setApiToken] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', { email, api_token });
            if (response.data.status === 'success') {
                sessionStorage.setItem('email', email);
                sessionStorage.setItem('api_token', api_token);
                navigate('/ticket-submission');
            } else {
                setError('Invalid login credentials');
            }
        } catch (error) {
            setError('Login failed, please try again');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card shadow-lg" style={{ width: '20rem' }}>
                <div className="card-body">
                    <h3 className="card-title text-center mb-4">Login to Jira</h3>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="api_token">API Token</label>
                        <input
                            type="password"
                            className="form-control"
                            id="api_token"
                            value={api_token}
                            onChange={(e) => setApiToken(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button
                        onClick={handleLogin}
                        className="btn btn-primary w-100"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;
