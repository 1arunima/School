import React from 'react';
import LibrarySidebar from './LibrarySidebar';

const DashboardLibrary = () => {
  // Mock data for books and categories
  const recommendedBooks = [
    {
      title: 'The Psychology of Money',
      logo: 'https://i.pinimg.com/564x/fa/8c/80/fa8c80b1695d091d62efef11ef07d9de.jpg',
      author: 'Morgan Housel',
      year: 2020,
    },
    {
      title: 'How Innovation Works',
      logo: 'https://i.pinimg.com/enabled_hi/564x/3f/b7/a5/3fb7a523bc9088eacd9f8d14e7c88455.jpg',
      author: 'Matt Ridley',
      year: 2020,
    },
    {
      title: 'Company of One',
      logo: 'https://i.pinimg.com/736x/62/54/1d/62541d66a0a07deea12423c3202612a3.jpg',
      author: 'Paul Jarvis',
      year: 2019,
    },
    {
      title: 'Shogun',
      logo: 'https://i.pinimg.com/enabled_hi/236x/00/bc/47/00bc47844070eab95c42d24d7a1f242e.jpg',
      author: 'James Clavell',
      year: 1975,
    },
  ];

  const categories = [
    { title: 'All', color: 'bg-gray-300' },
    { title: 'Fiction', color: 'bg-blue-300' },
    { title: 'Fantasy', color: 'bg-yellow-300' },
    { title: 'Biography', color: 'bg-green-300' },
    { title: 'Self-help', color: 'bg-purple-300' },
    { title: 'Education', color: 'bg-red-300' },
  ];

  return (
    <div className='flex'>
      <LibrarySidebar />
    
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Recommended Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recommended</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedBooks.map((book, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 hover:shadow-2xl transition-shadow"
            >
              <img
                src={book.logo}
                alt={book.title}
                className="w-full h-60 object-cover rounded-md"
              />
              <h3 className="mt-4 font-bold text-gray-800">{book.title}</h3>
              <p className="text-sm text-gray-500">by {book.author}</p>
              <p className="text-sm text-gray-400">Published: {book.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`p-4 text-center rounded-lg ${category.color} text-white font-semibold hover:scale-105 transition-transform`}
            >
              {category.title}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default DashboardLibrary;
