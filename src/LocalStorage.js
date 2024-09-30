// src/LocalStorage.js

const USERS_KEY = 'users';

export const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};
export const addUser = (user) => {
  const users = getUsers();
  user.status = 'Active'; // Set status to 'Active' for new users
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};


export const updateUser = (updatedUser) => {
  const users = getUsers();
  const index = users.findIndex(user => user.email === updatedUser.email);
  if (index !== -1) {
    users[index] = updatedUser;
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

export const deleteUser = (email) => {
  let users = getUsers();
  users = users.filter(user => user.email !== email);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};
