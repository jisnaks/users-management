import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../LocalStorage';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const users = getUsers(); // Get the list of users 
        const user = users.find(user => user.email === email);
    
        if (user) {
            if (user.status === 'Blocked') { // Check for 'Blocked' status
                setError('Your account is blocked. Please contact support.'); 
            } else if (user.password === password) {
                navigate('/userlist'); 
            } else {
                setError('Invalid email or password.'); 
            }
        } else {
            setError('Invalid email or password.'); 
        }
    };
    
    return (
        <div className='login'>
            <div className='container'>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email"/>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password"/>
                    <button type="submit">Login</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
