import React, { useState } from "react";
import { INITIAL_FEES } from "../../utils/constants";
import { useWindowWidth } from "../../hooks/useWindowWidth";

import { Navbar } from "../../components/common/Navbar";
import { ProfileDrawer } from "../../components/common/ProfileDrawer";
import { PaymentModal } from "../../components/common/PaymentModal";
import { Toast } from "../../components/common/Toast";

import { FeeSection } from "../../components/fees/FeeSection";
import { HostelSection } from "../../components/hostel/HostelSection";

export default function StudentDashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
 // const [activeTab, setActiveTab] = useState("fees");
  const [fees, setFees] = useState(INITIAL_FEES);
  const [modalData, setModalData] = useState(null);
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

 // const width = useWindowWidth();

  const handlePayNow = (id) => {
    const fee = fees.find(f => f.id === id);
    if (!fee) return;
    setModalData({
      id: fee.id,
      title: fee.type,
      sub: `To ${fee.cat}`,
      amount: `₹${fee.amt.toLocaleString("en-IN")}`,
      cat: fee.cat
    });
  };

  const handleConfirmPayment = (receiptData) => {
    setFees(prev => prev.map(f => {
      if(f.id === modalData.id) {
        return { 
          ...f, 
          status: receiptData ? "pending_verification" : "paid", 
          paidDate: "Just Now" 
        };
      }
      return f;
    }));
    setModalData(null);
    setToastMsg(receiptData ? "Receipt uploaded successfully. Waiting for verification by authority." : "Payment successful.");
    setToast(true);
  };

  return (
    <>
      <Navbar onAvatarClick={() => setDrawerOpen(true)} />
      <FeeSection
        fees={fees}
        onPayNow={handlePayNow}
      />
      <HostelSection />
      <ProfileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
      <PaymentModal
        modalData={modalData}
        onClose={() => setModalData(null)}
        onConfirm={handleConfirmPayment}
      />
      <Toast show={toast} setShow={setToast} message={toastMsg} />
    </>
  );
}