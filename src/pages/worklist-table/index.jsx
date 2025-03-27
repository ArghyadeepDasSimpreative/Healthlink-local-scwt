import React, { useState } from "react";
import { PiDotsThreeVerticalBold, PiCaretUpBold, PiCaretDownBold } from "react-icons/pi";

const data = [
    {
        type: "⚠️",
        status: "New",
        referenceId: "ASWEZ001",
        from: "Donald Winston",
        assignedTo: "AH-08998",
        patient: "Mouse, Mickey",
        patientId: "245689746315",
        subject: "Lorem ipsum",
        dateReceived: "02/10/2024 10:45",
        reportDate: "02/10/2024 10:45",
    },
    {
        type: "⚠️",
        status: "Viewed",
        referenceId: "ASWEZ0001",
        from: "Donald Winston",
        assignedTo: "AH-08998",
        patient: "Mouse, Mickey",
        patientId: "245689746315",
        subject: "Lorem ipsum",
        dateReceived: "02/10/2024 10:45",
        reportDate: "02/10/2024 10:45",
    },
    {
        type: "⚠️",
        status: "Discharged",
        referenceId: "ASWEZ0001",
        from: "Donald Winston",
        assignedTo: "AH-08998",
        patient: "Mouse, Mickey",
        patientId: "245689746315",
        subject: "Lorem ipsum",
        dateReceived: "02/10/2024 10:45",
        reportDate: "02/10/2024 10:45",
    },
];

const WorklistTable = () => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [sortedData, setSortedData] = useState(data);
    const [openMenu, setOpenMenu] = useState(null);

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        } else if (sortConfig.key === key && sortConfig.direction === "desc") {
            // Reset sorting to default order
            setSortedData([...data]);
            setSortConfig({ key: null, direction: "asc" });
            return;
        }

        const sorted = [...sortedData].sort((a, b) => {
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
            return 0;
        });

        setSortedData(sorted);
        setSortConfig({ key, direction });
    };

    return (
        <div className="pt-4 pb-4">
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
                    {/* Table Header */}
                    <thead className="bg-blue-600 text-white uppercase text-sm">
                        <tr>
                            {[
                                { label: "Type", key: "type" },
                                { label: "Status", key: "status" },
                                { label: "Reference ID", key: "referenceId" },
                                { label: "From", key: "from" },
                                { label: "Assigned To", key: "assignedTo" },
                                { label: "Patient", key: "patient" },
                                { label: "Patient ID", key: "patientId" },
                                { label: "Subject", key: "subject" },
                                { label: "Date Received", key: "dateReceived" },
                                { label: "Report Date", key: "reportDate" },
                            ].map(({ label, key }, index) => (
                                <th key={index} className="px-4 py-3 text-left font-semibold">
                                    <button
                                        className="flex items-center gap-1 cursor-pointer"
                                        onClick={() => handleSort(key)}
                                    >
                                        {label}
                                        <span className="flex flex-col">
                                            <PiCaretUpBold
                                                className={`transition-opacity ${
                                                    sortConfig.key === key && sortConfig.direction === "asc"
                                                        ? "opacity-100 text-white"
                                                        : "opacity-50"
                                                }`}
                                            />
                                            <PiCaretDownBold
                                                className={`transition-opacity ${
                                                    sortConfig.key === key && sortConfig.direction === "desc"
                                                        ? "opacity-100 text-white"
                                                        : "opacity-50"
                                                }`}
                                            />
                                        </span>
                                    </button>
                                </th>
                            ))}
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((row, index) => (
                            <tr key={index} className={`border-b ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                                <td className="px-4 py-3">{row.type}</td>
                                <td className="px-4 py-3 font-semibold">{row.status}</td>
                                <td className="px-4 py-3">{row.referenceId}</td>
                                <td className="px-4 py-3 font-semibold">{row.from}</td>
                                <td className="px-4 py-3 font-semibold">{row.assignedTo}</td>
                                <td className="px-4 py-3 font-semibold">{row.patient}</td>
                                <td className="px-4 py-3">{row.patientId}</td>
                                <td className="px-4 py-3">{row.subject}</td>
                                <td className="px-4 py-3">{row.dateReceived}</td>
                                <td className="px-4 py-3">{row.reportDate}</td>

                                {/* Three Dots Menu */}
                                <td className="px-4 py-3 text-right relative">
                                    <button className="p-2">
                                        <PiDotsThreeVerticalBold />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WorklistTable;
