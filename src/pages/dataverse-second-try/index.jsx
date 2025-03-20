import axios from "axios";
import { useEffect } from "react";

const PostToAzureLogicApp = () => {
  const handlePostRequest = async () => {
    try {
      const payload = {
        message: "Hello from React!",
        // Add other key-value pairs as needed
      };

      const response = await axios.post(
        "https://prod-26.australiaeast.logic.azure.com:443/workflows/a025e1abd7ef46579fad6f7b9cc81b42/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=FQzLpCV5_LGnhhx7lQXVLx4Au-wd7S27LjGqkuCTI0s",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("normal response is ", response)

      let formattedResponse = await response.json();

      console.log("Response from Azure Logic App:", formattedResponse);
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };

  useEffect(function() {
    handlePostRequest()
  }, [])

  return (
    <div>
      <button onClick={handlePostRequest}>Send POST Request</button>
    </div>
  );
};

export default PostToAzureLogicApp;
