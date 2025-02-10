import { Link } from "react-router";
import './header.css';

const Header = () => {
    return (
        <header>
            <div className="container">
                <Link to="/" className="logo">Food Mine!</Link>
                <nav>
                    <ul>
                        <li>
                            {/* <Link to="/">Login</Link> */}
                        </li>
                        <li className="menu-container">
                            {/* <Link to="/">User Name</Link> */}
                            <div className="menu">
                                {/* <Link to="/">Profile</Link>
                                <Link to="/">Orders</Link>
                                <button>Logout</button> */}
                            </div>
                        </li>
                        <li>
                            {/* <Link to="/">Cart</Link> */}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
