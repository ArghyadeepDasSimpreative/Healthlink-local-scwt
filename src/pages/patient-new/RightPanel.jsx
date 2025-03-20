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
import TabSwitcher from "./TabSwitcher";

export default function RightPanel({ patientDetails }) {
    function handleTabChange(tab) {
        console.log(tab);
    }
    return (
        <div className="w-full flex flex-col justify-start gap-4">
            <div className="w-full">
                {
                    !patientDetails ?
                        <div className="flex w-full bg-white rounded-md p-4 border border-gray-200">Please select a patient to see the details</div>
                        :
                        <div className="flex flex-col justify-between border border-gray-300 w-full gap-0">
                            <div className="flex px-4 py-4 justify-between bg-white">
                                <div className="flex flex-col justify-between gap-2">
                                    <div className="flex justify-start items-center gap-2">
                                        <div className="font-semibold text-blue-600 text-xl">{patientDetails.name}</div>
                                        <div className="flex justify-start items-center">
                                            <span className="text-xs">{patientDetails.gender}</span>
                                            <BlueCircle />
                                            <span className="text-xs">{patientDetails.age} years old</span>
                                            <BlueCircle />
                                            <span className="text-xs">{patientDetails.id}</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-start items-start gap-5 text-xs">
                                        <div className="flex gap-2 justify-start items-start text-zinc-500 font-medium">
                                            <CiLocationOn />
                                            <span>{patientDetails.address}</span>
                                        </div>
                                        <div className="flex gap-2 justify-start items-start text-zinc-500 font-medium">
                                            <FaMobileAlt />
                                            <span>{patientDetails.contactNo}</span>
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
                            <TabSwitcher handlechange={handleTabChange} />
                            <PatientDetails />

                        </div>
                }
            </div>
            {/* <button className="bg-blue-600 text-white w-[100px] py-2 rounded-md" onClick={() => window.location.href = "http://localhost:5173/smartapp/launch?iss=https%3A%2F%2Flaunch.smarthealthit.org%2Fv%2Fr4%2Ffhir&launch=WzAsIjU0NmViYzAyLTdhMjQtNDk3Zi1iY2JjLWUzYmI0NzNkYWM3YSIsIjkyMTQ5NDgwLWZlODctNDRiMS1iODM1LTM3YjcxODYxNGMwNyIsIkFVVE8iLDAsMCwwLCJsYXVuY2ggcHJvZmlsZSBmaGlyVXNlciBvcGVuaWQgb25saW5lX2FjY2VzcyBwYXRpZW50LyoucmVhZCB1c2VyL1BhdGllbnQucmVhZCB1c2VyL1ByYWN0aXRpb25lci5yZWFkIHVzZXIvUXVlc3Rpb25uYWlyZS5yZWFkIHVzZXIvUXVlc3Rpb25uYWlyZVJlc3BvbnNlLioiLCJodHRwOi8vbG9jYWxob3N0OjUxNzMvc21hcnRhcHAvIiwic21hcnRfaGVhbHRoX2l0X2FwcF9jbGllbnRfaWQiLCIiLCIiLCIiLCIiLDAsMSwiIl0"}>Launch</button> */}
            <a id="ehr-launch-url" href="http://localhost:5173/smartapp/launch?iss=https%3A%2F%2Flaunch.smarthealthit.org%2Fv%2Fr4%2Ffhir&amp;launch=WzAsIjU0NmViYzAyLTdhMjQtNDk3Zi1iY2JjLWUzYmI0NzNkYWM3YSIsIjkyMTQ5NDgwLWZlODctNDRiMS1iODM1LTM3YjcxODYxNGMwNyIsIkFVVE8iLDAsMCwwLCJsYXVuY2ggcHJvZmlsZSBmaGlyVXNlciBvcGVuaWQgb25saW5lX2FjY2VzcyBwYXRpZW50LyoucmVhZCB1c2VyL1BhdGllbnQucmVhZCB1c2VyL1ByYWN0aXRpb25lci5yZWFkIHVzZXIvUXVlc3Rpb25uYWlyZS5yZWFkIHVzZXIvUXVlc3Rpb25uYWlyZVJlc3BvbnNlLioiLCJodHRwOi8vbG9jYWxob3N0OjUxNzMvc21hcnRhcHAvIiwic21hcnRfaGVhbHRoX2l0X2FwcF9jbGllbnRfaWQiLCIiLCIiLCIiLCIiLDAsMSwiIl0" target="_blank" rel="noreferrer noopener" class="btn btn-primary">Launch</a>
        </div>

    )
}
