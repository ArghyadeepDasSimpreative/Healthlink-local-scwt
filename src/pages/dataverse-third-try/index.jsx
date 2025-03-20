import React, { useEffect, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";

const config = {
  auth: {
    clientId: "51f81489-12ee-4a9e-aaae-a2591f45987d",
    authority: "https://login.microsoftonline.com/common/",
    redirectUri: "https://localhost/5000",
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: false,
  },
};

// Initialize MSAL properly
const msalInstance = new PublicClientApplication(config);

const DataverseRequest = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await msalInstance.initialize();
        setIsInitialized(true);
      } catch (error) {
        console.error("MSAL Initialization error:", error);
      }
    };

    initializeMsal();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const getToken = async () => {
      try {
        const loginResponse = await msalInstance.loginPopup({
          scopes: ["https://orgdefc066e.api.crm6.dynamics.com/.default"],
        });

        const account = loginResponse.account;
        const tokenResponse = await msalInstance.acquireTokenSilent({
          account,
          scopes: ["https://orgdefc066e.api.crm6.dynamics.com/.default"],
        });

        setAccessToken(tokenResponse.accessToken);
      } catch (error) {
        console.error("Authentication error:", error);
      }
    };

    getToken();
  }, [isInitialized]);

  useEffect(() => {
    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://orgdefc066e.api.crm6.dynamics.com/api/data/v9.2/cre8c_personses(ccd84f9f-3ffb-ef11-bae2-000d3acb1e69)",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <h2>Dataverse API Response</h2>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default DataverseRequest;
