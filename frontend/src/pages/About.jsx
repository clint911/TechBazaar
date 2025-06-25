import { useEffect, useState } from "react";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
 
const About = () =>{
    const [story, setStory] = useState("")

    useEffect(()=>{
        const fetchStory = async () =>{
            try {
                const response = (await fetch('/techBazaar.txt'));
                
                const text = await response.text()

                console.log(text)

                setStory(text)
                
            } catch (error) {
                console.log("Error fetching the resonse" ,error)                
            }
        }
        fetchStory();
    }, [])
    return(
        <div className="">

            <div className="grid grid-cols-2 gap-10 h-full pl-12 py-6">
                
                <div className="flex flex-col gap-5">
                    <h1 className="text-2xl font-bold"> Our story </h1>
                    <p className="leading-8">{story}</p>
                </div>

                <img src="https://i.pinimg.com/736x/22/fb/f0/22fbf09c1250ffbc4a9604957e9e5ba8.jpg" alt="girls out of shopping" className="w-full h-full" />

            </div>

            <div className="grid grid-cols-4 px-20 gap-10 mt-20">
                <div className="border border-black flex flex-col items-center gap-3 py-4 rounded-lg hover:bg-gray-300">
                    <img src="/images/Services.png" alt="serveces" />
                    <p className="font-bold text-2xl"> 10.5k</p>
                    <p> Sallers active our site</p>
                </div>
                <div className="border border-black flex flex-col items-center gap-3 py-4 rounded-lg hover:bg-gray-300">
                    <img src="/images/cash.png" alt="" />
                    <p> 33k </p>
                    <p> Monthly product sales </p>
                </div>
                <div className="border border-black flex flex-col items-center gap-3 py-4 rounded-lg hover:bg-gray-300">
                    <img src="/images/kyondo.png" alt="" />
                    <p> 45.5k</p>
                    <p> Customer sctive in our site</p>
                </div>
                <div className="border border-black flex flex-col items-center gap-3 py-4 rounded-lg hover:bg-gray-300">
                    <img src="/images/cashbag.png" alt="" />
                    <p> 25k </p>
                    <p> Annual gross sale in our site </p>
                </div>
            </div>

            <div className="grid grid-cols-3 px-20 gap-10 mt-20 justify-center w-full p-10 place-items-center">
                <div className="flex flex-col gap-4"> 
                    <img src="/images/founder & chairman.png" alt="" />
                    <p> Tom Cruise </p>
                    <p> founder and chairman </p>
                    <div className="flex gap-3">
                        <FaXTwitter />
                        <FaInstagram />
                        <FaLinkedinIn />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <img src="/images/managingdirector.png" alt="The managing director" />
                    <p> Emma watson </p>
                    <p> Managing director </p>
                    <div className="flex gap-3">
                        <FaXTwitter />
                        <FaInstagram />
                        <FaLinkedinIn />
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <img src="/images/productdesigner.png" alt="" />
                    <p> Will Smith </p>
                    <p> Product designer </p>
                    <div className="flex gap-3">
                        <FaXTwitter />
                        <FaInstagram />
                        <FaLinkedinIn />
                    </div>
                </div>
            </div>
        
        </div>
    );
}

export default About