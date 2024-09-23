import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const Prescribe = () => {
  const [activeTab, setActiveTab] = useState("Prescriber");
  const [doctorName, setDoctorName] = useState("");
  const [specification, setSpecification] = useState("");
  const [qualification, setQualification] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [doctorAddress, setDoctorAddress] = useState("");
  const [doctorCity, setDoctorCity] = useState("");
  const [doctorState, setDoctorState] = useState("");
  const [doctorPincode, setDoctorPincode] = useState("");
  const [doctorMobile, setDoctorMobile] = useState("");

  const [patientName, setPatientName] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [patientMobile, setPatientMobile] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [predictedHealthAbnormality, setPredictedHealthAbnormality] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const [drugs, setDrugs] = useState([{ name: "", strength: "", quantity: "", frequency: "", pricePerUnit: "" }]);

  // New state variables for billing
  const [doctorFee, setDoctorFee] = useState("");
  const [gstRate] = useState(18);

  const date = new Date().toLocaleDateString();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold");
    doc.setTextColor(40, 60, 90);
    doc.text("Medical Prescription", 20, 20);
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Dr. ${doctorName}`, 20, 35);
    doc.text(`${specification}`, 20, 45);
    doc.text(`${qualification}`, 20, 55);
    doc.text(`${hospitalName}, ${departmentName}`, 20, 65);
    doc.text(`${doctorAddress}, ${doctorCity}, ${doctorState}, ${doctorPincode}`, 20, 75);
    doc.text(`Mobile: ${doctorMobile}`, 20, 85);
    doc.line(20, 90, 190, 90);
    doc.text(`Patient Name: ${patientName}`, 20, 105);
    doc.text(`Age: ${calculateAge(dob)}`, 150, 105);
    doc.text(`Gender: ${gender}`, 20, 115);
    doc.text(`Blood Group: ${bloodGroup}`, 150, 115);
    doc.text(`Predicted Health Issue: ${predictedHealthAbnormality}`, 20, 125);
    doc.setFontSize(12);
    doc.setFont("Helvetica", "bold");
    doc.text("Prescription Details", 20, 145);
    doc.setFont("Helvetica", "normal");
    let yPosition = 155;
    drugs.forEach((drug, index) => {
      doc.text(`${index + 1}. ${drug.name} (${drug.strength})`, 20, yPosition);
      doc.text(`Quantity: ${drug.quantity}`, 30, yPosition + 10);
      doc.text(`Frequency: ${drug.frequency}`, 30, yPosition + 20);
      doc.text(`Price per Unit: ₹${(parseFloat(drug.pricePerUnit) || 0).toFixed(2)}`, 30, yPosition + 30);
      yPosition += 40;
    });
    doc.text("Adv: ___________________________________________________________", 20, yPosition + 10);
    doc.text(`Date: ${date}`, 150, yPosition + 30);
    doc.save(`${patientName}_Prescription.pdf`);
  };

  const addDrug = () => {
    setDrugs([...drugs, { name: "", strength: "", quantity: "", frequency: "", pricePerUnit: "" }]);
  };

  const handleDrugChange = (index, field, value) => {
    const updatedDrugs = [...drugs];
    updatedDrugs[index][field] = value;
    setDrugs(updatedDrugs);
  };

  const calculateTotalBill = () => {
    const totalMedicineFee = drugs.reduce((total, drug) => {
      return total + (parseFloat(drug.quantity) || 0) * (parseFloat(drug.pricePerUnit) || 0);
    }, 0);
    const doctorFeeAmount = parseFloat(doctorFee) || 0;
    const gstAmount = ((totalMedicineFee + doctorFeeAmount) * gstRate) / 100;
    const totalAmount = totalMedicineFee + doctorFeeAmount + gstAmount;
    return { totalMedicineFee, doctorFeeAmount, gstAmount, totalAmount };
  };

  const generateBill = () => {
    const { totalMedicineFee, doctorFeeAmount, gstAmount, totalAmount } = calculateTotalBill();
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.setFont("Helvetica", "bold");
    doc.text("Bill", 20, 20);
    doc.setFontSize(12);
    doc.setFont("Helvetica", "normal");
    doc.text(`Doctor's Fee: ₹${doctorFeeAmount.toFixed(2)}`, 20, 35);
    doc.text(`Medicine Fee: ₹${totalMedicineFee.toFixed(2)}`, 20, 45);
    doc.text(`GST (18%): ₹${gstAmount.toFixed(2)}`, 20, 55);
    doc.text(`Total Amount: ₹${totalAmount.toFixed(2)}`, 20, 65);
    
    doc.save("Bill.pdf");
  };

  const getPreviousTab = () => {
    switch (activeTab) {
      case "Patient":
        return "Prescriber";
      case "Rx":
        return "Patient";
      case "Review":
        return "Rx";
      default:
        return "Prescriber";
    }
  };

  const getNextTab = () => {
    switch (activeTab) {
      case "Prescriber":
        return "Patient";
      case "Patient":
        return "Rx";
      case "Rx":
        return "Review";
      default:
        return "Prescriber";
    }
  };

  return (
    <div className="bg-blue-200 w-screen mt-8">
      <div className="flex-grow p-6 w-7/12 bg-blue-100 border border-blue-200 rounded-lg shadow-lg mx-auto">
        <h1 className="text-xl font-bold mb-4 text-center text-blue-800">Prescription Form</h1>

        <div className="flex justify-center mb-4 ">
          {["Prescriber", "Patient", "Rx", "Review"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 mx-1 border-b-2 text-blue-800 font-semibold ${
                activeTab === tab ? "border-blue-600" : "border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          {activeTab === "Prescriber" && (
            <div className="overflow-auto" style={{ maxHeight: '425px' }}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Doctor's Name</label>
                <input
                  type="text"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="e.g., Dr. John Doe"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Specification</label>
                <input
                  type="text"
                  value={specification}
                  onChange={(e) => setSpecification(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="e.g., Cardiologist"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Qualification</label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="e.g., MBBS, MD"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Hospital Name</label>
                <input
                  type="text"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="e.g., City Hospital"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Department Name</label>
                <input
                  type="text"
                  value={departmentName}
                  onChange={(e) => setDepartmentName(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="e.g., Cardiology"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Doctor Address</label>
                <textarea
                  value={doctorAddress}
                  onChange={(e) => setDoctorAddress(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="e.g., 123 Street, City"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">City</label>
                <input
                  type="text"
                  value={doctorCity}
                  onChange={(e) => setDoctorCity(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="City"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">State</label>
                <select
                  value={doctorState}
                  onChange={(e) => setDoctorState(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Pincode</label>
                <input
                  type="text"
                  value={doctorPincode}
                  onChange={(e) => setDoctorPincode(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="Pincode"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Mobile Number</label>
                <input
                  type="text"
                  value={doctorMobile}
                  onChange={(e) => setDoctorMobile(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="Mobile Number"
                />
              </div>
            </div>
          )}

          {activeTab === "Patient" && (
            <div className="overflow-auto" style={{ maxHeight: '425px' }}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="e.g., Jane Doe"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Patient Address</label>
                <textarea
                  value={patientAddress}
                  onChange={(e) => setPatientAddress(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="e.g., 456 Avenue, City"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Mobile Number</label>
                <input
                  type="text"
                  value={patientMobile}
                  onChange={(e) => setPatientMobile(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="Mobile Number"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Predicted Health Abnormality</label>
                <input
                  type="text"
                  value={predictedHealthAbnormality}
                  onChange={(e) => setPredictedHealthAbnormality(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="e.g., Hypertension"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Blood Group</label>
                <input
                  type="text"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="e.g., O+"
                />
              </div>
            </div>
          )}

          {activeTab === "Rx" && (
            <div className="overflow-auto" style={{ maxHeight: '425px' }}>
              <h3 className="text-lg font-bold mb-4">Prescription Details</h3>
              {drugs.map((drug, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-sm font-bold mb-1">Drug Name</label>
                  <input
                    type="text"
                    value={drug.name}
                    onChange={(e) => handleDrugChange(index, "name", e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                    placeholder="Enter Drug Name"
                  />
                  <label className="block text-sm font-bold mb-1">Strength</label>
                  <input
                    type="text"
                    value={drug.strength}
                    onChange={(e) => handleDrugChange(index, "strength", e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                    placeholder="Enter Strength"
                  />
                  <label className="block text-sm font-bold mb-1">Quantity</label>
                  <input
                    type="number"
                    value={drug.quantity}
                    onChange={(e) => handleDrugChange(index, "quantity", e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                    placeholder="Enter Quantity"
                  />
                  <label className="block text-sm font-bold mb-1">Frequency</label>
                  <input
                    type="text"
                    value={drug.frequency}
                    onChange={(e) => handleDrugChange(index, "frequency", e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                    placeholder="Enter Frequency"
                  />
                  <label className="block text-sm font-bold mb-1">Price per Unit</label>
                  <input
                    type="number"
                    value={drug.pricePerUnit}
                    onChange={(e) => handleDrugChange(index, "pricePerUnit", e.target.value)}
                    className="border border-gray-300 p-2 w-full rounded"
                    placeholder="Enter Price per Unit"
                  />
                </div>
              ))}
              <button
                onClick={addDrug}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add More Drugs
              </button>
            </div>
          )}

          {activeTab === "Review" && (
            <div>
              <h3 className="text-lg font-bold mb-4">Review</h3>
              <p><strong>Doctor's Name:</strong> Dr. {doctorName}</p>
              <p><strong>Patient's Name:</strong> {patientName}</p>
              <p><strong>Prescription:</strong></p>
              {drugs.map((drug, index) => (
                <div key={index}>
                  <p>{drug.name} ({drug.strength}) - {drug.quantity} - {drug.frequency} - Price per Unit: ₹{(parseFloat(drug.pricePerUnit) || 0).toFixed(2)}</p>
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Doctor's Fee</label>
                <input
                  type="number"
                  value={doctorFee}
                  onChange={(e) => setDoctorFee(e.target.value)}
                  className="border border-gray-300 p-2 w-full rounded"
                  placeholder="Enter Doctor's Fee"
                />
              </div>
              <h3 className="text-lg font-bold mb-4">Total Bill</h3>
              <button
                onClick={generateBill}
                className="bg-blue-500 text-white px-4 py-2 rounded mb-4 mx-3"
              >
                Generate Bill
              </button>
              <button
                onClick={generatePDF}
                className="bg-blue-500 text-white px-4 py-2 rounded mx-3"
              >
                Generate PDF Prescription
              </button>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button
              onClick={() => setActiveTab(getPreviousTab())}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Previous
            </button>
            <button
              onClick={() => setActiveTab(getNextTab())}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prescribe;
