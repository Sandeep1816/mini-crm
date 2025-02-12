import { useState } from 'react';

export default function EmployeeManagement() {
  const companies = ['IPS', 'GMEC', 'TASCON', 'FPS'];
  const [selectedCompany, setSelectedCompany] = useState('');

  // Dummy employee data for each company
  const employeesData = {
    IPS: [
      { id: 1, name: 'Alice', email: 'alice@ips.com', role: 'Sales', phone: '111-111-1111' },
      { id: 2, name: 'Bob', email: 'bob@ips.com', role: 'Support', phone: '222-222-2222' },
    ],
    GMEC: [
      { id: 3, name: 'Charlie', email: 'charlie@gmec.com', role: 'Manager', phone: '333-333-3333' },
    ],
    TASCON: [
      { id: 4, name: 'David', email: 'david@tascon.com', role: 'Engineer', phone: '444-444-4444' },
    ],
    FPS: [
      { id: 5, name: 'Eve', email: 'eve@fps.com', role: 'HR', phone: '555-555-5555' },
    ]
  };

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Employee Management</h1>
      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="company">Select Company: </label>
        <select
          id="company"
          value={selectedCompany}
          onChange={handleCompanyChange}
          style={{ padding: '8px', marginLeft: '10px' }}
        >
          <option value="">--Select Company--</option>
          {companies.map((company, index) => (
            <option key={index} value={company}>{company}</option>
          ))}
        </select>
      </div>

      {selectedCompany && employeesData[selectedCompany] && (
        <div>
          <h2>{selectedCompany} Employees</h2>
          <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employeesData[selectedCompany].map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.role}</td>
                  <td>{employee.phone}</td>
                  <td>
                    <button style={{ marginRight: '5px' }}>Edit</button>
                    <button>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
