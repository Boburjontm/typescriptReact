import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Xato:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-20 text-xl">Yuklanmoqda...</div>;
  }

  if (!user) {
    return <div className="text-center mt-20 text-xl">Foydalanuvchi topilmadi!</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="p-10 mt-10 bg-white rounded-lg shadow-lg w-96 transition transform hover:scale-105 duration-300">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{user.name}</h1>
        <p className="text-gray-600 mb-2">
          <strong>Username:</strong> {user.username}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="text-gray-600 mb-2">
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className="text-gray-600 mb-4">
          <strong>Website:</strong> {user.website}
        </p>
        <Link
          to="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Orqaga qaytish
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
