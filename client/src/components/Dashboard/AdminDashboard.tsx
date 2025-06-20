import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { User } from '../../types/types';
import { Users, UserCheck, UserX, Clock, LogOut, RefreshCw } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [location, setLocation] = useLocation();
  const [users, setUsers] = useState<User[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setLocation('/');
  };

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    try {
      const [usersResponse, attendanceResponse] = await Promise.all([
        fetch('/api/users'),
        fetch('/api/attendance')
      ]);
      
      const usersData = await usersResponse.json();
      const attendanceData = await attendanceResponse.json();
      
      setUsers(usersData);
      setAttendanceRecords(attendanceData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    fetchData(true);
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 30 seconds to show live updates
    const interval = setInterval(fetchData, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  const totalUsers = users.length;
  const presentToday = attendanceRecords.filter(
    (record: any) => record.date === today && record.status === 'present'
  ).length;
  const lateToday = attendanceRecords.filter(
    (record: any) => record.date === today && record.status === 'late'
  ).length;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              refreshing 
                ? 'bg-gray-400 cursor-not-allowed text-white' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Employees</p>
              <h2 className="text-3xl font-bold">{totalUsers}</h2>
            </div>
            <Users className="h-8 w-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Present Today</p>
              <h2 className="text-3xl font-bold">{presentToday}</h2>
            </div>
            <UserCheck className="h-8 w-8 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Late Today</p>
              <h2 className="text-3xl font-bold">{lateToday}</h2>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Absent Today</p>
              <h2 className="text-3xl font-bold">{totalUsers - presentToday - lateToday}</h2>
            </div>
            <UserX className="h-8 w-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Employee Status</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => {
                  const attendance = attendanceRecords.find(
                    (a: any) => a.userId === user.id && a.date === today
                  );
                  
                  // Determine status based on clock in/out times
                  let displayStatus = 'absent';
                  let statusColor = 'bg-red-100 text-red-800';
                  
                  if (attendance) {
                    if (attendance.clockOut) {
                      displayStatus = 'completed';
                      statusColor = 'bg-gray-100 text-gray-800';
                    } else if (attendance.clockIn) {
                      displayStatus = 'working';
                      statusColor = 'bg-green-100 text-green-800';
                      
                      // Check if late (after 9:00 AM)
                      const clockInTime = attendance.clockIn;
                      if (clockInTime && clockInTime > '09:00') {
                        displayStatus = 'late';
                        statusColor = 'bg-yellow-100 text-yellow-800';
                      }
                    }
                  }
                  
                  return (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-full" src={user.avatar || ''} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.position}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>
                          {displayStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={attendance?.clockIn ? 'text-green-600 font-medium' : 'text-gray-500'}>
                          {attendance?.clockIn || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={attendance?.clockOut ? 'text-blue-600 font-medium' : 'text-gray-500'}>
                          {attendance?.clockOut || '-'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;