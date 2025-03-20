import BlueCircle from "../../components/BlueCircle";
import { CiLocationOn } from "react-icons/ci";
import { FaMobileAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoWarningOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoMdPrint } from "react-icons/io";
import { LuMessageSquarePlus } from "react-icons/lu";
import { HiOutlineDotsVertical } from "react-icons/hi";
import PatientDetails from "../patient";
import TabSwitcher from "../patient-new/TabSwitcher";
import { useEffect, useState } from "react";

export default function RightPanelNew({ patientDetails }) {
    console.log(patientDetails);

    const capitalizeFirstLetter = (str) => {
        if (!str) return ""; // Handle empty string or undefined cases
        return str.charAt(0).toUpperCase() + str.slice(1);
      };

    const [launchParam, setLaunchParam] = useState("");

    useEffect(() => {
        if (patientDetails?.id) {
            const payloadArray = [0,patientDetails.id,"92149480-fe87-44b1-b835-37b718614c07","AUTO",0,0,0,"launch profile fhirUser openid online_access patient/*.read user/Patient.read user/Practitioner.read user/Questionnaire.read user/QuestionnaireResponse.*","http://localhost:5173/smartapp/","smart_health_it_app_client_id","","","","",0,1,""];
            
            const encodedLaunchParam = btoa(JSON.stringify(payloadArray));
            console.log("guguguguu", encodedLaunchParam)
            setLaunchParam(encodedLaunchParam);
        }
    }, [patientDetails]);

    function handleTabChange(tab) {
        console.log(tab);
    }

    const name = patientDetails?.name?.[0]?.given?.join(" ") + " " + patientDetails?.name?.[0]?.family;
    const gender = patientDetails?.gender || "N/A";
    const age = patientDetails?.birthDate ? new Date().getFullYear() - new Date(patientDetails.birthDate).getFullYear() : "N/A";
    const id = patientDetails?.id || "N/A";
    const address = patientDetails?.address?.[0] ? `${patientDetails.address[0].line?.[0]}, ${patientDetails.address[0].city}, ${patientDetails.address[0].state}` : "N/A";
    const contactNo = patientDetails?.telecom?.find(t => t.system === "phone")?.value || "N/A";

    return (
        <>
            <div className="w-full">
                <div className="flex flex-col justify-between border border-gray-300 w-full gap-0">
                    <div className="flex px-4 py-4 justify-between bg-white">
                        <div className="flex flex-col justify-between gap-2">
                            <div className="flex justify-start items-center gap-2">
                                <div className="font-semibold text-blue-600 text-xl">{name}</div>
                                <div className="flex justify-start items-center flex-wrap gap-3">
                                    <span className="text-xs">{capitalizeFirstLetter(gender)}</span>
                                    <BlueCircle />
                                    <span className="text-xs">{age} years old</span>
                                    <BlueCircle />
                                    <span className="text-xs">{id}</span>
                                </div>
                            </div>
                            <div className="flex justify-start items-start flex-wrap gap-2 text-xs">
                                <div className="flex gap-2 justify-start items-start text-zinc-500 font-medium">
                                    <CiLocationOn />
                                    <span>{address}</span>
                                </div>
                                <div className="flex gap-2 justify-start items-start text-zinc-500 font-medium">
                                    <FaMobileAlt />
                                    <span>{contactNo}</span>
                                </div>
                            </div>
                            <div className="flex gap-2 justify-start items-center">
                                <button className="bg-red-300 !text-sm text-red-700 w-[80px] flex items-center justify-between px-1">
                                    <IoWarningOutline /> <span className="!text-sm">Urgent</span>
                                </button>
                                <button className="bg-green-300 !text-sm text-green-700 w-[80px] flex items-center justify-center px-1">
                                    New
                                </button>
                                <div className="text-xs mx-2 my-auto">Received: 22 May, 2025</div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <div className="flex justify-end gap-3">
                                <FaRegUser className="w-4 h-4" /><IoMdPrint className="w-4 h-4" /><LuMessageSquarePlus className="w-4 h-4" />< HiOutlineDotsVertical className="w-4 h-4" />
                            </div>
                            <button className="bg-black font-semibold text-white !text-xs p-1 px-2">Record Activity</button>
                            <div className="flex gap-2">
                                <button className="bg-blue-600 text-white !text-xs p-1 w-[100px] cursor-pointer">Accept</button>
                                <div className="flex justify-between gap-0 text-white text-xs w-[100px]">
                                    <button className="h-full w-[80%] bg-orange-400 p-1 cursor-pointer">Decline</button>
                                    <span className="h-full w-[20%] bg-orange-300 flex justify-center items-center px-1"><IoIosArrowDown className="text-md" /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {launchParam && (
                    <>
                        <a className="bg-blue-600 text-white p-2 rounded-sm mt-4 inline-block"
                            href={`http://localhost:5173/smartapp/launch?iss=https%3A%2F%2Flaunch.smarthealthit.org%2Fv%2Fr4%2Ffhir&launch=${encodeURIComponent(launchParam)}`}
                            target="_blank"
                            rel="noreferrer noopener"
                        >
                            Launch
                        </a>
                    </>
                )}
            </div>
        </>
    );
}
