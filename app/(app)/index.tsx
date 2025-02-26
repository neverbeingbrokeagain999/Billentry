import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus, TrendingUp, TrendingDown } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../store';

export default function Home() {
  const router = useRouter();
  const { user, bills, categories } = useStore((state) => ({
    user: state.user,
    bills: state.bills,
    categories: state.categories,
  }));

  const totalAmount = bills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidAmount = bills
    .filter((bill) => bill.status === 'paid')
    .reduce((sum, bill) => sum + bill.amount, 0);
  const pendingAmount = totalAmount - paidAmount;

  const recentBills = [...bills]
    .sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime())
    .slice(0, 3);

  const categoryTotals = categories.map((category) => {
    const total = bills
      .filter((bill) => bill.categoryId === category.id)
      .reduce((sum, bill) => sum + bill.amount, 0);
    return { ...category, total };
  });

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 18) return 'afternoon';
    return 'evening';
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.greeting}>Good {getTimeOfDay()}, {user?.name}</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/(app)/(bills)/new')}
          >
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Bills</Text>
          <Text style={styles.balanceAmount}>${totalAmount.toFixed(2)}</Text>
          <View style={styles.balanceStats}>
            <View style={styles.statItem}>
              <TrendingUp size={20} color="#34C759" />
              <Text style={styles.statLabel}>Paid</Text>
              <Text style={styles.statAmount}>${paidAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <TrendingDown size={20} color="#FF3B30" />
              <Text style={styles.statLabel}>Pending</Text>
              <Text style={styles.statAmount}>${pendingAmount.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Bills</Text>
        <View style={styles.billsList}>
          {recentBills.map((bill) => {
            const category = categories.find((c) => c.id === bill.categoryId);
            const dueDate = new Date(bill.dueDate);
            const daysUntilDue = Math.ceil((dueDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
            
            return (
              <TouchableOpacity 
                key={bill.id} 
                style={styles.billItem}
                onPress={() => router.push(`/(app)/(bills)/${bill.id}`)}
              >
                <View style={styles.billInfo}>
                  <Text style={styles.billName}>{category?.name || 'Uncategorized'}</Text>
                  <Text style={styles.billDate}>
                    {daysUntilDue > 0 
                      ? `Due in ${daysUntilDue} days`
                      : daysUntilDue === 0
                      ? 'Due today'
                      : 'Overdue'}
                  </Text>
                </View>
                <Text style={[
                  styles.billAmount,
                  bill.status === 'paid' && styles.paidAmount
                ]}>
                  ${bill.amount.toFixed(2)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.sectionTitle}>Categories Overview</Text>
        <View style={styles.categoriesList}>
          {categoryTotals.map((category) => (
            <TouchableOpacity 
              key={category.id} 
              style={[styles.categoryItem, { backgroundColor: category.color + '20' }]}
              onPress={() => router.push(`/(app)/categories/${category.id}`)}
            >
              <Text style={[styles.categoryName, { color: category.color }]}>
                {category.name}
              </Text>
              <Text style={styles.categoryAmount}>
                ${category.total.toFixed(2)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
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
  greeting: {
    fontSize: 24,
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
  balanceCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  balanceAmount: {
    fontSize: 32,
    marginTop: 8,
    fontFamily: 'Inter-Bold',
  },
  balanceStats: {
    flexDirection: 'row',
    marginTop: 20,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#ddd',
    marginHorizontal: 20,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontFamily: 'Inter-Regular',
  },
  statAmount: {
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Inter-Medium',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  billsList: {
    paddingHorizontal: 20,
  },
  billItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
  },
  billInfo: {
    flex: 1,
  },
  billName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  billDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  billAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  paidAmount: {
    color: '#34C759',
  },
  categoriesList: {
    padding: 20,
  },
  categoryItem: {
    marginBottom: 16,
  },
  categoryName: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  categoryAmount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    fontFamily: 'Inter-Regular',
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f1f1f1',
    borderRadius: 2,
    marginTop: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 2,
  },
});