import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Bubble } from './Bubble';

const Dashboard = () => {
  const [kudosReceived, setKudosReceived] = useState([]);
  const [kudosSent, setKudosSent] = useState([]);
  const [topReceivers, setTopReceivers] = useState([]);
  
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/kudos/analytics', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`,
        },
      });
      const data = await response.json();
      setKudosReceived(data.kudosReceived);
      setKudosSent(data.kudosSent);
      setTopReceivers(data.topReceivers);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };
  
  const categories = ["Helping Hand", "Excellence", "Above", "Focus"];
  
  const categoryData = categories.map((category, index) => ({
    name: category,
    kudos: Math.floor(Math.random() * 13),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 relative">
      <Bubble />
      <div className="p-6 relative z-10">
        <h1 className="text-3xl font-bold text-gray-400 mb-6">Analytics </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kudos Overview */}
          <div className="bg-gradient-to-br from-blue-100/90 to-blue-200/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center justify-center text-black-900">Kudo Leaderboard</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-gray rounded-lg shadow-lg">
                <thead className="bg-blue-500">
                  <tr>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Kudos Received</th>
                  </tr>
                </thead>
                <tbody>
                  {topReceivers.map((receiver, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{receiver.name}</td>
                      <td className="px-4 py-2">{receiver.kudos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Receivers */}
          <div className="bg-gradient-to-br from-blue-100/90 to-blue-200/90 backdrop-blur-sm p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-black-900 flex items-center justify-center">Kudos Given</h2>
            <div className="bg-white/50 rounded-lg p-4">
              <BarChart
                width={500}
                height={300}
                data={categoryData}
                margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.5} />
                <XAxis dataKey="name" />
                <YAxis ticks={[0, 2, 4, 6, 8, 10, 12]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="kudos" fill="#82ca9d" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;