import { View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { User, Bell, Globe, CreditCard, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function Settings() {
  const sections = [
    {
      title: 'Account',
      items: [
        { icon: User, label: 'Profile Information', type: 'link' },
        { icon: Bell, label: 'Notifications', type: 'toggle', value: true },
        { icon: Globe, label: 'Language', type: 'value', value: 'English' },
      ],
    },
    {
      title: 'Payments',
      items: [
        { icon: CreditCard, label: 'Payment Methods', type: 'link' },
        { icon: Shield, label: 'Security', type: 'link' },
      ],
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', type: 'link' },
        { icon: LogOut, label: 'Sign Out', type: 'danger' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.label}
                  style={[styles.settingItem, item.type === 'danger' && styles.dangerItem]}>
                  <View style={styles.settingItemLeft}>
                    <item.icon size={20} color={item.type === 'danger' ? '#FF3B30' : '#666'} />
                    <Text style={[styles.settingItemLabel, item.type === 'danger' && styles.dangerText]}>
                      {item.label}
                    </Text>
                  </View>
                  {item.type === 'toggle' && <Switch value={item.value} onValueChange={() => {}} />}
                  {item.type === 'value' && <Text style={styles.settingItemValue}>{item.value}</Text>}
                  {item.type === 'link' && <Text style={styles.chevron}>›</Text>}
                </TouchableOpacity>
              ))}
            </View>
          </View>
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
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Inter-Medium',
    marginHorizontal: 20,
    marginBottom: 8,
  },
  sectionContent: {
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  settingItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingItemLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  settingItemValue: {
    fontSize: 16,
    color: '#666',
    fontFamily: 'Inter-Regular',
  },
  chevron: {
    fontSize: 20,
    color: '#666',
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  dangerText: {
    color: '#FF3B30',
  },
});