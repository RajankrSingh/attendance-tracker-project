import React, { useState, useEffect } from 'react';

const ClockInOut: React.FC = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const today = new Date().toISOString().split('T')[0];

  const [clockInTime, setClockInTime] = useState<string>('');
  const [clockOutTime, setClockOutTime] = useState<string>('');
  const [attendanceRecord, setAttendanceRecord] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch current attendance record
  const fetchTodayAttendance = async () => {
    try {
      const response = await fetch(`/api/attendance?userId=${currentUser.id}`);
      const records = await response.json();
      const todayRecord = records.find((r: any) => r.date === today);
      
      if (todayRecord) {
        setAttendanceRecord(todayRecord);
        setClockInTime(todayRecord.clockIn || '');
        setClockOutTime(todayRecord.clockOut || '');
      }
    } catch (error) {
      console.error('Failed to fetch attendance:', error);
    }
  };

  useEffect(() => {
    if (currentUser.id) {
      fetchTodayAttendance();
    }
  }, [currentUser.id, today]);

  const handleClockIn = async () => {
    setLoading(true);
    const now = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    try {
      const response = await fetch('/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: parseInt(currentUser.id),
          date: today,
          clockIn: now,
          status: 'present'
        }),
      });

      if (response.ok) {
        const newRecord = await response.json();
        setAttendanceRecord(newRecord);
        setClockInTime(now);
      }
    } catch (error) {
      console.error('Failed to clock in:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClockOut = async () => {
    setLoading(true);
    const now = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    try {
      if (attendanceRecord) {
        const response = await fetch(`/api/attendance/${attendanceRecord.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clockOut: now
          }),
        });

        if (response.ok) {
          const updatedRecord = await response.json();
          setAttendanceRecord(updatedRecord);
          setClockOutTime(now);
        }
      }
    } catch (error) {
      console.error('Failed to clock out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-bold mb-4">Clock In / Clock Out</h2>
      <div className="mb-4">
        <button
          onClick={handleClockIn}
          className={`px-4 py-2 rounded mr-2 text-white ${
            clockInTime || loading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
          disabled={!!clockInTime || loading}
        >
          {loading ? 'Processing...' : 'Clock In'}
        </button>
        <button
          onClick={handleClockOut}
          className={`px-4 py-2 rounded text-white ${
            !clockInTime || clockOutTime || loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
          disabled={!clockInTime || !!clockOutTime || loading}
        >
          {loading ? 'Processing...' : 'Clock Out'}
        </button>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="font-medium">Clock In Time:</span> 
          <span className={clockInTime ? 'text-green-600 font-semibold' : 'text-gray-500'}>
            {clockInTime || 'Not clocked in'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Clock Out Time:</span> 
          <span className={clockOutTime ? 'text-blue-600 font-semibold' : 'text-gray-500'}>
            {clockOutTime || 'Not clocked out'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Status:</span> 
          <span className={`font-semibold ${
            clockOutTime ? 'text-gray-600' : clockInTime ? 'text-green-600' : 'text-red-600'
          }`}>
            {clockOutTime ? 'Day Completed' : clockInTime ? 'Working' : 'Not Started'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ClockInOut;