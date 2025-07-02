import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { useSelector } from "react-redux";

const Success = () => {
    const location = useLocation();
    const [orderId, setOrderId] = useState(null);

    // Check if location.state is available, otherwise provide default values or redirect
    const stripeData = location.state?.stripeData || null;
    const cart = location.state?.products || null;

    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        const createOrder = async () => {
            if (stripeData && cart && currentUser) {
                try {
                    const res = await userRequest.post("/orders", {
                        userId: currentUser.user._id,
                        products: cart.products.map((item) => ({
                            productId: item._id,
                            quantity: item._quantity,
                        })),
                        amount: cart.total,
                        address: stripeData.billing_details.address,
                    });
                    setOrderId(res.data._id);
                } catch (err) {
                    console.log(err.message);
                }
            }
        };
        createOrder();
    }, [cart, stripeData, currentUser]);

    return (
        <div
            className="w-full h-screen flex justify-center items-center xl:px-12 px-8 bg-gray-100"
        >
            <div className="shadow w-fit p-3 rounded text-center bg-white">
                <h1 className="text-gray-600 text-base">
                    {orderId
                        ? `Order has been created successfully. 
                        Your order number is ${orderId}`
                        : `Successfull. Your order is being prepared...`}
                </h1>
                <button style={{ padding: 10, marginTop: 20 }} className="bg-teal-400 text-white rounded">
                    <a href="/" className="text-base"> Go to Homepage </a>
                </button>
            </div>
        </div>
    );
};

export default Success;