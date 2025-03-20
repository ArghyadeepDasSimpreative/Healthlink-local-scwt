import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-[250px] text-gray-800 bg-white p-4">
        <h2 className="text-xl font-bold">Sidebar</h2>
        <ul className="mt-4">
          <li className="p-2 hover:bg-gray-700 rounded">Menu Item 1</li>
          <li className="p-2 hover:bg-gray-700 rounded">Menu Item 2</li>
          <li className="p-2 hover:bg-gray-700 rounded">Menu Item 3</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <nav className="h-[60px] bg-blue-500 text-white flex items-center px-4">
          <h1 className="text-lg font-bold">Navbar</h1>
        </nav>

        {/* Page Content */}
        <main className="w-full h-full flex-1">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
