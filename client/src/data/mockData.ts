import { User, AttendanceRecord, LeaveRequest, LeaveBalance } from '../types/types';
import { addDays, format, subDays } from 'date-fns';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@company.com',
    name: 'Rajesh Sharma',
    role: 'admin',
    department: 'Management',
    position: 'HR Manager',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    email: 'priya@company.com',
    name: 'Priya Patel',
    role: 'user',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '3',
    email: 'admin1@company.com',
    name: 'Anita Gupta',
    role: 'admin',
    department: 'Finance',
    position: 'Finance Director',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '4',
    email: 'arjun@company.com',
    name: 'Arjun Singh',
    role: 'user',
    department: 'Marketing',
    position: 'Digital Marketing Specialist',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '5',
    email: 'kavita@company.com',
    name: 'Kavita Reddy',
    role: 'user',
    department: 'Sales',
    position: 'Sales Executive',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
  },
  {
    id: '6',
    email: 'vikram@company.com',
    name: 'Vikram Joshi',
    role: 'user',
    department: 'Engineering',
    position: 'Frontend Developer',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    id: '7',
    email: 'deepa@company.com',
    name: 'Deepa Nair',
    role: 'user',
    department: 'Design',
    position: 'UI/UX Designer',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
  {
    id: '8',
    email: 'rohit@company.com',
    name: 'Rohit Kumar',
    role: 'user',
    department: 'Operations',
    position: 'Operations Manager',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
  },
  {
    id: '9',
    email: 'sneha@company.com',
    name: 'Sneha Iyer',
    role: 'user',
    department: 'Quality Assurance',
    position: 'QA Engineer',
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
  },
  {
    id: '10',
    email: 'amit@company.com',
    name: 'Amit Chopra',
    role: 'user',
    department: 'Engineering',
    position: 'Backend Developer',
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
  },
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