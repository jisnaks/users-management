import React, { useState, useEffect } from 'react';
import { getUsers, updateUser, deleteUser } from '../LocalStorage';
import './Userlist.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editEmail, setEditEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const handleBlockToggle = (email) => {
    const updatedUsers = users.map(user =>
      user.email === email ? { ...user, status: user.status === 'Not blocked' ? 'Blocked' : 'Not blocked' } : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleDelete = (email) => {
    const updatedUsers = users.filter(user => user.email !== email);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleEdit = (email) => {
    setEditEmail(email);
    setNewEmail(email);
  };

  const handleUpdate = () => {
    if (newEmail) {
      const updatedUsers = users.map(user =>
        user.email === editEmail ? { ...user, email: newEmail } : user
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setUsers(updatedUsers);
      setEditEmail('');
      setNewEmail('');
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
            <th>Previous Logins</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.email} style={{ backgroundColor: user.status === 'Blocked' ? '#f8d7da' : 'transparent' }}>
              <td>{user.name}</td>
              <td>
                {editEmail === user.email ? (
                  <input 
                    type="text" 
                    value={newEmail} 
                    onChange={(e) => setNewEmail(e.target.value)} 
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>{user.status}</td>
              <td className='actions'>
                <button onClick={() => handleBlockToggle(user.email)}>
                  {user.status === 'Not blocked' ? 'Block' : 'Unblock'}
                </button>
                <button onClick={() => handleDelete(user.email)}>Remove</button>
                {editEmail === user.email ? (
                  <button onClick={handleUpdate}>Update</button>
                ) : (
                  <button onClick={() => handleEdit(user.email)} disabled={user.status === 'Blocked'}>Edit</button>
                )}
              </td>
              <td>{user.previousLogins.join(',')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
