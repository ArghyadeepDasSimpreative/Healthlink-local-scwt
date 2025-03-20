import { useEffect, useState, useMemo } from "react";
import { BiSliderAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { CiWarning } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { GoPaperclip } from "react-icons/go";
import RightPanel from "../patient-new/RightPanel";
import RedCount from "../../components/RedCount";
import IncludeArchived from "./SearchBox";

const PatientPageDemo = () => {
    const [patientData, setPatientData] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch Patient Data from API
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await fetch("https://api.example.com/patients"); // Replace with actual API URL
                if (!response.ok) throw new Error("Failed to fetch patient data");

                const data = await response.json();
                setPatientData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPatients();
    }, []);

    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
    };

    // Memoized Patient List for Performance
    const patientList = useMemo(() => patientData.map(patient => (
        <div 
            key={patient.id} 
            className="flex border border-gray-300 shadow-inner h-[80px] w-[400px] cursor-pointer" 
            onClick={() => handlePatientClick(patient)}
        >
            <div className={`flex flex-col p-1 justify-center items-center gap-2 h-full border-r border-gray-300 w-[35px] ${patient.id === selectedPatient?.id && "border-l-3 border-green-700"}`}>
                {patient.tags.includes("urgent") && <CiWarning className="text-red-600 h-5 w-5" />}
                {patient.tags.includes("semiUrgent") && <CiWarning className="text-yellow-500 h-5 w-5" />}
                {patient.tags.includes("canceled") && <MdOutlineCancel className="text-blue-300 h-5 w-5" />}
                {patient.tags.includes("clip") && <GoPaperclip className="text-violet-600 h-5 w-5" />}
            </div>
            <div className={`${patient.id === selectedPatient?.id ? "bg-[#EBF6FF]" : "bg-white"} w-full px-3 py-2 flex justify-between shadow-inner`}>
                <div className="flex flex-col justify-between h-full w-2/3">
                    <span className="text-sm w-full font-semibold">{patient.name}</span>
                    <span className="text-xs">{patient.type}</span>
                </div>
                <div className="flex flex-col w-full mr-5 justify-between h-full items-end">
                    <span className="text-xs">Requested: {patient.requested}</span>
                    <span className="text-xs">{patient.department}</span>
                </div>
                <div className="h-full w-[20px] flex justify-center items-center">
                    <IoIosArrowForward className={`${patient.type === "New" ? "text-blue-500" : "text-gray-800"} h-5 w-5`} />
                </div>
            </div>
        </div>
    )), [patientData, selectedPatient]);

    return (
        <div className="flex flex-col justify-start bg-[#F2F3F7] min-h-screen px-6 py-2" style={{ padding: "20px" }}>
            <div className="flex w-full justify-between mb-3">
                <div className="text-blue-600 font-semibold text-lg">Worklist</div>
                <button className="bg-blue-600 text-white h-[30px] flex justify-between items-center text-sm px-4 py-2 gap-2">
                    <span className="font-normal !text-sm">Show Filters</span>
                    <BiSliderAlt />
                </button>
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
                <div className="flex flex-col justify-between gap-4 w-[400px]">
                    <IncludeArchived />
                    <div className="flex flex-col gap-0 items-center justify-start">
                        {loading && <p className="text-gray-500">Loading patients...</p>}
                        {error && <p className="text-red-500">{error}</p>}
                        {!loading && !error && patientList}
                    </div>
                </div>

                <RightPanel patientDetails={selectedPatient} />
            </div>
        </div>
    );
};

export default PatientPageDemo;
