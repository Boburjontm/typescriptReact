import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import UserDetail from "./components/UserDetail";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("API xatosi:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Yuklanmoqda...</div>;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-800 mt-10">Foydalanuvchilar Ro'yxati</h1>
        <ul className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {users.map((user) => (
            <li key={user.id} className="p-6 bg-white rounded-lg shadow-xl transition transform hover:-translate-y-1 hover:shadow-2xl duration-300">
              <Link
                to={`/users/${user.id}`}
                className="block text-center"
              >
                <div className="rounded-full bg-gray-200 h-24 w-24 mx-auto mb-4 flex items-center justify-center text-gray-500 text-2xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                <p className="text-gray-500">{user.email}</p>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Batafsil</button>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Routes>
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
