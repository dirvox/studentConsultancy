import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/admin/allusers');
        console.log("response is", res.data);

        const userList = Array.isArray(res.data) ? res.data : res.data.users || [];
        setUsers(userList);
      } catch (err) {
        console.error('Failed to fetch users:', err);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">User List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th style={{backgroundColor : "#AB47BC"}}>#</th>
              {/* <th>Photo</th>
              <th>Name</th> */}
              <th style={{backgroundColor : "#AB47BC"}}>Email</th>
              <th style={{backgroundColor : "#AB47BC"}}>Phone</th>
              <th style={{backgroundColor : "#AB47BC"}}>Role</th>
              <th style={{backgroundColor : "#AB47BC"}}>Status</th>
              {/* <th>Experience</th>
              <th>Rating</th> */}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) && users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {/* <td>
                    <img
                      src={user.image?.startsWith('/') ? `http://localhost:5000${user.image}` : user.image}
                      alt={user.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </td>
                  <td>{user.name}</td> */}
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role || '-'}</td>
                  <td>{user.userStatus || '-'}</td>
                  {/* <td>{user.experience ? `${user.experience} yrs` : '-'}</td>
                  <td>{user.rating ? `⭐ ${user.rating}` : '-'}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
