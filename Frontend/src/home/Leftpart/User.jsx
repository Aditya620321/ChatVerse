import React from "react";
import useConversation from "../../statemanage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { socket, onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);
  console.log("User object keys and values:", user);
  return (
    
    <div
      className={`hover:bg-slate-600 duration-300 ${
        isSelected ? "bg-slate-700" : ""
      }`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex space-x-4 px-8 py-3 hover:bg-slate-700 duration-300 cursor-pointer">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img
  src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${user._id}`}
  alt="User avatar"
/>
          </div>
        </div>
        <div class="py-1">
          <h1 className="font-bold text-xl">{user.fullname}</h1>

        </div>
      </div>
    </div>
  );
}

export default User;
