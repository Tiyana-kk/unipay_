import React, { useState } from "react";
import StudentLayout from "./StudentLayout";
import StatCard from "../../components/StatCard";
import { INITIAL_FEES } from "../../data/feesData";

function StudentDashboard() {

  const paid = INITIAL_FEES.filter(f => f.status === "paid")
  .reduce((s, f) => s + f.amt, 0);

  const pending = INITIAL_FEES.filter(f => f.status !== "paid")
  .reduce((s, f) => s + f.amt, 0);

  return (

    <StudentLayout>

      <h2>Welcome Tiyana</h2>

      <div className="stats">

        <StatCard
          title="Total Paid"
          value={`₹${paid}`}
        />

        <StatCard
          title="Pending Fees"
          value={`₹${pending}`}
        />

      </div>

    </StudentLayout>
  );
}

export default StudentDashboard;