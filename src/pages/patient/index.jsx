import { BiDotsVerticalRounded } from "react-icons/bi";
import { GoPaperclip } from "react-icons/go";
import { CiViewList } from "react-icons/ci";
import { TiDocumentText } from "react-icons/ti";
import { FaRegUserCircle } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { IoAddCircleOutline } from "react-icons/io5";

export default function PatientDetails() {

    const files = [
        { name: "MRI Brain with and without contrast", type: "PDF", size: "1.2 MB" },
        { name: "MRI Brain with and without contrast", type: "PNG", size: "500 KB" }
    ];

    const notesData = [
        { title: "Internal Notes", content: "Lorem ipsum odor amet, consectetur adipiscing elit.", author: "Micky Mouse", date: "10 May, 2025 11:56" },
        { title: "Correspondence", content: "Lorem ipsum odor amet, consectetur adipiscing elit.", author: "Micky Mouse", date: "10 May, 2025 11:56" }
    ];


    return (
        <div className="flex flex-col gap-8 p-4 w-full bg-white">
            <div className="flex flex-col justify-start items-start gap-2">
                {/* Header */}
                <header className="flex gap-2 text-sm" style={{ lineHeight: 1 }}>
                    <span><GoPaperclip /></span>
                    <span>Attachments</span>
                </header>

                {/* Table Container */}
                <div className="px-4 py-2 shadow-md w-full">
                    {/* Table Header */}
                    <div className="flex text-[#979797] text-sm font-normal border-b pb-2 px-6">
                        <span className="w-[60%]">File Name</span>
                        <span className="w-[15%]">File Type</span>
                        <span className="w-[15%]">File Size</span>
                        <span className="w-[10%]"></span>
                    </div>

                    {/* Table Body */}
                    <div className="flex flex-col justify-between !gap-2">
                        {files.map((file, index) => (
                            <div
                                key={index}
                                className="flex bg-[#EBF6FF] py-3 px-6 rounded-md items-center text-sm"
                                style={{ padding: "20px 10px"}}
                            >
                                <span className="w-[60%] font-semibold">{file.name}</span>
                                <span className="w-[15%]">{file.type}</span>
                                <span className="w-[15%]">{file.size}</span>
                                <span className="w-[10%] text-right">
                                    <BiDotsVerticalRounded className="text-gray-500 cursor-pointer" size={18} />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-2">
                {/* Header */}
                <header className="flex gap-2 text-sm" style={{ lineHeight: 1 }}>
                    <span><TiDocumentText /></span>
                    <span>Summary</span>
                </header>
                <div className="px-4 py-2 w-full">
                    <div className="flex justify-between w-full mb-4">
                        <div className="flex gap-1">
                            <span className="font-semibold text-md text-[#1F70F2]">For:</span>
                            <span className="font-semibold text-md">Coronary Angioplasty</span>
                        </div>
                        <div className="flex gap-2"><FaRegUserCircle className="text-[#1F70F2]" />
                            <div className="flex gap-1">
                                <span className="text-sm text-[#1F70F2]">Assigned: </span>
                                <span className="text-sm">Dr. William</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-between !gap-4">
                        <div className="shadow-lg !w-[250px] p-3 flex flex-col justify-between items-start text-sm pb-4 !gap-2">
                            <span className="text-[#1F70F2]">To:</span>
                            <span>Healthlink Testing</span>
                            <span>2107 San Elijo Ave, Cardiff, California</span>
                            <span>9876543210</span>
                        </div>
                        <div className="shadow-lg !w-[250px] p-3 flex flex-col justify-between items-start text-sm pb-4 !gap-2">
                            <span className="text-[#1F70F2]">From:</span>
                            <span>Healthlink Testing</span>
                            <span>2107 San Elijo Ave, Cardiff, California</span>
                            <span>9876543210</span>
                        </div>
                        <div className="shadow-lg !w-[250px] p-3 flex flex-col justify-between items-start text-sm !gap-2">
                            <div className="flex flex-col items-start">
                                <span className="m-0 font-semibold text-sm">Referred date</span>
                                <span className="m-0 text-sm">10 May, 2025</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="m-0 font-semibold text-sm">Referred period</span>
                                <span className="m-0 text-sm">01 Jan, 2026</span>
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="m-0 font-semibold text-sm">Referred Continuation</span>
                                <span className="m-0 text-sm">New</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white rounded-lg p-4 w-full">
                {/* Header */}
                <header className="flex gap-2 text-sm" style={{ lineHeight: 1 }}>
                    <span><FiFileText className="text-gray-500" /></span>
                    <span>Notes</span>
                </header>
                {/* Notes Sections */}
                <div className="shadow-md p-4 mt-3"> {notesData.map((note, index) => (
                    <div key={index}>
                        {/* Section Title */}
                        <div className="text-gray-500 font-semibold text-sm mb-2">{note.title}</div>

                        {/* Note Row */}
                        <div className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                            <span className="text-gray-700 text-sm">{note.content}</span>
                            <div className="flex items-center space-x-4">
                                <div className="text-sm text-gray-500">
                                    <span className="font-semibold text-gray-700">{note.author}</span>
                                    <br />
                                    {note.date}
                                </div>
                                <BsThreeDots className="text-gray-500 cursor-pointer" />
                            </div>
                        </div>

                        {/* Add Note Link */}
                        <div className="flex justify-end mt-2">
                            <button className="flex items-center text-blue-600 !text-sm hover:underline">
                                <IoAddCircleOutline className="mr-1" /> Add Note
                            </button>
                        </div>
                    </div>
                ))}</div>

            </div>
            <div className="flex flex-col justify-start items-start gap-2">
                {/* Header */}
                <header className="flex gap-2 text-sm" style={{ lineHeight: 1 }}>
                    <span><CiViewList /></span>
                    <span>Message Details</span>
                </header>
                <div className="px-4 py-2 shadow-md w-full !text-sm">
                    <div className="grid grid-cols-2 gap-[7px]">
                        <div className="flex gap-3">
                            <span className="text-[#1F70F2] font-semibold !text-sm">Message Address:</span>
                            <span className="!text-sm">pandavin</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-[#1F70F2] font-semibold !text-sm">Message Type:</span>
                            <span className="!text-sm">ORU</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-[#1F70F2] font-semibold !text-sm">Message ID:</span>
                            <span className="!text-sm">1255AS52A44SA55</span>
                        </div>
                        <div className="flex gap-3">
                            <span className="text-[#1F70F2] font-semibold !text-sm">Message Date:</span>
                            <span className="!text-sm">Message Date:</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>)
}