import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AssignPerson() {
  const [deliveryPerson, setDeliveryPerson] = useState('');
  const [orderNo] = useState(`ORD-${Math.floor(1000 + Math.random() * 9000)}`);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleAssign = () => {
    if (!deliveryPerson || deliveryPerson === 'Select a delivery person') {
      alert('Please select a delivery person before assigning.');
      return;
    }

    const newDelivery = {
      id: orderNo.replace("ORD", "DEL"),
      person: deliveryPerson,
      date: new Date().toLocaleDateString('en-GB'),
      status: "In Transit",
      statusColor: "bg-yellow-500 hover:bg-yellow-600",
    };

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('deliveries') || '[]');
    localStorage.setItem('deliveries', JSON.stringify([...existing, newDelivery]));

    setNotification({
      message: `Order ${orderNo} successfully assigned to ${deliveryPerson}`,
      type: 'success',
    });

    setTimeout(() => {
      navigate('/orderviewpage');
    }, 2000);
  };

  const handleReject = () => {
    setNotification({
      message: 'Order cancelled',
      type: 'error',
    });
    setTimeout(() => {
      navigate('/orderviewpage');
    }, 2000);
  };

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
          {/* Left column — Delivery details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-4">Delivery Details</h2>
            <div className="mb-4">
              <p className="font-medium">Sender: John Smith</p>
              <p className="text-gray-600">123 Sender St, Shipping City</p>
              <p className="text-gray-600">+1 (555) 123-4567</p>
            </div>
            <div className="mb-4">
              <p className="font-medium">Recipient: Jane Doe</p>
              <p className="text-gray-600">456 Recipient Ave, Delivery Town</p>
              <p className="text-gray-600">+1 (555) 987-6543</p>
            </div>
            <div>
              <p className="font-medium">Parcel: Electronics, 5.2kg</p>
            </div>
          </div>

          {/* Right column — Assignment */}
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
                className="w-full p-2 border border-gray-300 rounded-md"
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
                Admin Notes
              </label>
              <textarea
                id="adminNotes"
                placeholder="Add any notes..."
                className="w-full p-2 border border-gray-300 rounded-md"
                rows="4"
              />
            </div>

            <div className="flex justify-between">
              <button
                className="w-1/2 border border-red-400 bg-white text-red-600 py-2 rounded-md hover:border-red-600 hover:bg-red-50"
                onClick={handleReject}
              >
                Cancel
              </button>
              <button
                className="w-1/2 bg-gray-500 text-white py-2 rounded-md ml-4 hover:bg-gray-600"
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
