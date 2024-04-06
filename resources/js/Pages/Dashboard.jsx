import { useEffect, useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { HiOutlineUsers, HiOutlineClipboardCheck, HiOutlineShoppingBag } from 'react-icons/hi';
import { GrServices } from 'react-icons/gr';

export default function Dashboard({ auth }) {
  const [totalVendors, setTotalVendors] = useState(0);
  const [totalClients, setTotalClients] = useState(0);
  const [totalServiceRequests, setTotalServiceRequests] = useState(0);
  const [totalServiceCompleted, setTotalServiceCompleted] = useState(0);
  const [todayQuotation, setTodayQuotation] = useState(0);

  useEffect(() => {
    axios
      .get('/api/dashboard')
      .then((response) => {
        setTotalVendors(response.data.totalVendors);
        setTotalServiceRequests(response.data.totalServiceRequests);
        setTotalServiceCompleted(response.data.totalServiceCompleted);
        setTodayQuotation(response.data.todayQuotation);
      })
      .catch((error) => {
        console.error('Error fetching dashboard data:', error);
      });

    axios
      .get('/total-clients')
      .then((response) => {
        setTotalClients(response.data.totalClients);
      })
      .catch((error) => {
        console.error('Error fetching total clients:', error);
      });
  }, []);

  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}>
      <Head title="Dashboard" />
      <div className="container mt-3 mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Vendors Card */}
          
          {auth.user.role_id === 1 && (
          <div className="bg-blue-500 rounded-lg shadow-md p-3 text-white h-30">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Total Vendors</h3>
                <p className="text-base">{totalVendors}</p>
              </div>
              <HiOutlineUsers className="text-3xl" />
            </div>
          </div>
          )}
          {/* Total Clients Card */}
          {auth.user.role_id === 1 && (
          <div className="bg-green-500 rounded-lg shadow-md p-3 text-white h-40">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Total Clients</h3>
                <p className="text-base">{totalClients}</p>
              </div>
              <HiOutlineUsers className="text-3xl" />
            </div>
          </div>
          )}
          {/* Total Service Requests Card */}
          <div className="bg-yellow-500 rounded-lg shadow-md p-2 text-white h-40">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Total Service Requests</h3>
                <p className="text">{totalServiceRequests}</p>
              </div>
              <GrServices className="text-3xl" />
            </div>
          </div>

          {/* Total Service Completed Card */}
          <div className="bg-purple-500 rounded-lg shadow-md p-3 text-white h-40">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Total Service Completed</h3>
                <p className="text-base">{totalServiceCompleted}</p>
              </div>
              <HiOutlineClipboardCheck className="text-3xl" />
            </div>
          </div>

          {/* Today's Quotation Card */}
          <div className="bg-red-500 rounded-lg shadow-md p-3 text-white h-40">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-1">Today's Quotation</h3>
                <p className="text-base">{todayQuotation}</p>
              </div>
              <HiOutlineShoppingBag className="text-3xl" />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
