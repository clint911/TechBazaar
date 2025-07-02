import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@mui/icons-material'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column" })}
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column", marginLeft:"0px" })}
    margin-left:70px;
`

const Left = styled.div`
    flex: 1;
    display:flex;
    flex-direction: column;
    padding: 20px;
`
const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "none" })}
`

const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ display: "flex" })}
    ${mobile({ flexDirection: "column" })}
    ${mobile({ background: "#fff8f8" })}
`
const Title = styled.h3`
    margin-bottom: 30px;
    ${mobile({ marginBottom: "20px", textAlign: "center", fontSize: "20px", fontWeight: "400" })}
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`

const Logo = styled.h1`
    font-weight: bold;
    font-size: 30px;
`
const Desc = styled.p`
    margin: 20px 0px;
`

const SocialContainer = styled.div`
    display: flex;
    cursor: pointer;
    ${mobile({ justifyContent: "center" })}
    ${mobile({ gap: "20px" })}
`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
`

const LogoSpan = styled.span`
    font-size: 35px;
    color:teal;
`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payment = styled.img`
    width: 50%;
`


const Footer = () => {
    return (
        <Container>
            <Wrapper>
                <Left>
                    <Logo id="logo">my<LogoSpan id="logo">Duka.</LogoSpan></Logo>
                    <Desc>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don{"'"}t look even slightly believable.
                    </Desc>
                    <SocialContainer>
                        <SocialIcon color="385999">
                            <Facebook />
                        </SocialIcon>
                        <SocialIcon color="E4405F">
                            <Instagram />
                        </SocialIcon>
                        <SocialIcon color="55ACEE">
                            <Twitter />
                        </SocialIcon>
                        <SocialIcon color="E60023">
                            <Pinterest />
                        </SocialIcon>
                    </SocialContainer>
                </Left>
                <Center>
                    <Title>Useful Links</Title>
                    <List>
                        <ListItem>Home</ListItem>
                        <ListItem>Cart</ListItem>
                        <ListItem>Man Fashion</ListItem>
                        <ListItem>Woman Fashion</ListItem>
                        <ListItem>Accessories</ListItem>
                        <ListItem>My Account</ListItem>
                        <ListItem>Order Tracking</ListItem>
                        <ListItem>Wishlist</ListItem>
                        <ListItem>Terms</ListItem>
                    </List>
                </Center>
                <Right>
                    <Title>Contact</Title>
                    <ContactItem>
                        <Room style={{ marginRight: "10px" }} /> Address: 123, 123
                    </ContactItem>
                    <ContactItem>
                        <Phone style={{ marginRight: "10px" }} />Phone: +1 234 56789
                    </ContactItem>
                    <ContactItem>
                        <MailOutline style={{ marginRight: "10px" }} />Email: Contact@myDuka.com
                    </ContactItem>
                    <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
                </Right>
            </Wrapper>
        </Container>
    )
}

export default Footer
