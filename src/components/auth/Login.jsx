import React, { useState } from "react";
import { C } from "../../utils/constants";
import { useWindowWidth } from "../../hooks/useWindowWidth";

export function Login({ onLogin }) {
  const [role, setRole] = useState("student");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const w = useWindowWidth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!identifier || !password) return;
    setLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setLoading(false);
      onLogin(role);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
      background: C.bg // typically #f0f6ff
    }}>
      <div style={{
        background: C.white,
        borderRadius: 24,
        padding: w < 480 ? 24 : 40,
        width: "100%",
        maxWidth: 440,
        boxShadow: "0 20px 60px rgba(37,99,235,.08)",
        animation: "fadeUp .4s ease"
      }}>
        {/* Logo or Title Area */}
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: C.text, marginBottom: 8 }}>
            UniPay
          </div>
          <div style={{ fontSize: 14, color: C.muted }}>
            Log in to manage your fees and payments.
          </div>
        </div>

        {/* Role Switcher */}
        <div style={{
          display: "flex",
          background: C.bg,
          borderRadius: 12,
          padding: 4,
          marginBottom: 24
        }}>
          {["student", "hod"].map(r => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              style={{
                flex: 1,
                padding: "10px 0",
                border: "none",
                borderRadius: 8,
                background: role === r ? C.white : "transparent",
                color: role === r ? C.accent : C.muted,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                boxShadow: role === r ? "0 4px 12px rgba(0,0,0,.05)" : "none",
                transition: "all .2s ease",
                textTransform: "capitalize"
              }}
            >
              {r === "hod" ? "HOD" : "Student"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text2, marginBottom: 8 }}>
              {role === "student" ? "Registration Number / Email" : "Employee ID / Email"}
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={role === "student" ? "e.g. 21BCE1234" : "e.g. HOD001"}
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 12,
                border: `1.5px solid ${C.border}`,
                background: C.bg,
                fontSize: 14,
                fontFamily: "inherit",
                color: C.text,
                outline: "none",
                transition: "border-color .2s"
              }}
              onFocus={(e) => e.target.style.borderColor = C.accent}
              onBlur={(e) => e.target.style.borderColor = C.border}
              required
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: C.text2, marginBottom: 8 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "14px 16px",
                borderRadius: 12,
                border: `1.5px solid ${C.border}`,
                background: C.bg,
                fontSize: 14,
                fontFamily: "inherit",
                color: C.text,
                outline: "none",
                transition: "border-color .2s"
              }}
              onFocus={(e) => e.target.style.borderColor = C.accent}
              onBlur={(e) => e.target.style.borderColor = C.border}
              required
            />
          </div>

          <div style={{ textAlign: "right", marginTop: -8, marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: C.accent, fontWeight: 600, cursor: "pointer" }}>
              Forgot Password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: 14,
              borderRadius: 12,
              border: "none",
              background: `linear-gradient(135deg, ${C.accent}, ${C.accent2})`,
              color: "#fff",
              fontSize: 15,
              fontWeight: 800,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              boxShadow: `0 8px 20px rgba(37,99,235,.25)`,
              transition: "transform .2s, box-shadow .2s",
              opacity: loading ? 0.8 : 1
            }}
            onMouseEnter={(e) => { if (!loading) e.target.style.transform = "translateY(-1px)" }}
            onMouseLeave={(e) => { if (!loading) e.target.style.transform = "none" }}
          >
            {loading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
