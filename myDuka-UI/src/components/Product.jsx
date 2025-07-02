import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import styled from "styled-components"
import { mobile } from "../responsive"
import { Link } from "react-router-dom"

const Info = styled.div`
    opacity: 0;
    width:100%;
    height: 100%;
    position:absolute;
    top:0;
    left:0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;    
`

const Container = styled.div`
    flex:1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;
    ${mobile({ width: "100%" })}

    &:hover ${Info}{
        opacity: 1;
    }
`
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position:absolute;
`
const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    cursor: pointer;
    transition: all 0.5s ease;

    &:hover{
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    z-index: 2;
    object-fit: cover;
`

const Product = ({ item }) => {

    return (
        <Container>
            <Circle>
                <Image src={item.img} alt="product" />
                <Info>
                    <Icon>
                        <ShoppingCartOutlined />
                    </Icon>
                    <Icon>
                        <Link to={`/product/${item._id}`}>
                            <SearchOutlined />
                        </Link>
                    </Icon>
                    <Icon>
                        <FavoriteBorderOutlined />
                    </Icon>
                </Info>
            </Circle>
        </Container>
    )
}

export default Product