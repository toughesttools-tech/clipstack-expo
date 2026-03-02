import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useClips } from '../../hooks/useClips';

export default function Settings() {
  const router = useRouter();
  const { clips, refresh } = useClips();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>STORAGE</Text>
        <View style={styles.row}><Text style={styles.rowLabel}>Total clips saved</Text><Text style={styles.rowValue}>{clips.length}</Text></View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>UPGRADE</Text>
        <TouchableOpacity style={styles.upgradeBtn} onPress={() => router.push('/paywall')}>
          <Text style={styles.upgradeBtnText}>✦ Upgrade to Pro — Unlimited Clips</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ABOUT</Text>
        <View style={styles.row}><Text style={styles.rowLabel}>Version</Text><Text style={styles.rowValue}>1.0.0</Text></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F', padding: 24, paddingTop: 60 },
  title: { color: '#fff', fontSize: 28, fontWeight: '800', marginBottom: 32 },
  section: { marginBottom: 28 },
  sectionTitle: { color: '#555', fontSize: 11, fontWeight: '700', letterSpacing: 1.5, marginBottom: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#111', borderRadius: 12, marginBottom: 8 },
  rowLabel: { color: '#ddd', fontSize: 15 },
  rowValue: { color: '#888', fontSize: 15 },
  upgradeBtn: { backgroundColor: '#1a1030', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#6366F1', alignItems: 'center' },
  upgradeBtnText: { color: '#6366F1', fontWeight: '700', fontSize: 15 },
});
