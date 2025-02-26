import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react-native';

export default function Reports() {
  const monthlySpending = [
    { month: 'Jan', amount: 2150 },
    { month: 'Feb', amount: 1890 },
    { month: 'Mar', amount: 2459 },
    { month: 'Apr', amount: 2100 },
    { month: 'May', amount: 1950 },
    { month: 'Jun', amount: 2300 },
  ];

  const categories = [
    { name: 'Utilities', amount: 450, percentage: 25, trend: 'up' },
    { name: 'Rent', amount: 1200, percentage: 40, trend: 'down' },
    { name: 'Internet', amount: 80, percentage: 5, trend: 'up' },
    { name: 'Insurance', amount: 200, percentage: 15, trend: 'down' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Reports</Text>
        <View style={styles.periodSelector}>
          <Text style={styles.periodText}>Last 6 months</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <TrendingUp size={24} color="#007AFF" />
            <Text style={styles.overviewTitle}>Spending Overview</Text>
          </View>
          <Text style={styles.totalAmount}>$12,849.00</Text>
          <Text style={styles.overviewSubtitle}>Total spending in the last 6 months</Text>
          
          <View style={styles.chart}>
            {monthlySpending.map((month, index) => (
              <View key={month.month} style={styles.chartColumn}>
                <View style={[styles.chartBar, { height: (month.amount / 3000) * 150 }]} />
                <Text style={styles.chartLabel}>{month.month}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Spending by Category</Text>
        <View style={styles.categoriesList}>
          {categories.map((category) => (
            <View key={category.name} style={styles.categoryItem}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <View style={styles.trendContainer}>
                  {category.trend === 'up' ? (
                    <ArrowUpRight size={16} color="#34C759" />
                  ) : (
                    <ArrowDownRight size={16} color="#FF3B30" />
                  )}
                  <Text style={[styles.trendText, { color: category.trend === 'up' ? '#34C759' : '#FF3B30' }]}>
                    {category.percentage}%
                  </Text>
                </View>
              </View>
              <Text style={styles.categoryAmount}>${category.amount.toFixed(2)}</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${category.percentage}%` }]} />
              </View>
            </View>
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
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
  },
  periodSelector: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  periodText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
  },
  overviewCard: {
    margin: 20,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
  },
  overviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  overviewTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
  },
  totalAmount: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginTop: 12,
  },
  overviewSubtitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
    marginTop: 20,
  },
  chartColumn: {
    alignItems: 'center',
    width: 30,
  },
  chartBar: {
    width: 8,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  chartLabel: {
    marginTop: 8,
    fontSize: 12,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 12,
  },
  categoriesList: {
    padding: 20,
  },
  categoryItem: {
    marginBottom: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  categoryAmount: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    marginTop: 4,
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