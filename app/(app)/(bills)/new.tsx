import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as DocumentPicker from 'expo-document-picker';
import { useStore } from '../../store';

export default function NewBill() {
  const router = useRouter();
  const { categories, addBill } = useStore((state) => ({
    categories: state.categories,
    addBill: state.addBill,
  }));

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');
  const [attachments, setAttachments] = useState<string[]>([]);

  const handleAddAttachment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setAttachments([...attachments, result.uri]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
    }
  };

  const handleSubmit = () => {
    if (!amount || !categoryId) {
      alert('Please fill in all required fields');
      return;
    }

    addBill({
      amount: parseFloat(amount),
      description,
      categoryId,
      date: new Date().toISOString(),
      dueDate: dueDate.toISOString(),
      isRecurring,
      recurringFrequency: isRecurring ? recurringFrequency : undefined,
      attachments,
      status: 'unpaid',
    });

    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>New Bill</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount *</Text>
          <TextInput
            style={styles.input}
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
            keyboardType="decimal-pad"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryList}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  categoryId === category.id && styles.categoryButtonActive,
                  { backgroundColor: category.color + '20' },
                ]}
                onPress={() => setCategoryId(category.id)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    { color: category.color },
                    categoryId === category.id && styles.categoryButtonTextActive,
                  ]}
                >
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Due Date</Text>
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) setDueDate(selectedDate);
            }}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Add description..."
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.inputGroup}>
          <View style={styles.switchContainer}>
            <Text style={styles.label}>Recurring Bill</Text>
            <Switch
              value={isRecurring}
              onValueChange={setIsRecurring}
            />
          </View>

          {isRecurring && (
            <View style={styles.frequencyButtons}>
              {(['weekly', 'monthly', 'yearly'] as const).map((frequency) => (
                <TouchableOpacity
                  key={frequency}
                  style={[
                    styles.frequencyButton,
                    recurringFrequency === frequency && styles.frequencyButtonActive,
                  ]}
                  onPress={() => setRecurringFrequency(frequency)}
                >
                  <Text
                    style={[
                      styles.frequencyButtonText,
                      recurringFrequency === frequency && styles.frequencyButtonTextActive,
                    ]}
                  >
                    {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Attachments</Text>
          <TouchableOpacity style={styles.attachButton} onPress={handleAddAttachment}>
            <Text style={styles.attachButtonText}>Add Attachment</Text>
          </TouchableOpacity>
          {attachments.map((attachment, index) => (
            <Text key={index} style={styles.attachmentName}>
              {attachment.split('/').pop()}
            </Text>
          ))}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Bill</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  categoryList: {
    flexGrow: 0,
    marginBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryButtonActive: {
    borderWidth: 1,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  frequencyButtons: {
    flexDirection: 'row',
    marginTop: 12,
  },
  frequencyButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  frequencyButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  frequencyButtonText: {
    color: '#666',
  },
  frequencyButtonTextActive: {
    color: '#fff',
  },
  attachButton: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  attachButtonText: {
    color: '#007AFF',
    fontWeight: '500',
  },
  attachmentName: {
    marginTop: 8,
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
