import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertAttendanceRecordSchema, insertLeaveRequestSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email } = req.body;
      const user = await storage.getUserByEmail(email);
      if (user) {
        res.json({ user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Attendance routes
  app.get("/api/attendance", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const records = await storage.getAttendanceRecords(userId);
      res.json(records);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/attendance", async (req, res) => {
    try {
      const validatedData = insertAttendanceRecordSchema.parse(req.body);
      const record = await storage.createAttendanceRecord(validatedData);
      res.json(record);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.patch("/api/attendance/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const record = await storage.updateAttendanceRecord(id, updates);
      res.json(record);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Leave routes
  app.get("/api/leave-requests", async (req, res) => {
    try {
      const userId = req.query.userId ? parseInt(req.query.userId as string) : undefined;
      const requests = await storage.getLeaveRequests(userId);
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/leave-requests", async (req, res) => {
    try {
      const validatedData = insertLeaveRequestSchema.parse(req.body);
      const request = await storage.createLeaveRequest(validatedData);
      res.json(request);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  app.patch("/api/leave-requests/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const request = await storage.updateLeaveRequest(id, status);
      res.json(request);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Leave balance routes
  app.get("/api/leave-balance/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const balance = await storage.getLeaveBalance(userId);
      if (balance) {
        res.json(balance);
      } else {
        res.status(404).json({ message: "Leave balance not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Seed data endpoint for initial setup
  app.post("/api/seed", async (req, res) => {
    try {
      // Check if users already exist
      const existingUsers = await storage.getAllUsers();
      if (existingUsers.length > 0) {
        return res.json({ message: "Database already seeded" });
      }

      // Seed users with Indian employee data
      const usersData = [
        {
          email: 'admin@company.com',
          name: 'Rajesh Sharma',
          role: 'admin',
          department: 'Management',
          position: 'HR Manager',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
          email: 'priya@company.com',
          name: 'Priya Patel',
          role: 'user',
          department: 'Engineering',
          position: 'Senior Software Engineer',
          avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
        },
        {
          email: 'admin1@company.com',
          name: 'Anita Gupta',
          role: 'admin',
          department: 'Finance',
          position: 'Finance Director',
          avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
        {
          email: 'arjun@company.com',
          name: 'Arjun Singh',
          role: 'user',
          department: 'Marketing',
          position: 'Digital Marketing Specialist',
          avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
        },
        {
          email: 'kavita@company.com',
          name: 'Kavita Reddy',
          role: 'user',
          department: 'Sales',
          position: 'Sales Executive',
          avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
        },
        {
          email: 'vikram@company.com',
          name: 'Vikram Joshi',
          role: 'user',
          department: 'Engineering',
          position: 'Frontend Developer',
          avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
        },
        {
          email: 'deepa@company.com',
          name: 'Deepa Nair',
          role: 'user',
          department: 'Design',
          position: 'UI/UX Designer',
          avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
        },
        {
          email: 'rohit@company.com',
          name: 'Rohit Kumar',
          role: 'user',
          department: 'Operations',
          position: 'Operations Manager',
          avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
        },
        {
          email: 'sneha@company.com',
          name: 'Sneha Iyer',
          role: 'user',
          department: 'Quality Assurance',
          position: 'QA Engineer',
          avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
        },
        {
          email: 'amit@company.com',
          name: 'Amit Chopra',
          role: 'user',
          department: 'Engineering',
          position: 'Backend Developer',
          avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
        },
      ];

      // Create users and their leave balances
      for (const userData of usersData) {
        const user = await storage.createUser(userData);
        await storage.createLeaveBalance({
          userId: user.id,
          sick: 10,
          vacation: 15,
          personal: 5,
        });
      }

      res.json({ message: "Database seeded successfully" });
    } catch (error) {
      console.error("Seed error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
