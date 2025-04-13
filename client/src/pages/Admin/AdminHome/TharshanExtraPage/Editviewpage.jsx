import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';

function EditAssignPerson() {
  const [deliveryPerson, setDeliveryPerson] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get orderNo from URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const orderNo = queryParams.get('orderNo');

  // Fetch order details when the component mounts
  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderNo) {
        setNotification({ message: 'No order number provided', type: 'error' });
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderNo}`);
        const order = response.data;
        setOrderDetails(order);
        setDeliveryPerson(order.deliveryPerson || '');
        setAdminNotes(order.adminNotes || '');
      } catch (error) {
        console.error('Error fetching order:', error);
      
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderNo]);

  const handleSaveChanges = async () => {
    if (!deliveryPerson || deliveryPerson === 'Select a delivery person') {
      setNotification({ message: 'Please select a delivery person', type: 'error' });
      return;
    }
    if (!adminNotes.trim()) {
      setNotification({ message: 'Please add admin notes', type: 'error' });
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/orders/update/${orderNo}`, {
        deliveryPerson,
        adminNotes,
        status: 'assigned',
      });

      setNotification({
        message: `Order ${orderNo} successfully updated`,
        type: 'success',
      });

      setTimeout(() => {
        navigate('/adminOrder');
      }, 2000);
    } catch (error) {
      console.error('Failed to update order:', error);
      setNotification({
        message: 'Something went wrong while saving changes.',
        type: 'error',
      });
    }
  };

  const handleBack = () => {
    navigate('/adminOrder');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const currentTime = new Date().toLocaleString();

    doc.setFontSize(16);
    doc.text(`Order No: ${orderNo}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Generated on: ${currentTime}`, 10, 20);
    doc.text('Delivery Details:', 10, 30);

    doc.text('Sender Information:', 10, 40);
    doc.text(`Name: ${orderDetails?.senderName || 'John Smith'}`, 10, 50);
    doc.text(`Phone: ${orderDetails?.senderPhone || '+1 (555) 123-4567'}`, 10, 60);
    doc.text(`Address: ${orderDetails?.senderAddress || '123 Sender St, Shipping City'}`, 10, 70);

    doc.text('Pickup Location:', 10, 80);
    doc.text(`Location: ${orderDetails?.pickupLocation || 'Main Warehouse'}`, 10, 90);
    doc.text(`Address: ${orderDetails?.pickupAddress || '789 Warehouse BLVD, Storage City'}`, 10, 100);

    doc.text('Recipient Information:', 10, 110);
    doc.text(`Name: ${orderDetails?.recipientName || 'Jane Doe'}`, 10, 120);
    doc.text(`Phone: ${orderDetails?.recipientPhone || '+1 (555) 987-6543'}`, 10, 130);
    doc.text(`Address: ${orderDetails?.recipientAddress || '456 Recipient Ave, Delivery Town'}`, 10, 140);

    doc.text('Parcel Details:', 10, 150);
    doc.text(`Weight: ${orderDetails?.weight || '5.2 kg'}`, 10, 160);
    doc.text(`Type: ${orderDetails?.type || 'Electronics'}`, 10, 170);

    doc.text('Current Assignment Details:', 10, 180);
    doc.text(`Delivery Person: ${orderDetails?.deliveryPerson || ''}`, 10, 190);
    doc.text(`Admin Notes: ${orderDetails?.adminNotes || ''}`, 10, 200);
    doc.text(`Status: ${orderDetails?.status || 'assigned'}`, 10, 210);

    doc.save(`Order_${orderNo}_Details.pdf`);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      // Update the order status to "canceled"
      const response = await axios.put(`http://localhost:5000/api/orders/update/${orderNo}`, {
        status: 'canceled',
        deliveryPerson: deliveryPerson,
        adminNotes: adminNotes
      });

      console.log('Response from server:', response.data); // Log the response for debugging

      setNotification({
        message: `Order ${orderNo} has been canceled`,
        type: 'success',
      });

      setTimeout(() => {
        navigate('/adminOrder');
      }, 2000);
    } catch (error) {
      console.error('Failed to cancel order:', error.response?.data || error.message); // Detailed error logging
      setNotification({
        message: 'Failed to cancel order. Please try again or contact support.',
        type: 'error',
      });
      setDeleteLoading(false);
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = () => {
    setIsDeleting(true);
  };

  const handleCancelDelete = () => {
    setIsDeleting(false);
  };

  if (loading) {
    return <div className="text-center py-4">Loading order details...</div>;
  }

  const getRandomName = () => {
    const names = ['Rahul Sharma', 'Priya Petal', 'Neha Sign'];
    return names[Math.floor(Math.random() * names.length)];
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Delivery Assignment</h1>

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
          <div className="bg-white p-6 rounded-lg shadow-md relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Order No: {orderNo}</h2>
              <button
                onClick={handleDownloadPDF}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Download PDF"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">👤</span>
                <h3 className="font-medium">Sender Information</h3>
              </div>
              <p className="text-gray-700 mt-1">{orderDetails?.senderName || 'John Smith'}</p>
              <p className="text-gray-600">{orderDetails?.senderPhone || '+1 (555) 123-4567'}</p>
              <p className="text-gray-600">{orderDetails?.senderAddress || '123 Sender St, Shipping City'}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">📍</span>
                <h3 className="font-medium">Pickup Location</h3>
              </div>
              <p className="text-gray-700 mt-1">{orderDetails?.pickupLocation || 'Main Warehouse'}</p>
              <p className="text-gray-600">{orderDetails?.pickupAddress || '789 Warehouse BLVD, Storage City'}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">👤</span>
                <h3 className="font-medium">Recipient Information</h3>
              </div>
              <p className="text-gray-700 mt-1">{orderDetails?.recipientName || 'Jane Doe'}</p>
              <p className="text-gray-600">{orderDetails?.recipientPhone || '+1 (555) 987-6543'}</p>
              <p className="text-gray-600">{orderDetails?.recipientAddress || '456 Recipient Ave, Delivery Town'}</p>
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">📦</span>
                <h3 className="font-medium">Parcel Details</h3>
              </div>
              <div className="flex justify-between mt-1 text-gray-600">
                <p>Weight: {orderDetails?.weight || '5.2 kg'}</p>
                <p>Type: {orderDetails?.type || 'Electronics'}</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-gray-500 mr-2">🚚</span>
                <h3 className="font-medium">Current Assignment Details</h3>
              </div>
              {/* <p className="text-gray-700 mt-1">Delivery Person: {orderDetails?.delivery.deliveryPerson || 'Not assigned'}</p> */}
              <p className="text-gray-700 mt-1">
                   Delivery Person: {orderDetails?.delivery.deliveryPerson || getRandomName()}
              </p>
              <p className="text-gray-600">Admin Notes: {orderDetails?.adminNotes || 'hiiii'}</p>
              <p className="text-gray-600">Status: {orderDetails?.status || 'Inprogress'}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Re-Assign Delivery Person</h2>

            <div className="mb-4">
              <label htmlFor="deliveryPerson" className="block text-sm font-medium text-gray-700 mb-1">
                Change Delivery Person
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
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                rows="4"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                className="w-1/3 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition-colors"
                onClick={handleBack}
              >
                Back
              </button>
              <button
                className="w-1/3 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors ml-4"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          {!isDeleting ? (
            <button
              className="group relative inline-flex items-center justify-center 
              px-6 py-3 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 transition-all duration-300 ease-in-out
               transform hover:scale-105"
              onClick={handleDeleteClick}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M3 7h18"
                />
              </svg>
              Cancel Order
            </button>
          ) : (
            <div className="bg-white p-4 rounded-lg shadow-lg inline-block animate-fade-in">
              <p className="text-gray-700 mb-4">Are you sure you want to cancel Order {orderNo}?</p>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  onClick={handleCancelDelete}
                  disabled={deleteLoading}
                >
                  No
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
                  onClick={handleDeleteConfirm}
                  disabled={deleteLoading}
                >
                  {deleteLoading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Canceling...
                    </>
                  ) : (
                    'Yes, Cancel'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditAssignPerson;

// Add this CSS in your stylesheet or as a <style> tag in the component
const styles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
`;