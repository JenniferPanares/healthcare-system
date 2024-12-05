import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]); // Admin manages appointments

  // Fetch all appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        console.error("Failed to fetch appointments. Please try again later.");
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <section className="dashboard page">
      <div className="banner">
        <div className="firstBox">
          <h3>Admin Dashboard</h3>
          <p>Manage all appointments and oversee operations.</p>
        </div>
        <div className="secondBox">
          <p>Total Appointments</p>
          <h3>{appointments.length}</h3>
        </div>
        <div className="thirdBox">
          <p>Registered Doctors</p>
          <h3>10</h3>
        </div>
      </div>

      <div className="banner">
        <h5>Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                  <td>{appointment.appointment_date.substring(0, 16)}</td>
                  <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                  <td>{appointment.department}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminDashboard;
