import { FaMagnifyingGlass } from "react-icons/fa6";

const Navbar = () => {
    return (
        <div className="">
            <div className="flex justify-evenly items-center py-4">
                <h1 className="font-bold text-2xl"> TechBazaar </h1>

                <ul className="flex gap-8 text-lg">
                    <li> Home </li>
                    <li> Contact </li>
                    <li> About </li>
                    <li>
                        <button className="border-b border-gray-400"> Login </button>
                    </li>
                </ul>

                <div className="relative">
                    <input type="text" placeholder="What are you looking for!" className="border border-gray-400 px-4 py-2 rounded-lg" />
                    <FaMagnifyingGlass className="text-lg absolute top-3 right-5"/>

                </div>
            </div>
        </div>
    )
}

export default Navbar;