import React, { useState, useEffect } from "react";
import { FaUser, FaVenusMars, FaCalendarAlt, FaPhone, FaClock, FaChevronRight, FaIdCard, FaExclamationTriangle } from "react-icons/fa";

function PatientList() {
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [detailsLoading, setDetailsLoading] = useState(false);

    useEffect(() => {
        fetch("https://hapi.fhir.org/baseR4/Patient")
            .then(response => response.json())
            .then(data => {
                if (data.entry) {
                    setPatients(data.entry);
                }
            })
            .catch(error => console.error("Error fetching data:", error))
            .finally(() => setLoading(false));
    }, []);

    function fetchPatientDetails(url) {
        setDetailsLoading(true);
        setSelectedPatient(null);
        window.scrollTo({ top: 0, behavior: "smooth" });

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setSelectedPatient(data);
            })
            .catch(error => console.error("Error fetching patient details:", error))
            .finally(() => setDetailsLoading(false));
    }

    if (loading) {
        return <div className="text-center text-[#1F70F2] font-bold text-lg p-4">Loading...</div>;
    }

    return (
        <div className="flex p-6 bg-gray-100 min-h-screen gap-6">
            <div className="w-1/3 space-y-2">
                <h2 className="text-xl font-bold text-[#1F70F2] mb-2">Patient Records</h2>

                <div className="space-y-2">
                    {patients.map((entry, index) => {
                        const patient = entry.resource;
                        const name = patient.name ? `${patient.name[0].given[0] || ""} ${patient.name[0].family || ""}` : "N/A";
                        const gender = patient.gender || "N/A";
                        const birthDate = patient.birthDate || "N/A";
                        const phone = patient.telecom ? patient.telecom.find(t => t.system === "phone")?.value : "N/A";
                        const address = patient.address ? `${patient.address[0].city || ""}, ${patient.address[0].state || ""}` : "N/A";
                        const lastUpdated = patient.meta?.lastUpdated ? new Date(patient.meta.lastUpdated).toLocaleString() : "N/A";

                        return (
                            <div key={index} className="border-l-4 border-[#1F70F2] bg-[#F7FAFD] p-3 shadow-sm rounded-lg flex justify-between items-center text-sm">
                                <div className="w-full">
                                    <div className="flex justify-between items-center mb-1">
                                        <div className="font-bold text-gray-800 flex items-center">
                                            <FaUser className="text-[#1F70F2] mr-2" /> {name}
                                            <FaExclamationTriangle className="text-red-500 ml-2" />
                                            <FaClock className="text-red-500 ml-2" />
                                        </div>
                                        <div className="text-xs text-gray-500">Updated: {lastUpdated}</div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 text-xs text-gray-700 font-semibold">
                                        <div className="text-[#1F70F2]"><FaVenusMars className="mr-1 inline" /> {gender}</div>
                                        <div><FaCalendarAlt className="mr-1 inline" /> {birthDate}</div>
                                        <div><FaPhone className="mr-1 inline" /> {phone}</div>
                                        <div> {address}</div>
                                        <div>Results</div>
                                        <div>Cardiology</div>
                                    </div>
                                </div>
                                <button onClick={() => fetchPatientDetails(entry.fullUrl)} className="text-[#1F70F2] text-lg ml-2">
                                    <FaChevronRight />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="w-2/3 bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-[#1F70F2] mb-2">Patient Details</h2>

                {detailsLoading && (
                    <div className="text-center text-[#1F70F2] font-bold text-lg p-4">Loading...</div>
                )}

                {selectedPatient && (
                    <div className="space-y-3 text-sm text-gray-800">
                        <div className="flex items-center"><FaIdCard className="text-[#1F70F2] mr-2" /><span className="font-semibold">ID:</span> {selectedPatient.id}</div>
                        <div className="flex items-center"><FaUser className="text-[#1F70F2] mr-2" /><span className="font-semibold">Name:</span> {selectedPatient.name ? `${selectedPatient.name[0].given[0] || ""} ${selectedPatient.name[0].family || ""}` : "N/A"}</div>
                        <div className="flex items-center"><FaVenusMars className="text-[#1F70F2] mr-2" /><span className="font-semibold">Gender:</span> {selectedPatient.gender || "N/A"}</div>
                        <div className="flex items-center"><FaCalendarAlt className="text-[#1F70F2] mr-2" /><span className="font-semibold">Birth Date:</span> {selectedPatient.birthDate || "N/A"}</div>
                        <div className="flex items-center"><FaPhone className="text-[#1F70F2] mr-2" /><span className="font-semibold">Phone:</span> {selectedPatient.telecom?.find(t => t.system === "phone")?.value || "N/A"}</div>
                        <div className="flex items-center"><span className="font-semibold">Address:</span> {selectedPatient.address ? `${selectedPatient.address[0].line[0] || ""}, ${selectedPatient.address[0].city || ""}, ${selectedPatient.address[0].state || ""}, ${selectedPatient.address[0].postalCode || ""}, ${selectedPatient.address[0].country || ""}` : "N/A"}</div>
                        <div className="flex items-center"><FaClock className="text-[#1F70F2] mr-2" /><span className="font-semibold">Last Updated:</span> {selectedPatient.meta?.lastUpdated ? new Date(selectedPatient.meta.lastUpdated).toLocaleString() : "N/A"}</div>
                        <div className="flex items-start">
                            {/* <button onClick={()=> window.open("http://localhost:5173/smartapp/launch?iss=https%3A%2F%2Flaunch.smarthealthit.org%2Fv%2Fr4%2Ffhir&launch=WzAsIjU0NmViYzAyLTdhMjQtNDk3Zi1iY2JjLWUzYmI0NzNkYWM3YSIsIjkyMTQ5NDgwLWZlODctNDRiMS1iODM1LTM3YjcxODYxNGMwNyIsIkFVVE8iLDAsMCwwLCJsYXVuY2ggcHJvZmlsZSBmaGlyVXNlciBvcGVuaWQgb25saW5lX2FjY2VzcyBwYXRpZW50LyoucmVhZCB1c2VyL1BhdGllbnQucmVhZCB1c2VyL1ByYWN0aXRpb25lci5yZWFkIHVzZXIvUXVlc3Rpb25uYWlyZS5yZWFkIHVzZXIvUXVlc3Rpb25uYWlyZVJlc3BvbnNlLioiLCJodHRwOi8vbG9jYWxob3N0OjUxNzMvc21hcnRhcHAvIiwic21hcnRfaGVhbHRoX2l0X2FwcF9jbGllbnRfaWQiLCIiLCIiLCIiLCIiLDAsMSwiIl0", '_blank').focus()}>Launch</button> */}
                            <a id="ehr-launch-url" href="http://localhost:5173/smartapp/launch?iss=https%3A%2F%2Flaunch.smarthealthit.org%2Fv%2Fr4%2Ffhir&amp;launch=WzAsIjU0NmViYzAyLTdhMjQtNDk3Zi1iY2JjLWUzYmI0NzNkYWM3YSIsIjkyMTQ5NDgwLWZlODctNDRiMS1iODM1LTM3YjcxODYxNGMwNyIsIkFVVE8iLDAsMCwwLCJsYXVuY2ggcHJvZmlsZSBmaGlyVXNlciBvcGVuaWQgb25saW5lX2FjY2VzcyBwYXRpZW50LyoucmVhZCB1c2VyL1BhdGllbnQucmVhZCB1c2VyL1ByYWN0aXRpb25lci5yZWFkIHVzZXIvUXVlc3Rpb25uYWlyZS5yZWFkIHVzZXIvUXVlc3Rpb25uYWlyZVJlc3BvbnNlLioiLCJodHRwOi8vbG9jYWxob3N0OjUxNzMvc21hcnRhcHAvIiwic21hcnRfaGVhbHRoX2l0X2FwcF9jbGllbnRfaWQiLCIiLCIiLCIiLCIiLDAsMSwiIl0" target="_blank" rel="noreferrer noopener" className="btn btn-primary">Launch</a>
                        </div>
                    </div>
                )}
                {!detailsLoading && !selectedPatient && (<p className="text-center text-gray-500">Click on a patient to view details</p>)}
            </div>
        </div>
    );
}

export default PatientList;
