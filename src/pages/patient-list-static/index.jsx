import React, { useState } from "react";
import { FaUser, FaVenusMars, FaCalendarAlt, FaPhone, FaChevronRight, FaIdCard, FaAddressCard, FaExclamationTriangle } from "react-icons/fa";
import patientsData from "./patients.json";

function PatientListStatic() {
    const [patients] = useState(patientsData);
    const [selectedPatient, setSelectedPatient] = useState(null);

    function selectPatient(patient) {
        setSelectedPatient(patient);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <div className="flex p-6 bg-gray-100 min-h-screen gap-6">
            <div className="w-1/3 space-y-2">
                <div className="text-xl font-bold text-[#1F70F2] mb-2">Patient Records</div>
                <div className="space-y-2">
                    {patients.map((patient, index) => {
                        const name = patient.name ? patient.name[0].text : "N/A";
                        const gender = patient.gender || "N/A";
                        const birthDate = patient.birthDate || "N/A";
                        const phone = patient.telecom ? patient.telecom.find(t => t.system === "phone")?.value : "N/A";
                        const address = patient.address ? `${patient.address[0].city || ""}, ${patient.address[0].state || ""}` : "N/A";
                        const isSelected = selectedPatient?.id === patient.id;
                        const bgColor = isSelected ? "bg-[#EBF6FF]" : "white"

                        return (
                            <div key={index} 
                                className={`flex border border-gray-300 shadow-inner ${bgColor} h-[100px] cursor-pointer`} 
                                onClick={() => selectPatient(patient)}
                            >
                                {/* Left Panel */}
                                <div className="w-[30px] border-r border-gray-300 flex items-center justify-center bg-[#F0F4F8]">
                                    {patient.urgent ? <FaExclamationTriangle className="text-red-500 m-auto" /> : null}
                                </div>

                                {/* Main Panel */}
                                <div className="flex-1 flex flex-col p-3 text-sm justify-between">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="font-bold text-gray-800 flex items-center">
                                            <FaUser className="text-[#1F70F2] mr-2" /> {name}
                                            <FaExclamationTriangle className="text-red-500 ml-2" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-700 font-semibold">
                                        <div className="text-[#1F70F2]"><FaVenusMars className="mr-1 inline" /> {gender}</div>
                                        <div><FaCalendarAlt className="mr-1 inline" /> {birthDate}</div>
                                    </div>
                                </div>

                                {/* Right Arrow Button */}
                                <div className="text-[#1F70F2] text-lg ml-2 p-2 flex items-center">
                                    <FaChevronRight />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="w-2/3 bg-white p-4 rounded-lg shadow-md">
                <div className="text-xl font-bold text-[#1F70F2] mb-2">Patient Details</div>
                {selectedPatient ? (
                    <div className="space-y-3 text-sm text-gray-800">
                        <div className="flex items-center"><FaIdCard className="text-[#1F70F2] mr-2" /><span className="font-semibold">ID: </span> {selectedPatient.id}</div>
                        <div className="flex items-center"><FaUser className="text-[#1F70F2] mr-2" /><span className="font-semibold">Name: </span> {selectedPatient.name[0].text}</div>
                        <div className="flex items-center"><FaVenusMars className="text-[#1F70F2] mr-2" /><span className="font-semibold">Gender: </span> {selectedPatient.gender}</div>
                        <div className="flex items-center"><FaPhone className="text-[#1F70F2] mr-2" /><span className="font-semibold">Phone: </span> {selectedPatient.telecom[0]?.value || "N/A"}</div>
                        <div className="flex items-center"><FaAddressCard className="text-[#1F70F2] mr-2" /> <span className="font-semibold">Address: </span> {selectedPatient.address[0]?.line[0]}, {selectedPatient.address[0]?.city}, {selectedPatient.address[0]?.state}</div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Click on a patient to view details</p>
                )}
            </div>
        </div>
    );
}

export default PatientListStatic;
