import React, { useEffect, useState } from 'react'
import { FunctionComponent } from 'react';
import { api } from '../api/api';
import { Link } from 'react-router-dom';


interface ItemsListProps {
    username: string;
}

const ItemsList: FunctionComponent<ItemsListProps> = ({ username }) => {
    return (
        <li className="menu-item" id="menu-item-transition">
            <Link to={username} className="menu-link">{username}</Link>
        </li>
    );
};


export const HeaderProfileImg = () => {
    return (
        <ItemsList username='mokybrow' />
    );
}


