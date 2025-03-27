import { useEffect, useState, useMemo } from "react";
import { BiSliderAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";
import RightPanelNew from "./RightPanelNew";
import RedCount from "../../components/RedCount";
import IncludeArchived from "../patient-page-demo/SearchBox";

const PatientPageDemoTwo = () => {
    const [patientData, setPatientData] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // Fetch Patient Data from API
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch("https://r4.smarthealthit.org/Patient");
                if (!response.ok) throw new Error("Failed to fetch patient data");

                const data = await response.json();
                const filteredPatients = data.entry
                    .map(entry => entry.resource)
                    .filter(patient => patient.id.length === 36); // Ensure only valid 32-char IDs remain

                setPatientData(filteredPatients);
                console.log("filtered patients are ", filteredPatients);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    const handlePatientClick = async (patient) => {
        console.log(patient)
        // 
        const response = await fetch(`https://r4.smarthealthit.org/Patient/${patient.id}`);
        let jsonResponse = await response.json();
        console.log("json response is ", jsonResponse)
        setSelectedPatient(jsonResponse);

    };

    // Memoized Patient List for Performance
    const patientList = useMemo(() => patientData.map(patient => (
        <div
            key={patient.id}
            className="flex shadow-sm border-[0.5px] border-gray-300 h-[70px] w-[400px] cursor-pointer"
            style={{ borderBottom: 0 }}
            onClick={() => handlePatientClick(patient)}
        >
            <div className={`flex flex-col p-1 justify-center items-center gap-2 h-full border-r border-gray-300 w-[35px] ${patient.id === selectedPatient?.id && "border-l-3 border-green-700"}`}>
                {patient.meta?.tag?.some(tag => tag.code === "synthea-5-2019") && <CiWarning className="text-red-600 h-5 w-5" />}
                {patient.meta?.tag?.some(tag => tag.code === "semiUrgent") && <CiWarning className="text-yellow-500 h-5 w-5" />}
                {patient.meta?.tag?.some(tag => tag.code === "canceled") && <MdOutlineCancel className="text-blue-300 h-5 w-5" />}
                {patient.meta?.tag?.some(tag => tag.code === "clip") && <GoPaperclip className="text-violet-600 h-5 w-5" />}
            </div>
            <div className={`${patient.id === selectedPatient?.id ? "bg-[#EBF6FF]" : "bg-white"} w-full px-3 py-2 flex justify-between shadow-inner`}>
                <div className="flex flex-col justify-between h-full w-2/2">
                    <span className="text-sm w-full font-semibold text-[16px] text-[#202224]">{patient.name?.[0]?.given?.join(" ")} {patient.name?.[0]?.family}</span>
                    <span className="text-xs text-[#282828]">{patient.resourceType}</span>
                </div>
                <div className="flex flex-col w-full mr-5 justify-between h-full items-end">
                    <span className="text-xs text-[#282828]">Birth Date: {patient.birthDate || "N/A"}</span>
                    <span className="text-xs text-[#282828]">Gender: {patient.gender || "N/A"}</span>
                </div>
                <div className="h-full w-[20px] flex justify-center items-center">
                    <IoIosArrowForward
                        style={{
                            color: patient.id === selectedPatient?.id ? "#007bff" : "#333",
                        }}
                        className="text-gray-800 h-5 w-5" />
                </div>
            </div>
        </div>
    )), [patientData, selectedPatient]);

    return (
        <div className="flex flex-col justify-start bg-[#F2F3F7] min-h-screen px-6 py-2" style={{ padding: "20px" }}>
            <div className="flex w-full justify-between mb-3">
                <div className="text-[#1F70F2] font-bold text-[18px]">Worklist</div>
                <button className="bg-[#1F70F2] text-white h-[30px] flex justify-between items-center text-sm px-4 py-4.5 gap-2" onClick={() => setIsOpen(true)}>
                    <span className="font-bold text-[12px]">Show Filters</span>
                    <BiSliderAlt style={{ fontSize: 16 }} />
                </button>
                {/* Popup Modal */}
                {isOpen && (
                    <>
                        {/* Blurred Background */}
                        <div className="fixed inset-0 bg-[#AAAAAA26]/15 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

                        {/* Popup Content */}
                        <div className="fixed bg-white p-6 shadow-lg mt-2 z-10 border border-gray-200" style={{ top: 82, right: 20, width: '95%' }}>
                            <button className="bg-[#1F70F2] text-white h-[30px] flex justify-between items-center text-sm px-4 py-4.5 gap-2"
                                style={{ position: 'absolute', top: -45, right: 0 }}>
                                <span className="font-bold text-[12px]">Show Filters</span>
                                <BiSliderAlt style={{ fontSize: 16 }} />
                            </button>
                            {/* Filter Form with 4 Inputs Per Row */}
                            <div className="grid grid-cols-5 gap-10" onClick={(e) => e.stopPropagation()}>
                                {/* First Row */}
                                <div className="flex items-center gap-2">
                                    <label className="text-[14px] font-medium w-30">Received Date</label>
                                    <input
                                        type="date"
                                        className="outline-none border border-gray-200 px-3 h-[32px] bg-[#F5F6FA] text-[#999999] text-[14px] font-light w-full"
                                    />

                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium w-30">Report Date</label>
                                    <input type="date" className="outline-none border border-gray-200 px-3 h-[32px] bg-[#F5F6FA] text-[#999999] text-[14px] font-light w-full" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium w-30">Ref ID</label>
                                    <input type="text" className="outline-none border border-gray-200 px-3 h-[32px] bg-[#F5F6FA] text-[#999999] text-[14px] font-light w-full" placeholder="Enter Referral ID" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium w-30">Assigned To</label>
                                    <input type="text" className="outline-none border border-gray-200 px-3 h-[32px] bg-[#F5F6FA] text-[#999999] text-[14px] font-light w-full" placeholder="Enter Provider/Team" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium w-30">Patient ID</label>
                                    <input type="text" className="outline-none border border-gray-200 px-3 h-[32px] bg-[#F5F6FA] text-[#999999] text-[14px] font-light w-full" placeholder="Enter Patient ID" />
                                </div>

                                {/* Second Row */}
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium w-30">Status</label>
                                    <select className="outline-none border border-gray-200 px-3 h-[32px] bg-[#F5F6FA] text-[#999999] text-[14px] font-light w-full">
                                        <option>Select Status</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium w-30">Subject</label>
                                    <input type="text" className="outline-none border border-gray-200 px-3 h-[32px] bg-[#F5F6FA] text-[#999999] text-[14px] font-light w-full" placeholder="Enter Subject" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium w-30">Type</label>
                                    <select className="outline-none border border-gray-200 px-3 h-[32px] bg-[#F5F6FA] text-[#999999] text-[14px] font-light w-full">
                                        <option>Select Event Type</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium w-30">Patient</label>
                                    <input type="text" className="outline-none border border-gray-200 px-3 h-[32px] bg-[#F5F6FA] text-[#999999] text-[14px] font-light w-full" placeholder="Enter First or Last Name" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium w-30">Urgency</label>
                                    <select className="outline-none border border-gray-200 px-3 h-[32px] bg-[#F5F6FA] text-[#999999] text-[14px] font-light w-full">
                                        <option>Select Urgency</option>
                                    </select>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-4 mt-6">
                                <button className="bg-orange-500 text-white w-[128px] px-2 py-2">Search</button>
                                <button
                                    className="bg-[#282828] text-white w-[128px] px-2 py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="w-full flex gap-4 items-center justify-start mb-5">
                <span className="text-blue-600 text-sm font-semibold cursor-pointer relative">
                    Referrals
                    <RedCount count={4} />
                </span>
                <span className="text-sm font-semibold cursor-pointer">Results</span>
                <span className="text-sm font-semibold cursor-pointer">Correspondence</span>
            </div>
            <div className="flex justify-between gap-6">
                <div className="flex flex-col justify-between gap-6 w-[400px]">
                    <IncludeArchived />
                    <div className="flex flex-col gap-0 items-center justify-start">
                        {loading && <p className="text-gray-500">Loading patients...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {!loading && !error && patientList}
                    </div>
                </div>
                <div className="w-full flex flex-col justify-start gap-4">
                    {
                        !selectedPatient ?
                            <div className="flex w-full bg-white rounded-md p-4 border border-gray-200">Please select a patient to see the details</div>
                            :
                            <RightPanelNew patientDetails={selectedPatient} />
                        // <div>hi</div>
                    }
                </div>


            </div>
        </div>
    );
};

export default PatientPageDemoTwo;
