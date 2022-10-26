import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import logo from '../logoWG.png';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { RootState, useAppSelector } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { loggedOut } from '../auth/action';
import { clearCart } from '../cart/action';




export default function Menu() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn)
    const cartCount = useAppSelector(state => state.cart.item_ids);

    // const loggedUsername = useSelector((state: RootState) => state.auth.username)

    return (
        <div>
            <Navbar className="container-fluid row" expand="lg">
                <Container fluid>
                    <div className="col-4 d-flex justify-content-start p-3">
                        <Navbar.Toggle className="navToggler " aria-controls="#basic-navbar-nav" />
                    </div>
                    <Navbar.Brand className="col-4">
                        <NavLink to="/">
                            <img className="logo" src={logo} alt="ai.belief LOGO" />
                        </NavLink>
                    </Navbar.Brand>
                    <div className="col-4 row">
                        {!isLoggedIn &&
                            <NavLink className="col-4 navLinkItem" to="/login">
                                <FontAwesomeIcon className="icons" icon={solid('user')} />
                                <h6 className="d-none d-md-block">Login</h6>
                            </NavLink>}
                        {isLoggedIn === true &&
                            <NavLink className="col-4 navLinkItem" to="/user">
                                <FontAwesomeIcon className="icons" icon={solid('user')} />
                                <h6 className="d-none d-md-block">Welcome!</h6>
                                {/* {loggedUsername} */}
                            </NavLink>
                        }
                        {isLoggedIn === true &&
                            <a className="col-4 navLinkItem" href="#" onClick={() => {
                                dispatch(loggedOut());
                            }}>
                                <FontAwesomeIcon className="icons" icon={solid('right-from-bracket')} />
                                <h6 className="d-none d-md-block">Log Out</h6></a>
                        }
                        <NavLink className="col-4 navLinkItem" to="/cart">
                            <FontAwesomeIcon className="icons" icon={solid('cart-shopping')} />
                            <h6 className="d-none d-md-block">Cart ({cartCount.length})</h6>
                        </NavLink>
                    </div>
                    <div className="w-100"></div>

                </Container>
                <Container className="d-flex align-item-center d-sm-block d-md-block d-lg-none">
                    <Navbar.Collapse className="container-fluid" id="basic-navbar-nav">
                        <div className="container">
                            <ul className="menu row">
                                <li className="col-sm menuItem"><NavLink to='collection/1'>PRESERVED FLOWER BOUQUET</NavLink></li>
                                <li className="col-sm menuItem"><NavLink to='collection/2'>GLASS DOME</NavLink></li>
                                <li className="col-sm menuItem"><NavLink to='collection/3'>FLOWER BOXES</NavLink></li>
                                <li className="col-sm menuItem"><NavLink to='collection/4'>BLUETOOTH SPEAKER</NavLink></li>
                                <li className="col-sm menuItem"><NavLink to='collection/5'>FANTASY</NavLink></li>
                                <li className="col-sm menuItem"><NavLink to='collection/6'>ROSE BEAR</NavLink></li>
                            </ul>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="bottom d-none d-lg-block">
                <div className="container">
                    <ul className="menu row">
                        <li className="col-sm menuItem"><NavLink className="navLinkItem" to='collection/1'>PRESERVED FLOWER BOUQUET</NavLink></li>
                        <li className="col-sm menuItem"><NavLink className="navLinkItem" to='collection/2'>GLASS DOME</NavLink></li>
                        <li className="col-sm menuItem"><NavLink className="navLinkItem" to='collection/3'>FLOWER BOXES</NavLink></li>
                        <li className="col-sm menuItem"><NavLink className="navLinkItem" to='collection/4'>BLUETOOTH SPEAKER</NavLink></li>
                        <li className="col-sm menuItem"><NavLink className="navLinkItem" to='collection/5'>FANTASY</NavLink></li>
                        <li className="col-sm menuItem"><NavLink className="navLinkItem" to='collection/6'>ROSE BEAR</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}