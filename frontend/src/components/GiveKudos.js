import React, { useState } from 'react';
import { Bubble } from './Bubble';

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white transition-opacity duration-500 
      ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button 
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const GiveKudos = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    message: '',
    category: 'Helpful',
  });
  const [notification, setNotification] = useState(null);

  const categories = ['Helping Hand', 'Excellence', 'Above', 'Focus'];

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/kudos/give', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
        body: JSON.stringify({
          ...formData,
          senderEmail: localStorage.getItem('userEmail'),
        }),
      });

      if (response.ok) {
        showNotification('Kudos sent successfully!', 'success');
        setFormData({
          recipientName: '',
          message: '',
          category: 'Helpful',
        });
      } else {
        showNotification('Failed to send kudos. Please try again.', 'error');
      }
    } catch (error) {
      showNotification('Server error. Please try again later.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <Bubble />
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      
      <div className="max-w-md mx-auto bg-gradient-to-br from-blue-100/90 to-blue-200/90 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden relative z-10">
        <div className="px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-blue-900 mb-2" htmlFor="recipientEmail">
                Recipient's Name
              </label>
              <input
                type="text"
                id="recipientName"
                value={formData.recipientEmail}
                onChange={(e) => setFormData({ ...formData, recipientEmail: e.target.value })}
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70"
                required
              />
            </div>

            <div>
              <label className="block text-blue-900 mb-2" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-blue-900 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/70"
                rows="4"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Send Kudos
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiveKudos;