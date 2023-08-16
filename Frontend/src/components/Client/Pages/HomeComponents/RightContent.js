import React, { useEffect, useState, useTransition } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFollows, getUsers } from '../../../../redux/silceReducers/userSlice';
import { useTranslation } from 'react-i18next';
import { getUsersRemainingSelector, relationshipsRemainingSelector, userInfoSelector } from '../../../../redux/selector';
import { Avatar, Button, Card, Popover } from 'antd'
import { convertImage, noAvatar } from '../../../../utils/constants';
import './styles/RightContent.scss'
import { NavLink } from 'react-router-dom';
const RightContent = () => {
    const dispatch = useDispatch();
    const [isPending, startTransition] = useTransition();
    const { t } = useTranslation();
    const users = useSelector(getUsersRemainingSelector);
    const user = useSelector(userInfoSelector);
    const language = useSelector(state => state.app.language);
    const relationships = useSelector(relationshipsRemainingSelector);
    const [listUsersFollow, setListUsersFollow] = useState([]);
    const [listUsersUnFollowed, setListUsersUnFollowed] = useState([])
    useEffect(() => {
        if (users && !users.length) {
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
        if (relationships && !relationships.length) {
            dispatch(getFollows())
        }
    }, []);
    useEffect(() => {
        let userFollow = users.filter(userItem => {
            if (relationships && relationships.some(item => item.receiverId == userItem.id && item.performerId == user.id)) {
                return userItem
            }
        })
        let userUnFollowed = users.filter(userItem => {
            if (relationships && !relationships.some(item => item.receiverId == userItem.id && item.performerId == user.id)) {
                return userItem
            }
        })
        setListUsersFollow(userFollow);
        setListUsersUnFollowed(userUnFollowed);
    }, [users])

    const style = {
        background: `url(${user.avatar && user.avatar.data.length ? convertImage(user.avatar) :
            'https://images.squarespace-cdn.com/content/v1/51b3dc8ee4b051b96ceb10de/1578411019903-FHOOQHL9NORKRTSUL1JL/image-asset.jpeg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    return (
        <div className='m-5'>
            <Card className='mb-3 card-profile' style={style}>
                <span>{language === 'vi' ? `${user.lastName} ${user.firstName} ` :
                    `${user.firstName} ${user.lastName} `}</span>
                <NavLink className='nav-link' to={`/user/info/${user.id}`}>{t("view-profile")}</NavLink>
            </Card>
            <h6>{t("following")}</h6>
            <div>
                {listUsersFollow.length > 0 ? (
                    listUsersFollow.slice(0, 7).map((item, index) => {
                        return <NavLink key={index} className='card-user-small nav-link' to={`/user/info/${item.id}`}>
                            <img className='m-1' src={item.avatar && item.avatar.data.length ? convertImage(item.avatar) : noAvatar} />
                            <span>{language === 'vi' ? `${item.lastName} ${item.firstName} ` :
                                `${item.firstName} ${item.lastName} `}
                                {item.role === 'R0' ?
                                    <Popover content={t("admin")} placement='topLeft'>
                                        <i className="bi bi-patch-check-fill text-primary"></i>
                                    </Popover> : ''}</span>

                        </NavLink>
                    })
                ) : <NavLink className='m-4 nav-link' to='make-friend'>{t("search")}</NavLink>}

            </div>
            <h6 className='mt-5'>{t("recommended-followers")}</h6>
            <div>
                {listUsersUnFollowed.length > 0 && (
                    listUsersUnFollowed.slice(0, 7).map((item, index) => {
                        return <NavLink key={index} className='card-user-small nav-link' to={`/user/info/${item.id}`}>
                            <img className='m-1' src={item.avatar && item.avatar.data.length ? convertImage(item.avatar) : noAvatar} />
                            <span>{language === 'vi' ? `${item.lastName} ${item.firstName} ` :
                                `${item.firstName} ${item.lastName} `}
                                {item.role === 'R0' ?
                                    <Popover content={t("admin")} placement='topLeft'>
                                        <i className="bi bi-patch-check-fill text-primary"></i>
                                    </Popover> : ''}</span>

                        </NavLink>
                    })
                )}

            </div>
        </div>
    )
}

export default RightContent