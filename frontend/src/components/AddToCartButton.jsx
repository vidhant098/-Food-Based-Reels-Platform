import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import placeOrder from '../services/order.service';
import './AddToCartButton.css';

const AddToCartButton = ({ food }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!food?._id || loading) return;

    try {
      setLoading(true);
      const data = await placeOrder(food._id, 1);
      toast.success(data?.message || 'Order placed successfully');
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please login first  for adding to cart');
        // navigate('/user/login');
        return;
      }

      toast.error(error.response?.data?.message || 'Unable to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      className="add-cart-btn"
      onClick={handleAddToCart}
      disabled={loading}
      aria-label="Add to cart"
    >
      {loading ? '...' : '🛒'}
    </button>
  );
};

export default AddToCartButton;
