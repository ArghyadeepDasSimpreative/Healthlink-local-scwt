import { useEffect, useState } from "react";
import { FaUser, FaPhone, FaMapMarkerAlt, FaBuilding, FaPlus } from "react-icons/fa";
import CustomModal from "../../components/Modal";
import AddPatientForm from "./AddPatientModal";
import { getToken } from "../../lib";

const PatientsListDataverse = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchPatients = async () => {
    try {
      console.log("token is ", getToken())
      const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpETmFfNGk0cjdGZ2lnTDNzSElsSTN4Vi1JVSIsImtpZCI6IkpETmFfNGk0cjdGZ2lnTDNzSElsSTN4Vi1JVSJ9.eyJhdWQiOiJodHRwczovL29yZ2RlZmMwNjZlLmFwaS5jcm02LmR5bmFtaWNzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2Q0MzVmMzYwLTQwOWQtNDRhYi1iYmUxLWEyOWYxNTNiMmM1Ny8iLCJpYXQiOjE3NDE4NTM0OTMsIm5iZiI6MTc0MTg1MzQ5MywiZXhwIjoxNzQxODU4NDkzLCJhY2N0IjowLCJhY3IiOiIxIiwiYWlvIjoiQVZRQXEvOFpBQUFBNEhyM2hWVU8vdE82ZmxiMTQxVjJHQ0QrYlVpQ0xKT3F5bmNJd3ZGSjFKNTBNRjNHK1dYdWw1YmF6THZQYnUrRjhqMk9JTnZNbkRJdFhhbnk2dGxqem1OY3lKQTVOTTAyczNaNzN4czZnbDA9IiwiYW1yIjpbInB3ZCIsIm1mYSJdLCJhcHBpZCI6IjUxZjgxNDg5LTEyZWUtNGE5ZS1hYWFlLWEyNTkxZjQ1OTg3ZCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiUmFoYW1hbiIsImdpdmVuX25hbWUiOiJIYXNpbnVyIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjAyLjguMTE2LjE5MyIsImxvZ2luX2hpbnQiOiJPLkNpUTBaamxqTmpGa05pMWpNR0k0TFRRMk5qUXRPR1ZrTUMwNVptUmpabVZqTTJFek5UUVNKR1EwTXpWbU16WXdMVFF3T1dRdE5EUmhZaTFpWW1VeExXRXlPV1l4TlROaU1tTTFOeG9nYUdGemFXNTFjaTV5WVdoaGJXRnVRSFJsWTJocGJuUnlieTVqYjIwdVlYVWdlUT09IiwibmFtZSI6Ikhhc2ludXIgUmFoYW1hbiIsIm9pZCI6IjRmOWM2MWQ2LWMwYjgtNDY2NC04ZWQwLTlmZGNmZWMzYTM1NCIsInB1aWQiOiIxMDAzMjAwNDBCRDA5ODkxIiwicmgiOiIxLkFVSUFZUE0xMUoxQXEwUzc0YUtmRlRzc1Z3Y0FBQUFBQUFBQXdBQUFBQUFBQUFCQ0FNSkNBQS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWQiOiIwMDJmY2E3OS01ZTBlLTljMTYtYzZjNy0wNzZmMjdjM2EwZjUiLCJzdWIiOiJnUTJ6bE1lWVdVZnhkb2VDNzZxdmFMQkZOYVRTYThXUENUeUFoVjNwZWFZIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik9DIiwidGlkIjoiZDQzNWYzNjAtNDA5ZC00NGFiLWJiZTEtYTI5ZjE1M2IyYzU3IiwidW5pcXVlX25hbWUiOiJoYXNpbnVyLnJhaGFtYW5AdGVjaGludHJvLmNvbS5hdSIsInVwbiI6Imhhc2ludXIucmFoYW1hbkB0ZWNoaW50cm8uY29tLmF1IiwidXRpIjoiSkVFSVVGY25pVUt0QzNmZUR6OGNBQSIsInZlciI6IjEuMCIsInhtc19pZHJlbCI6IjI0IDEifQ.IRmj0j9AACRGTQ2sNc20iyEmX_e2nKzF0heeC9uQSAwHujcwz5wYlanUVQI5oCqK-WqY1wbkTDke0gJSpQapRIw5Y8NNNH4ywlwkM-KL9n2L-876ugePFGQmwH0CSgU8OWu4vo-spQWBhSHc0TvHLScYeCNpchZOF-MEwXuYtzjRmszkBsy6baXN-LwOT4O5obQj4tTBRJTGw5juAImigh_keW3-h4h-jWdI4UBT2zVzaSTIsEsWj-hHxuLknNSLMJXCp_2bD9F_1ExXJzN_9Wr35-Re5luEVlkrfUTmnzR_UiiIErvdHBHE2LVUxfuQo5_-LUM8eDDrHlayrEKDAg"; // Replace with dynamic token if needed

      const response = await fetch(
        "https://orgdefc066e.api.crm6.dynamics.com/api/data/v9.2/cre8c_personses",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      setPatients(data.value);
    } catch (error) {
      console.error("Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  function onPatientAdded() {
    setModalOpen(false);
    fetchPatients();
  }

  const fetchPatientDetails = async (id) => {
    try {
      const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpETmFfNGk0cjdGZ2lnTDNzSElsSTN4Vi1JVSIsImtpZCI6IkpETmFfNGk0cjdGZ2lnTDNzSElsSTN4Vi1JVSJ9.eyJhdWQiOiJodHRwczovL29yZ2RlZmMwNjZlLmFwaS5jcm02LmR5bmFtaWNzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2Q0MzVmMzYwLTQwOWQtNDRhYi1iYmUxLWEyOWYxNTNiMmM1Ny8iLCJpYXQiOjE3NDE4NTM0OTMsIm5iZiI6MTc0MTg1MzQ5MywiZXhwIjoxNzQxODU4NDkzLCJhY2N0IjowLCJhY3IiOiIxIiwiYWlvIjoiQVZRQXEvOFpBQUFBNEhyM2hWVU8vdE82ZmxiMTQxVjJHQ0QrYlVpQ0xKT3F5bmNJd3ZGSjFKNTBNRjNHK1dYdWw1YmF6THZQYnUrRjhqMk9JTnZNbkRJdFhhbnk2dGxqem1OY3lKQTVOTTAyczNaNzN4czZnbDA9IiwiYW1yIjpbInB3ZCIsIm1mYSJdLCJhcHBpZCI6IjUxZjgxNDg5LTEyZWUtNGE5ZS1hYWFlLWEyNTkxZjQ1OTg3ZCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiUmFoYW1hbiIsImdpdmVuX25hbWUiOiJIYXNpbnVyIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjAyLjguMTE2LjE5MyIsImxvZ2luX2hpbnQiOiJPLkNpUTBaamxqTmpGa05pMWpNR0k0TFRRMk5qUXRPR1ZrTUMwNVptUmpabVZqTTJFek5UUVNKR1EwTXpWbU16WXdMVFF3T1dRdE5EUmhZaTFpWW1VeExXRXlPV1l4TlROaU1tTTFOeG9nYUdGemFXNTFjaTV5WVdoaGJXRnVRSFJsWTJocGJuUnlieTVqYjIwdVlYVWdlUT09IiwibmFtZSI6Ikhhc2ludXIgUmFoYW1hbiIsIm9pZCI6IjRmOWM2MWQ2LWMwYjgtNDY2NC04ZWQwLTlmZGNmZWMzYTM1NCIsInB1aWQiOiIxMDAzMjAwNDBCRDA5ODkxIiwicmgiOiIxLkFVSUFZUE0xMUoxQXEwUzc0YUtmRlRzc1Z3Y0FBQUFBQUFBQXdBQUFBQUFBQUFCQ0FNSkNBQS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWQiOiIwMDJmY2E3OS01ZTBlLTljMTYtYzZjNy0wNzZmMjdjM2EwZjUiLCJzdWIiOiJnUTJ6bE1lWVdVZnhkb2VDNzZxdmFMQkZOYVRTYThXUENUeUFoVjNwZWFZIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik9DIiwidGlkIjoiZDQzNWYzNjAtNDA5ZC00NGFiLWJiZTEtYTI5ZjE1M2IyYzU3IiwidW5pcXVlX25hbWUiOiJoYXNpbnVyLnJhaGFtYW5AdGVjaGludHJvLmNvbS5hdSIsInVwbiI6Imhhc2ludXIucmFoYW1hbkB0ZWNoaW50cm8uY29tLmF1IiwidXRpIjoiSkVFSVVGY25pVUt0QzNmZUR6OGNBQSIsInZlciI6IjEuMCIsInhtc19pZHJlbCI6IjI0IDEifQ.IRmj0j9AACRGTQ2sNc20iyEmX_e2nKzF0heeC9uQSAwHujcwz5wYlanUVQI5oCqK-WqY1wbkTDke0gJSpQapRIw5Y8NNNH4ywlwkM-KL9n2L-876ugePFGQmwH0CSgU8OWu4vo-spQWBhSHc0TvHLScYeCNpchZOF-MEwXuYtzjRmszkBsy6baXN-LwOT4O5obQj4tTBRJTGw5juAImigh_keW3-h4h-jWdI4UBT2zVzaSTIsEsWj-hHxuLknNSLMJXCp_2bD9F_1ExXJzN_9Wr35-Re5luEVlkrfUTmnzR_UiiIErvdHBHE2LVUxfuQo5_-LUM8eDDrHlayrEKDAg"; // Replace with dynamic token if needed
      const response = await fetch(
        `https://orgdefc066e.crm6.dynamics.com/api/data/v9.0/cre8c_personses(${id})`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      console.log(Object.keys(data))
      setSelectedPatient(data);
    } catch (error) {
      console.error("Error fetching patient details:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen" style={{ padding: "20px" }}>
      <CustomModal isOpen={modalOpen} onClose={()=>setModalOpen(false)}>
        <AddPatientForm onPatientAdded={onPatientAdded} />
      </CustomModal>
      <div className="flex justify-between items-center mb-4">
        <div className="!text-xl !font-semibold text-gray-800">Patients List</div>
        <button className="bg-blue-500 text-white px-4 py-2 flex items-center gap-2 !text-sm" onClick={() => setModalOpen(true)}>
          <FaPlus /> Add New
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : patients.length === 0 ? (
        <p className="text-center text-gray-500">No data found</p>
      ) : (
        <div className="flex gap-4">
          <div className="w-1/3 flex flex-col gap-2">
            {patients.map((patient) => {
              console.log(selectedPatient, patient);
              return (
                <div
                  key={patient.cre8c_personsid}
                  className={`bg-white p-4 shadow-md border border-gray-400 ${selectedPatient?.cre8c_personsid === patient.cre8c_personsid ? "!bg-emerald-100" : ""}`}
                  onClick={() => fetchPatientDetails(patient.cre8c_personsid)}
                >
                  <div className="flex items-center gap-2 !text-sm text-gray-800">
                    <FaUser className="text-black" />
                    <span className="!font-semibold !text-md">{patient.cre8c_name}</span>
                  </div>
                  <div className="flex items-center gap-2 !text-sm text-gray-600">
                    <FaBuilding className="text-black" />
                    <span>{patient.cre8c_department}</span>
                  </div>
                  <div className="flex items-center gap-2 !text-sm text-gray-600">
                    <FaPhone className="text-black" />
                    <span>{patient.cre8c_contactnumber}</span>
                  </div>
                  <div className="flex items-center gap-2 !text-sm text-gray-600">
                    <FaMapMarkerAlt className="text-black" />
                    <span>{patient.cre8c_address}</span>
                  </div>
                </div>
              )
            }
            )}
          </div>

          {selectedPatient && (
            <div className="w-2/3 p-4 border border-gray-300 bg-white " style={{ margin: "0px 0px auto 0px"}}>
              <h3 className="text-lg !font-semibold">Patient Details</h3>
              <p className="!text-sm"><strong>Name:</strong> {selectedPatient.cre8c_name}</p>
              <p className="!text-sm"><strong>Department:</strong> {selectedPatient.cre8c_department}</p>
              <p className="!text-sm"><strong>Phone:</strong> {selectedPatient.cre8c_contactnumber}</p>
              <p className="!text-sm"><strong>Address:</strong> {selectedPatient.cre8c_address}</p>
              <p className="!text-sm"><strong>Created On:</strong> {new Date(selectedPatient.createdon).toLocaleDateString()}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PatientsListDataverse;
