import { users, attendanceRecords, leaveRequests, leaveBalances, type User, type InsertUser, type AttendanceRecord, type InsertAttendanceRecord, type LeaveRequest, type InsertLeaveRequest, type LeaveBalance, type InsertLeaveBalance } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Attendance methods
  getAttendanceRecord(userId: number, date: string): Promise<AttendanceRecord | undefined>;
  createAttendanceRecord(record: InsertAttendanceRecord): Promise<AttendanceRecord>;
  updateAttendanceRecord(id: number, updates: Partial<AttendanceRecord>): Promise<AttendanceRecord>;
  getAttendanceRecords(userId?: number): Promise<AttendanceRecord[]>;
  
  // Leave methods
  createLeaveRequest(request: InsertLeaveRequest): Promise<LeaveRequest>;
  getLeaveRequests(userId?: number): Promise<LeaveRequest[]>;
  updateLeaveRequest(id: number, status: string): Promise<LeaveRequest>;
  
  // Leave balance methods
  getLeaveBalance(userId: number): Promise<LeaveBalance | undefined>;
  createLeaveBalance(balance: InsertLeaveBalance): Promise<LeaveBalance>;
  updateLeaveBalance(userId: number, updates: Partial<LeaveBalance>): Promise<LeaveBalance>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  // Attendance methods
  async getAttendanceRecord(userId: number, date: string): Promise<AttendanceRecord | undefined> {
    const [record] = await db
      .select()
      .from(attendanceRecords)
      .where(and(eq(attendanceRecords.userId, userId), eq(attendanceRecords.date, date)));
    return record || undefined;
  }

  async createAttendanceRecord(record: InsertAttendanceRecord): Promise<AttendanceRecord> {
    const [attendanceRecord] = await db
      .insert(attendanceRecords)
      .values(record)
      .returning();
    return attendanceRecord;
  }

  async updateAttendanceRecord(id: number, updates: Partial<AttendanceRecord>): Promise<AttendanceRecord> {
    const [record] = await db
      .update(attendanceRecords)
      .set(updates)
      .where(eq(attendanceRecords.id, id))
      .returning();
    return record;
  }

  async getAttendanceRecords(userId?: number): Promise<AttendanceRecord[]> {
    if (userId) {
      return db.select().from(attendanceRecords).where(eq(attendanceRecords.userId, userId));
    }
    return db.select().from(attendanceRecords);
  }

  // Leave methods
  async createLeaveRequest(request: InsertLeaveRequest): Promise<LeaveRequest> {
    const [leaveRequest] = await db
      .insert(leaveRequests)
      .values(request)
      .returning();
    return leaveRequest;
  }

  async getLeaveRequests(userId?: number): Promise<LeaveRequest[]> {
    if (userId) {
      return db.select().from(leaveRequests).where(eq(leaveRequests.userId, userId));
    }
    return db.select().from(leaveRequests);
  }

  async updateLeaveRequest(id: number, status: string): Promise<LeaveRequest> {
    const [request] = await db
      .update(leaveRequests)
      .set({ status })
      .where(eq(leaveRequests.id, id))
      .returning();
    return request;
  }

  // Leave balance methods
  async getLeaveBalance(userId: number): Promise<LeaveBalance | undefined> {
    const [balance] = await db.select().from(leaveBalances).where(eq(leaveBalances.userId, userId));
    return balance || undefined;
  }

  async createLeaveBalance(balance: InsertLeaveBalance): Promise<LeaveBalance> {
    const [leaveBalance] = await db
      .insert(leaveBalances)
      .values(balance)
      .returning();
    return leaveBalance;
  }

  async updateLeaveBalance(userId: number, updates: Partial<LeaveBalance>): Promise<LeaveBalance> {
    const [balance] = await db
      .update(leaveBalances)
      .set(updates)
      .where(eq(leaveBalances.userId, userId))
      .returning();
    return balance;
  }
}

export const storage = new DatabaseStorage();
