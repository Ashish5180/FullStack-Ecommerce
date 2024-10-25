// src/Cart.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, increaseQuantity, decreaseQuantity } from './Redux/cartSlice';


const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default payment method

  const totalAmount = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace('$', ''));
    return total + itemPrice * item.quantity;
  }, 0);

  const handleApplyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(totalAmount * 0.1);
      setCouponError('');
    } else {
      setDiscount(0);
      setCouponError('Invalid coupon code');
    }
  };

 

  return (
    <div className="font-[sans-serif] bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <h2 className="text-2xl font-extrabold text-gray-800">Your Shopping Cart</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-600">Cart is empty</p>
            ) : (
              cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  className="p-4 sm:p-6 bg-white shadow-md rounded-md relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                    <div className="w-full sm:w-32 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="w-full">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800">{item.name}</h3>
                      <ul className="mt-2 sm:mt-4 text-sm text-gray-800 space-y-1 sm:space-y-2">
                        <li>Size: {item.size}</li>
                        <li>Color: {item.color}</li>
                      </ul>
                      <hr className="border-gray-300 my-2 sm:my-4" />
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
                        <div className="flex items-center gap-3">
                          <h4 className="text-sm font-bold text-gray-800">Qty:</h4>
                          <button
                            type="button"
                            className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center"
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <span className="font-bold text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center"
                            onClick={() => dispatch(increaseQuantity(item.id))}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between w-full sm:w-auto">
                          <h4 className="text-lg font-bold text-gray-800">
                            ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                          </h4>
                          <button
                            type="button"
                            className="ml-4 sm:ml-6"
                            onClick={() => dispatch(removeItem(item.id))}
                          >
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-gray-400 hover:text-red-500 cursor-pointer"
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Order Summary Section */}
          <motion.div
            className="bg-white rounded-md p-4 sm:p-6 shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Order Summary</h3>
            <ul className="text-gray-800 text-sm divide-y mt-4">
              <li className="flex justify-between py-3">Subtotal <span className="font-bold">${totalAmount.toFixed(2)}</span></li>
              <li className="flex justify-between py-3">Shipping <span className="font-bold">$0.00</span></li>
              <li className="flex justify-between py-3">Tax <span className="font-bold">$0.00</span></li>
              <li className="flex justify-between py-3 font-bold">Total <span>${(totalAmount - discount).toFixed(2)}</span></li>
            </ul>

            {/* Apply Coupon Section */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">Apply Coupon</h3>
              <div className="flex items-center mt-3">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="ml-3 bg-blue-500 hover:bg-blue-600 text-white font-bold px-4 rounded"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-red-500 text-sm mt-1">{couponError}</p>}
            </div>

            {/* Payment Method Selection */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-800">Select Payment Method</h3>
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="cod"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={() => setPaymentMethod('COD')}
                  className="mr-2"
                />
                <label htmlFor="cod" className="text-gray-700">Cash on Delivery</label>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="radio"
                  id="online"
                  name="paymentMethod"
                  value="Online"
                  checked={paymentMethod === 'Online'}
                  onChange={() => setPaymentMethod('Online')}
                  className="mr-2"
                />
                <label htmlFor="online" className="text-gray-700">Online Payment</label>
              </div>
            </div>

            {/* Payment Button */}
            <button
              className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
            >
              {paymentMethod === 'COD' ? 'Place Order (Cash on Delivery)' : 'Proceed to Online Payment'}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
