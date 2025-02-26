import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { Search, Filter, Plus } from 'lucide-react-native';

export default function Bills() {
  const [searchQuery, setSearchQuery] = useState('');

  const bills = [
    { id: 1, name: 'Electricity Bill', amount: 89.00, dueDate: '2024-02-15', category: 'Utilities', status: 'pending' },
    { id: 2, name: 'Internet Service', amount: 79.99, dueDate: '2024-02-18', category: 'Internet', status: 'paid' },
    { id: 3, name: 'Water Bill', amount: 45.50, dueDate: '2024-02-20', category: 'Utilities', status: 'pending' },
    { id: 4, name: 'Rent', amount: 1200.00, dueDate: '2024-03-01', category: 'Housing', status: 'pending' },
    { id: 5, name: 'Phone Bill', amount: 65.00, dueDate: '2024-02-25', category: 'Phone', status: 'paid' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bills</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bills..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.billsList}>
        {bills.map((bill) => (
          <TouchableOpacity key={bill.id} style={styles.billItem}>
            <View style={styles.billHeader}>
              <Text style={styles.billName}>{bill.name}</Text>
              <Text style={[styles.billStatus, bill.status === 'paid' ? styles.paidStatus : styles.pendingStatus]}>
                {bill.status.toUpperCase()}
              </Text>
            </View>
            <View style={styles.billDetails}>
              <View>
                <Text style={styles.detailLabel}>Amount</Text>
                <Text style={styles.amount}>${bill.amount.toFixed(2)}</Text>
              </View>
              <View>
                <Text style={styles.detailLabel}>Due Date</Text>
                <Text style={styles.dueDate}>{new Date(bill.dueDate).toLocaleDateString()}</Text>
              </View>
              <View>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.category}>{bill.category}</Text>
              </View>
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
  addButton: {
    backgroundColor: '#007AFF',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  billsList: {
    paddingHorizontal: 20,
  },
  billItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  billName: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
  },
  billStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  paidStatus: {
    backgroundColor: '#34C759',
    color: '#fff',
  },
  pendingStatus: {
    backgroundColor: '#FF9500',
    color: '#fff',
  },
  billDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'Inter-Regular',
  },
  amount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#007AFF',
  },
  dueDate: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  category: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});