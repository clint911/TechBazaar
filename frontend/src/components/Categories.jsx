import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

// Grid container with responsive behavior
const Container = styled.div`
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  justify-items: center;

  ${mobile({ padding: "0px", gridTemplateColumns: "1fr" })}
`;

const Header = styled.h1`
  width: 100%;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin: 20px 0px;
  text-transform: uppercase;
`;

const Categories = () => {
  return (
    <div>
      <Header>Categories</Header>
      <Container>
        {categories.map(item => (
          <CategoryItem key={item.id} item={item} />
        ))}
      </Container>
    </div>
  );
};

export default Categories;
