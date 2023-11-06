import React, { useEffect } from 'react'
import AuthService from '../../services/auth-service'
import { useSearchParams } from 'react-router-dom';

const VerifyEmailPage = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get('token');

    useEffect(() => {
        try {
            AuthService.veirifyEmailFunc(String(token))
            
        } catch (error) {

        }
    }, [])
    return (
        <div>VerifyEmailPage</div>
    )
}

export default VerifyEmailPage