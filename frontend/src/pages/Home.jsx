import { useEffect, useState } from "react";
import categories from "../assets/categories";
import products from "../assets/products"
import { CiHeart } from "react-icons/ci";
import { FaLaptopCode } from "react-icons/fa";
import { CiDesktopMouse1 } from "react-icons/ci";

const Home = () => {

    const [category, setCategory] = useState([])
    const [productsList, setProductsList] = useState(products)
    const [likedProducts, setLikedProducts] = useState([])

    const toggleLike = (id) => {
        setProductList((prevProducts) =>
            prevProducts.map((product) =>
                product.id === id ? { ...product, liked: !product.liked } : product
            )
        );
    };
    useEffect(() => {
        const fetchCategories = async () => {
            setCategory(categories)

        }
        fetchCategories();
    }, [])


    useEffect(() => {
        const fetchLiked = () => {
            const likedProducts = products.filter((product) => product.liked === true)
            setLikedProducts(likedProducts)
        }
        fetchLiked()
    }, [])
    return (
        <div className="p-10">
            <div className="grid grid-cols-4 gap-4">
                <ul className="space-y-2 p-4">
                    {category.map((cat) => (
                        <li className="cursor-pointer" key={cat.id}>{cat.name}</li>
                    ))}
                </ul>

                <div className="col-span-3 bg-gray-300 p-4 h-100">
                    <img
                        src="https://i.pinimg.com/736x/52/c5/1b/52c51bbe0ea48c66858a00816549edac.jpg"
                        alt="Tech showcase"
                        className="w-full h-full rounded object-cover"
                    />
                </div>
            </div>

            <div className="mt-20 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="bg-red-500 h-10 w-5 rounded-sm"></div>
                    <p className="text-red-500">Today's</p>
                </div>
                <div className="w-full">
                    <p className="text-3xl text-start"> Flash Sales </p>
                    <div className="flex flex-row gap-7 mt-4">
                        {products.map((product) => (
                            <div key={product.id} className="h-80 bg-green-500 w-full p-5">
                                <div className="relative h-40">
                                    <CiHeart
                                        onClick={() => toggleLike(product.id)}
                                        className={`absolute right-0 top-0 text-2xl cursor-pointer ${product.liked ? "text-red-600" : "text-white"
                                            }`}
                                    />
                                    <img src={product.image[0].frontUrl} alt="" />
                                </div>
                                <small>{product.name}</small>
                                <p>Ksh{product.price}</p>
                            </div>
                        )

                        )}
                    </div>

                    <button className="bg-[#DB4444] text-white px-5 py-2 mt-5 rounded-md block mx-auto"> View Products </button>
                </div>
                <div>
                    <div className="mt-20 flex flex-col gap-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-red-500 h-10 w-5 rounded-sm"></div>
                            <p className="text-red-500">Categories</p>
                        </div>

                        <div className="">
                            <p className="text-3xl text-start"> Browse By Category </p>
                            <div className="grid grid-cols-4 gap-6 mt-10">
                                {categories.map((cat) => (
                                    <div className="border border-gray-400 w-30 h-full rounded flex flex-col items-center p-6 cursor-pointer" key={cat.id}>
                                        <img src={cat.image} alt="" />
                                        <p> {cat.name} </p>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                </div>


                <div className="mt-20 flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-500 h-10 w-5 rounded-sm"></div>
                        <p className="text-red-500">Categories</p>
                    </div>

                    <div className="">
                        <div className="flex justify-between items-center">
                            <p className="text-3xl"> Best Selling Products</p>
                            <button className="bg-[#DB4444] text-white px-5 py-2"> View All </button>
                        </div>
                        <div className="mt-10">
                            <div className="grid grid-cols-4 gap-7">
                                {
                                    likedProducts.map((product) => (
                                        <div key={product.id} className="h-80 bg-green-500 w-full p-5 flex flex-col gap-6">
                                            <div key={product.id} className="h-80 bg-green-500 w-full p-5">
                                                <div className="relative h-40">
                                                    <CiHeart
                                                        onClick={() => toggleLike(product.id)}
                                                        className={`absolute right-0 top-0 text-2xl cursor-pointer ${product.liked ? "text-red-600" : "text-white"
                                                            }`}
                                                    />
                                                    <img src={product.image[0].frontUrl} alt="" />
                                                </div>
                                                <small>{product.name}</small>
                                                <p>Ksh{product.price}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
