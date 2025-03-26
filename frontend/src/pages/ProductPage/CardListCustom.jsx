import React from "react";
import { Button, Card, CardBody, CardTitle, CardText, CardImg, Badge } from "reactstrap";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // Kalp ve Sepet ikonları
import useFood from "../../hooks/useFood";

const CardListCustom = ({ food }) => {
    const { AddToCard } = useFood();
    return (
        <Card className="custom-card">
            {/* Küçük Resim ve Gölge */}
            <CardImg
                src={food.image}
                alt="Food image"
                className="food-image"
            />
            <CardBody>
                {/* Yemek Adı ve Kalp İkonu */}
                <CardTitle tag="h5" className="food-title">
                    {food.name} <FaHeart className="heart-icon" />
                </CardTitle>

                {/* Ülke ve Süre */}
                <CardText className="food-info">
                    <Badge className="country-badge">Türkiye</Badge>
                    <span className="time-info">🕒 15 dk</span>
                </CardText>

                {/* Fiyat */}
                <CardText className="price">₺{food.price}</CardText>

                {/* Sepete Ekle Butonu (Sepet İkonlu) */}
                <Button className="add-to-cart" onClick={() => AddToCard(food)}>
                    <FaShoppingCart className="cart-icon" /> Sepete Ekle
                </Button>
            </CardBody>
        </Card>
    );
};

export default CardListCustom;
