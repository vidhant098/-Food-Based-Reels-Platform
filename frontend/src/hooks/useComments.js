import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const useComments = (setFoods) => {
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [activeFoodId, setActiveFoodId] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [commentLoading, setCommentLoading] = useState(false);

  const openCommentModal = useCallback(async (foodId) => {
    setActiveFoodId(foodId);
    setCommentModalOpen(true);
    setCommentLoading(true);
    try {
      const res = await axios.get(`${API_BASE_URL}/api/food/comment/${foodId}`, {
        withCredentials: true,
      });
      setComments(res.data.comments || []);
    } catch (err) {
      console.error('Fetch comments error', err);
    } finally {
      setCommentLoading(false);
    }
  }, []);

  const closeCommentModal = useCallback(() => {
    setCommentModalOpen(false);
    setActiveFoodId(null);
    setComments([]);
    setCommentText('');
  }, []);

  const handleAddComment = useCallback(async () => {
    if (!commentText.trim() || !activeFoodId) return;
    setCommentLoading(true);
    try {
      const res = await axios.post( 
        `${API_BASE_URL}/api/food/comment`,
        { foodId: activeFoodId, text: commentText.trim() },
        { withCredentials: true }
      );
      setComments((prev) => [res.data.comment, ...prev]);
      setCommentText('');
      setFoods((prev) =>
        prev.map((f) => {
          if (f._id === activeFoodId) {
            return { ...f, commentCount: (f.commentCount || 0) + 1 };
          }
          return f;
        })
      );
    } catch (err) {
      console.error('Add comment error', err);
    } finally {
      setCommentLoading(false);
    }
  }, [commentText, activeFoodId, setFoods]);

  return {
    commentModalOpen,
    activeFoodId,
    comments,
    commentText,
    commentLoading,
    setCommentText,
    openCommentModal,
    closeCommentModal,
    handleAddComment,
  };
};

