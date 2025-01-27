import React from "react";
import { useAuth } from "../auth/AuthContext";

const Profile = () => {
  const { auth } = useAuth();

  return (
    <div >
      <h1>Profile user</h1>
    </div>
  );
};

export default Profile;
