# Bill Management App

A comprehensive mobile application for managing bills and expenses, built with React Native and Expo.

## Features

- 📱 User Authentication with biometric support
- 💰 Bill tracking and management
- 📊 Expense analytics and reporting
- 🔍 Search and filter bills
- 📅 Due date reminders
- 📁 Bill categorization
- 💳 Payment status tracking

## Tech Stack

- React Native
- Expo
- TypeScript
- Zustand (State Management)
- Expo Router

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npx expo start
```

3. Run on your device:
- Scan QR code with Expo Go (Android)
- Use Camera app (iOS)
- Press 'w' for web version
- Press 'a' for Android emulator

## Building APK

1. Install EAS CLI:
```bash
npm install -g eas-cli
```

2. Login to Expo:
```bash
npx eas login
```

3. Build APK:
```bash
npx eas build -p android --profile preview
```

## Project Structure

- `/app` - Main application code
  - `/(app)` - App screens and navigation
  - `/(auth)` - Authentication screens
  - `/store` - State management
  - `/types` - TypeScript types
- `/assets` - Images and static assets
