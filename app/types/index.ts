export interface User {
  id: string;
  email: string;
  name: string;
  profilePicture?: string;
  preferredCurrency: string;
  language: string;
  notificationSettings: NotificationSettings;
}

export interface Bill {
  id: string;
  amount: number;
  date: string;
  dueDate: string;
  categoryId: string;
  description: string;
  attachments?: string[];
  isRecurring: boolean;
  recurringFrequency?: 'weekly' | 'monthly' | 'yearly';
  status: 'paid' | 'unpaid';
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  budgetLimit?: number;
}

export interface NotificationSettings {
  billDueReminders: boolean;
  paymentConfirmations: boolean;
  monthlySummaries: boolean;
  budgetAlerts: boolean;
}

export interface Report {
  id: string;
  type: 'monthly' | 'category' | 'trend';
  startDate: string;
  endDate: string;
  data: any;
  createdAt: string;
}

export type ThemeType = 'light' | 'dark' | 'system';
