import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { mobile } from '../responsive';
import NavBar from '../components/NavBar';
import Announcements from '../components/Announcements';
import { login } from "../redux/apiCalls";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";

const Container = styled.div`
    width: 100vw; /* For FullScreen Components */
    height: 100vh;
    background: linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)), url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940');
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
    top: 50%;
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
    flex-direction:column;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    align-items: center;
`

const Input = styled.input`
    padding: 10px;
    font-size: 16px;
    margin-bottom: 10px 0;
    border: 1px solid lightgray;
    width:100%;
    ${mobile({ width: "90%" })}
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
const Already = styled.a`
    text-align:center;
    font-size:12px;
    cursor:pointer;
    text-decoration:underline;
    color:purple;
`

const Links = styled.a`
    margin:5px 0px;
    font-size:12px;
    text-decoration:underline;
    cursor:pointer;
    text-align:center;
`


const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);



    const dispatch = useDispatch();

    const handleClick = (e) => {
        setLoading(true);
        e.preventDefault();

        const user = { username, password };

        login(dispatch, user);
        setLoading(false);
    };

    if (loading) {
        return <Loader text="Logging in" />
    }

    return (<>
        <Announcements />
        <NavBar />
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input className="focus:ring" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                    <Input className="focus:ring" placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />

                    {error && <div className="error">{error}</div>}

                    {message && <div className="message">{message}</div>}

                    <Button
                        onClick={handleClick}
                        className="focus:ring-4 focus:ring-blue-300 focus:bg-white focus:text-black focus:outline-none w-full"
                        disabled={loading}
                    >
                        {loading ? "LOADING..." : "LOGIN"}
                    </Button>
                    <Links>
                        DO NOT YOU REMEMBER THE PASSWORD?
                    </Links>
                    <Already>
                        <Link to="/register">
                            DON{"'"}T HAVE AN ACCOUNT? REGISTER
                        </Link>
                    </Already>
                </Form>
            </Wrapper>
        </Container>
    </>
    )
}

export default Login