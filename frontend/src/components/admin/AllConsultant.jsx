import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllConsultant = () => {
  const [consultants, setConsultants] = useState([]);

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const res = await axios.get('/api/admin/allconsultants');
        console.log("response is", res.data);

        // Safely set consultants
        const consultantList = Array.isArray(res.data) ? res.data : res.data.consultants || [];
        setConsultants(consultantList);
      } catch (err) {
        console.error('Failed to fetch consultants:', err);
        setConsultants([]);
      }
    };

    fetchConsultants();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Consultant List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th style={{backgroundColor : "#AB47BC"}}>#</th>
              <th style={{backgroundColor : "#AB47BC"}}>Photo</th>
              <th style={{backgroundColor : "#AB47BC"}}>Name</th>
              <th style={{backgroundColor : "#AB47BC"}}>Email</th>
              <th style={{backgroundColor : "#AB47BC"}}>Phone</th>
              <th style={{backgroundColor : "#AB47BC"}}>Expertise</th>
              <th style={{backgroundColor : "#AB47BC"}}>Location</th>
              <th style={{backgroundColor : "#AB47BC"}}>Experience</th>
              <th style={{backgroundColor : "#AB47BC"}}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(consultants) && consultants.length > 0 ? (
              consultants.map((c, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={c.image?.startsWith('/') ? `http://localhost:5000${c.image}` : c.image}
                      alt={c.name}
                      style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }}
                    />
                  </td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.expertise}</td>
                  <td>{c.location}</td>
                  <td>{c.experience} yrs</td>
                  <td>⭐ {c.rating}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">No consultants found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllConsultant;
