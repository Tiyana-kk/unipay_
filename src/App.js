import React, { useState, useCallback } from "react";
import { C, INITIAL_FEES } from "./utils/constants";
import { resolveStatus, fmtCurrency } from "./utils/helpers";
import { useWindowWidth } from "./hooks/useWindowWidth";

import { CheckCircle, ClockIcon, GradCap, WarnIcon } from "./components/icons";
import { Navbar } from "./components/common/Navbar";
import { ProfileDrawer } from "./components/common/ProfileDrawer";
import { StatCard } from "./components/common/StatCard";
import { PaymentModal } from "./components/common/PaymentModal";
import { Toast } from "./components/common/Toast";

import { FeeSection } from "./components/fees/FeeSection";
import { HostelSection } from "./components/hostel/HostelSection";

import HodDashboard from "./roles/hod/HodDashboard";
import { Login } from "./components/auth/Login";

import "./index.css";

export default function App() {

  // ✅ role switch
  const [role, setRole] = useState("student");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("fees");
  const [fees, setFees] = useState(INITIAL_FEES);
  const [modalData, setModalData] = useState(null);
  const [toast, setToast] = useState(false);

  const width = useWindowWidth();

  if (!isAuthenticated) {
    return (
      <Login 
        onLogin={(selectedRole) => {
          setRole(selectedRole);
          setIsAuthenticated(true);
        }} 
      />
    );
  }

  return (
    <>
      {/* 🔹 Dashboard Switch */}
      {role === "hod" ? (
        <HodDashboard />
      ) : (
        <>
          {/* Your existing Student Dashboard UI */}
          <Navbar />

          <FeeSection
            fees={fees}
            setFees={setFees}
            setModalData={setModalData}
          />

          <HostelSection />

          <ProfileDrawer
            open={drawerOpen}
            setOpen={setDrawerOpen}
          />

          <PaymentModal
            modalData={modalData}
            setModalData={setModalData}
          />

          <Toast show={toast} setShow={setToast} />
        </>
      )}
    </>
  );
}