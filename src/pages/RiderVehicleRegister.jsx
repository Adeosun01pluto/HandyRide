import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function readRider(id) {
  const riders = JSON.parse(localStorage.getItem("registeredRiders") || "[]");
  return riders.find(r => r.id === id) || null;
}
function saveRider(updated) {
  const riders = JSON.parse(localStorage.getItem("registeredRiders") || "[]");
  const out = riders.map(r => (r.id === updated.id ? updated : r));
  localStorage.setItem("registeredRiders", JSON.stringify(out));
}
const fileToDataUrl = (file) =>
  new Promise((res, rej) => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.onerror = rej;
    fr.readAsDataURL(file);
  });

export default function RiderVehicleRegister() {
  const navigate = useNavigate();
  const authed = localStorage.getItem("riderAuth") === "true";
  const riderId = localStorage.getItem("currentRiderId");

  const [vehicleType, setVehicleType] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [classBegins, setClassBegins] = useState("");
  const [classEnds, setClassEnds] = useState("");
  const [studentIdCard, setStudentIdCard] = useState("");
  const [bikePic, setBikePic] = useState("");

  useEffect(() => {
    // could prefill from rider if needed
  }, []);

  // if (!authed) return <Navigate to="/rider-login" replace />;

  const save = async (e) => {
    e.preventDefault();
    const rider = readRider(riderId);
    if (!rider) return;

    const record = {
      id: Math.random().toString(36).slice(2,9),
      vehicleType,
      plateNumber,
      classBegins,
      classEnds,
      studentIdCard,  // base64
      bikePic,        // base64
      status: "pending_verification",
      submittedAt: new Date().toISOString()
    };

    const updated = { ...rider, vehicles: [record, ...(rider.vehicles || [])] };
    saveRider(updated);
    alert("Submitted for HANDYRIDE verification");
    navigate("/rider-dashboard");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <h1 className="text-xl font-semibold mb-4">Register Your Bike/Car</h1>

      <form onSubmit={save} className="bg-white rounded-lg shadow p-4 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Type</label>
            <select className="input" value={vehicleType} onChange={e=>setVehicleType(e.target.value)} required>
              <option value="">Select</option>
              <option>Motorcycle</option>
              <option>Car</option>
              <option>Tricycle</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Plate Number</label>
            <input className="input" value={plateNumber} onChange={e=>setPlateNumber(e.target.value)} required />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">My Class Begins</label>
            <input type="time" className="input" value={classBegins} onChange={e=>setClassBegins(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ends</label>
            <input type="time" className="input" value={classEnds} onChange={e=>setClassEnds(e.target.value)} required />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Student ID Card / Course Form</label>
          <div className="flex items-center gap-3">
            <label className="px-3 py-2 rounded border text-sm cursor-pointer">
              Upload
              <input hidden type="file" accept="image/*,application/pdf"
                onChange={async (e)=>{
                  const f = e.target.files?.[0]; if(!f) return;
                  const data = await fileToDataUrl(f);
                  setStudentIdCard(data);
                }} />
            </label>
            {studentIdCard ? <span className="text-xs text-green-700">Attached ✓</span> : <span className="text-xs text-slate-500">No file</span>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bike/Car Picture</label>
          <div className="flex items-center gap-3">
            <label className="px-3 py-2 rounded border text-sm cursor-pointer">
              Upload
              <input hidden type="file" accept="image/*"
                onChange={async (e)=>{
                  const f = e.target.files?.[0]; if(!f) return;
                  const data = await fileToDataUrl(f);
                  setBikePic(data);
                }} />
            </label>
            {bikePic ? <span className="text-xs text-green-700">Attached ✓</span> : <span className="text-xs text-slate-500">No image</span>}
          </div>
        </div>

        <button type="submit" className="btn-primary w-full">Submit for Verification</button>
        <p className="text-xs text-slate-500 text-center">HANDYRIDE verifies details</p>
      </form>
    </div>
  );
}
