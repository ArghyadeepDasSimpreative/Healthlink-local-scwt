import React, { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
// import './App.css';
// import PatientDetails from './pages/patient';
// import PatientList from './pages/patient-list';
// import PatientListNew from './pages/patient-new';
// import PatientListStatic from './pages/patient-list-static';
// import PatientsTable from './pages/patient-table';
// import PatientPageDemo from './pages/patient-page-demo';
// import PatientListR4 from './pages/patient-list-r4';
// import Base64EncoderDecoder from './pages/base64';
// import PersonsListDataverse from './pages/dataverse-first-try';
// import PostToAzureLogicApp from './pages/dataverse-second-try';
import PatientPageDemoTwo from './pages/patient-page-demo-with-api';
import DataverseRequest from './pages/dataverse-third-try';
import { Toaster } from 'react-hot-toast';
// import LoginPage from './pages/login';
// import SentPage from './pages/sent';
// import ParkedPage from './pages/parked';
// import MessagesPage from './pages/messages';
// import UsersPage from './pages/users';
// import PrioritiesPage from './pages/priorities';
// import TransitionScreensPage from './pages/transition-screens';
// import ReferralOutcomesPage from './pages/referrral-outcomes';
// import ClinicLocationsPage from './pages/clinic-locations';
import Layout from './layout';
import WorkListPage from './pages/worklist';

import WorklistTable from "./pages/worklist-table";

function App() {

  return <Layout><PatientPageDemoTwo />
  <Toaster /></Layout>
}

export default App;
