/* import styled from "styled-components";
import { mobile } from "../responsive"; */
import Announcements from "../components/Announcements";
import NavBar from "../components/NavBar";

/* const Logo = styled.h1`
  font-weight: bold;
  font-size: 30px;
  ${mobile({ fontSize: "24px" })}
`;
const LogoSpan = styled.span`
  font-size: 25px;
  color:teal;
`; */

const PrivacyPolicy = () => {
    const year = new Date().getFullYear();
    return (
        <>
            <NavBar />
            <Announcements />
            <div className="max-w-screen-2xl xl:px-24 px-6 bg-gray-100 py-8">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl text-gray-800 font-light text-center mb-6">Privacy Policy {/* for
                        <Logo id="logo" className="text-black">my<LogoSpan id="logo">Duka.</LogoSpan></Logo> */}
                    </h1>

                    <p className="mb-4">
                        At MyDuka, accessible from www.myduka.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by MyDuka and how we use it.
                    </p>

                    <h2 className="text-xl font-light mt-6 mb-4 text-teal-600">1. Information We Collect</h2>
                    <p className="mb-4">
                        When you visit MyDuka, we may collect personal identification information such as your name, email address, phone number, and shipping details when you create an account, place an order, or contact us.
                    </p>

                    <h2 className="text-xl font-light mt-6 mb-4 text-teal-600">2. How We Use Your Information</h2>
                    <p className="mb-4">
                        MyDuka uses your information to:
                        <ul className="list-disc list-inside ml-4">
                            <li>Process and fulfill your orders</li>
                            <li>Provide customer support</li>
                            <li>Improve our services</li>
                            <li>Send marketing emails with your consent</li>
                        </ul>
                    </p>

                    <h2 className="text-xl font-light text-teal-600 mt-6 mb-4">3. Protecting Your Information</h2>
                    <p className="mb-4">
                        MyDuka takes the security of your information seriously. We implement various security measures to protect your data against unauthorized access, use, or disclosure.
                    </p>

                    <h2 className="text-xl font-light text-teal-600 mt-6 mb-4">4. Sharing Your Information</h2>
                    <p className="mb-4">
                        We do not sell or share your personal information with third parties except for trusted services that assist in operating our website or conducting our business, as long as they agree to keep this information confidential.
                    </p>

                    <h2 className="text-xl font-light text-teal-600 mt-6 mb-4">5. Your Consent</h2>
                    <p className="mb-4">
                        By using MyDuka, you consent to our privacy policy. You may withdraw your consent at any time by contacting us.
                    </p>

                    <h2 className="text-xl font-light text-teal-600 mt-6 mb-4">6. Changes to This Privacy Policy</h2>
                    <p className="mb-4">
                        MyDuka reserves the right to update this policy at any time. Any changes will be reflected on this page, and we encourage you to review it periodically.
                    </p>

                    <h2 className="text-xl font-light text-teal-600 mt-6 mb-4">7. Contact Us</h2>
                    <p className="mb-4">
                        If you have any questions about this Privacy Policy, you can contact us at support@myduka.com.
                    </p>

                    <p className="text-sm text-gray-600 text-center mt-8">
                        © {year} MyDuka. All Rights Reserved.
                    </p>
                </div>
            </div>
        </>
    );
};

export default PrivacyPolicy;