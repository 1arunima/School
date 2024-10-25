import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GlobalApi from '../../Globalapi';
import SidebarMenu from './Sidebar';

const AdminDashboard = () => {
  // States for counts
  const [counts, setCounts] = useState({
    staff: 0,
    workers: 0,
    books: 0,
    students: 0,
  });

  // Fetch counts from API
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(`${GlobalApi.baseUrl}/count`); // Adjust the API route accordingly
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };
    fetchCounts();
  }, []);

  return (
    <div className="flex">
      {/* Sidebar */}
      <SidebarMenu/>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Dashboard Heading */}
        <h1 className="text-4xl font-bold text-center mb-10">Admin Dashboard Overview</h1>

        {/* Counts Section - Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Staff Count */}
          <div className="bg-blue-200 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Staff</h2>
            <p className="text-4xl font-bold">{counts.staff}</p>
          </div>

          {/* Workers Count */}
          <div className="bg-green-200 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Workers</h2>
            <p className="text-4xl font-bold">{counts.workers}</p>
          </div>

          {/* Books Count */}
          <div className="bg-yellow-200 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Books</h2>
            <p className="text-4xl font-bold">{counts.books}</p>
          </div>

          {/* Students Count */}
          <div className="bg-red-200 p-6 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4">Students</h2>
            <p className="text-4xl font-bold">{counts.students}</p>
          </div>
        </div>

        {/* School Achievements Section */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-center mb-6">School Achievements</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Achievements */}
            {[
              {
                title: 'First Place in Science Olympiad',
                description: 'Our students secured the first position in the national Science Olympiad.',
                imageUrl: 'https://i.pinimg.com/564x/e7/f0/90/e7f0903336eda9ea6747fe34764a9c93.jpg',
                date: '2024-03-15',
              },
              {
                title: 'Best School Award',
                description: 'Awarded the best school in the region for academic and extracurricular achievements.',
                imageUrl: 'https://i.pinimg.com/736x/cd/10/ce/cd10cebfd3f357810ee5a1280f56b2d7.jpg',
                date: '2023-12-10',
              },
              {
                title: 'School Anniversary',
                description: 'Received a special gift for our school anniversary.',
                imageUrl: 'https://i.pinimg.com/474x/9e/89/65/9e8965cea14e73d6245759b218b0bd3c.jpg',
                date: '2020-11-20',
              },
            ].map((achievement, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                <img src={achievement.imageUrl} alt={achievement.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                <p className="text-gray-600 mb-4">{achievement.description}</p>
                <p className="text-gray-400 text-sm">Date: {achievement.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
