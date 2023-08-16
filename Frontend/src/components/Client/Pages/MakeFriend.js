import React, { useEffect, useState, useTransition } from 'react'
import { Card } from 'react-bootstrap'
import { followUser, getFollows, getUsers } from '../../../redux/silceReducers/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import { getUsersRemainingSelector, relationshipsRemainingSelector, userInfoSelector } from '../../../redux/selector'
import { convertImage, noAvatar } from '../../../utils/constants';
import { Button, Input, Popover, Radio, Select, Spin, Tooltip } from 'antd';
import { SortAscendingOutlined, SortDescendingOutlined, LoadingOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { NavLink } from 'react-router-dom';
import userSlice from '../../../redux/silceReducers/userSlice';
import './styles/MakeFriend.scss';

const MakeFriend = () => {
    const [isPending, startTransition] = useTransition();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [listUsers, setListUsers] = useState([]);
    const users = useSelector(getUsersRemainingSelector);
    const user = useSelector(userInfoSelector);
    const language = useSelector(state => state.app.language);
    const relationships = useSelector(relationshipsRemainingSelector);
    const loading = useSelector(state => state.user.loading);
    const [cardId, setCardId] = useState(0);
    useEffect(() => {
        if (!users.length) {
            dispatch(getUsers({
                limit: 8,
                userId: user.id
            }));
            startTransition(() => {
                dispatch(getUsers({
                    offset: 8,
                    limit: 100,
                    userId: user.id
                }));
            })
        }
        if (relationships && !relationships.length) {
            dispatch(getFollows())
        }
        dispatch(userSlice.actions.searchUser(''));
        dispatch(userSlice.actions.statusFilterChange('all'));
        document.title = `NBlog · ${t("find-friend")}`;
    }, []);

    useEffect(() => {
        setListUsers(users);
    }, [users])

    const hanldeFollow = (receiverId) => {
        setCardId(receiverId)
        dispatch(followUser({
            performerId: user.id,
            receiverId
        }))
    }
    const onChangeSearch = (e) => {
        dispatch(userSlice.actions.searchUser(e.target.value));
    }
    const onChangeRadio = (e) => {
        dispatch(userSlice.actions.statusFilterChange(e.target.value));
    }
    const onChangeSort = (e) => {
        dispatch(userSlice.actions.sortName(e.target.value))
    }
    return (
        <div className='container-user'>
            {isPending ? <Spin style={{ width: '100%' }} /> : null}
            <div className='filter-user'>
                <p className='text-secondary text-center'>{t("search")}</p>
                <div className='search mb-5'>
                    <Input className='rounded-pill search-user' placeholder={`🔎 ${t("search-name")}`} onChange={onChangeSearch} />
                </div>
                <p className='text-secondary text-center'>{t("filter")}</p>
                <div>
                    <div className="inputGroup">
                        <input id="radio1" name="radio" type="radio" value={'all'} onClick={onChangeRadio} defaultChecked />
                        <label htmlFor="radio1">{t("all")}</label>
                    </div>
                    <div className="inputGroup">
                        <input id="radio2" name="radio" type="radio" value={'followed'} onClick={onChangeRadio} />
                        <label htmlFor="radio2">{t("following")}</label>
                    </div>
                    <div className="inputGroup">
                        <input id="radio3" name="radio" type="radio" value={'unfollowed'} onClick={onChangeRadio} />
                        <label htmlFor="radio3">{t("unfollowed")}</label>
                    </div>
                </div>
                <p className='text-secondary text-center mt-5'>{t("sort")}</p>
                <Radio.Group className='sort' defaultValue={'AtoZ'} buttonStyle="solid" onChange={onChangeSort}>
                    <Radio.Button className='btn-sort' value={'AtoZ'}>
                        <Popover content={`${t("asc")} A → Z`} placement='bottom'>
                            <i className="bi bi-sort-alpha-down"></i>
                        </Popover>
                    </Radio.Button>
                    <Radio.Button className='btn-sort' value={'ZtoA'}>
                        <Popover content={`${t("desc")} Z → A`} placement='bottom'>
                            <i className="bi bi-sort-alpha-up"></i>
                        </Popover>
                    </Radio.Button>
                </Radio.Group>

            </div>

            <div className='row-card'>
                <div className='container-card'>
                    {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                        return (
                            <Card
                                className='card-user' key={index}>
                                <NavLink to={`/user/info/${item.id}`} className='nav-link img'>
                                    <Card.Img variant="top" src={item.avatar && item.avatar.data.length ? convertImage(item.avatar) : noAvatar} />
                                </NavLink>
                                <Card.Body>
                                    <NavLink to={`/user/info/${item.id}`} className='nav-link '>
                                        <h6>{language === 'vi' ? `${item.lastName} ${item.firstName} ` :
                                            `${item.firstName} ${item.lastName} `}
                                            {item.role === 'R0' ?
                                                <Popover content={t("admin")} placement='topLeft'>
                                                    <i className="bi bi-patch-check-fill text-primary"></i>
                                                </Popover> : ''}
                                        </h6>
                                    </NavLink>
                                    {relationships && relationships.length > 0 && relationships.some(relate => relate.performerId == user.id && relate.receiverId == item.id) === true ?

                                        <Button onClick={() => hanldeFollow(item.id)} className='col-12 mt-2 followed btn-user'>
                                            {loading && cardId === item.id ? <LoadingOutlined /> : t("following")}
                                        </Button>
                                        :
                                        <Button onClick={() => hanldeFollow(item.id)} className='col-12 mt-2 non-follow btn-user'>
                                            {loading && cardId === item.id ? <LoadingOutlined /> : t("follow")}
                                        </Button>
                                    }
                                    <Button onClick={() => dispatch(userSlice.actions.removeUser(item.id))} className='col-12 mt-2 remove btn-user'>
                                        {t("remove")}
                                    </Button>

                                </Card.Body>
                            </Card>
                        )
                    })
                    }
                </div>
            </div>
        </div >
    )
}

export default MakeFriend