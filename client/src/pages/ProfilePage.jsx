import React from "react";
import avatar from "../assets/avatar.png";

const ProfilePage = ({ user, logout }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="my-8">
        <img src={avatar} />
      </div>
      <div className="mb-8 text-xl text-gray-700">
        Logged in as {user.name} ({user.email})
      </div>

      <button className="primary max-w-xs" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
