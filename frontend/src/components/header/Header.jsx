import React, { useState } from "react";
import { Navbar, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import { FaSignInAlt, FaShoppingCart, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import "./header.css";
import useFood from "../../hooks/useFood";
import useAuthCustom from "../../hooks/useAuthCustom";

const Header = () => {
    const { state, dispatch, removeCards } = useFood();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { state: userState } = useAuthCustom();
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);


    return (
        <Navbar color="light" light expand="lg" className="custom-navbar">
            <Nav className="mr-auto" navbar>
                <NavItem>
                    <NavLink href="/product" className="nav-link">Anasayfa</NavLink>
                </NavItem>
            </Nav>
            <Nav className="ml-auto" navbar>
                <NavItem>
                    {userState.user?.role === "admin" ? (
                        <NavLink href="/admin" className="nav-link">
                            <FaUserShield className="nav-icon" /> Admin Panele Git
                        </NavLink>
                    ) : (
                        ""
                    )}

                </NavItem>
                <NavItem>
                    {userState.user || localStorage.getItem("user") ? (
                        <NavLink href="/logout" className="nav-link">
                            <FaSignOutAlt className="nav-icon" /> Çıkış Yap
                        </NavLink>
                    ) : (
                        <NavLink href="/login" className="nav-link">
                            <FaSignInAlt className="nav-icon" /> Giriş Yap
                        </NavLink>
                    )}
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
    );
};

export default Header;
