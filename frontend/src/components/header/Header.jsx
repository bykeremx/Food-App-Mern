import React, { useState } from "react";
import { Navbar, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import { FaSignInAlt, FaShoppingCart } from "react-icons/fa";
import "./header.css";
import useFood from "../../hooks/useFood";

const Header = () => {
    const { state, dispatch ,removeCards } = useFood();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    // const removeFromCart = (id) => {
    //     dispatch({ type: "REMOVE_FROM_CART", payload: id });
    // };

    return (
        <header>
            <div className="container-fluid">
                <Navbar color="light" light expand="md" className="custom-navbar">
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink href="/" className="nav-link">Anasayfa</NavLink>
                        </NavItem>
                    </Nav>

                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/" className="nav-link">
                                <FaSignInAlt className="nav-icon" /> Giriş Yap
                            </NavLink>
                        </NavItem>
                        <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
                            <DropdownToggle nav className="nav-link cart-link">
                                <FaShoppingCart className="nav-icon" /> Sepet
                                {state.cart.length > 0 && (
                                    <span className="cart-badge">{state.cart.length}</span>
                                )}
                            </DropdownToggle>
                            <DropdownMenu right className="cart-dropdown">
                                {state.cart.length === 0 ? (
                                    <DropdownItem disabled className="empty-cart">Sepetiniz boş</DropdownItem>
                                ) : (
                                    state.cart.map((item) => (
                                        <DropdownItem key={item._id} className="cart-item">
                                            <div className="cart-item-details">
                                                <span className="cart-item-name">{item.name}</span>
                                                <span className="cart-item-price">{item.price} TL</span>
                                            </div>
                                            <Button color="" size="sm" className="remove-btn" onClick={() => removeCards(item._id)}>
                                                ✖
                                            </Button>
                                        </DropdownItem>
                                    ))
                                )}
                                {state.cart.length > 0 && (
                                    <DropdownItem divider />
                                )}
                                {state.cart.length > 0 && (
                                    <DropdownItem className="cart-total">
                                        <strong>Toplam:</strong> {state.cart.reduce((total, item) => total + item.price, 0)} TL
                                    </DropdownItem>
                                )}
                            </DropdownMenu>
                        </Dropdown>
                    </Nav>
                </Navbar>
            </div>
        </header>
    );
};

export default Header;
