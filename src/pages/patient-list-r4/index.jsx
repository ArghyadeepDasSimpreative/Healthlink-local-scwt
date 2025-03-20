import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const PatientListR4 = () => {
    const [patientsList, setPatientsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [patientDetails, setPatientDetails] = useState(null);
    const [launchParam, setLaunchParam] = useState(""); // Store encoded launch param
    const patientsPerPage = 10;

    async function getPatientList() {
        try {
            setLoading(true);
            const response = await fetch("https://r4.smarthealthit.org/Patient");
            const responseJson = await response.json();
            setPatientsList(responseJson.entry);
        } catch (err) {
            console.error("Error fetching patient list", err);
        } finally {
            setLoading(false);
        }
    }

    async function getPatientDetails(patientId) {
        try {
            setSelectedPatient(patientId);
            const response = await fetch(`https://r4.smarthealthit.org/Patient/${patientId}`);
            const data = await response.json();
            setPatientDetails(data);

            // Extract the identifier
            const identifier = data.id;
            console.log("identifier is ", identifier);

            // Construct the payload
            // const payloadArray = [
            //     0,
            //     identifier, // Dynamic value from API response
            //     "92149480-fe87-44b1-b835-37b718614c07",
            //     "AUTO",
            //     0,
            //     0,
            //     0,
            //     "launch profile fhirUser openid online_access patient/*.read user/Patient.read user/Practitioner.read user/Questionnaire.read user/QuestionnaireResponse.*",
            //     "http://localhost:5173/smartapp/",
            //     "smart_health_it_app_client_id",
            //     "",
            //     "",
            //     "",
            //     "",
            //     0,
            //     1,
            //     ""
            // ];

            const payloadArray = [0,identifier,"92149480-fe87-44b1-b835-37b718614c07","AUTO",0,0,0,"launch profile fhirUser openid online_access patient/*.read user/Patient.read user/Practitioner.read user/Questionnaire.read user/QuestionnaireResponse.*","http://localhost:5173/smartapp/","smart_health_it_app_client_id","","","","",0,1,""];
           


            // Convert to JSON and Base64 encode
            const encodedLaunchParam = btoa(JSON.stringify(payloadArray));
            console.log("encoded string is -------", encodedLaunchParam);

            // Set the encoded launch param
            setLaunchParam(encodedLaunchParam);

            // setLaunchParam("WzAsIjU0NmViYzAyLTdhMjQtNDk3Zi1iY2JjLWUzYmI0NzNkYWM3YSIsIjkyMTQ5NDgwLWZlODctNDRiMS1iODM1LTM3YjcxODYxNGMwNyIsIkFVVE8iLDAsMCwwLCJsYXVuY2ggcHJvZmlsZSBmaGlyVXNlciBvcGVuaWQgb25saW5lX2FjY2VzcyBwYXRpZW50LyoucmVhZCB1c2VyL1BhdGllbnQucmVhZCB1c2VyL1ByYWN0aXRpb25lci5yZWFkIHVzZXIvUXVlc3Rpb25uYWlyZS5yZWFkIHVzZXIvUXVlc3Rpb25uYWlyZVJlc3BvbnNlLioiLCJodHRwOi8vbG9jYWxob3N0OjUxNzMvc21hcnRhcHAvIiwic21hcnRfaGVhbHRoX2l0X2FwcF9jbGllbnRfaWQiLCIiLCIiLCIiLCIiLDAsMSwiIl0")
            
        } catch (err) {
            console.error("Error fetching patient details", err);
        }
    }

    useEffect(() => {
        getPatientList();
    }, []);

    return (
        <div className="flex bg-gray-100 p-5 h-screen">
            {/* Left Column - Patients List */}
            <div className="w-1/3 border-r overflow-y-auto p-4">
                <h2 className="text-2xl font-bold text-gray-700 mb-4">Patients</h2>
                <div className="flex flex-col gap-2">
                    {patientsList.slice(0, patientsPerPage).map((patient) => {
                        const patientId = patient.resource.id;
                        const nameObj = patient.resource.name?.[0] || {};
                        const fullName = `${nameObj.prefix?.[0] || ''} ${nameObj.given?.join(" ") || ''} ${nameObj.family || ''}`.trim();
                        return (
                            <div key={patientId} className="border p-4 rounded-lg shadow-sm bg-white flex justify-between items-center hover:bg-gray-200 cursor-pointer" onClick={() => getPatientDetails(patientId)}>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">{fullName || "Unknown"}</h3>
                                    <p className="text-sm text-gray-600">ID: {patientId}</p>
                                </div>
                                <FaArrowRight size={20} className="text-blue-600" />
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right Column - Patient Details */}
            <div className="w-2/3 p-5">
                {selectedPatient && patientDetails ? (
                    <div className="border bg-white p-5 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-gray-700 mb-3">Patient Details</h3>
                        <p className="text-gray-600"><strong>Name:</strong> {patientDetails.name?.[0]?.given?.join(" ")} {patientDetails.name?.[0]?.family}</p>
                        <p className="text-gray-600"><strong>Gender:</strong> {patientDetails.gender}</p>
                        <p className="text-gray-600"><strong>Birth Date:</strong> {patientDetails.birthDate}</p>
                        <p className="text-gray-600"><strong>Phone:</strong> {patientDetails.telecom?.[0]?.value || "N/A"}</p>
                        <p className="text-gray-600"><strong>Address:</strong> {patientDetails.address?.[0]?.line?.join(", ")}, {patientDetails.address?.[0]?.city}, {patientDetails.address?.[0]?.state}</p>

                        {/* Launch Button with Encoded Launch Param */}
                        {launchParam && (
                            <>
                                <a className="bg-blue-600 text-white p-2 rounded-sm mt-4 inline-block"
                                    href={`http://localhost:5173/smartapp/launch?iss=https%3A%2F%2Flaunch.smarthealthit.org%2Fv%2Fr4%2Ffhir&launch=${encodeURIComponent(launchParam)}`}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                >
                                    Launch
                                </a>
                                {/* <button onClick={()=>console.log(`http://localhost:5173/smartapp/launch?iss=https%3A%2F%2Flaunch.smarthealthit.org%2Fv%2Fr4%2Ffhir&launch=${encodeURIComponent(launchParam)}`)}>HI</button> */}
                            </>

                        )}
                    </div>
                ) : (
                    <div className="text-gray-500 text-center text-lg">Select a patient to view details</div>
                )}
            </div>
        </div>
    );
};

export default PatientListR4;
