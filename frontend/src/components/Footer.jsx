import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="border-t-2 border-gray-500 bg-black mt-30 px-20 py-10">

            <div className=" grid grid-cols-4">
                <div>
                    <h1 className="text-white font-bold text-xl">Exclusive</h1>
                    <h3 className="text-white">Subcribe</h3>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="font-bold text-white"> Support </h1>
                    <ul className="flex flex-col gap-4">
                        <li className=" text-white">32asdfsafdg</li>
                        <li className=" text-white">Exclusive@gmail.com</li>
                        <li className=" text-white">+254 767 456 678</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-white font-bold"> My Account </h1>
                    <ul className="flex flex-col gap-4">
                        <li className="text-white"> <Link to="/register" className="border-b border-gray-500"> Register </Link> / <Link to="/login" className="border-b border-gray-500"> Login </Link></li>
                        <li className="text-white"> Cart </li>
                        <li className="text-white"> Wishlist </li>
                        <li className="text-white"> Shop </li>
                    </ul>
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className="text-white font-bold">Quick Link</h1>
                    <ul className="flex flex-col gap-4">
                        <li className="text-white"> Privacy Policy </li>
                        <li className="text-white"> Terms of use </li>
                        <li className="text-white"> FAQ </li>
                        <li className="text-white"> Contact </li>
                    </ul>
                </div>
            </div>

            <div className="mt-5"> 
                <p className="text-gray-400 text-center">&copy; Copyright TechBazaar 2025. All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer;