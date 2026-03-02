import { useState, useEffect, useCallback } from 'react';
import * as SQLite from 'expo-sqlite';
import * as Clipboard from 'expo-clipboard';
import { ClipItem } from '../types';

const db = SQLite.openDatabaseSync('clipstack.db');

export function useClips() {
  const [clips, setClips] = useState<ClipItem[]>([]);

  useEffect(() => {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS clips (
        id TEXT PRIMARY KEY, text TEXT NOT NULL, label TEXT,
        pinned INTEGER DEFAULT 0, createdAt TEXT NOT NULL, usedAt TEXT NOT NULL
      )
    `);
    load();
  }, []);

  const load = useCallback(() => {
    const rows = db.getAllSync<ClipItem>('SELECT * FROM clips ORDER BY pinned DESC, usedAt DESC LIMIT 200');
    setClips(rows);
  }, []);

  const addClip = useCallback((text: string, label?: string) => {
    const existing = db.getFirstSync<ClipItem>('SELECT id FROM clips WHERE text = ?', [text]);
    if (existing) { touchClip(existing.id); return; }
    const id = Date.now().toString();
    const now = new Date().toISOString();
    db.runSync('INSERT INTO clips VALUES (?,?,?,0,?,?)', [id, text, label ?? null, now, now]);
    load();
  }, [load]);

  const touchClip = useCallback((id: string) => {
    db.runSync('UPDATE clips SET usedAt = ? WHERE id = ?', [new Date().toISOString(), id]);
    load();
  }, [load]);

  const copyClip = useCallback(async (item: ClipItem) => {
    await Clipboard.setStringAsync(item.text);
    touchClip(item.id);
  }, [touchClip]);

  const pinClip = useCallback((id: string, pinned: boolean) => {
    db.runSync('UPDATE clips SET pinned = ? WHERE id = ?', [pinned ? 1 : 0, id]);
    load();
  }, [load]);

  const deleteClip = useCallback((id: string) => {
    db.runSync('DELETE FROM clips WHERE id = ?', [id]);
    load();
  }, [load]);

  const labelClip = useCallback((id: string, label: string) => {
    db.runSync('UPDATE clips SET label = ? WHERE id = ?', [label, id]);
    load();
  }, [load]);

  const captureFromClipboard = useCallback(async () => {
    const text = await Clipboard.getStringAsync();
    if (text?.trim()) { addClip(text.trim()); return true; }
    return false;
  }, [addClip]);

  return { clips, addClip, copyClip, pinClip, deleteClip, labelClip, captureFromClipboard, refresh: load };
}
