import { User, AttendanceRecord, LeaveRequest, LeaveBalance } from '../types/types';
import { addDays, format, subDays } from 'date-fns';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@company.com',
    name: 'John Admin',
    role: 'admin',
    department: 'Management',
    position: 'Admin Manager',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  },
  {
    id: '2',
    email: 'sarah@company.com',
    name: 'Sarah Wilson',
    role: 'user',
    department: 'Engineering',
    position: 'Senior Developer',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '3',
    email: 'admin1@company.com',
    name: 'John Admin',
    role: 'admin',
    department: 'Management',
    position: 'Admin Manager',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
  },
  {
    id: '4',
    email: 'sarah1@company.com',
    name: 'Sarah Wilson',
    role: 'user',
    department: 'Engineering',
    position: 'Senior Developer',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '5',
    email: 'admin2@company.com',
    name: 'John Admin',
    role: 'admin',
    department: 'Management',
    position: 'Admin Manager',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: '6',
    email: 'sarah2@company.com',
    name: 'Sarah Wilson',
    role: 'user',
    department: 'Engineering',
    position: 'Senior Developer',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: '7',
    email: 'admin3@company.com',
    name: 'John Admin',
    role: 'admin',
    department: 'Management',
    position: 'Admin Manager',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    id: '8',
    email: 'sarah3@company.com',
    name: 'Sarah Wilson',
    role: 'user',
    department: 'Engineering',
    position: 'Senior Developer',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    id: '9',
    email: 'admin4@company.com',
    name: 'John Admin',
    role: 'admin',
    department: 'Management',
    position: 'Admin Manager',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
  {
    id: '10',
    email: 'sarah4@company.com',
    name: 'Sarah Wilson',
    role: 'user',
    department: 'Engineering',
    position: 'Senior Developer',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
  // Add more mock users as needed
];

const today = new Date();

export const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    userId: '2',
    date: format(today, 'yyyy-MM-dd'),
    clockIn: '09:00',
    clockOut: '17:30',
    status: 'present',
  },
  {
    id: '2',
    userId: '2',
    date: format(subDays(today, 1), 'yyyy-MM-dd'),
    clockIn: '09:15',
    clockOut: '17:45',
    status: 'late',
  },
  {
    id: '3',
    userId: '2',
    date: format(today, 'yyyy-MM-dd'),
    clockIn: '09:00',
    clockOut: '17:30',
    status: 'present',
  },
  {
    id: '4',
    userId: '4',
    date: format(subDays(today, 1), 'yyyy-MM-dd'),
    clockIn: '09:15',
    clockOut: '17:45',
    status: 'present',
  },
  // Add more attendance records
];

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: '1',
    userId: '2',
    startDate: format(addDays(today, 5), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 7), 'yyyy-MM-dd'),
    type: 'vacation',
    status: 'pending',
    reason: 'Family vacation',
  },
  {
    id: '2',
    userId: '3',
    startDate: format(addDays(today, 5), 'yyyy-MM-dd'),
    endDate: format(addDays(today, 7), 'yyyy-MM-dd'),
    type: 'vacation',
    status: 'pending',
    reason: 'Family vacation',
  },
  // Add more leave requests
];

export const mockLeaveBalance: LeaveBalance[] = [
  {
    userId: '2',
    sick: 10,
    vacation: 15,
    personal: 5,
  },
  // Add more leave balances
];