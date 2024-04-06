import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios'; 
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';
import { FiSearch } from 'react-icons/fi';
import { router } from '@inertiajs/react';

export default function VendorList({ auth }) {
  const [clients, setClientData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const { data, setData, delete: destroy, processing, reset } = useForm();
  const [selectedAction, setSelectedAction] = useState('Actions'); // Default value

  const fetchClientData = async () => {
    try {
      const response = await axios.get('/services/fetch/create');
      setClientData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchClientData();
  }, []);

  const handleEdit = (rowData) => {
    const url = `https://app.amaenterprises.com.ng/vendor/${rowData.id}/update/`;
    router.get(url)
  };

  const handleDelete = (rowData) => {
    setData('vendor_id', rowData.id);
    setConfirmingUserDeletion(true);
  };

  const deleteUser = async () => {
    try {
      await destroy(route('vendor.destroy'), {
        preserveScroll: true,
        onSuccess: () => {
          closeModal();
          // Refresh the table after successful deletion
          fetchClientData();
        },
        onError: () => alert('Failed to delete'),
        onFinish: () => reset(),
      });
    } catch (error) {
      console.error('Error deleting client:', error);
    }
  };

  const closeModal = () => {
    setConfirmingUserDeletion(false);
    reset();
  };

  const handleActionChange = (e) => {
    setSelectedAction(e.value);
    // Handle the selected action here
  };

  const actions = [
    { label: 'Actions', value: 'Actions' },
    { label: 'Pending', value: 'Pending' },
    { label: 'Declined', value: 'Declined' },
    { label: 'Completed', value: 'Completed' },
    { label: 'View', value: 'View' }
  ];

  const actionTemplate = (rowData) => {
    return (
      
      <Dropdown
        value={selectedAction} // Set the default value
        options={actions}
        onChange={handleActionChange}
      />
    );
  };

  const header = (
    <div className="flex justify-between w-auto">
      <h2 className="text-2xl text-dark font-bold mb-4" >Service Request</h2>
      <span className="p-input-icon-left">
        <InputText
          type="search"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <Authenticated user={auth.user}>
      <Head title="Vendor" />
      <div className="container mt-5 mx-auto card rounded-2xl text-4xl">
        <DataTable
          value={clients}
          scrollable
          rowHover
          style={{ width: '100%' }}
          globalFilter={globalFilter}
          header={header}
        >
          <Column field="id" header="ID" sortable filter filterPlaceholder="Search by ID" />
          <Column
            field="passenger_name"
            header="Full Name"
            sortable
            filter
            filterPlaceholder="Search by Full Name"
          />
          <Column
            field="service_type"
            header="Service Type"
            sortable
            filter
            filterPlaceholder="Search by Service type"
          />
             <Column
            field="price"
            header="Price"
            sortable
            filter
            filterPlaceholder="Search by Service type"
          />
          <Column
            field="passenger_number"
            header="Passengar Number"
            sortable
            filter
            filterPlaceholder="Search by Phone Number"
          />
            {auth.user.role_id === 2 && (
            <Column
            field="Status"
            header="status"
            sortable
            filter
            filterPlaceholder="Search by Service type"
          />)}
           {auth.user.role_id === 1 && (
          <Column header="Actions" body={actionTemplate} />)}
        </DataTable>
      </div>
      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <h2 className="text-lg font-medium text-gray-900 p-5">
          Are you sure you want to delete Request?
        </h2>
        <div className="mt-6 flex justify-end p-5">
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
          <DangerButton className="ms-3" disabled={processing} onClick={deleteUser}>
            Delete Account
          </DangerButton>
        </div>
      </Modal>
    </Authenticated>
  );
}
