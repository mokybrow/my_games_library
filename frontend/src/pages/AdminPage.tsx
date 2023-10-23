import { observer } from 'mobx-react-lite';
import React, { FC, useContext, useEffect } from 'react'
import { Context } from '..';
import AdminService from '../service/AdminService';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';

const AdminPage: FC = () => {

    return (
        <div>AdminPage</div>
    )
}

export default observer(AdminPage);
