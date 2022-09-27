import React from 'react';
import Header from './Header';
import Menu from './Menu';

export default function notFound() {
    return (
        <div>
            <Header />
            <Menu />
            <div>404 Not Found</div>
        </div>
    )
}