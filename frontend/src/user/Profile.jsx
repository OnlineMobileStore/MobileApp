import React from "react";
import { useAuth } from "../auth/AuthContext";
import Footer from "../components/Footer";

const UserProfile = () => {
  const { auth } = useAuth();

  return (
    <div >
        <NavbarComponent/>
      <h1>Profile user</h1>
      <Footer/>
    </div>
  );
};

export default UserProfile;
