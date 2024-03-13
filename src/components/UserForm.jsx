/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react"; // Add useState here
import axios from "axios";
import { PlusIcon } from "@heroicons/react/24/solid";

const UserForm = ({
  addUser,
  selectedUser,
  selectedDate,
  setSelectedUser,
  setSelectedDate,
}) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.194:8080/RedGroupTask/users/"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Implement your form submission logic here
    addUser(); // Call the addUser function passed from the App component
  };

  return (
    <form className="todo" onSubmit={handleFormSubmit}>
      <div className="wrapper">
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          className="input"
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} {user.surname}
            </option>
          ))}
        </select>
      </div>

      <div className="wrapper">
        <input
          type="date"
          id="selectedDate"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="input"
          required
        />
        <label htmlFor="selectedDate" className="label">
          Select Date
        </label>
      </div>

      <button className="btn" aria-label="Add User" type="submit">
        <PlusIcon className="h-6 w-6 text-blue-500" />
      </button>
    </form>
  );
};

export default UserForm;