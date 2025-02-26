import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Bell, Receipt, CreditCard, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle2 } from 'lucide-react-native';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'due',
      title: 'Electricity Bill Due Soon',
      message: 'Your electricity bill of $89.00 is due in 3 days',
      time: '2 hours ago',
      icon: Receipt,
      color: '#FF9500',
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Successful',
      message: 'Internet bill payment of $79.99 was successful',
      time: '5 hours ago',
      icon: CheckCircle2,
      color: '#34C759',
    },
    {
      id: 3,
      type: 'alert',
      title: 'Unusual Spending',
      message: 'Your utility bills are 20% higher than last month',
      time: '1 day ago',
      icon: AlertTriangle,
      color: '#FF3B30',
    },
    {
      id: 4,
      type: 'payment',
      title: 'Card Expiring Soon',
      message: 'Your payment card ending in 4242 expires next month',
      time: '2 days ago',
      icon: CreditCard,
      color: '#007AFF',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Text style={styles.settingsText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.notificationsList}>
        {notifications.map((notification) => (
          <TouchableOpacity key={notification.id} style={styles.notificationItem}>
            <View style={[styles.iconContainer, { backgroundColor: `${notification.color}15` }]}>
              <notification.icon size={24} color={notification.color} />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
  },
  settingsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  settingsText: {
    fontSize: 14,
    color: '#007AFF',
    fontFamily: 'Inter-Medium',
  },
  notificationsList: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
    marginBottom: 8,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'Inter-Regular',
  },
});