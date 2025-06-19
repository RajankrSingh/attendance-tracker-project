import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import ClockInOut from '../Attendance/ClockInOutButton';
import { LogOut } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [attendance, setAttendance] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // Get current user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const today = new Date().toISOString().split('T')[0];

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setLocation('/');
  };

  // Fetch today's attendance for the current user
  const fetchAttendance = async () => {
    try {
      const response = await fetch(`/api/attendance?userId=${currentUser.id}`);
      const records = await response.json();
      const todayRecord = records.find((r: any) => r.date === today);
      setAttendance(todayRecord);
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser.id) {
      fetchAttendance();
    }
  }, [currentUser.id, today]);

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
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Welcome, {currentUser.name}!</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
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