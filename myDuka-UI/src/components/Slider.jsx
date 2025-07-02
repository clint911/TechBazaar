import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material"
import styled from "styled-components"
import { useState } from "react"
import { sliderItems } from "../data"
import { Link } from "react-router-dom"
import { mobile } from "../responsive";

const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    position:relative;
    overflow:hidden;
    ${mobile({display:"none"})}
`

const Arrow = styled.div`
    width:50px;
    height:50px;
    background-color:#fff7f7;
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    top:0;
    bottom:0;
    left:${props => props.direction === "left" && "10px"};
    right:${props => props.direction === "right" && "10px"};
    margin:auto;
    cursor:pointer;
    opacity:0.5;
    z-index:2;
`
const Wrapper = styled.div`
    height:100%;
    display:flex;
    transition:all 1.5s ease;
    transform:translateX(${props => props.slideindex * -100}vw);
`
const Slide = styled.div`
    width:100vw;
    height:100vh;
    display:flex;
    align-items:center;
    background-color:#${props => props.bg};
`
const ImgContainer = styled.div`
    flex:1;
    height:100%;
    ${mobile({ position: "absolute" })};
`

const InfoContainer = styled.div`
    flex:1;
    padding:50px;
    display:flex;
    flex-direction:column;
    gap:20px;
    ${mobile({ alignItems: "center", zIndex: "2" })};
`
const Image = styled.img`
    height:80%;
`

const Title = styled.h1`
    font-size:70px;
    ${mobile({textAlign:"center", fontSize:"50px"})}
`

const Desc = styled.p`
    margin:20px 0;
    font-size:20px;
    font-weight:500;
    letter-spacing:3px;
`

const Button = styled.button`
    padding:10px;
    font-size:20px;
    background-color:transparent;
    cursor:pointer;
    border:2px solid #000;
`

const WrapperBtn = styled.div`
    
`

const Slider = () => {

    const [slideindex, setslideindex] = useState(0);

    const handleClick = (direction) => {
        if (direction === "left") {
            setslideindex(slideindex > 0 ? slideindex - 1 : 2)
        } else {
            setslideindex(slideindex < 2 ? slideindex + 1 : 0)
        }
    }

    return (
        <Container>
            <Arrow direction="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideindex={slideindex}>
                {sliderItems.map(item => (
                    <Slide bg={item.bg} key={item.id}>
                        <ImgContainer>
                            <Image src={item.img} />
                        </ImgContainer>
                        <InfoContainer>
                            <Title>{item.title}</Title>
                            <Desc>{item.desc}</Desc>
                            <WrapperBtn>
                                <Button>
                                    <Link to="/products">
                                        SHOP NOW
                                    </Link>
                                </Button>
                            </WrapperBtn>
                        </InfoContainer>
                    </Slide>
                ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}


export default Slider