import React from 'react';

const CommentModal = ({
  isOpen,
  onClose,
  comments,
  commentLoading,
  commentText,
  setCommentText,
  onAddComment,
}) => {
  if (!isOpen) return null;

  return (
    <div className="comment-modal-overlay" onClick={onClose}>
      <div className="comment-modal" onClick={(e) => e.stopPropagation()}>
        <div className="comment-modal-header">
          <h3>Comments</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="comment-list">
          {commentLoading && comments.length === 0 ? (
            <p className="comment-loading">Loading comments...</p>
          ) : comments.length === 0 ? (
            <p className="comment-empty">No comments yet. Be the first!</p>
          ) : (
            comments.map((c) => (
              <div key={c._id} className="comment-item">
                <span className="comment-user">{c.user?.fullName || 'User'}</span>
                <span className="comment-text">{c.text}</span>
              </div>
            ))
          )}
        </div>
        <div className="comment-input-area">
          <input
            type="text"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onAddComment()}
          />
          <button
            onClick={onAddComment}
            disabled={commentLoading || !commentText.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;

