import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [userAppointments, setUserAppointments] = useState([]);

  // Fetch user-specific appointments
  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/userAppointments",
          { withCredentials: true }
        );
        setUserAppointments(data.appointments);
      } catch (error) {
        console.error("Failed to fetch user appointments.");
        setUserAppointments([]);
      }
    };
    fetchUserAppointments();
  }, []);

  return (
    <section className="dashboard page">
      <div className="banner">
        <h3>User Dashboard</h3>
        <p>View your appointments and their status.</p>
      </div>

      <div className="banner">
        <h5>Your Appointments</h5>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Doctor</th>
              <th>Department</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userAppointments.length > 0 ? (
              userAppointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.appointment_date.substring(0, 16)}</td>
                  <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                  <td>{appointment.department}</td>
                  <td>{appointment.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
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

export default UserDashboard;
