import { useState } from "react"
import RightPanel from "./RightPanel";

export default function PatientListNew() {
    const { patientList, setPatientList } = useState([]);

    // function fetchPatientList() {
    //     try {
    //         let response = await
    //     }
    //     catch (err) {

    //     }
    // }
    return (<div className="p-4 flex justify-between"><RightPanel /></div>)
}