import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { user } = useSelector((state) => ({ ...state }));

  return (
    <div className="flex justify-center">
      <input type="text" className="border-b" value={user.username} />
      <input type="text" className="border-b" value={user.email} />
    </div>
  );
};

export default UserProfile;
