import React, { useState } from 'react';
import { addUser, getUsers } from '../LocalStorage';
import './Register.css';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' ,age:''});
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const newErrors = {};
        const { name, email, password,age } = formData;

       
        if (!name) {
            newErrors.name = 'Name is required.';
        }

        
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
        if (!age) {
            newErrors.age = 'Age is required.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length === 0) {
            const users = getUsers();
            if (users.some(user => user.email === formData.email)) {
                alert('User already exists!');
            } else {
                addUser({ ...formData, status: 'Not blocked', previousLogins: [] });
                alert('User registered successfully');
                setFormData({ name: '', email: '', password: '',age:'' });
            }
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <div className='register'>
            <div className='container'>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Name" 
                        value={formData.name} 
                        onChange={handleChange}  required
                    />
                    {errors.name && <p className="error">{errors.name}</p>}

                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} required
                    />
                    {errors.email && <p className="error">{errors.email}</p>}

                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} required
                    />
                    {errors.password && <p className="error">{errors.password}</p>}

                    <input 
                        type="number" 
                        name="age" 
                        placeholder="Age" 
                        value={formData.age} 
                        onChange={handleChange} required
                    />
                    {errors.age && <p className="error">{errors.age}</p>}

                    <button type="submit">Register</button>
                </form>
                <p>If you have already registered <span><Link to='/login'>Login</Link></span></p>
            </div>
        </div>
    );
};

export default Register;
