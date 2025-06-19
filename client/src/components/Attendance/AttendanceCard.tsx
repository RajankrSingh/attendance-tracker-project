import React from 'react';

interface AttendanceCardProps {
  name: string;
  date: string;
  status: string;
  clockIn?: string;
  clockOut?: string;
}

const AttendanceCard: React.FC<AttendanceCardProps> = ({
  name,
  date,
  status,
  clockIn,
  clockOut,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="font-bold text-lg">{name}</div>
      <div className="text-gray-500 text-sm mb-2">{date}</div>
      <div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            status === 'present'
              ? 'bg-green-100 text-green-800'
              : status === 'late'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      </div>
      <div className="mt-2 text-sm">
        <span className="font-medium">Clock In:</span> {clockIn || '-'}
      </div>
      <div className="text-sm">
        <span className="font-medium">Clock Out:</span> {clockOut || '-'}
      </div>
    </div>
  );
};

export default AttendanceCard;