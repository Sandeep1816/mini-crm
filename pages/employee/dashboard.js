import React, { useState, useEffect } from 'react';
import AddLeadForm from '../components/AddLeadForm'; // Adjust the path as necessary

export default function EmployeeDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddLeadForm, setShowAddLeadForm] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data.leads);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
      setLoading(false);
    }
  };

  const handleAddLead = (newLead) => {
    setLeads([...leads, newLead]);
  };

  const toggleAddLeadForm = () => {
    setShowAddLeadForm(!showAddLeadForm);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Employee Dashboard</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={toggleAddLeadForm} style={{ padding: '8px 16px' }}>
          {showAddLeadForm ? 'Hide Add Lead Form' : 'Show Add Lead Form'}
        </button>
      </div>

      {showAddLeadForm && <AddLeadForm onAddLead={handleAddLead} />}

      <div>
        <h2>Leads</h2>
        {loading ? (
          <p>Loading leads...</p>
        ) : (
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Status</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.status}</td>
                  <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(lead.createdAt).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
