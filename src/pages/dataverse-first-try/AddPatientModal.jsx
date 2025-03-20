import { useState } from "react";
import showToast from "../../lib/toast";

export default function AddPatientForm({ onPatientAdded }) {
  const [formData, setFormData] = useState({
    cre8c_name: "",
    cre8c_department: "",
    cre8c_address: "",
    cre8c_contactnumber: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const accessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IkpETmFfNGk0cjdGZ2lnTDNzSElsSTN4Vi1JVSIsImtpZCI6IkpETmFfNGk0cjdGZ2lnTDNzSElsSTN4Vi1JVSJ9.eyJhdWQiOiJodHRwczovL29yZ2RlZmMwNjZlLmFwaS5jcm02LmR5bmFtaWNzLmNvbSIsImlzcyI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0L2Q0MzVmMzYwLTQwOWQtNDRhYi1iYmUxLWEyOWYxNTNiMmM1Ny8iLCJpYXQiOjE3NDE4NTM0OTMsIm5iZiI6MTc0MTg1MzQ5MywiZXhwIjoxNzQxODU4NDkzLCJhY2N0IjowLCJhY3IiOiIxIiwiYWlvIjoiQVZRQXEvOFpBQUFBNEhyM2hWVU8vdE82ZmxiMTQxVjJHQ0QrYlVpQ0xKT3F5bmNJd3ZGSjFKNTBNRjNHK1dYdWw1YmF6THZQYnUrRjhqMk9JTnZNbkRJdFhhbnk2dGxqem1OY3lKQTVOTTAyczNaNzN4czZnbDA9IiwiYW1yIjpbInB3ZCIsIm1mYSJdLCJhcHBpZCI6IjUxZjgxNDg5LTEyZWUtNGE5ZS1hYWFlLWEyNTkxZjQ1OTg3ZCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiUmFoYW1hbiIsImdpdmVuX25hbWUiOiJIYXNpbnVyIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiMjAyLjguMTE2LjE5MyIsImxvZ2luX2hpbnQiOiJPLkNpUTBaamxqTmpGa05pMWpNR0k0TFRRMk5qUXRPR1ZrTUMwNVptUmpabVZqTTJFek5UUVNKR1EwTXpWbU16WXdMVFF3T1dRdE5EUmhZaTFpWW1VeExXRXlPV1l4TlROaU1tTTFOeG9nYUdGemFXNTFjaTV5WVdoaGJXRnVRSFJsWTJocGJuUnlieTVqYjIwdVlYVWdlUT09IiwibmFtZSI6Ikhhc2ludXIgUmFoYW1hbiIsIm9pZCI6IjRmOWM2MWQ2LWMwYjgtNDY2NC04ZWQwLTlmZGNmZWMzYTM1NCIsInB1aWQiOiIxMDAzMjAwNDBCRDA5ODkxIiwicmgiOiIxLkFVSUFZUE0xMUoxQXEwUzc0YUtmRlRzc1Z3Y0FBQUFBQUFBQXdBQUFBQUFBQUFCQ0FNSkNBQS4iLCJzY3AiOiJ1c2VyX2ltcGVyc29uYXRpb24iLCJzaWQiOiIwMDJmY2E3OS01ZTBlLTljMTYtYzZjNy0wNzZmMjdjM2EwZjUiLCJzdWIiOiJnUTJ6bE1lWVdVZnhkb2VDNzZxdmFMQkZOYVRTYThXUENUeUFoVjNwZWFZIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik9DIiwidGlkIjoiZDQzNWYzNjAtNDA5ZC00NGFiLWJiZTEtYTI5ZjE1M2IyYzU3IiwidW5pcXVlX25hbWUiOiJoYXNpbnVyLnJhaGFtYW5AdGVjaGludHJvLmNvbS5hdSIsInVwbiI6Imhhc2ludXIucmFoYW1hbkB0ZWNoaW50cm8uY29tLmF1IiwidXRpIjoiSkVFSVVGY25pVUt0QzNmZUR6OGNBQSIsInZlciI6IjEuMCIsInhtc19pZHJlbCI6IjI0IDEifQ.IRmj0j9AACRGTQ2sNc20iyEmX_e2nKzF0heeC9uQSAwHujcwz5wYlanUVQI5oCqK-WqY1wbkTDke0gJSpQapRIw5Y8NNNH4ywlwkM-KL9n2L-876ugePFGQmwH0CSgU8OWu4vo-spQWBhSHc0TvHLScYeCNpchZOF-MEwXuYtzjRmszkBsy6baXN-LwOT4O5obQj4tTBRJTGw5juAImigh_keW3-h4h-jWdI4UBT2zVzaSTIsEsWj-hHxuLknNSLMJXCp_2bD9F_1ExXJzN_9Wr35-Re5luEVlkrfUTmnzR_UiiIErvdHBHE2LVUxfuQo5_-LUM8eDDrHlayrEKDAg";
      const response = await fetch("https://orgdefc066e.crm6.dynamics.com/api/data/v9.0/cre8c_personses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add patient");
      }

      setFormData({ cre8c_name: "", cre8c_department: "", cre8c_address: "", cre8c_contactnumber: "" });
      onPatientAdded(); // Refresh the list
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(function(){
        showToast("New patient added successfully!");
        console.log("hyhyyy")
      }, 1000)
    }
  };

  return (
    <form
  onSubmit={handleSubmit}
  className="shadow-md flex flex-col gap-4 items-center bg-white" style={{padding: "30px", borderRadius: "10px"}}
>
  {error && <p className="text-red-500 text-sm !font-semibold">{error}</p>}

  <input
    type="text"
    name="cre8c_name"
    placeholder="Name"
    value={formData.cre8c_name}
    onChange={handleChange}
    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 !text-base !font-medium"
    required
  />
  <input
    type="text"
    name="cre8c_department"
    placeholder="Department"
    value={formData.cre8c_department}
    onChange={handleChange}
    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 !text-base !font-medium"
    required
  />
  <input
    type="text"
    name="cre8c_address"
    placeholder="Address"
    value={formData.cre8c_address}
    onChange={handleChange}
    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 !text-base !font-medium"
    required
  />
  <input
    type="text"
    name="cre8c_contactnumber"
    placeholder="Contact Number"
    value={formData.cre8c_contactnumber}
    onChange={handleChange}
    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 !text-base !font-medium"
    required
  />

  <button
    type="submit"
    className=" bg-blue-600 text-white p-2 !text-base !font-semibold transition-all duration-300 hover:bg-gray-800 disabled:opacity-50"
    disabled={loading}
  >
    {loading ? "Adding..." : "Add Patient"}
  </button>
</form>

  );
}
