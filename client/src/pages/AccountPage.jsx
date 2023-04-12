import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import PlacesPage from "./PlacesPage";
import ProfilePage from "./ProfilePage";
import AccountNav from "../components/AccountNav";

const AccountPage = () => {
  const [redirectToHome, setRedirectToHome] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();

  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
    setRedirectToHome("/");
  };

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirectToHome) {
    return <Navigate to={"/login"} />;
  }

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (redirectToHome) {
    return <Navigate to={redirectToHome} />;
  }

  return (
    <div>
      <AccountNav/>
      {subpage === "profile" && <ProfilePage user={user} logout={logout} />}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
};

export default AccountPage;
