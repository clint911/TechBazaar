import styled from 'styled-components'
import NavBar from '../components/NavBar'
import Announcements from '../components/Announcements'
import Products from '../components/Products'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import { mobile } from '../responsive'
import { useParams } from 'react-router-dom';
import { useState } from 'react'

const Container = styled.div``
const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`
const Filter = styled.div`
  margin: 20px;
  ${mobile({ margin: "0px 20px", display: "flex", flexDirection: "column" })}
`
const Title = styled.h1`
  margin: 20px;
  font-weight: 600;
  font-size: 30px;
  ${mobile({ fontSize: "24px", textAlign: "center" })}
`

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`

const Select = styled.select`
  padding: 10px;
  margin-right: 20px;
  border: 1px solid lightgray;
  ${mobile({ margin: "10px 0px", padding: "10px 0px" })}
`
const Option = styled.option`
  padding: 10px;
`

const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");

  const { category: cat } = useParams();

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value
    });
  };

  return (
    <Container>
      <NavBar />
      <Announcements />
      <Title>
        {cat}
      </Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Color</Option>
            <Option>White</Option>
            <Option>Black</Option>
            {/* <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option> */}
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            {/* <Option>XL</Option> */}
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={e => setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </Container>
  )
}

export default ProductList
