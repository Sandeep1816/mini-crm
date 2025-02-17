

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
  const [editingLead, setEditingLead] = useState(null);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      setLeads(data.leads);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLead = (newLead) => {
    setLeads((prevLeads) => [...prevLeads, newLead]);
  };

  const toggleAddLeadForm = () => {
    setShowAddLeadForm((prevShow) => !prevShow);
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

  const handleEditClick = (lead) => {
    setEditingLead(lead);
  };

  const handleUpdateLead = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/leads', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingLead),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Update error:', errorData);
        throw new Error('Failed to update lead');
      }
      const data = await response.json();
      // Update the local leads state with the updated lead
      setLeads((prevLeads) =>
        prevLeads.map((lead) => (lead.id === data.lead.id ? data.lead : lead))
      );
      setEditingLead(null);
    } catch (error) {
      console.error('handleUpdateLead error:', error);
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

      <div style={{ marginBottom: '20px' }}>
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

      {editingLead && (
        <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '16px' }}>
          <h3>Edit Lead</h3>
          <form onSubmit={handleUpdateLead}>
            <div>
              <label>Name: </label>
              <input
                type="text"
                value={editingLead.name}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, name: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Email: </label>
              <input
                type="email"
                value={editingLead.email}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Phone: </label>
              <input
                type="text"
                value={editingLead.phone}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, phone: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Status: </label>
              <input
                type="text"
                value={editingLead.status}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, status: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Company: </label>
              <input
                type="text"
                value={editingLead.company}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, company: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>City: </label>
              <input
                type="text"
                value={editingLead.city}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, city: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Message: </label>
              <textarea
                value={editingLead.message}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, message: e.target.value })
                }
                required
              />
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditingLead(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

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
                <th>Edit</th>
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
                  <td>
                    <button onClick={() => handleEditClick(lead)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

