import React, { useState } from 'react';

export default function AddLeadForm({ onAddLead }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error('Failed to add lead');
      }
      const data = await res.json();
      onAddLead(data.lead);
      setFormData({ name: '', email: '', phone: '', status: '' });
      setIsFormVisible(false); // Hide the form after successful submission
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  return (
    <div>
      {isFormVisible ? (
        <>
          <h2>Add New Lead</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              style={{ margin: '5px', padding: '8px' }}
            /><br />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{ margin: '5px', padding: '8px' }}
            /><br />
            <input
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              style={{ margin: '5px', padding: '8px' }}
            /><br />
            <input
              type="text"
              placeholder="Status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
              style={{ margin: '5px', padding: '8px' }}
            /><br />
            <button type="submit" style={{ padding: '8px 16px' }}>Submit</button>
          </form>
        </>
      ) : (
        <p>Lead added successfully!</p>
      )}
    </div>
  );
}
