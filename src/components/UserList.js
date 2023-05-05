import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUsers } from "../api/userApi";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);


  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);


  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.displayName}</td>
              <td>{user.email}</td>
              <td>{new Date(user.joined).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default UserList;
