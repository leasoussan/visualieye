import React, { useEffect } from "react";


const Logout = ({ setIsLoggedIn }) => {
  useEffect(() => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("isLoggin");
    
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);

  return (
    <div>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;

