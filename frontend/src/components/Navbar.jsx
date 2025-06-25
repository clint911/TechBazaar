const Navbar = () => {
    return (
        <div className="bg-green-300"> 
            <div className="flex justify-evenly items-center py-4 bg-gray-400">
                <h1 className="font-bold"> TechBazaar </h1>
               
                    <ul className="flex gap-8 text-lg">
                        <li> Home </li>
                        <li> Contact </li>
                        <li> About </li>
                        <li>
                            <button className="border-b border-gray-400"> SignUp </button>
                        </li>
                    </ul>

                    <input type="text" placeholder="What are you looking for!" className="border border-gray-400 px-4 py-2" />              

            </div>
        </div>
    )
}

export default Navbar;