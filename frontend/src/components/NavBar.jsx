import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userRedux";


const Container = styled.div`
  height: 60px;
  ${mobile({ height: "60px" })}
  z-index:10000;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
  ${tablet({ width: "100%", color: "red" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  font-size: 30px;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const LogoSpan = styled.span`
  font-size: 35px;
  color:teal;
`

const NavBar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  /* const currentUser = JSON.parse(localStorage.getItem("currentUser")); */
  const { currentUser } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logout());
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" className="focus:outline-none" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Link to="/">
            <Logo id="logo">my<LogoSpan id="logo">Duka.</LogoSpan></Logo>
          </Link>
        </Center>
        <Right>
          {
            currentUser ? (
              <MenuItem className="flex gap-3">
                <Link onClick={handleClick}>Logout</Link>
              </MenuItem>
            ) : (
              <>
                <MenuItem>
                  <Link to="/register">Register</Link>
                </MenuItem>
                <MenuItem>
                  <Link to="/login">Login</Link>
                </MenuItem>
              </>
            )
          }
          <MenuItem>
            <Link to="/cart">
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};


export default NavBar