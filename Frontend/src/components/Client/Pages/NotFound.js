import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './styles/NotFound.scss'
import { HomeOutlined } from '@ant-design/icons';
const NotFound = () => {
    const { t } = useTranslation();
    document.title = "NBlog · Not Found"
    return (
        <>

            <div className='contain-not-found'>
                <div className='not-found'></div>
                <section>
                    <div className="content">
                        <h2>404 NOT FOUND</h2>
                        <h2>404 NOT FOUND</h2>
                    </div>
                </section>
                <Button type="primary" className='box'><Link className='nav-link' to='/'><i className="bi bi-house-door-fill"></i>{t("home")}</Link></Button>


            </div>
        </>
    )
};
export default NotFound;