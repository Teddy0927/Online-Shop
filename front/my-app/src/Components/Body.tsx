import React, { useEffect, useRef, useState } from 'react';
import itemDemo from '../itemDemo2.png'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import logo from '../logoWG.png';
import '@splidejs/splide/css/sea-green';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppSelector, useAppDispatch } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { loggedOut, login } from '../auth/action';
import { Item, LoadingState } from './model';
import SellingItems from './Items';
import { loadFrontItem, loadItems } from '../items/action';
// import { loadFrontItem } from '../items/action';



export default function Body() {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn)
    // const cartLoaded = useAppSelector(state => state.cart.loading);
    const cartCount = useAppSelector(state => state.cart.item_ids);
    const items = useAppSelector(state => state.items.items);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token != null) {
            dispatch(login(token));
        }
        // dispatch(loadFrontItem(1));
        // dispatch(loadFrontItem(2));
        // dispatch(loadFrontItem(3));
        // dispatch(loadFrontItem(4));
        // dispatch(loadFrontItem(5));
        // dispatch(loadFrontItem(6));

    }, [dispatch])


    const [Bouquet, setBouquet] = useState([]);
    const [Dome, setDome] = useState([]);
    const [Boxes, setBoxes] = useState([]);
    const [Bluetooth, setBluetooth] = useState([]);
    const [Fantasy, setFantasy] = useState([]);
    const [Bear, setBear] = useState([]);

    // const loggedUsername = useSelector((state: RootState) => state.auth.username)

 

    async function typeOne(){
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectionFront/1`);
        let response = await res.json();

        setBouquet(response);
    }

    async function typeTwo(){
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectionFront/2`);
        let response = await res.json();

        setDome(response);
    }

    async function typeThree(){
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectionFront/3`);
        let response = await res.json();

        setBoxes(response);
    }

    async function typeFour(){
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectionFront/4`);
        let response = await res.json();

        setBluetooth(response);
    }

    async function typeFive(){
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectionFront/5`);
        let response = await res.json();
   
        setFantasy(response);
    }

    async function typeSix(){
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/collectionFront/6`);
        let response = await res.json();

        setBear(response);
    }



    useEffect(() => {
        typeOne()
        typeTwo()
        typeThree()
        typeFour()
        typeFive()
        typeSix()
    },[])


    const preservedFlowerBouquet = useRef(null);
    const glassDome = useRef(null);
    const flowerBoxes = useRef(null);
    const blueToothSpeaker = useRef(null);
    const fantasy = useRef(null);
    const roseBear = useRef(null);
    // const flowers1: Item[] = [
    //     { src: itemDemo, alt: "Preserved rose with pink and pale pink", name: "Preserved Rose1", style: "Brown on top w/ pink and pale pink", price: "HKD 1999" },
    //     { src: itemDemo, alt: "Preserved rose with red and pale pink", name: "Preserved Rose", style: "Brown on top w/ red and pale pink", price: "HKD 2999" },
    //     { src: itemDemo, alt: "Preserved rose with blue and pale pink", name: "Preserved Rose", style: "Brown on top w/ blue and pale pink", price: "HKD 1899" },
    //     { src: itemDemo, alt: "Preserved rose with green and pale pink", name: "Preserved Rose", style: "Brown on top w/ green and pale pink", price: "HKD 3099" },
    //     { src: itemDemo, alt: "Preserved rose with orange and pale pink", name: "Preserved Rose", style: "Brown on top w/ orange and pale pink", price: "HKD 1199" },
    //     { src: itemDemo, alt: "Preserved rose with purple and pale pink", name: "Preserved Rose", style: "Brown on top w/ purple and pale pink", price: "HKD 1599" },
    // ]

    // const flowers2: Item[] = [
    //     { src: itemDemo, alt: "Preserved rose with pink and pale pink", name: "Preserved Rose2", style: "Brown on top w/ pink and pale pink", price: "HKD 1999" },
    //     { src: itemDemo, alt: "Preserved rose with red and pale pink", name: "Preserved Rose", style: "Brown on top w/ red and pale pink", price: "HKD 2999" },
    //     { src: itemDemo, alt: "Preserved rose with blue and pale pink", name: "Preserved Rose", style: "Brown on top w/ blue and pale pink", price: "HKD 1899" },
    //     { src: itemDemo, alt: "Preserved rose with green and pale pink", name: "Preserved Rose", style: "Brown on top w/ green and pale pink", price: "HKD 3099" },
    //     { src: itemDemo, alt: "Preserved rose with orange and pale pink", name: "Preserved Rose", style: "Brown on top w/ orange and pale pink", price: "HKD 1199" },
    //     { src: itemDemo, alt: "Preserved rose with purple and pale pink", name: "Preserved Rose", style: "Brown on top w/ purple and pale pink", price: "HKD 1599" },
    // ]

    // const flowers3: Item[] = [
    //     { src: itemDemo, alt: "Preserved rose with pink and pale pink", name: "Preserved Rose3", style: "Brown on top w/ pink and pale pink", price: "HKD 1999" },
    //     { src: itemDemo, alt: "Preserved rose with red and pale pink", name: "Preserved Rose", style: "Brown on top w/ red and pale pink", price: "HKD 2999" },
    //     { src: itemDemo, alt: "Preserved rose with blue and pale pink", name: "Preserved Rose", style: "Brown on top w/ blue and pale pink", price: "HKD 1899" },
    //     { src: itemDemo, alt: "Preserved rose with green and pale pink", name: "Preserved Rose", style: "Brown on top w/ green and pale pink", price: "HKD 3099" },
    //     { src: itemDemo, alt: "Preserved rose with orange and pale pink", name: "Preserved Rose", style: "Brown on top w/ orange and pale pink", price: "HKD 1199" },
    //     { src: itemDemo, alt: "Preserved rose with purple and pale pink", name: "Preserved Rose", style: "Brown on top w/ purple and pale pink", price: "HKD 1599" },
    // ]

    // const flowers4: Item[] = [
    //     { src: itemDemo, alt: "Preserved rose with pink and pale pink", name: "Preserved Rose4", style: "Brown on top w/ pink and pale pink", price: "HKD 1999" },
    //     { src: itemDemo, alt: "Preserved rose with red and pale pink", name: "Preserved Rose", style: "Brown on top w/ red and pale pink", price: "HKD 2999" },
    //     { src: itemDemo, alt: "Preserved rose with blue and pale pink", name: "Preserved Rose", style: "Brown on top w/ blue and pale pink", price: "HKD 1899" },
    //     { src: itemDemo, alt: "Preserved rose with green and pale pink", name: "Preserved Rose", style: "Brown on top w/ green and pale pink", price: "HKD 3099" },
    //     { src: itemDemo, alt: "Preserved rose with orange and pale pink", name: "Preserved Rose", style: "Brown on top w/ orange and pale pink", price: "HKD 1199" },
    //     { src: itemDemo, alt: "Preserved rose with purple and pale pink", name: "Preserved Rose", style: "Brown on top w/ purple and pale pink", price: "HKD 1599" },
    // ]

    // const flowers5: Item[] = [
    //     { src: itemDemo, alt: "Preserved rose with pink and pale pink", name: "Preserved Rose5", style: "Brown on top w/ pink and pale pink", price: "HKD 1999" },
    //     { src: itemDemo, alt: "Preserved rose with red and pale pink", name: "Preserved Rose", style: "Brown on top w/ red and pale pink", price: "HKD 2999" },
    //     { src: itemDemo, alt: "Preserved rose with blue and pale pink", name: "Preserved Rose", style: "Brown on top w/ blue and pale pink", price: "HKD 1899" },
    //     { src: itemDemo, alt: "Preserved rose with green and pale pink", name: "Preserved Rose", style: "Brown on top w/ green and pale pink", price: "HKD 3099" },
    //     { src: itemDemo, alt: "Preserved rose with orange and pale pink", name: "Preserved Rose", style: "Brown on top w/ orange and pale pink", price: "HKD 1199" },
    //     { src: itemDemo, alt: "Preserved rose with purple and pale pink", name: "Preserved Rose", style: "Brown on top w/ purple and pale pink", price: "HKD 1599" },
    // ]

    // const flowers6: Item[] = [
    //     { src: itemDemo, alt: "Preserved rose with pink and pale pink", name: "Preserved Rose6", style: "Brown on top w/ pink and pale pink", price: "HKD 1999" },
    //     { src: itemDemo, alt: "Preserved rose with red and pale pink", name: "Preserved Rose", style: "Brown on top w/ red and pale pink", price: "HKD 2999" },
    //     { src: itemDemo, alt: "Preserved rose with blue and pale pink", name: "Preserved Rose", style: "Brown on top w/ blue and pale pink", price: "HKD 1899" },
    //     { src: itemDemo, alt: "Preserved rose with green and pale pink", name: "Preserved Rose", style: "Brown on top w/ green and pale pink", price: "HKD 3099" },
    //     { src: itemDemo, alt: "Preserved rose with orange and pale pink", name: "Preserved Rose", style: "Brown on top w/ orange and pale pink", price: "HKD 1199" },
    //     { src: itemDemo, alt: "Preserved rose with purple and pale pink", name: "Preserved Rose", style: "Brown on top w/ purple and pale pink", price: "HKD 1599" },
    // ]

    const scrollToSection = (elementRef: any) => {
        window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: 'smooth',
        });
    };
    return (
        <div className="body">
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
                                <h6 className="d-none d-md-block">Hi </h6>
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
                            <h6 className="d-none d-md-block">Cart ({cartCount.length})</h6>
                        </NavLink>
                    </div>
                    <div className="w-100"></div>

                </Container>
                <Container className="d-flex align-item-center d-sm-block d-md-block d-lg-none">
                    <Navbar.Collapse className="container-fluid" id="basic-navbar-nav">
                        <div className="container">
                            <ul className="menu row">
                                <li onClick={() => scrollToSection(preservedFlowerBouquet)} className="col-sm menuItem">PRESERVED FLOWER BOUQUET</li>
                                <li onClick={() => scrollToSection(glassDome)} className="col-sm menuItem">GLASS DOME</li>
                                <li onClick={() => scrollToSection(flowerBoxes)} className="col-sm menuItem">FLOWER BOXES</li>
                                <li onClick={() => scrollToSection(blueToothSpeaker)} className="col-sm menuItem">BLUETOOTH SPEAKER</li>
                                <li onClick={() => scrollToSection(fantasy)} className="col-sm menuItem">FANTASY</li>
                                <li onClick={() => scrollToSection(roseBear)} className="col-sm menuItem">ROSE BEAR</li>
                            </ul>
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div className="bottom d-none d-lg-block">
                <div className="container">
                    <ul className="menu row">
                        <li onClick={() => scrollToSection(preservedFlowerBouquet)} className="col-sm menuItem">PRESERVED FLOWER BOUQUET</li>
                        <li onClick={() => scrollToSection(glassDome)} className="col-sm menuItem">GLASS DOME</li>
                        <li onClick={() => scrollToSection(flowerBoxes)} className="col-sm menuItem">FLOWER BOXES</li>
                        <li onClick={() => scrollToSection(blueToothSpeaker)} className="col-sm menuItem">BLUETOOTH SPEAKER</li>
                        <li onClick={() => scrollToSection(fantasy)} className="col-sm menuItem">FANTASY</li>
                        <li onClick={() => scrollToSection(roseBear)} className="col-sm menuItem">ROSE BEAR</li>
                    </ul>
                </div>
            </div>
            <div>
                <Splide className="slideShow" options={{ rewind: true, autoWidth: true, focus: 'center', }} aria-label="Slide show">
                    <SplideSlide className="item">
                        <img className="item" src={require('../splide_img1.jpeg')} alt="Beautiful flower" />
                    </SplideSlide>
                    <SplideSlide className="item">
                        <img className="item" src={require('../splide_img2.jpeg')} alt="Flower in the garden" />
                    </SplideSlide>
                    <SplideSlide className="item">
                        <img className="item" src={require('../splide_img3.jpeg')} alt="Angel flower" />
                    </SplideSlide>
                </Splide>
            </div>
            <div ref={preservedFlowerBouquet} key='PRESERVED FLOWER BOUQUET'>
                <h2><span>PRESERVED FLOWER BOUQUET</span></h2>
                <div className="container-fluid">
                    <div className="row d-flex flex-wrap">
                        {
                            Bouquet.map((flower, index) => (
                                <SellingItems item={flower} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div ref={glassDome} key='GLASS DOME'>
                <h2><span>GLASS DOME</span></h2>
                <div className="container-fluid">
                    <div className="row d-flex flex-wrap">
                        {
                            Dome.map((flower, index) => (
                                <SellingItems item={flower} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div ref={flowerBoxes} key='FLOWER BOXES'>
                <h2><span>FLOWER BOXES</span></h2>
                <div className="container-fluid">
                    <div className="row d-flex flex-wrap">
                        {
                            Boxes.map((flower, index) => (
                                <SellingItems item={flower} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div ref={blueToothSpeaker} key='BLUETOOTH SPEAKER'>
                <h2><span>BLUETOOTH SPEAKER</span></h2>
                <div className="container-fluid">
                    <div className="row d-flex flex-wrap">
                        {
                            Bluetooth.map((flower, index) => (
                                <SellingItems item={flower} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div ref={fantasy} key='FANTASY'>
                <h2><span>FANTASY</span></h2>
                <div className="container-fluid">
                    <div className="row d-flex flex-wrap">
                        {
                            Fantasy.map((flower, index) => (
                                <SellingItems item={flower} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
            <div ref={roseBear} key='ROSE BEAR'>
                <h2><span>ROSE BEAR</span></h2>
                <div className="container-fluid">
                    <div className="row d-flex flex-wrap">
                        {
                            Bear.map((flower, index) => (
                                <SellingItems item={flower} key={index} />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}