import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User, Bill, Category, ThemeType } from '../types';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  
  // Bills
  bills: Bill[];
  addBill: (bill: Omit<Bill, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBill: (id: string, bill: Partial<Bill>) => void;
  deleteBill: (id: string) => void;
  
  // Categories
  categories: Category[];
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  
  // Theme
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: async (email, password) => {
        // TODO: Implement actual authentication
        set({ isAuthenticated: true, user: {
          id: '1',
          email,
          name: 'User',
          preferredCurrency: 'USD',
          language: 'en',
          notificationSettings: {
            billDueReminders: true,
            paymentConfirmations: true,
            monthlySummaries: true,
            budgetAlerts: true,
          },
        }});
      },
      logout: () => set({ isAuthenticated: false, user: null }),
      
      // Bills
      bills: [],
      addBill: (newBill) => {
        const bill: Bill = {
          ...newBill,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({ bills: [...state.bills, bill] }));
      },
      updateBill: (id, updatedBill) => {
        set((state) => ({
          bills: state.bills.map((bill) =>
            bill.id === id
              ? { ...bill, ...updatedBill, updatedAt: new Date().toISOString() }
              : bill
          ),
        }));
      },
      deleteBill: (id) => {
        set((state) => ({
          bills: state.bills.filter((bill) => bill.id !== id),
        }));
      },
      
      // Categories
      categories: [],
      addCategory: (newCategory) => {
        const category: Category = {
          ...newCategory,
          id: Date.now().toString(),
        };
        set((state) => ({ categories: [...state.categories, category] }));
      },
      updateCategory: (id, updatedCategory) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === id ? { ...category, ...updatedCategory } : category
          ),
        }));
      },
      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        }));
      },
      
      // Theme
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'bill-management-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
