import React, { useState } from "react";
import { FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const DynamicTable = ({ data, columns }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Sorting Function
    const handleSort = (key, isSortable) => {
        if (!isSortable) return;
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig.key) return 0;
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentData = sortedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    return (
        <div className="bg-gray-200 shadow-lg p-4">
            <table className="w-full bg-white  rounded-lg overflow-hidden p-4 border-collapse">
                <thead>
                    <tr className="bg-[#1F70F2] text-white">
                        {columns.map(({ label, key, sortable = false }) => (
                            <th
                                key={key}
                                className="p-3 text-left cursor-pointer"
                                onClick={() => handleSort(key, sortable)}
                            >
                                <div className="flex items-center font-light text-sm">
                                    {label}
                                    {sortable && (
                                        <span className="ml-2">
                                            {sortConfig.key === key ? (
                                                sortConfig.direction === "asc" ? (
                                                    <IoIosArrowUp />
                                                ) : (
                                                    <IoIosArrowDown />
                                                )
                                            ) : (
                                                <IoIosArrowUp className="opacity-50" />
                                            )}
                                        </span>
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-zinc-300 hover:bg-gray-100">
                            {columns.map(({ key, render }) => (
                                <td key={key} className="p-3 font-normal text-sm">
                                    {render ? render(row) : row[key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>



            {/* Pagination Controls */}
            <div className="flex justify-end items-center mt-4 space-x-0">
                <div className="flex items-center">
                    <button
                        className="border border-gray-200 px-3 bg-white flex items-center justify-center h-[20px]"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        <FaChevronLeft className="w-3 h-3" />
                    </button>
                    <span className="px-4 border border-gray-200 flex items-center justify-center h-[20px] min-w-[40px] bg-gray-100">
                        {currentPage}
                    </span>
                    <button
                        className="border border-gray-200 px-3 bg-white flex items-center justify-center h-[20px]"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        <FaChevronRight className="w-3 h-3" />
                    </button>
                </div>

                <span className="ml-3 text-sm text-gray-600 mr-2">Items per page:</span>
                <select
                    className="border border-gray-400 h-[20px] rounded text-xs min-w-[55px] text-center"
                    value={itemsPerPage}
                    onChange={(e) => {
                        setItemsPerPage(Number(e.target.value));
                        setCurrentPage(1);
                    }}
                >
                    {[5, 10, 15, 20].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>


            </div>
        </div>
    );
};

export default DynamicTable;
