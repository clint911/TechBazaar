import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from '../responsive';
import NavBar from '../components/NavBar';
import Announcements from '../components/Announcements';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/apiCalls";

const Container = styled.div`
    width: 100vw; /* For FullScreen Components */
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
    background-size:cover;
    display: flex;
    justify-content: center;
    align-items: center;
    ${mobile({ backgroundPosition: "100%" })}
`

const Wrapper = styled.div`
    width: 40%;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    ${mobile({ width: "80%" })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
    text-align: center;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-items: center;
`

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px;
    border: 1px solid lightgray;
    ${mobile({ width: "100%" })}
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 10px 0;
    text-align: center;
`

const Button = styled.button`
    padding: 8px 20px;
    border: none;
    background-color: teal;
    color: white;
    font-size: 18px;
    font-weight: 300;
    cursor: pointer;
    margin-bottom: 10px;
    transition: all 0.3s ease;

    &:hover {
        background-color: darkcyan;
    }
`

const Already = styled.p`
    text-align:center;
    font-size:12px;
    cursor:pointer;

    &:hover{
        text-decoration:underline;
        color:purple;
    }
`

const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();

    const handleClick = (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            setError("Your password confirmation is incorrect!!");
            setLoading(false);
            return;
        } else {
            const user = { firstName, lastName, username, email, password };

            register(dispatch, user);
            setMessage("Your account has been created successfully!!");
            setLoading(false);
        }

        setMessage("");
        setError("");
        setLoading(false);
    };

    return (
        <>
            <Announcements />
            <NavBar />
            <Container>
                <Wrapper>
                    <Title>CREATE AN ACCOUNT</Title>
                    <Form>
                        <Input className="focus:ring " placeholder="first name" onChange={(e) => setFirstName(e.target.value)} />
                        <Input className="focus:ring" placeholder="last name" onChange={(e) => setLastName(e.target.value)} />
                        <Input className="focus:ring" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                        <Input className="focus:ring" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                        <Input
                            className="focus:ring"
                            type="password"
                            placeholder="password" onChange={(e) => setPassword(e.target.value)} />
                        <Input
                            className="focus:ring"
                            type="password"
                            placeholder="confirm password" onChange={(e) => setConfirmPassword(e.target.value)} />
                        <Agreement>
                            By creating an account, I consent to the processing of my personal data in accordance with the <a href="/privacy-policy">
                                <b>PRIVACY POLICY</b>
                            </a>
                        </Agreement>

                        {error && <div className="error">{error}</div>}

                        {message && <div className="message">{message}</div>}

                        <Button
                            onClick={handleClick}
                            className="focus:ring-4 focus:ring-blue-300 focus:bg-white focus:text-black focus:outline-none w-full"
                            disabled={loading}
                        >
                            {loading ? "LOADING..." : "CREATE"}
                        </Button>
                        <Already>
                            <Link to="/login">
                                Already Have an Account? Sign In
                            </Link>
                        </Already>
                    </Form>

                </Wrapper>
            </Container>
        </>
    )
}

export default Register
