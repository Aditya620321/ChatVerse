import React, { useEffect, useState } from "react";
import useConversation from "../statemanage/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      if (selectedConversation && selectedConversation._id) {
        try {
          const res = await axios.get(
            `/api/message/get/${selectedConversation._id}`
          );

          const data = res.data;
          console.log("Fetched data:", data);

          if (Array.isArray(data)) {
            setMessage(data);
          } else {
            console.error("Expected array of messages, got:", data);
            setMessage([]); // fallback to prevent map crash
          }
        } catch (error) {
          console.error("Error in getting messages:", error);
          setMessage([]); // fallback in error case
        } finally {
          setLoading(false);
        }
      }
    };
    getMessages();
  }, [selectedConversation, setMessage]);

  return { loading, messages };
};

export default useGetMessage;
