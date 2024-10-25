import React from 'react'
import  Login  from './Components/Pages/Login'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './Components/Admin/AdminDaashboard'
import StaffDetails from './Components/Admin/StaffDetails'
import SideBar from './Components/Admin/Sidebar'
// import Staffsidebar from './Components/Staff/sidebar'
import Staffsidebar from './Components/Staff/Sidebar'
import StudentDetails from './Components/Staff/StudentDetails'
import ManageUsers from './Components/Admin/StaffDetails'

import DashboardLibrary from './Components/Library/LibrarianDashboard'
import BookDetails from './Components/Library/Librabrydetail'
import LibrarySidebar from './Components/Library/LibrarySidebar'
import AdminStudentDetails from './Components/Admin/AdminStudentdetails'
import StdDetail from './Components/Library/StdDetail'
import StaffDashboard from './Components/Staff/staffDashboard'
import FetchBook from './Components/Admin/FetchBook'
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='' element={<Login />} />
        <Route path='/dashboard' element={<AdminDashboard/>} />
        <Route path='/staffDetails' element={<ManageUsers />} />
        <Route path='/sidebar' element={<SideBar />} />
        <Route path='/staffsidebar' element={<Staffsidebar/>} />
        <Route path='/staffdashboard' element={<StaffDashboard />} />
        <Route path='/studentdetails' element={<StudentDetails />} />
        {/* <Route path='/staffdashboard' element={<StaffDashboard />} /> */}
        <Route path='/adminstudetails' element={<AdminStudentDetails />} />
        <Route path='/fetchbook' element={<FetchBook/>} />
        




          {/* Library */}
          <Route path='/librarydashboard' element={<DashboardLibrary />} />
          <Route path='/librarydetail' element={< BookDetails/>} />
          <Route path='/librarysidebar' element={< LibrarySidebar/>} />
          <Route path='/stddetail' element={< StdDetail/>} />

      </Routes>
    </div>
  )
}

export default App  