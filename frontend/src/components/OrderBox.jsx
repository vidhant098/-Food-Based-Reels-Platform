import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import placeOrder from '../services/order.service';

const OrderBox = ({ food }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (!food?._id || loading) return;

    try {
      setLoading(true);

      const data = await placeOrder(food._id, quantity);
      toast.success(data?.message || 'Order placed successfully');
      setQuantity(1);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Please login first');
        navigate('/user/login');
        return;
      }

      toast.error(error.response?.data?.message || 'Unable to place order');
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-container" onClick={(e) => e.stopPropagation()}>
      <div className="order-qty-row">
        <button
          type="button"
          className="order-qty-btn"
          onClick={() => setQuantity((value) => Math.max(1, value - 1))}
          aria-label="Decrease quantity"
        >
          -
        </button>

        <span className="order-qty" aria-live="polite">
          {quantity}
        </span>

        <button
          type="button"
          className="order-qty-btn"
          onClick={() => setQuantity((value) => value + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <button
        type="button"
        className="order-submit"
        onClick={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? 'Ordering...' : 'Order Now'}
      </button>
    </div>
  );
};

export default OrderBox;
