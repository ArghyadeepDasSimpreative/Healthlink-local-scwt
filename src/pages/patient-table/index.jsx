import DynamicTable from "../../components/DynamicTable";
import { IoWarningOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { useState } from "react";

const PatientsTable = () => {
    const [patientsData, setPatientsData] = useState([
        {
            refId: "ASWEZ0001", from: "Donald Winston", assignedTo: "AH-08998", patient: "Mickey Mouse", subject: "Lorem Ipsum", receivedDate: "28-02-2025", status: "Accept",
            type: ["warningHigh"], reportedDate: "01-03-2025"
        },
        {
            refId: "ASWEZ0002", from: "Donald Winston", assignedTo: "AH-08998", patient: "Mickey Mouse", subject: "Lorem Ipsum", receivedDate: "28-02-2025", status: "New",
            type: ["warningHigh", "closed"], reportedDate: "01-03-2025"
        },
        {
            refId: "ASWEZ0003", from: "Donald Winston", assignedTo: "AH-08998", patient: "Mickey Mouse", subject: "Lorem Ipsum", receivedDate: "28-02-2025", status: "Accept",
            type: ["warninglow"], reportedDate: "01-03-2025"
        },
        {
            refId: "ASWEZ0004", from: "Donald Winston", assignedTo: "AH-08998", patient: "Mickey Mouse", subject: "Lorem Ipsum", receivedDate: "28-02-2025", status: "Viewed",
            type: ["warningHigh"], reportedDate: "01-03-2025"
        },
        {
            refId: "ASWEZ0005", from: "Donald Winston", assignedTo: "AH-08998", patient: "Mickey Mouse", subject: "Lorem Ipsum", receivedDate: "03-03-2025", status: "New",
            type: ["warninglow"], reportedDate: "01-03-2025"
        },
        {
            refId: "ASWEZ0001", from: "Donald Winston", assignedTo: "AH-08998", patient: "Mickey Mouse", subject: "Lorem Ipsum", receivedDate: "01-03-2025", status: "Viewed",
            type: ["warningHigh"], reportedDate: "01-03-2025"
        }
    ])

    const columns = [{
        label: "Type", key: "type", render: (row) => {
            console.log(row);
            return (<div className="flex gap-2">
                {row.type.includes("warningHigh") && <IoWarningOutline className="text-red-600 h-5 w-5" />}
                {row.type.includes("warninglow") && <IoWarningOutline className="text-yellow-300 h-5 w-5" />}
                {row.type.includes("closed") && <RxCrossCircled className="text-blue-400 h-5 w-5" />}
            </div>)

        }},
        {
        label: "Status", key: "status", render: (row) => <>
            {row.status == "New" ? <div className="font-semibold">{row.status}</div> : <div>{row.status}</div>}</>
    },
    {
        label: "Reference ID", key: "refId", render: (row) => <>
            {row.status == "New" ? <div className="font-semibold">{row.refId}</div> : <div>{row.refId}</div>}</>,
            sortable: true 
    },
    {
        label: "Assigned To", key: "assignedTo", render: (row) => <>
            {row.status == "New" ? <div className="font-semibold">{row.assignedTo}</div> : <div>{row.assignedTo}</div>}</>,
            sortable: true 
    },
    {
        label: "Subject", key: "subject", render: (row) => <>
            {row.status == "New" ? <div className="font-semibold">{row.subject}</div> : <div>{row.subject}</div>}</>,
            sortable: true 
    },
    {
        label: "Date Received", key: "receivedDate", render: (row) => <>
            {row.status == "New" ? <div className="font-semibold">{row.receivedDate}</div> : <div>{row.receivedDate}</div>}</>,
            sortable: true 
    },
    {
        label: "Report Date", key: "reportedDate", render: (row) => <>
            {row.status == "New" ? <div className="font-semibold">{row.reportedDate}</div> : <div>{row.reportedDate}</div>}</>,
            sortable: true 
    },
    , { }, { },]

return (
    <div className="w-full bg-gray-200 p-4">
        <DynamicTable columns={columns} data={patientsData} />
    </div>
)
}

export default PatientsTable;