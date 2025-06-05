import React from 'react';
import { mockUsers, mockAttendance } from '../../data/mockData';
import ClockInOut from '../Attendance/ClockInOutButton';

const UserDashboard: React.FC = () => {
  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const today = new Date().toISOString().split('T')[0];

  // Find today's attendance for the current user
  const attendance = mockAttendance.find(
    (a) => a.userId === currentUser.id && a.date === today
  );

  if (!currentUser || !currentUser.id) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold">User not found</h2>
        <p>Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {currentUser.name}!</h1>
      <div className="bg-white rounded-lg shadow p-6 max-w-md">
        <div className="flex items-center mb-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="h-16 w-16 rounded-full mr-4"
          />
          <div>
            <div className="text-lg font-semibold">{currentUser.name}</div>
            <div className="text-gray-500">{currentUser.email}</div>
            <div className="text-gray-500">{currentUser.position}</div>
          </div>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Today's Attendance</h2>
          <div>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                attendance?.status === 'present'
                  ? 'bg-green-100 text-green-800'
                  : attendance?.status === 'late'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {attendance?.status || 'absent'}
            </span>
          </div>
          <div className="mt-2">
            <span className="font-medium">Clock In: </span>
            {attendance?.clockIn || '-'}
          </div>
        </div>
      </div>
      <div className="p-6">
      {/* ...existing dashboard content... */}
      <ClockInOut /> {/* Show the clock in/out button here */}
    </div>
    </div>
  );
};

export default UserDashboard;