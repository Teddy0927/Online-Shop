import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import logo from '../logoWG.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { loggedOut } from '../auth/action';



export default function Menu() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn)
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
                            <NavLink className="col navLinkItem" to="/login">
                                <FontAwesomeIcon className="icons" icon={solid('user')} />
                                <h6 className="d-none d-md-block">Login</h6>
                            </NavLink>}
                        {isLoggedIn === true &&
                            <NavLink className="col navLinkItem" to="/setting">
                                <FontAwesomeIcon className="icons" icon={solid('user')} />
                                <h6 className="d-none d-md-block">Hi</h6>
                                {/* {loggedUsername} */}
                            </NavLink>
                        }
                        {isLoggedIn === true &&
                            <a className="col navLinkItem" href="#" onClick={() => {
                                dispatch(loggedOut());
                            }}>
                                <FontAwesomeIcon className="icons" icon={solid('right-from-bracket')} />
                                <h6 className="d-none d-md-block">Log Out</h6></a>
                        }
                        <NavLink className="col navLinkItem" to="/cart">
                            <FontAwesomeIcon className="icons" icon={solid('cart-shopping')} />
                            <h6 className="d-none d-md-block">Cart</h6>
                        </NavLink>
                    </div>
                    <div className="w-100"></div>

                </Container>
                <Container className="d-flex align-item-center d-sm-block d-md-block d-lg-none">
                    <Navbar.Collapse className="container-fluid" id="basic-navbar-nav">
                        <div className="container">
                            <ul className="menu row">
                                <li className="col-sm menuItem"><NavLink to='collection/preservedFlowerBouquet'>PRESERVED FLOWER BOUQUET</NavLink></li>
                                <li className="col-sm menuItem"><NavLink to='collection/glassDome'>GLASS DOME</NavLink></li>
                                <li className="col-sm menuItem"><NavLink to='collection/flowerBoxes'>FLOWER BOXES</NavLink></li>
                                <li className="col-sm menuItem"><NavLink to='collection/bluetoothSpeaker'>BLUETOOTH SPEAKER</NavLink></li>
                                <li className="col-sm menuItem"><NavLink to='collection/fantasy'>FANTASY</NavLink></li>
                                <li className="col-sm menuItem"><NavLink to='collection/roseBear'>ROSE BEAR</NavLink></li>
                            </ul>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="bottom d-none d-lg-block">
                <div className="container">
                    <ul className="menu row">
                        <li className="col-sm menuItem"><NavLink className="navLinkItem" to='collection/preservedFlowerBouquet'>PRESERVED FLOWER BOUQUET</NavLink></li>
                        <li className="col-sm menuItem"><NavLink className="navLinkItem" to='collection/glassDome'>GLASS DOME</NavLink></li>
                        <li className="col-sm menuItem"><NavLink className="navLinkItem" to='collection/flowerBoxes'>FLOWER BOXES</NavLink></li>
                        <li className="col-sm menuItem"><NavLink className="navLinkItem" to='collection/bluetoothSpeaker'>BLUETOOTH SPEAKER</NavLink></li>
                        <li className="col-sm menuItem"><NavLink className="navLinkItem" to='collection/fantasy'>FANTASY</NavLink></li>
                        <li className="col-sm menuItem"><NavLink className="navLinkItem" to='collection/roseBear'>ROSE BEAR</NavLink></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}