import React, { useState } from "react";
import { Input, Button, Card, CardBody, CardTitle, CardText, Container, Row, Col } from "reactstrap";
import useFood from "../../hooks/useFood";
import "./product.css";
import CardListCustom from "./CardListCustom";

const Product = () => {
    const { state, AddToCard } = useFood();
    const [searchTerm, setSearchTerm] = useState("");

    // Ürünleri filtrele
    const filteredFoods = state.foodList.filter((food) =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sepete ürün ekleme
    // const addToCart = (food) => {
    //     dispatch({ type: "ADD_TO_CART", payload: food });
    // };

    return (
        <Container className="mt-5">

            {/* Arama Çubuğu */}
            <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 searchbar"
            />

            {/* Ürün Listesi */}
            <Row>
                {filteredFoods.map((food) => (
                    <Col md="3" key={food._id} className="mb-4">
                        <CardListCustom food={food} ></CardListCustom>
                    </Col>
                ))}
            </Row>

            {/* Sepet */}
            {/* <h2 className="mt-5">Cart ({state.cart.length})</h2> */}
            {/* {state.cart.length > 0 ? (
                state.cart.map((item, index) => (
                    <Card key={index} className="mb-2">
                        <CardBody>
                            <CardTitle tag="h5">{item.name}</CardTitle>
                            <CardText><strong>Price:</strong> ${item.price}</CardText>
                        </CardBody>
                    </Card>
                ))
            ) : (
                <p>Cart is empty</p>
            )} */}
        </Container>
    );
};

export default Product;
