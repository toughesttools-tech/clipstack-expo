import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useClips } from '../../hooks/useClips';
import { ClipItem } from '../../types';

export default function ClipsScreen() {
  const router = useRouter();
  const { clips, copyClip, pinClip, deleteClip, captureFromClipboard, addClip } = useClips();
  const [search, setSearch] = useState('');
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState('');

  const filtered = search ? clips.filter(c => c.text.toLowerCase().includes(search.toLowerCase()) || c.label?.toLowerCase().includes(search.toLowerCase())) : clips;

  const handleCapture = async () => {
    const ok = await captureFromClipboard();
    if (!ok) Alert.alert('Nothing to capture', 'Copy some text first, then tap Capture.');
  };

  const handleAdd = () => {
    if (newText.trim()) { addClip(newText.trim()); setNewText(''); setAdding(false); }
  };

  const renderItem = ({ item }: { item: ClipItem }) => (
    <TouchableOpacity style={styles.item} onPress={() => copyClip(item)} onLongPress={() =>
      Alert.alert(item.label ?? 'Clip', undefined, [
        { text: 'Copy', onPress: () => copyClip(item) },
        { text: item.pinned ? 'Unpin' : 'Pin', onPress: () => pinClip(item.id, !item.pinned) },
        { text: 'Delete', style: 'destructive', onPress: () => deleteClip(item.id) },
        { text: 'Cancel', style: 'cancel' },
      ])
    }>
      {item.pinned ? <Text style={styles.pin}>📌</Text> : null}
      {item.label ? <Text style={styles.label}>{item.label}</Text> : null}
      <Text style={styles.text} numberOfLines={3}>{item.text}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ClipStack</Text>
      <TextInput style={styles.search} placeholder="Search clips..." placeholderTextColor="#444" value={search} onChangeText={setSearch} />
      {adding && (
        <View style={styles.addRow}>
          <TextInput style={[styles.search, { flex: 1, marginBottom: 0 }]} placeholder="Paste or type..." placeholderTextColor="#444" value={newText} onChangeText={setNewText} multiline autoFocus />
          <TouchableOpacity style={styles.addSave} onPress={handleAdd}><Text style={styles.addSaveText}>Save</Text></TouchableOpacity>
        </View>
      )}
      <FlatList data={filtered} keyExtractor={i => i.id} renderItem={renderItem} contentContainerStyle={{ padding: 16 }} ListEmptyComponent={<Text style={styles.empty}>No clips yet.\nTap Capture to grab clipboard.</Text>} />
      <View style={styles.actions}>
        <TouchableOpacity style={styles.btn} onPress={handleCapture}><Text style={styles.btnText}>Capture</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnSecondary]} onPress={() => setAdding(a => !a)}><Text style={styles.btnText}>{adding ? 'Cancel' : '+ New'}</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A0F' },
  title: { color: '#fff', fontSize: 32, fontWeight: '800', padding: 20, paddingTop: 60, paddingBottom: 12 },
  search: { backgroundColor: '#111', color: '#fff', borderRadius: 12, padding: 12, marginHorizontal: 16, marginBottom: 8, fontSize: 15 },
  addRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 16, marginBottom: 8 },
  addSave: { backgroundColor: '#6366F1', borderRadius: 12, padding: 12 },
  addSaveText: { color: '#fff', fontWeight: '700' },
  item: { backgroundColor: '#111', borderRadius: 14, padding: 14, marginBottom: 10 },
  pin: { fontSize: 12, marginBottom: 4 },
  label: { color: '#6366F1', fontSize: 11, fontWeight: '600', marginBottom: 4, textTransform: 'uppercase' },
  text: { color: '#ddd', fontSize: 14, lineHeight: 20 },
  empty: { color: '#444', textAlign: 'center', marginTop: 60, lineHeight: 22 },
  actions: { flexDirection: 'row', gap: 12, padding: 16, paddingBottom: 32 },
  btn: { flex: 1, backgroundColor: '#6366F1', borderRadius: 14, padding: 16, alignItems: 'center' },
  btnSecondary: { backgroundColor: '#1a1a1a' },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
