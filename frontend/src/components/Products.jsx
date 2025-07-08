import styled from "styled-components";
import axios from "axios";
import Product from "./Product";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: space-between;
    justify-content: flex-start;
  gap: 20px;
`

const Header = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
`;
const Products = ({ cat, filters, sort }) => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    // const BASE_URL = "https://techbazaar-server.onrender.com/api/products";

    const [loading, setLoading] = useState(false);



    useEffect(() => {

        setLoading(true);

        const getProducts = async () => {
            try {
                const url = cat
                    ? `http://localhost:3000/api/products?category=${cat}`
                    : `http://localhost:3000/api/products`;

                const res = await axios.get(url);
                const fetchedProducts = res.data.products || [];
                setProducts(fetchedProducts);
                console.log("Api response", res.data);
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }

        getProducts();
    }, [cat]);

    useEffect(() => {
        cat &&
            setFilteredProducts(
                products.filter(item =>
                    Object.entries(filters).every(([key, value]) =>
                        item[key]?.includes(value)
                    )
                )
            );
    }, [products, cat, filters]);

    useEffect(() => {
        if (sort === "newest") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
            );
        } else if (sort === "asc") {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => (a.price > b.price ? 1 : -1))
            );
        } else {
            setFilteredProducts(prev =>
                [...prev].sort((a, b) => (a.price > b.price ? -1 : 1))
            );
        }
    }, [sort]);

    if (loading) { return <Loader text="Loading..." /> }

    return (
        <Container>

            {/* <Header className="font-bold text-3xl">Products</Header>

            <div className="grid grid-cols-4 gap-6">
                {cat ? filteredProducts.map((item) =>
                <Product key={item._id || item.id} item={item} />
            ) : products.slice(0, 8).map((item) =>
                <Product item={item} key={item._id} />
            )}
            </div> */}


            <Container>
                <Header className="font-bold text-3xl">Products</Header>

                {/* Show "no products found" conditionally */}
                {(!loading && (cat ? filteredProducts.length === 0 : products.length === 0)) ? (
                    <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#666" }}>
                        No products found.
                    </p>
                ) : (
                    <div className="grid grid-cols-4 gap-6">
                        {(cat ? filteredProducts : products.slice(0, 8)).map((item) => (
                            <Product key={item._id || item.id} item={item} />
                        ))}
                    </div>
                )}
            </Container>

            {/* {products.length === 0 && <p>No products found.</p>}

            {products.map((item) => (
                <div key={item._id || item.id}>
                    <h4>{item.productName || "No Title"}</h4>
                    <p>{item.price ? `$${item.price}` : "No Price"}</p>
                </div>
            ))} */}
        </Container>
    )
}

export default Products;