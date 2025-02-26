import { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Search, Plus, Filter } from 'lucide-react-native';
import { useStore } from '../../store';

type FilterStatus = 'all' | 'paid' | 'unpaid';

export default function BillsList() {
  const router = useRouter();
  const { bills, categories } = useStore((state) => ({
    bills: state.bills,
    categories: state.categories,
  }));

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const filteredBills = useMemo(() => {
    return bills
      .filter((bill) => {
        const matchesSearch = bill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          categories.find(c => c.id === bill.categoryId)?.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = !selectedCategory || bill.categoryId === selectedCategory;
        
        const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
        
        return matchesSearch && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        } else {
          return b.amount - a.amount;
        }
      });
  }, [bills, searchQuery, selectedCategory, statusFilter, sortBy]);

  const renderBillItem = ({ item: bill }) => {
    const category = categories.find(c => c.id === bill.categoryId);
    const dueDate = new Date(bill.dueDate);
    const daysUntilDue = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

    return (
      <TouchableOpacity
        style={styles.billItem}
        onPress={() => router.push(`/(app)/(bills)/${bill.id}`)}
      >
        <View style={styles.billHeader}>
          <View style={[styles.categoryTag, { backgroundColor: category?.color + '20' }]}>
            <Text style={[styles.categoryText, { color: category?.color }]}>
              {category?.name || 'Uncategorized'}
            </Text>
          </View>
          <Text style={[
            styles.statusTag,
            { color: bill.status === 'paid' ? '#34C759' : '#FF3B30' }
          ]}>
            {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
          </Text>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {bill.description || 'No description'}
        </Text>

        <View style={styles.billFooter}>
          <Text style={styles.amount}>${bill.amount.toFixed(2)}</Text>
          <Text style={[
            styles.dueDate,
            daysUntilDue < 0 && styles.overdue,
            daysUntilDue === 0 && styles.dueToday
          ]}>
            {daysUntilDue > 0 
              ? `Due in ${daysUntilDue} days`
              : daysUntilDue === 0
              ? 'Due today'
              : 'Overdue'}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bills..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push('/(app)/(bills)/new')}
        >
          <Plus size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.filters}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['all', 'paid', 'unpaid'].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterButton,
                statusFilter === status && styles.filterButtonActive
              ]}
              onPress={() => setStatusFilter(status as FilterStatus)}
            >
              <Text style={[
                styles.filterButtonText,
                statusFilter === status && styles.filterButtonTextActive
              ]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setSortBy(sortBy === 'date' ? 'amount' : 'date')}
        >
          <Filter size={20} color="#666" />
          <Text style={styles.sortButtonText}>
            Sort by {sortBy === 'date' ? 'Amount' : 'Date'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBills}
        renderItem={renderBillItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No bills found</Text>
          </View>
        )}
      />
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
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  addButton: {
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  sortButtonText: {
    marginLeft: 4,
    color: '#666',
  },
  list: {
    padding: 16,
  },
  billItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f5f5f5',
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusTag: {
    fontSize: 12,
    fontWeight: '500',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  billFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  dueDate: {
    fontSize: 14,
    color: '#666',
  },
  overdue: {
    color: '#FF3B30',
  },
  dueToday: {
    color: '#FF9500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
  },
});
