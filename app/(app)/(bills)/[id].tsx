import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Calendar, Clock, FileText, Repeat, Trash2, Edit2, CheckCircle } from 'lucide-react-native';
import { useStore } from '../../store';

export default function BillDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  const { bill, category, updateBill, deleteBill } = useStore((state) => {
    const bill = state.bills.find(b => b.id === id);
    const category = bill ? state.categories.find(c => c.id === bill.categoryId) : null;
    return {
      bill,
      category,
      updateBill: state.updateBill,
      deleteBill: state.deleteBill,
    };
  });

  if (!bill) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Bill not found</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Bill',
      'Are you sure you want to delete this bill?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteBill(bill.id);
            router.back();
          },
        },
      ],
    );
  };

  const handleToggleStatus = () => {
    updateBill(bill.id, {
      status: bill.status === 'paid' ? 'unpaid' : 'paid',
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.headerTop}>
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
          
          <Text style={styles.amount}>${bill.amount.toFixed(2)}</Text>
          
          {bill.description && (
            <Text style={styles.description}>{bill.description}</Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.detailItem}>
            <Calendar size={20} color="#666" />
            <Text style={styles.detailText}>Created on {formatDate(bill.date)}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Clock size={20} color="#666" />
            <Text style={styles.detailText}>Due on {formatDate(bill.dueDate)}</Text>
          </View>

          {bill.isRecurring && (
            <View style={styles.detailItem}>
              <Repeat size={20} color="#666" />
              <Text style={styles.detailText}>
                Recurring {bill.recurringFrequency}
              </Text>
            </View>
          )}

          {bill.attachments && bill.attachments.length > 0 && (
            <View style={styles.detailItem}>
              <FileText size={20} color="#666" />
              <Text style={styles.detailText}>
                {bill.attachments.length} attachment{bill.attachments.length !== 1 ? 's' : ''}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.toggleButton]}
            onPress={handleToggleStatus}
          >
            <CheckCircle size={20} color="#fff" />
            <Text style={styles.actionButtonText}>
              Mark as {bill.status === 'paid' ? 'Unpaid' : 'Paid'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => router.push(`/(app)/(bills)/edit/${bill.id}`)}
          >
            <Edit2 size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Edit Bill</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Trash2 size={20} color="#fff" />
            <Text style={styles.actionButtonText}>Delete Bill</Text>
          </TouchableOpacity>
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusTag: {
    fontSize: 14,
    fontWeight: '500',
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  actions: {
    padding: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  toggleButton: {
    backgroundColor: '#34C759',
  },
  editButton: {
    backgroundColor: '#007AFF',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 32,
  },
});
