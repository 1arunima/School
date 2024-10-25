import React, { useState, useEffect } from "react";
import axios from "axios";
import Globalapi from "../../Globalapi";  // Import the Globalapi file
import LibrarySidebar from "./LibrarySidebar";

const BookDetails = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    bookname: "",
    author: "",
    edition: "",
    quantity: "",
    date: "",
    remarks: ""
  });
  const [editId, setEditId] = useState(null);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${Globalapi.baseUrl}/book/get`, {
        withCredentials: true
      });
      setBooks(Array.isArray(response.data) ? response.data : []);  // Ensure books is an array
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);  // Fallback to an empty array in case of error
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add a new book or update an existing one
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`${Globalapi.baseUrl}/book/edit/${editId}`, formData);
      } else {
        await axios.post(`${Globalapi.baseUrl}/book/create`, formData);
      }
      fetchBooks();
      setFormData({
        bookname: "",
        author: "",
        edition: "",
        quantity: "",
        date: "",
        remarks: ""
      });
      setEditId(null);
    } catch (err) {
      console.error("Error saving book:", err);
    }
  };

  // Edit book
  const handleEdit = (book) => {
    setEditId(book._id);
    setFormData(book);
  };

  // Delete book
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${Globalapi.baseUrl}/book/delete/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="flex min-h-screen">
      <LibrarySidebar />
      {/* Main content area */}
      <div className="flex-1 p-8">
        <div className="container mx-auto">

          <h1 className="text-4xl font-bold mb-8 text-center text-indigo-600">Book Details</h1>

          {/* Book Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-lg p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              {editId ? "Edit Book" : "Add New Book"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="bookname"
                placeholder="Book Name"
                value={formData.bookname}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-300"
              />
              <input
                type="text"
                name="author"
                placeholder="Author"
                value={formData.author}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="edition"
                placeholder="Edition"
                value={formData.edition}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-300"
              />
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-300"
              />
              <input
                type="text"
                name="remarks"
                placeholder="Remarks"
                value={formData.remarks}
                onChange={handleChange}
                className="p-3 border border-gray-300 rounded shadow-sm focus:ring focus:ring-indigo-300"
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 transition duration-300"
            >
              {editId ? "Update Book" : "Add Book"}
            </button>
          </form>

          {/* Book List */}
          <div className="grid grid-cols-1 gap-4">
            {books.length > 0 ? (
              books.map((book) => (
                <div
                  key={book._id}
                  className="p-6 bg-white border border-gray-200 rounded-lg shadow-md flex justify-between items-center hover:shadow-lg transition duration-300"
                >
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                      {book.bookname}
                    </h3>
                    <p className="text-gray-600">Author: {book.author}</p>
                    <p className="text-gray-600">Edition: {book.edition}</p>
                    <p className="text-gray-600">Quantity: {book.quantity}</p>
                    <p className="text-gray-600">Date: {book.date}</p>
                    <p className="text-gray-600">Remarks: {book.remarks}</p>
                  </div>
                  <div className="flex space-x-4">
                    <button
                      className="bg-yellow-400 text-white px-4 py-2 rounded shadow hover:bg-yellow-500 transition duration-300"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition duration-300"
                      onClick={() => handleDelete(book._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No books available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
