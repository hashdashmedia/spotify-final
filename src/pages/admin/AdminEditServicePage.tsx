import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { useService } from '../../context/ServiceContext';
import Button from '../../components/ui/Button';
import type { ServicePackage } from '../../types';

const InputField: React.FC<{ label: string; name: string; type: string; value: string | number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; step?: string; }> = ({ label, name, type, value, onChange, step }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            step={step}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
        />
    </div>
);

const CheckboxField: React.FC<{ label: string; name: string; checked: boolean; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ label, name, checked, onChange }) => (
    <div className="flex items-center">
        <input
            name={name}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-[#1DB954] focus:ring-[#1DB954]"
        />
        <label className="ml-2 block text-sm text-gray-300">{label}</label>
    </div>
);


const EditablePackageCard: React.FC<{
    serviceId: string;
    pkg: ServicePackage;
    onUpdate: (serviceId: string, updatedPackage: ServicePackage) => void;
    onDelete: (serviceId: string, packageId: string) => void;
}> = ({ serviceId, pkg, onUpdate, onDelete }) => {
    const [localPackage, setLocalPackage] = useState(pkg);

    useEffect(() => {
        setLocalPackage(pkg);
    }, [pkg]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setLocalPackage(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
        }));
    };
    
    const handleSave = () => {
        onUpdate(serviceId, localPackage);
        alert('Package updated!');
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this package?')) {
            onDelete(serviceId, pkg.id);
        }
    };

    return (
        <div className="bg-[#181818] p-4 rounded-lg space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Package Name" type="text" name="name" value={localPackage.name} onChange={handleChange} />
                <InputField label="Description" type="text" name="description" value={localPackage.description} onChange={handleChange} />
                <InputField label="Quantity" type="number" name="quantity" value={localPackage.quantity} onChange={handleChange} />
                <InputField label="Price ($)" type="number" name="price" value={localPackage.price} step="0.01" onChange={handleChange} />
            </div>
            <CheckboxField label="Most Popular" name="isMostPopular" checked={!!localPackage.isMostPopular} onChange={handleChange} />
            <div className="flex justify-end space-x-2">
                <Button size="sm" variant="secondary" onClick={handleDelete}>Delete</Button>
                <Button size="sm" onClick={handleSave}>Save Package</Button>
            </div>
        </div>
    );
};

const AddPackageForm: React.FC<{
    serviceId: string;
    onAdd: (serviceId: string, newPackage: Omit<ServicePackage, 'id'>) => void;
}> = ({ serviceId, onAdd }) => {
    const initialPackageState = { name: '', description: '', quantity: 1000, price: 5.00, isMostPopular: false };
    const [newPackage, setNewPackage] = useState(initialPackageState);
    
     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setNewPackage(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'number' ? parseFloat(value) : value
        }));
    };

    const handleAdd = () => {
        if (!newPackage.name || !newPackage.quantity || !newPackage.price) {
            alert('Please fill in all required fields.');
            return;
        }
        onAdd(serviceId, newPackage);
        setNewPackage(initialPackageState); // Reset form
        alert('New package added!');
    };

    return (
        <div className="bg-[#181818] p-6 rounded-lg mt-8">
             <h3 className="text-xl font-bold text-white mb-4">Add New Package</h3>
            <div className="space-y-4">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Package Name" type="text" name="name" value={newPackage.name} onChange={handleChange} />
                    <InputField label="Description" type="text" name="description" value={newPackage.description} onChange={handleChange} />
                    <InputField label="Quantity" type="number" name="quantity" value={newPackage.quantity} onChange={handleChange} />
                    <InputField label="Price ($)" type="number" name="price" value={newPackage.price} step="0.01" onChange={handleChange} />
                </div>
                <CheckboxField label="Most Popular" name="isMostPopular" checked={newPackage.isMostPopular} onChange={handleChange} />
                <div className="flex justify-end">
                    <Button onClick={handleAdd}>Add Package</Button>
                </div>
            </div>
        </div>
    )
}

const AdminEditServicePage = () => {
    const { serviceId } = useParams<{ serviceId: string }>();
    const navigate = useNavigate();
    const { getServiceById, updateServicePackage, addServicePackage, deleteServicePackage } = useService();

    const service = serviceId ? getServiceById(serviceId) : undefined;
    
    if (!service) {
        return <Navigate to="/admin/services" replace />;
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Editing: {service.name}</h1>
                <div>
                    <Button variant="outline" onClick={() => navigate('/admin/services')}>Back to Services</Button>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-white mb-4">Existing Packages</h2>
                <div className="space-y-4">
                    {service.packages.map(pkg => (
                        <EditablePackageCard
                            key={pkg.id}
                            serviceId={service.id}
                            pkg={pkg}
                            onUpdate={updateServicePackage}
                            onDelete={deleteServicePackage}
                        />
                    ))}
                </div>
            </div>
            
            <AddPackageForm serviceId={service.id} onAdd={addServicePackage} />
        </div>
    );
};

export default AdminEditServicePage;