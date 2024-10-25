import React, { useEffect, useState } from "react";
import Globalapi from "../../Globalapi";
import SidebarMenu from "./Sidebar";
import Staffsidebar from "./Sidebar";

const StudentDetails = () => {
  const [formData, setFormData] = useState({
    name: "",
    std: "",
    gender: "",
    bookname: "",
    section: "",
    purchasedate: "",
    returndate: "",
    fees: "",
    date: "",
    remarks: "",
    isActive: false,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch students
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${Globalapi.baseUrl}/student/get`);
      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }
      const data = await response.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Add or update student
  // const handleAddStudent = async () => {
  //   console.log("Calling handleAddStudent");
  //   try {
  //     const method = isEditing ? "PUT" : "POST";
  //     const endpoint = isEditing
  //       ? `${Globalapi.baseUrl}/staff/edit/${editingStudentId}`
  //       : `${Globalapi.baseUrl}/staff/create`;
  //     console.log("endpoint",endpoint)
  //     const response = await fetch(endpoint, {
  //       method,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     console.log("response",response)
  //     if (!response.ok) {
  //       throw new Error("Error saving student");
  //     }

  //     await fetchStudents();
  //     resetForm();
  //     closeForm();
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };
  const handleAddStudent = async () => {
    console.log("Starting handleAddStudent");
    try {
      console.log("isEditing:", isEditing);
      const method = isEditing ? "PUT" : "POST";
      const endpoint = isEditing
        ? `${Globalapi.baseUrl}/student/edit/${editingStudentId}`
        : `${Globalapi.baseUrl}/student/create`;
      console.log("API Endpoint:", endpoint);
      console.log("Form data being sent:", formData);
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Response from server:", response);
      if (!response.ok) {
        throw new Error("Error saving student");
      }
      await fetchStudents();
      resetForm();
      closeForm();
    } catch (error) {
      console.error("Error occurred:", error.message);
      setError(error.message);
    }
  };
  
  // Edit student
  const handleEditStudent = (student) => {
    setFormData({ ...student });
    setEditingStudentId(student._id);
    setIsEditing(true);
    openForm();
  };

  // Delete student
  const handleDeleteStudent = async (id) => {
    try {
      const response = await fetch(`${Globalapi.baseUrl}/student/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error deleting student");
      }
      await fetchStudents();
    } catch (error) {
      setError(error.message);
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      std: "",
      gender: "",
      bookname: "",
      section: "",
      purchasedate: "",
      returndate: "",
      fees: "",
      date: "",
      remarks: "",
      isActive: false,
    });
    setIsEditing(false);
    setEditingStudentId(null);
  };

  // Open and close form
  const openForm = () => setIsFormOpen(true);
  const closeForm = () => setIsFormOpen(false);

  return (
    <div className="flex">
      <Staffsidebar/>
    <div className="container mx-auto p-6 bg-white min-h-screen text-gray-100">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">Student Upload Page</h1>
      <button onClick={openForm} className="bg-yellow-400 text-black p-3 rounded hover:bg-yellow-300">
        {isEditing ? "Edit Student" : "Add Student"}
      </button>

      {/* Error message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Pop-up Form */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-gray-800 text-gray-100 shadow-lg transform ${isFormOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out overflow-y-auto`}>
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-yellow-300">{isEditing ? "Edit Student" : "Add Student"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(formData).map((key) => key === "isActive" ? null : (
              <div key={key}>
                <label className="block font-semibold mb-1 text-yellow-300">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                {key === "gender" ? (
                  <select
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    className="border border-yellow-400 p-2 rounded w-full bg-gray-700 text-gray-100"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                ) : (
                  <input
                    type={key === "fees" ? "number" : ["purchasedate", "returndate", "date"].includes(key) ? "date" : "text"}
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                    className="border border-yellow-400 p-2 rounded w-full bg-gray-700 text-gray-100"
                  />
                )}
              </div>
            ))}
            <div className="flex items-center mt-4">
              <label className="font-semibold mr-2 text-yellow-300">Active</label>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="h-6 w-6 text-yellow-400 rounded focus:ring-yellow-300"
              />
            </div>
          </div>
          {/* <button onClick={handleAddStudent} className="bg-yellow-400 text-black mt-4 p-2 rounded hover:bg-yellow-300 w-full">
            {isEditing ? "Update Student" : "Add Student"}
          </button> */}
<button
  type="button"
  onClick={() => {
    console.log("Button clicked"); // Check if this gets logged
    handleAddStudent();
  }}
  className="bg-yellow-400 text-black mt-4 p-2 rounded hover:bg-yellow-300 w-full"
>
  {isEditing ? "Update Student" : "Add Student"}
</button>


          <button onClick={closeForm} className="bg-red-500 text-white mt-2 p-2 rounded hover:bg-red-600 w-full">Close</button>
        </div>
      </div>

      {/* Student Cards Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4 text-yellow-300">Existing Students</h2>
        {loading ? <p>Loading...</p> : (
          students.length === 0 ? <p>No students available.</p> : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {students.map((student) => (
                <div key={student._id} className="bg-gray-700 text-gray-100 p-4 rounded-lg shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">{student.name}</h3>
                  <p><strong>Class (STD):</strong> {student.std}</p>
                  <p><strong>Gender:</strong> {student.gender}</p>
                  <p><strong>Book Name:</strong> {student.bookname}</p>
                  <p><strong>Section:</strong> {student.section}</p>
                  <p><strong>Purchase Date:</strong> {student.purchasedate}</p>
                  <p><strong>Return Date:</strong> {student.returndate}</p>
                  <p><strong>Fees:</strong> ₹{student.fees}</p>
                  <p><strong>Remarks:</strong> {student.remarks}</p>
                  <p><strong>Active:</strong> {student.isActive ? "Yes" : "No"}</p>
                  <div className="flex justify-between mt-4">
                    <button onClick={() => handleEditStudent(student)} className="bg-yellow-400 text-black py-1 px-3 rounded hover:bg-yellow-300">Edit</button>
                    <button onClick={() => handleDeleteStudent(student._id)} className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
    </div>
  );
};

export default StudentDetails;
