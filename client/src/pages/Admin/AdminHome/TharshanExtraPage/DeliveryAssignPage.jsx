import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function AssignPerson() {
  const [deliveryPerson, setDeliveryPerson] = useState('');
  const [notification, setNotification] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const orderNo = queryParams.get('orderNo');

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderNo}`);
        const order = response.data;
        setDeliveryPerson(order.deliveryPerson || '');
        setAdminNotes(order.adminNotes || '');
      } catch (error) {
        console.error('Error fetching order:', error);
       
      } finally {
        setLoading(false);
      }
    };

    if (orderNo) {
      fetchOrder();
    }
  }, [orderNo]);

  const handleAssign = async () => {
    if (!deliveryPerson || deliveryPerson === 'Select a delivery person') {

      setNotification({
        message: 'Please select a delivery person',
        type: 'error',
      });
      return;
    }
   
    try {
      await axios.put(`http://localhost:5000/api/orders/update/${orderNo}`, {
        deliveryPerson,
        adminNotes,
        status: 'assigned',
      });

      setNotification({
        message: `Order ${orderNo} successfully assigned`,
        type: 'success',
      });

      setTimeout(() => {
        navigate('/adminOrder');
      }, 2000);
    } catch (err) {
      console.error('Failed to update order:', err);
      setNotification({
        message: 'Something went wrong while assigning the delivery person.',
        type: 'error',
      });
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`http://localhost:5000/api/orders/update/${orderNo}`, {
        deliveryPerson,
        adminNotes,
        status: 'cancelled',
      });

      setNotification({
        message: `Order ${orderNo} has been cancelled.`,
        type: 'error',
      });

      setTimeout(() => {
        navigate('/adminOrder');
      }, 2000);
    } catch (err) {
      console.error('Failed to cancel order:', err);
      setNotification({
        message: 'Something went wrong while cancelling the order.',
        type: 'error',
      });
    }
  };

  if (loading) {
    return <div>Loading order details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Delivery Assignment</h1>

        {notification && (
          <div
            className={`mb-4 p-4 rounded text-center font-semibold ${
              notification.type === 'success'
                ? 'bg-green-100 text-green-700 border border-green-400'
                : 'bg-red-100 text-red-700 border border-red-400'
            }`}
          >
            {notification.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">👤</span>
                <h3 className="font-medium">Sender Information</h3>
              </div>
              <p className="text-gray-700 mt-1">John Smith</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-gray-600">123 Sender St, Shipping City</p>
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">📍</span>
                <h3 className="font-medium">Pickup Location</h3>
              </div>
              <p className="text-gray-700 mt-1">Main Warehouse</p>
              <p className="text-gray-600">789 Warehouse BLVD, Storage City</p>
            </div>
            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">👤</span>
                <h3 className="font-medium">Recipient Information</h3>
              </div>
              <p className="text-gray-700 mt-1">Jane Doe</p>
              <p className="text-gray-600">+1 (555) 987-6543</p>
              <p className="text-gray-600">456 Recipient Ave, Delivery Town</p>
            </div>
            <div>
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">📦</span>
                <h3 className="font-medium">Parcel Details</h3>
              </div>
              <div className="flex justify-between mt-1 text-gray-600">
                <p>Weight: 5.2 kg</p>
                <p>Type: Electronics</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Assign Delivery Person</h2>
            <div className="mb-4">
              <label htmlFor="deliveryPerson" className="block text-sm font-medium text-gray-700 mb-1">
                Select Delivery Person
              </label>
              <select
                id="deliveryPerson"
                value={deliveryPerson}
                onChange={(e) => setDeliveryPerson(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Select a delivery person</option>
                <option>Rahul Sharma</option>
                <option>Priya Patel</option>
                <option>Amit Kumar</option>
                <option>Neha Singh</option>
                <option>Vikram Joshi</option>
              </select>
            </div>
            <div className="mb-6">
              <label htmlFor="adminNotes" className="block text-sm font-medium text-gray-700 mb-1">
                Admin Notes <span className="text-red-500">*</span>
              </label>
              <textarea
                id="adminNotes"
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add any additional instructions or notes"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="w-1/2 border border-red-400 bg-white text-red-600 py-2 rounded-md hover:border-red-600 hover:bg-red-50 transition-colors"
                onClick={handleReject}
              >
                Reject Delivery
              </button>
              <button
                className="w-1/2 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors ml-4"
                onClick={handleAssign}
              >
                Assign Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignPerson;