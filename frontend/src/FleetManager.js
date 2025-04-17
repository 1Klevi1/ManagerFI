import React, { useState, useEffect } from 'react';


function FleetManager () {
    const [formKey, setFormKey] = useState(0);

    const [vehicles, setVehicles] = useState([]);
    const [form, setForm] = useState({
      make: '', model: '', year: '', vin: '', license_plate: ''
    });
    const [editId, setEditId] = useState(null);

    const fetchVehicles = async () => {
        try {
            const res = await fetch('http://localhost:5000/vehicles');
            if (!res.ok) {
                throw new Error('Failed to fetch vehicles');
            }
            const data = await res.json();
            setVehicles(data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            alert('Failed to fetch vehicles. Please try again later.');
        }
    };

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const url = editId
          ? `http://localhost:5000/vehicles/${editId}`
          : `http://localhost:5000/vehicles`;
      const method = editId ? 'PATCH' : 'POST';

      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      setForm({ make: '', model: '', year: '', vin: '', license_plate: '' });
      setEditId(null);
      fetchVehicles();
        setFormKey(prev => prev + 1); // Re-render form
        setTimeout(() => {
            document.querySelector('input[name="make"]')?.focus();
        }, 100);
    };

    const handleEdit = (vehicle) => {
      setForm(vehicle);
      setEditId(vehicle.id);
    };
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle?')) {
            try {
                await fetch(`http://localhost:5000/vehicles/${id}`, { method: 'DELETE' });
                fetchVehicles();

            } catch (error) {
                alert('Failed to delete vehicle: ' + error.message);
            }
        }
    };

    useEffect(() => {
        fetchVehicles();
        // Optional: force repaint on first load
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 200);
    }, []);

    return (

        <div className="min-h-screen bg-gray-100 pt-32 mt-18">
            <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-blue-600 mb-6">🚗 Vehicle Inventory</h1>
                <div key={formKey}>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-6">
                        <input className="border p-2 rounded" name="make" placeholder="Make" value={form.make}
                               onChange={handleChange} required
                        />
                        <input className="border p-2 rounded" name="model" placeholder="Model" value={form.model}
                               onChange={handleChange}
                               required
                        />
                        <input className="border p-2 rounded" name="year" placeholder="Year" value={form.year}
                               onChange={handleChange}
                        />
                        <input className="border p-2 rounded" name="vin" placeholder="VIN" value={form.vin}
                               onChange={handleChange}
                        />
                        <input className="border p-2 rounded col-span-2" name="license_plate"
                               placeholder="License Plate"
                               value={form.license_plate}
                               onChange={handleChange}
                        />
                        <div className="flex space-x-2 col-span-2">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" type="submit"
                            >
                                {editId ? 'Update' : 'Add'} Vehicle
                            </button>
                            {editId && (
                                <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400" type="button"
                                        onClick={() => {
                                            setEditId(null);
                                            setForm({make: '', model: '', year: '', vin: '', license_plate: ''});
                                        }}
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </form>
                </div>

                    <table className="w-full table-auto border-collapse">
                        <thead>
                        <tr className="bg-gray-200">
                            <th className="border px-4 py-2">Make</th>
                            <th className="border px-4 py-2">Model</th>
                            <th className="border px-4 py-2">Year</th>
                            <th className="border px-4 py-2">VIN</th>
                            <th className="border px-4 py-2">Plate</th>
                            <th className="border px-4 py-2">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {vehicles.map((v) => (
                            <tr key={v.id} className="text-center">
                                <td className="border px-4 py-2">{v.make}</td>
                                <td className="border px-4 py-2">{v.model}</td>
                                <td className="border px-4 py-2">{v.year}</td>
                                <td className="border px-4 py-2">{v.vin}</td>
                                <td className="border px-4 py-2">{v.license_plate}</td>
                                <td className="border px-4 py-2 space-x-2">
                                    <button onClick={() => handleEdit(v)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button onClick={() => handleDelete(v.id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </div>
            );
            }

            export default FleetManager;
