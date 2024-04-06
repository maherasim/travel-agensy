import { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput'; // Import the TextInput component

export default function ServiceForm({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        service_type: '',
        passenger_number: '',
        passenger_names: [],
        domestic_international: '',
        oneway_roundway: '',
        from_location: '',
        to_location: '',
        departure_date: '',
        airline_name: '',
        price: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        post(route('services.store'), {
            data: {
                ...data,
                passenger_names: data.passenger_names, // Include passenger names in the request payload
            },
            onSuccess: () => {
                setShowSuccess(true);
                setMessage('Service Request submitted successfully');
                setTimeout(() => {
                    setShowSuccess(false);
                }, 5000);
                reset();
            },
            onError: (errors) => {
                setShowError(true);
                console.log(errors);
                setMessage('Unable to submit Service Request');
                setTimeout(() => {
                    setShowError(false);
                }, 5000);
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Service Request Form" />
            <div className=' text-vermilion-700 bg-white container w-md-50 rounded-md shadow-sm p-4  mt-4'>
                <form onSubmit={handleSubmit}>
                    {showSuccess && <div className="text-green-600">{message}</div>}
                    {showError && <div className="text-red-600">{message}</div>}

                    <div className="mt-4">
                        <label htmlFor="service_type" className="block font-medium text-sm ">
                            Service Type
                        </label>
                        <select
                            id="service_type"
                            name="service_type"
                            value={data.service_type}
                            onChange={(e) => setData('service_type', e.target.value)}
                            className="mt-1 block w-full "
                            required
                        >
                            <option value="">Select Service Type</option>
                            <option value="flight">Flight</option>
                            <option value="cab">Cab</option>
                            <option value="visa">Visa</option>
                            <option value="hotel">Hotel</option>
                            {/* Add other service options as needed */}
                        </select>
                        {errors.service_type && <div className="text-red-600">{errors.service_type}</div>}
                    </div>

                    {/* Additional fields for flight service */}
                    {data.service_type === 'flight' && (
                        <>
                            <div className="mt-4">
                                <label htmlFor="passenger_number" className="block font-medium text-sm">
                                    Passenger Number
                                </label>
                                <TextInput
                                    id="passenger_number"
                                    type="number"
                                    name="passenger_number"
                                    value={data.passenger_number}
                                    onChange={(e) => setData('passenger_number', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                {errors.passenger_number && <div className="text-red-600">{errors.passenger_number}</div>}
                            </div>

                            {parseInt(data.passenger_number) > 0 && (
                                <div className="mt-4">
                                    <label htmlFor="passenger_names" className="block font-medium text-sm">
                                        Passenger Name(s)
                                    </label>
                                    {/* Render Passenger Name fields dynamically based on passenger number */}
                                    {Array.from({ length: parseInt(data.passenger_number) }).map((_, index) => (
                                        <TextInput
                                            key={index}
                                            id={`passenger_name_${index}`}
                                            type="text"
                                            name={`passenger_names[${index}]`}
                                            value={data.passenger_names[index] || ''}
                                            onChange={(e) => {
                                                const newPassengerNames = [...data.passenger_names];
                                                newPassengerNames[index] = e.target.value;
                                                setData('passenger_names', newPassengerNames);
                                            }}
                                            className="mt-1 block w-full"
                                            placeholder={`Passenger ${index + 1} Name`}
                                            required
                                        />
                                    ))}
                                    {errors.passenger_names && <div className="text-red-600">{errors.passenger_names}</div>}
                                </div>
                            )}

                            <div className="mt-4">
                                <label htmlFor="domestic_international" className="block font-medium text-sm ">
                                    Domestic/International
                                </label>
                                <select
                                    id="domestic_international"
                                    name="domestic_international"
                                    value={data.domestic_international}
                                    onChange={(e) => setData('domestic_international', e.target.value)}
                                    className="mt-1 block w-full "
                                    required
                                >
                                    <option value="">Select Option</option>
                                    <option value="domestic">Domestic</option>
                                    <option value="international">International</option>
                                </select>
                                {errors.domestic_international && <div className="text-red-600">{errors.domestic_international}</div>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="oneway_roundway" className="block font-medium text-sm ">
                                    One Way/Roundway
                                </label>
                                <select
                                    id="oneway_roundway"
                                    name="oneway_roundway"
                                    value={data.oneway_roundway}
                                    onChange={(e) => setData('oneway_roundway', e.target.value)}
                                    className="mt-1 block w-full "
                                    required
                                >
                                    <option value="">Select Option</option>
                                    <option value="oneway">One Way</option>
                                    <option value="roundway">Roundway</option>
                                </select>
                                {errors.oneway_roundway && <div className="text-red-600">{errors.oneway_roundway}</div>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="from_location" className="block font-medium text-sm">
                                    From (Location)
                                </label>
                                <TextInput
                                    id="from_location"
                                    type="text"
                                    name="from_location"
                                    value={data.from_location}
                                    onChange={(e) => setData('from_location', e.target.value)}
                                    className="mt-1 block w-full "
                                    required
                                />
                                {errors.from_location && <div className="text-red-600">{errors.from_location}</div>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="to_location" className="block font-medium text-sm">
                                    To (Location)
                                </label>
                                <TextInput
                                    id="to_location"
                                    type="text"
                                    name="to_location"
                                    value={data.to_location}
                                    onChange={(e) => setData('to_location', e.target.value)}
                                    className="mt-1 block w-full "
                                    required
                                />
                                {errors.to_location && <div className="text-red-600">{errors.to_location}</div>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="departure_date" className="block font-medium text-sm">
                                    Departure Date
                                </label>
                                <TextInput
                                    id="departure_date"
                                    type="date"
                                    name="departure_date"
                                    value={data.departure_date}
                                    onChange={(e) => setData('departure_date', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                {errors.departure_date && <div className="text-red-600">{errors.departure_date}</div>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="airline_name" className="block font-medium text-sm">
                                    Airline Name
                                </label>
                                <TextInput
                                    id="airline_name"
                                    name="airline_name"
                                    value={data.airline_name}
                                    onChange={(e) => setData('airline_name', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                {errors.airline_name && <div className="text-red-600">{errors.airline_name}</div>}
                            </div>
                            <div className="mt-4">
                                <label htmlFor="price" className="block font-medium text-sm">
                                  Price
                                </label>
                                <TextInput
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    className="mt-1 block w-full"
                                    required
                                />
                                {errors.price && <div className="text-red-600">{errors.price}</div>}
                            </div>

                        </>
                    )}

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
