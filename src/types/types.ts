export type User = {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  department: string;
  position: string;
  avatar?: string;
};

export type AttendanceRecord = {
  id: string;
  userId: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  status: 'present' | 'absent' | 'late' | 'half-day';
};

export type LeaveRequest = {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  type: 'sick' | 'vacation' | 'personal';
  status: 'pending' | 'approved' | 'rejected';
  reason: string;
};

export type LeaveBalance = {
  userId: string;
  sick: number;
  vacation: number;
  personal: number;
};