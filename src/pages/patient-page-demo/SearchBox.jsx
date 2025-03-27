import { FaSearch } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

export default function IncludeArchived() {
    return (
        <div className="w-full max-w-md border border-gray-300 p-0">
            <div className="flex justify-between items-center px-[20px] py-[10px] border-b border-gray-300">
                <div className="font-semibold text-sm text-[#202224]">Include Archived</div>
                <IoIosArrowDown className="" />
            </div>
            <div className="px-[20px] py-[12px] flex flex-col !gap-2 bg-white">
                <div className="flex justify-between w-full items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="!border !border-[#D5D5D5] !bg-[#F5F6FA] !w-[80%] !text-center !text-sm p-1 placeholder-[#D5D5D5]"
                        style={{
                            border: '1px solid #D5D5D5',
                            backgroundColor: '#F5F6FA',
                            width: '80%',
                            color:"#282828",
                            textAlign: 'center',
                            fontSize: '14px', // Equivalent to text-sm in Tailwind
                            padding: '4px',
                            outline:'none', // Equivalent to p-1 in Tailwind
                            '::placeholder': {
                                color: '#999999',
                            },
                        }}
                    />



                    <FaSearch className="text-blue-600 cursor-pointer" size={18} />
                    <HiMenuAlt3 className="text-blue-600 cursor-pointer" size={25} />
                </div>
                <div className="flex items-center justify-start !gap-1">
                    <div className="flex items-center !bg-[#BED6FA] !text-blue-600 px-2 py-1 !text-xs !font-medium h-full">
                        Include Archived

                    </div>
                    <div className="flex items-center !bg-[#BED6FA] !text-blue-600 px-1 py-1 !text-xs !font-medium h-[24px]">
                        <IoClose className="ml-1 cursor-pointer" size={15} />
                    </div>

                </div>
            </div>
        </div>
    );
}
