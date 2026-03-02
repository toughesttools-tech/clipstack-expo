export interface ClipItem {
  id: string;
  text: string;
  label?: string;
  pinned: number;
  createdAt: string;
  usedAt: string;
}
export const MAX_FREE_CLIPS = 10;
