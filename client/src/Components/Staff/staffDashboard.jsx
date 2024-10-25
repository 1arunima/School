import React from 'react';
import Staffsidebar from './Sidebar';

const StaffDashboard = () => {
  // Dummy data for November exam calendar
  const novemberExams = [
    { date: '1st November', subject: 'Mathematics', image: 'https://via.placeholder.com/150/0000FF/808080?text=Math' },
    { date: '3rd November', subject: 'Physics', image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Physics' },
    { date: '5th November', subject: 'Chemistry', image: 'https://via.placeholder.com/150/FFFF00/000000?text=Chemistry' },
    { date: '8th November', subject: 'Biology', image: 'https://via.placeholder.com/150/008000/FFFFFF?text=Biology' },
    { date: '10th November', subject: 'Computer Science', image: 'https://via.placeholder.com/150/800080/FFFFFF?text=CS' },
    { date: '12th November', subject: 'English', image: 'https://via.placeholder.com/150/FFA500/FFFFFF?text=English' },
    { date: '15th November', subject: 'History', image: 'https://via.placeholder.com/150/000000/FFFFFF?text=History' },
  ];

  // Dummy data for events conducted
  const eventsConducted = [
    { date: '2nd November', event: 'Science Quiz', image: 'https://via.placeholder.com/150/FF69B4/FFFFFF?text=Quiz' },
    { date: '4th November', event: 'Sports Day', image: 'https://via.placeholder.com/150/87CEEB/FFFFFF?text=Sports' },
    { date: '9th November', event: 'Art Exhibition', image: 'https://via.placeholder.com/150/DC143C/FFFFFF?text=Art' },
    { date: '11th November', event: 'Coding Contest', image: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=Coding' },
    { date: '14th November', event: 'Debate Competition', image: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=Debate' },
  ];

  return (
    <div className="flex">
      <Staffsidebar />

      <div className="container mx-auto p-4 flex-1">
        <h1 className="text-3xl font-bold text-center mb-6">Staff Dashboard</h1>

        {/* November Exam Calendar Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">November Exam Calendar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {novemberExams.map((exam, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={exam.image} alt={exam.subject} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{exam.subject}</h3>
                  <p className="text-gray-600">Date: {exam.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events Conducted Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Events Conducted</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsConducted.map((event, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src={event.image} alt={event.event} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{event.event}</h3>
                  <p className="text-gray-600">Date: {event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
