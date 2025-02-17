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
    ],
  };

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
      <div className="mb-4">
        <label htmlFor="company" className="font-semibold">Select Company:</label>
        <select
          id="company"
          value={selectedCompany}
          onChange={handleCompanyChange}
          className="ml-2 p-2 border rounded"
        >
          <option value="">--Select Company--</option>
          {companies.map((company, index) => (
            <option key={index} value={company}>{company}</option>
          ))}
        </select>
      </div>

      {selectedCompany && employeesData[selectedCompany] && (
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-2">{selectedCompany} Employees</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Phone Number</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {employeesData[selectedCompany].map((employee) => (
                <tr key={employee.id} className="text-center">
                  <td className="border p-2">{employee.name}</td>
                  <td className="border p-2">{employee.email}</td>
                  <td className="border p-2">{employee.role}</td>
                  <td className="border p-2">{employee.phone}</td>
                  <td className="border p-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
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

// pages/admin/employee-management.js
// import { useState } from 'react';

// export default function EmployeeManagement() {
//   const [showForm, setShowForm] = useState(false);
//   const [employeeData, setEmployeeData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: '',
//     company: '',
//   });

//   const handleChange = (e) => {
//     setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Send employee data to backend API
//     const response = await fetch('/api/employees', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(employeeData),
//     });
//     if (response.ok) {
//       // Handle success
//       alert('Employee added successfully');
//       setShowForm(false);
//     } else {
//       // Handle error
//       alert('Error adding employee');
//     }
//   };

//   return (
//     <div>
//       <h1>Employee Management</h1>
//       <button onClick={() => setShowForm(!showForm)}>Add Employee</button>
//       {showForm && (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="name"
//             value={employeeData.name}
//             onChange={handleChange}
//             placeholder="Name"
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             value={employeeData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//           />
//           <input
//             type="password"
//             name="password"
//             value={employeeData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//           />
//           <input
//             type="text"
//             name="role"
//             value={employeeData.role}
//             onChange={handleChange}
//             placeholder="Role"
//             required
//           />
//           <input
//             type="text"
//             name="company"
//             value={employeeData.company}
//             onChange={handleChange}
//             placeholder="Company"
//             required
//           />
//           <button type="submit">Save</button>
//         </form>
//       )}
//     </div>
//   );
// }
