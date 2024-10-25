import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GlobalApi from '../../Globalapi';
import SidebarMenu from './Sidebar';

const ManageUsers = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);

  const getEmployees = async () => {
    try {
      const response = await axios.get(`${GlobalApi.baseUrl}/staff/get`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password && !isEditing) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6 && !isEditing) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    return newErrors;
  };

  const handleAddUser = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (isEditing) {
        const response = await axios.put(`${GlobalApi.baseUrl}/staff/edit${editingUserId}`, formData);
        setUsers(users.map(user => (user._id === editingUserId ? response.data : user)));
        setIsEditing(false);
        setEditingUserId(null);
      } else {
        const response = await axios.post(`${GlobalApi.baseUrl}/staff/create`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setUsers([...users, response.data]);
      }
      setFormData({ name: '', email: '', password: '', role: 'staff' });
      setErrors({});
    } catch (error) {
      console.error('Error saving user:', error.response ? error.response.data : error.message);
    }
  };

  const handleEditUser = (user) => {
    setFormData({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
    });
    setIsEditing(true);
    setEditingUserId(user._id);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${GlobalApi.baseUrl}/staff/delete/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className='flex bg-gray-100 min-h-screen'>
      <SidebarMenu/>
      
      <div className="container mx-auto p-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold mb-6 text-gray-700">{isEditing ? 'Edit User' : 'Manage Users'}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-600 mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Role</option>
                <option value="staff">Staff</option>
                <option value="worker">Worker</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
            </div>
          </div>

          <button
            onClick={handleAddUser}
            className="w-full bg-indigo-600 text-white py-1 px-2 text-sm rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            {isEditing ? 'Update User' : 'Add User'}
          </button>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Existing Users</h2>
          <table className="w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-indigo-100 text-gray-700 text-left">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-gray-500">No users available</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-3 text-gray-700">{user.name}</td>
                    <td className="px-4 py-3 text-gray-700">{user.email}</td>
                    <td className="px-4 py-3 text-gray-700">{user.role}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
