// src/Register.js
import React, { useState } from 'react';
import { addUser, getUsers } from '../LocalStorage'
import './Register.css'
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = getUsers();
        if (users.some(user => user.email === formData.email)) {
            alert('User already exists!');
        } else {
            addUser({ ...formData, status: 'unblock', previousLogins: [] });
            alert('User registered successfully');
            setFormData({ name: '', email: '', password: '' });
        }
    };

    return (
        <div className='register'>
            <div className='container'>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <button type="submit">Register</button>
                </form>
                <p>If you have alredy registered <span><Link to='/login'>Login</Link></span></p>
            </div>

        </div>
    );
};

export default Register;
