import { useState, useCallback } from 'react';
import axios from 'axios';

export const useBookmarks = () => {
  const [savedIds, setSavedIds] = useState(new Set());

  const isSaved = useCallback((foodId) => savedIds.has(foodId), [savedIds]);

  const handleSave = useCallback(async (foodId) => {
    try {
      await axios.post('http://localhost:3000/api/food/save', { foodId }, { withCredentials: true });
      setSavedIds((prev) => {
        const next = new Set(prev);
        if (next.has(foodId)) next.delete(foodId);
        else next.add(foodId);
        return next;
      });
    } catch (err) {
      console.error('Save error', err);
    }
  }, []);

  return { savedIds, isSaved, handleSave };
};

