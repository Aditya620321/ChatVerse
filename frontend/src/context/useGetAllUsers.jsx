import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

function useGetAllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get("jwt");
        const response = await axios.get("/api/user/allusers", {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


        if (Array.isArray(response.data)) {
          setAllUsers(response.data);
        } else {
          console.error("Expected array, got:", response.data);
          setAllUsers([]); // fallback
        }

      } catch (error) {
        console.error("Error in useGetAllUsers:", error);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };

    getUsers();
  }, []);

  return [allUsers, loading];
}

export default useGetAllUsers;
