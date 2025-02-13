import React, { useState, useEffect } from 'react';
import AddLeadForm from '../components/AddLeadForm'; // Adjust the path as necessary
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function EmployeeDashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddLeadForm, setShowAddLeadForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredLeadsCount, setFilteredLeadsCount] = useState(0);

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

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const count = leads.filter((lead) => {
        const leadDate = new Date(lead.createdAt);
        return (
          leadDate.getDate() === date.getDate() &&
          leadDate.getMonth() === date.getMonth() &&
          leadDate.getFullYear() === date.getFullYear()
        );
      }).length;
      setFilteredLeadsCount(count);
    } else {
      setFilteredLeadsCount(0);
    }
  };

  const filteredLeads = selectedDate
    ? leads.filter((lead) => {
        const leadDate = new Date(lead.createdAt);
        return (
          leadDate.getDate() === selectedDate.getDate() &&
          leadDate.getMonth() === selectedDate.getMonth() &&
          leadDate.getFullYear() === selectedDate.getFullYear()
        );
      })
    : leads;

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
        <h2>Filter Leads by Date</h2>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
        />
        {selectedDate && (
          <p>
            Total Leads on {selectedDate.toLocaleDateString()}: {filteredLeadsCount}
          </p>
        )}
      </div>

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
                <th>Company</th>
                <th>Status</th>
                <th>City</th>
                <th>Message</th>
                <th>Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead) => (
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.email}</td>
                  <td>{lead.phone}</td>
                  <td>{lead.company}</td>
                  <td>{lead.status}</td>
                  <td>{lead.city}</td>
                  <td>{lead.message}</td>
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
