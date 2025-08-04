import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddTimeSlots = ({ consultantId }) => {
  const [slotDate, setSlotDate] = useState('');
  const [dailySlots, setDailySlots] = useState([{ startTime: '', endTime: '' }]);

  const handleSlotChange = (index, field, value) => {
    const updatedSlots = [...dailySlots];
    updatedSlots[index][field] = value;

    if (field === 'startTime') {
      const [hours, minutes] = value.split(':').map(Number);
      const startDate = new Date();
      startDate.setHours(hours);
      startDate.setMinutes(minutes + 45);

      const endHours = startDate.getHours().toString().padStart(2, '0');
      const endMinutes = startDate.getMinutes().toString().padStart(2, '0');
      updatedSlots[index].endTime = `${endHours}:${endMinutes}`;
    }

    setDailySlots(updatedSlots);
  };

  const addSlotRow = () => {
    setDailySlots([...dailySlots, { startTime: '', endTime: '' }]);
  };

  const submitSlots = async () => {
      const phone = localStorage.getItem('phone')
    try {
      const response = await axios.post(`/api/admin/AddSlots/${phone}`, {
        date: slotDate,
        slots: dailySlots
      });
      // alert('Slots submitted successfully!');
      toast.success("Slots submitted successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(error);
      // alert('Error submitting slots');
      toast.error("Error submitting slots");
    }
  };

  return (
    <div className="container mt-4">
      <h4>Create Daily Available Slots</h4>

      <div className="mb-3">
  <label>Select Date:</label>
  <input
    type="date"
    className="form-control"
    value={slotDate}
    min={new Date().toISOString().split('T')[0]} // This sets today as the minimum
    onChange={(e) => setSlotDate(e.target.value)}
  />
</div>


      {dailySlots.map((slot, index) => (
        <div className="row mb-2" key={index}>
          <div className="col">
            <input
              type="time"
              className="form-control"
              value={slot.startTime}
              onChange={(e) => handleSlotChange(index, 'startTime', e.target.value)}
              placeholder="Start Time"
            />
          </div>
          <div className="col">
            <input
              type="time"
              className="form-control"
              value={slot.endTime}
              onChange={(e) => handleSlotChange(index, 'endTime', e.target.value)}
              placeholder="End Time"
            />
          </div>
        </div>
      ))}

      <button className="btn btn-outline-secondary mb-2" onClick={addSlotRow}>
        + Add Another Slot
      </button>

      <div>
        <button className="btn btn-success" onClick={submitSlots}>
          Submit Slots
        </button>
      </div>
    </div>
  );
};

export default AddTimeSlots;
