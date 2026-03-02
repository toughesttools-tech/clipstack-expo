import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const PLANS = [
  { id: 'monthly', label: 'Monthly', price: '$0.99', period: '/month', highlight: false },
  { id: 'yearly', label: 'Yearly', price: '$4.99', period: '/year', highlight: true, badge: 'Best Value' },
];

const FEATURES = ['✓  Unlimited clips', '✓  Pin & label clips', '✓  Quick search', '✓  Export clips', '✓  iCloud sync (coming soon)'];

export default function Paywall() {
  const router = useRouter();
  const [selected, setSelected] = useState('yearly');
  const [loading, setLoading] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.close} onPress={() => router.back()}><Text style={styles.closeText}>✕</Text></TouchableOpacity>
      <Text style={styles.eyebrow}>CLIPSTACK PRO</Text>
      <Text style={styles.headline}>{'Your clipboard,\nunlocked.'}</Text>
      <View style={styles.features}>{FEATURES.map(f => <Text key={f} style={styles.feature}>{f}</Text>)}</View>
      <View style={styles.plans}>
        {PLANS.map(plan => (
          <TouchableOpacity key={plan.id} style={[styles.plan, selected === plan.id && styles.planSelected]} onPress={() => setSelected(plan.id)}>
            {plan.badge && <View style={styles.badge}><Text style={styles.badgeText}>{plan.badge}</Text></View>}
            <Text style={styles.planLabel}>{plan.label}</Text>
            <Text style={styles.planPrice}>{plan.price}<Text style={styles.planPeriod}>{plan.period}</Text></Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.cta} disabled={loading} onPress={() => {}}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.ctaText}>Start Free Trial</Text>}
      </TouchableOpacity>
      <Text style={styles.legal}>3-day free trial. Cancel anytime in App Store settings.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F', padding: 24, paddingTop: 60 },
  close: { position: 'absolute', top: 50, right: 24, zIndex: 10, padding: 8 },
  closeText: { color: '#555', fontSize: 18 },
  eyebrow: { color: '#6366F1', fontWeight: '700', fontSize: 12, letterSpacing: 2, marginBottom: 12 },
  headline: { color: '#fff', fontSize: 32, fontWeight: '800', lineHeight: 40, marginBottom: 32 },
  features: { marginBottom: 32 },
  feature: { color: '#aaa', fontSize: 15, marginBottom: 10 },
  plans: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  plan: { flex: 1, backgroundColor: '#111', borderRadius: 16, padding: 16, borderWidth: 2, borderColor: 'transparent', alignItems: 'center' },
  planSelected: { borderColor: '#6366F1', backgroundColor: '#0d0d20' },
  badge: { backgroundColor: '#6366F1', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 8 },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  planLabel: { color: '#888', fontSize: 13, fontWeight: '600', marginBottom: 6 },
  planPrice: { color: '#fff', fontSize: 22, fontWeight: '800' },
  planPeriod: { color: '#888', fontSize: 13, fontWeight: '400' },
  cta: { backgroundColor: '#6366F1', borderRadius: 16, padding: 18, alignItems: 'center', marginBottom: 8 },
  ctaText: { color: '#fff', fontSize: 17, fontWeight: '700' },
  legal: { color: '#333', fontSize: 11, textAlign: 'center', marginTop: 8 },
});
