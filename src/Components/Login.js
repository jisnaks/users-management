import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUsers, updateUser } from '../LocalStorage';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            newErrors.email = 'Email is required.';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Email is not valid.';
        }

        if (!password) {
            newErrors.password = 'Password is required.';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters.';
        }
        return newErrors;
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(); 
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; 
        }

        const users = getUsers(); 
        const user = users.find(user => user.email === email);
    
        if (user) {
            if (user.status === 'Blocked') { 
                setErrors({ email: 'Your account is blocked. Please contact support.' });
            } else if (user.password === password) {
                user.previousLogins.push(new Date().toISOString()); 
                updateUser(user);
                navigate('/userlist'); 
            } else {
                setErrors({ email: 'Invalid email or password.' }); 
            }
        } else {
            setErrors({ email: 'Invalid email or password.' }); 
        }
    };
    
    return (
        <div className='login'>
            <div className='container'>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="">
                        
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setErrors({ ...errors, email: '' }); 
                            }} 
                            required 
                            placeholder="Email"
                            className=""
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>
                    <div className="">
                        
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({ ...errors, password: '' }); 
                            }} 
                            required 
                            placeholder="Password"
                            className=""
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>
                    <button type="submit" >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
