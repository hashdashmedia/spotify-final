import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';

const AccountPage = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would be an API call
    login(email, name); // Re-login to update context state
    alert('Profile updated successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords don't match!");
      return;
    }
    // In a real app, this would be an API call
    alert('Password changed successfully!');
    setNewPassword('');
    setCurrentPassword('');
    setConfirmPassword('');
  };
  
  const InputField = ({ id, label, type, value, onChange }: { id: string, label: string, type: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
        <input 
            type={type} 
            id={id}
            value={value}
            onChange={onChange}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#1DB954]"
            required
        />
    </div>
  )

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Profile Details Card */}
            <div className="bg-[#181818] p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-6">Profile Details</h2>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <InputField id="name" label="Full Name" type="text" value={name} onChange={e => setName(e.target.value)} />
                    <InputField id="email" label="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                    <div className="pt-2">
                        <Button type="submit" fullWidth>Save Changes</Button>
                    </div>
                </form>
            </div>

            {/* Change Password Card */}
            <div className="bg-[#181818] p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-white mb-6">Change Password</h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <InputField id="currentPassword" label="Current Password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                    <InputField id="newPassword" label="New Password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                    <InputField id="confirmPassword" label="Confirm New Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <div className="pt-2">
                        <Button type="submit" fullWidth>Change Password</Button>
                    </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
