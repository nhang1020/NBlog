import Container from 'react-bootstrap/Container';
import { Button, Popover, Avatar, Form } from 'antd';
import { HomeOutlined, UserOutlined, UsergroupAddOutlined, SettingOutlined, LogoutOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-toastify/dist/ReactToastify.css';
import appSlice from '../redux/silceReducers/appSlice';
import { getUsersRemainingSelector, userInfoSelector } from '../redux/selector'
import { useDispatch, useSelector } from 'react-redux';
import './styles/ClientHeader.scss';

import { useTranslation } from 'react-i18next';
import { useEffect, useState, useTransition } from 'react';

import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { convertImage, noAvatar, toAlias, toSearchAlias } from '../utils/constants';
import { getUsers } from '../redux/silceReducers/userSlice';
import { v1 } from 'uuid';
const Header = () => {
    const { t } = useTranslation();
    const currentUrl = window.location.href;
    const [isPending, startTransition] = useTransition();
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(userInfoSelector);
    const lang = useSelector(state => state.app.language);
    const listUsers = useSelector(getUsersRemainingSelector);
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const handleLogOut = () => {
        dispatch(appSlice.actions.logOut());
    }
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language);
        dispatch(appSlice.actions.changeLanguage(language));
    };
    useEffect(() => {
        setUsers(listUsers.map(item => { return { id: item.id, name: `${item.firstName} ${item.lastName}`, avatar: item.avatar } }));
    }, [listUsers]);

    const items = [
        <NavLink to={`/user/info/${user.id}`} className='nav-link m-2' key={1} >
            <UserOutlined /> <span className='l'>{t("account")}</span>
        </NavLink>,
        <div key={2}>
            {user.role === "R0" ?
                <NavLink className='nav-link m-2' to='admin/'>
                    <SettingOutlined />  <span className='l'>{t("admin")}</span>
                </NavLink>
                : null}
        </div>
        ,

        <NavLink onClick={handleLogOut} className='nav-link m-2' key={3}>
            <LogoutOutlined />  <span className='l'>{t("logout")}</span>
        </NavLink>
        ,
    ];

    const handleOnSearch = (string) => {
        setSearchText(string);
    }


    const handleOnSelect = (item) => {
        // the item selected
        navigate(`/user/info/${item.id}`);
    }

    const formatResult = (item) => {
        return (
            <>
                <span style={{ display: 'block', textAlign: 'left', cursor: 'pointer' }}>
                    <Avatar size={'small'} style={{ marginRight: '5px' }} src={item.avatar && item.avatar.data.length ? convertImage(item.avatar) : noAvatar} />
                    {item.name}
                </span>
            </>
        )
    }
    const handleOnFocus = () => {
        if (listUsers.length === 0) {
            dispatch(getUsers({
                limit: 10,
                userId: user.id
            }));
            startTransition(() => {
                dispatch(getUsers({
                    offset: 10,
                    limit: 100,
                    userId: user.id
                }));
            })
        }

    }
    const handleSearch = () => {
        dispatch(appSlice.actions.search(searchText));
        navigate(`/search/${toSearchAlias(searchText)}`);
    }

    return (
        <div className='header'>
            <Navbar expand="lg" className="nav-header">
                <div className='left-header'>
                    {/* <Input className='rounded-pill' bordered={false} placeholder={t('search')} prefix={<SearchOutlined />} /> */}
                </div>
                <Container>
                    <div className='small-menu'>
                        <Form onFinish={handleSearch} className='input-search-small mt-3'>
                            <Form.Item name="searchText" className='rounded-pill'>
                                <ReactSearchAutocomplete
                                    placeholder={t('search')}
                                    items={users}
                                    onSearch={handleOnSearch}
                                    onSelect={handleOnSelect}
                                    autoFocus
                                    formatResult={formatResult}
                                    onFocus={handleOnFocus}
                                />
                            </Form.Item>
                            {searchText ? <Button htmlType='submit' className='btn-search btn border-0' ><ArrowRightOutlined /></Button> : null}
                        </Form>
                        <div className='language-small'>
                            <span className={lang === 'vi' ? 'lang active' : 'lang'}
                                onClick={() => handleChangeLanguage('vi')}>
                                VI
                            </span>
                            <span className={lang === 'en' ? 'lang active' : 'lang'}
                                onClick={() => handleChangeLanguage('en')}>
                                EN
                            </span>
                        </div>
                    </div>


                    <NavLink
                        data-tooltip-content={t("home")}
                        className='nav-link'
                        to="/">
                        <HomeOutlined className='button' />
                    </NavLink>

                    <NavLink className='nav-link'
                        data-tooltip-content={t("find-friend")}
                        to="/make-friend">
                        <UsergroupAddOutlined className='button' />
                    </NavLink>

                    <Popover content={items} trigger={'click'} >
                        <UserOutlined className={`nav-link dropdown-hover button ${currentUrl.includes('user') ? 'active' : ''}`}
                            style={{ cursor: 'pointer' }} />
                    </Popover>
                    <div className='nav-link logo'></div>

                    <Form onFinish={handleSearch} className='input-search'>
                        <Form.Item name="searchText" className='rounded-pill'>
                            <ReactSearchAutocomplete
                                placeholder={t('search')}
                                items={users}
                                onSearch={handleOnSearch}
                                onSelect={handleOnSelect}
                                autoFocus
                                formatResult={formatResult}
                                onFocus={handleOnFocus}
                            />
                        </Form.Item>
                        {searchText ? <Button htmlType='submit' className='btn-search btn border-0' ><ArrowRightOutlined /></Button> : null}
                    </Form>


                </Container>

                <div className='right-header'>
                    <span className={lang === 'vi' ? 'lang active' : 'lang'}
                        onClick={() => handleChangeLanguage('vi')}>
                        VI
                    </span>
                    <span className={lang === 'en' ? 'lang active' : 'lang'}
                        onClick={() => handleChangeLanguage('en')}>
                        EN
                    </span>
                </div>
            </Navbar>



            <Tooltip
                anchorSelect=".nav-link"
                effect="solid"
                border={true}
                style={{
                    borderRadius: '5px',
                    padding: '5px',
                    zIndex: 10,
                    backgroundColor: 'rgb(255,255,255)',
                    color: 'gray',
                    boxShadow: '0 2px 5px silver'
                }}
            />

        </div >

    );
}

export default Header;