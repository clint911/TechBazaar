import { useEffect, useState } from "react"
import { FaLaptopCode } from "react-icons/fa";
import { CiDesktopMouse1 } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

const BestSelling = ({productsList, toggleLike}) => {
    const [likedProducts, setLikedProducts] = useState([])
    
    useEffect(() => {
        const fetchLiked = () => {
            const lovedProducts = productsList.filter((product) => product.liked === true)
            setLikedProducts(lovedProducts)
        }
        fetchLiked()
    }, [])
    return (
        <>
            <div className="flex justify-between items-center">
                <p className="text-3xl"> Best Selling Products</p>
                <button className="bg-[#DB4444] text-white px-5 py-2"> View All </button>
            </div>
            <div className="mt-10">
                <div className="grid grid-cols-4 gap-7">
                    {
                        likedProducts.map((product) => (
                            <div key={product.id} className="h-80 bg-green-500 w-full p-5 flex flex-col gap-6">
                                <div className="h-80 bg-green-500 w-full p-5">
                                    <div className="relative h-45">
                                        <CiHeart
                                            onClick={() => toggleLike(product.id)}
                                            className={`absolute right-0 top-0 text-2xl cursor-pointer ${product.liked ? "text-red-600" : "text-white"
                                                }`}
                                        />
                                        <img src={product.image[0].frontUrl} alt="" className="h-full w-full object-cover"/>
                                    </div>
                                    <small>{product.name}</small>
                                    <p>Ksh{product.price}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div></>
    )
}

export default BestSelling;