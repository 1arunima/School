import React, { useEffect, useState } from 'react';
import GlobalApi from '../../Globalapi';
import SidebarMenu from './Sidebar';

const AdminStudentDetails = () => {
  const [students, setStudents] = useState([]); // State to hold fetched student data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const [error, setError] = useState(null); // State to handle error

  // Fetch student data on component mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${GlobalApi.baseUrl}/student/get`); // API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudents(data); // Update the state with fetched data
      } catch (error) {
        setError(error.message); // Set error message
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchStudents(); // Call the fetch function
  }, []); // Empty dependency array to run only on mount

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message
  }

  return (
    <div className='flex'>
        <SidebarMenu/>
    
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Student Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">Name</th>
              <th className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">Std</th>
              <th className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">Gender</th>
              <th className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">Book Name</th>
              <th className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">Section</th>
              <th className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">Purchase Date</th>
              <th className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">Return Date</th>
              <th className="px-5 py-3 text-sm font-semibold text-right uppercase tracking-wider">Fees</th>
              <th className="px-5 py-3 text-sm font-semibold text-left uppercase tracking-wider">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="bg-white border-b hover:bg-gray-100">
                <td className="px-5 py-5 text-sm text-gray-900">{student.name}</td>
                <td className="px-5 py-5 text-sm text-gray-900">{student.std}</td>
                <td className="px-5 py-5 text-sm text-gray-900">{student.gender}</td>
                <td className="px-5 py-5 text-sm text-gray-900">{student.bookname}</td>
                <td className="px-5 py-5 text-sm text-gray-900">{student.section}</td>
                <td className="px-5 py-5 text-sm text-gray-900">{student.purchasedate}</td>
                <td className="px-5 py-5 text-sm text-gray-900">{student.returndate}</td>
                <td className="px-5 py-5 text-sm text-right">{student.fees}</td>
                <td className="px-5 py-5 text-sm text-gray-900">{student.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AdminStudentDetails;