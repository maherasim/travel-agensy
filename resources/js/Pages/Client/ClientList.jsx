import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { router } from '@inertiajs/react'
import 'primeicons/primeicons.css';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import axios from 'axios'; 
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import DangerButton from '@/Components/DangerButton';

export default function ClientList({ auth }) {
  const [clients, setClientData] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
  const { data, setData, delete: destroy, processing, reset } = useForm();


const fetchClientData = async () => {
    try {
    const response = await axios.get('/client/create');
    setClientData(response.data.data);
    } catch (error) {
    console.error('Error fetching data:', error);
    }
};

useEffect(() => {
fetchClientData();
}, []);

  const handleEdit = (rowData) => {
    const url = `https://app.amaenterprises.com.ng/client/${rowData.id}/update/`
    router.get(url)
  };

  const handleDelete = (rowData) => {
    setData('client_id', rowData.id);
    setConfirmingUserDeletion(true);
  };

  const deleteUser = async () => {
    try {
      await destroy(route('client.destroy'), {
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

  const actionButtonTemplate = (rowData) => {
    return (
      <div>
        <button
          className="p-button-rounded p-button-warning mr-2"
          onClick={() => handleEdit(rowData)}
        >
          <i className="pi pi-pencil"></i>
        </button>
        <button
          className="p-button-rounded p-button-danger"
          onClick={() => handleDelete(rowData)}
        >
          <i className="pi pi-trash"></i>
        </button>
      </div>
    );
  };

  const header = (
    <div className="flex justify-between">
      <h2 className="text-2xl text-dark font-bold mb-4">Clients</h2>
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
      <Head title="Clients" />
      <div className="container mt-5 mx-5 card rounded-2xl text-4xl mx-auto">
        <DataTable
          value={clients}
          scrollable
          rowHover
          tableStyle={{ minWidth: '50rem' }}
          globalFilter={globalFilter}
          header={header}
        >
          <Column
            field="id"
            header="ID"
            sortable
            filter
            filterPlaceholder="Search by ID"
          />
          <Column
            field="trade_name"
            header="Full Name"
            sortable
            filter
            filterPlaceholder="Search by Full Name"
          />
          <Column
            field="email"
            header="Email"
            sortable
            filter
            filterPlaceholder="Search by Email"
          />
          <Column
            field="phone_number"
            header="Phone Number"
            sortable
            filter
            filterPlaceholder="Search by Phone Number"
          />
          <Column header="Actions" body={actionButtonTemplate} />
        </DataTable>
      </div>
      <Modal show={confirmingUserDeletion} onClose={closeModal}>
        <h2 className="text-lg font-medium text-gray-900 p-5">
          Are you sure you want to delete Client?
        </h2>

        <div className="mt-6 flex justify-end p-5">
          <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

          <DangerButton
            className="ms-3"
            disabled={processing}
            onClick={deleteUser}
          >
            Delete 
          </DangerButton>
        </div>
      </Modal>
    </Authenticated>
  );
}
