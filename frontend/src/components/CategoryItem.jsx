import styled from "styled-components"
import { mobile } from "../responsive"
import { Link } from "react-router-dom"

const Container = styled.div`
    flex: 1;
    margin: 3px;
    height: 70vh;
    position:relative;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.5s ease;
    ${mobile({ height: "30vh" })}

    &:hover{
        transform: scale(1.1);
    }
`
const Info = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: rgba(0,0,0,0.2);
`
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
    font-weight: 600;
    font-size:20px;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    color: gray;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.5s ease;

    &:hover{
        transform: scale(1.1);
    }
`



const CategoryItem = ({ item }) => {
    
console.log("CategoryItem item:", item);

    return (
        <Container>
            <Link to={`/products/${item.cat}`}>
                <Image src={item.img} />
                <Info>
                    <Title>{item.title}</Title>
                    <Button>
                        SHOP NOW
                    </Button>
                </Info>
            </Link>
        </Container>
    )
}

export default CategoryItem