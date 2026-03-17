import React from "react";

function Navbar({ onLogout }) {
  return (
    <nav className="navbar">
      <h2>UNIPAY</h2>

      <div className="user-info">
        <span>TIYANA K K</span>
        
        <button onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;