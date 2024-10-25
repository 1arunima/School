import React, { useEffect, useState } from 'react';
import { FaBook } from 'react-icons/fa';
import axios from 'axios';
import Globalapi from '../../Globalapi';
import SidebarMenu from './Sidebar';

const FetchBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch books from backend
  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${Globalapi.baseUrl}/book/get`);
        if (response.data.length > 0) {
          setBook(response.data[0]); // Display only the first book
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!book) {
    return <p className="text-center">No books available</p>;
  }

  return (
    <div className='flex'>
        <SidebarMenu/>

    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Book Details</h1>
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
        <div className="flex flex-col items-center">
          <FaBook className="text-4xl text-blue-500 mb-2" />
          <h2 className="text-lg font-semibold mb-1">{book.bookname}</h2>
          <p className="text-gray-600">Author: {book.author}</p>
          <p className="text-gray-600">Edition: {book.edition}</p>
          <p className="text-gray-600">Quantity: {book.quantity}</p>
          <p className="text-gray-600">Date: {book.date}</p>
          <p className="text-gray-600">Remarks: {book.remarks}</p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default FetchBook;
