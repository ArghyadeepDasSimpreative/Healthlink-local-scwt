import { useState } from "react";
import { FaMicrosoft } from "react-icons/fa";
import loginImage from "../../assets/login-page-illustration.jpg";
import microsoftLogo from "../../assets/microsoft-logo.png";

const LoginPage = () => {
    const [showOptions, setShowOptions] = useState(false);

    return (
        <div className="w-full min-h-screen flex justify-center items-center bg-gray-200">
            <div className="flex bg-white rounded-xl shadow-lg p-6 m-auto w-[80vw] h-[90vh] overflow-hidden">
                {/* Left Side - Illustration */}
                <img src={loginImage} className="w-1/2 h-full object-cover rounded-lg" alt="Login Illustration" />
                
                {/* Right Side - Login Section */}
                <div className="ml-6 w-1/2 h-auto flex flex-col justify-start border border-gray-200 shadow-sm rounded-md p-4">
                    <h2 className="text-3xl font-semibold mb-4 text-gray-800">Welcome to Patients Portal</h2>
                    <p className="text-xl text-gray-500 mb-3">Let's get started</p>
                    
                    {/* Microsoft Login Button */}
                    <div className="relative w-full">
                        <button 
                            className="w-full cursor-pointer bg-white border border-blue-600 text-blue-600 font-semibold flex items-center justify-center py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                            onClick={() => setShowOptions(!showOptions)}
                        >
                            <img src={microsoftLogo} alt="Microsoft Logo" className="w-6 h-6 mr-3" /> Login with Microsoft
                        </button>
                        
                        {/* Dropdown Options */}
                        {showOptions && (
                            <div className="absolute w-full mt-2 bg-white shadow-md rounded-lg border border-gray-200 overflow-hidden">
                                <button 
                                    className="w-full cursor-pointer px-4 py-3 text-left hover:bg-gray-100"
                                    onClick={() => window.open('https://login.microsoftonline.com/', '_blank')}
                                >
                                    Login with Microsoft Office 365
                                </button>
                                <button 
                                    className="w-full cursor-pointer px-4 py-3 text-left hover:bg-gray-100"
                                    onClick={() => alert('Login with Azure AD B2C')}
                                >
                                    Login with Azure AD B2C
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
