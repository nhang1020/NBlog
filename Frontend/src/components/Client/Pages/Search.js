import React, { useEffect, useState, useTransition } from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { searchService } from '../../../services/appServices';
import ListPostCards from "../Childcomponents/ListPostCards"
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Popover, Spin } from 'antd';
import { useTranslation } from 'react-i18next';
import { convertImage, noAvatar } from '../../../utils/constants';
import './styles/Search.scss'
import { followUser, getFollows } from '../../../redux/silceReducers/userSlice';
import { relationshipsRemainingSelector, userInfoSelector } from '../../../redux/selector';
import { LoadingOutlined } from '@ant-design/icons';
const Search = () => {
    const { t } = useTranslation();
    const [isPending, startTransition] = useTransition();
    const dispatch = useDispatch();
    const { key } = useParams();
    const user = useSelector(userInfoSelector);
    const language = useSelector(state => state.app.language);
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState([]);
    const keyWord = useSelector(state => state.app.keyWord);
    const relationships = useSelector(relationshipsRemainingSelector);
    const maxLength = 5;
    const [lengthUsers, setLengthUsers] = useState(maxLength);
    const [lengthPosts, setLengthPosts] = useState(maxLength);
    const loading = useSelector(state => state.user.loading);
    const [cardId, setCardId] = useState(0);
    const [loadingData, setLoadingData] = useState(true);
    useEffect(() => {
        startTransition(() => {
            searchService({ searchText: key }).then((res) => {
                if (res.errCode === 0) {
                    setUsers(res.users);
                    setPosts(res.posts);
                    setImages(res.images);
                }
            }).then(() => {
                setLoadingData(false);
            });
            if (relationships && !relationships.length) {
                dispatch(getFollows())
            }
        })
        document.title = `NBlog · ${t("search")}`;
    }, [key])

    const hanldeFollow = (receiverId) => {
        setCardId(receiverId)
        dispatch(followUser({
            performerId: user.id,
            receiverId
        }))
    }
    return (
        <div className='mid-content mt-5'>
            {isPending ? <Spin style={{ width: '100%' }} /> : null}
            <h5>{t("key-word")}: {keyWord}</h5>
            <div className='mt-5 list-users'><b>{t("relate-user")}</b>

                {users.length > 0 && (users.slice(0, lengthUsers).map((item, index) => {
                    return <Card className='card-users card-user-small rounded' key={index}>
                        <NavLink className=' nav-link' to={`/user/info/${item.id}`}>
                            <img className='m-1' src={item.avatar && item.avatar.data.length ? convertImage(item.avatar) : noAvatar} />
                            <span>{language === 'vi' ? `${item.lastName} ${item.firstName} ` :
                                `${item.firstName} ${item.lastName} `}
                                {item.role === 'R0' ?
                                    <Popover content={t("admin")} placement='topLeft'>
                                        <i className="bi bi-patch-check-fill text-primary"></i>
                                    </Popover> : ''}</span>
                        </NavLink>
                        {relationships && relationships.length > 0 && relationships.some(relate => relate.performerId == user.id && relate.receiverId == item.id) === true ?
                            <Button className='btn-follow followed' onClick={() => hanldeFollow(item.id)}>
                                {loading && cardId === item.id ? <LoadingOutlined /> : t("following")}
                            </Button> :
                            <Button className='btn-follow non-follow text-white' onClick={() => hanldeFollow(item.id)}>
                                {loading && cardId === item.id ? <LoadingOutlined /> : t("follow")}
                            </Button>
                        }
                    </Card>

                })
                )}
                {loadingData ?
                    <LoadingOutlined
                        style={{
                            fontSize: 30,
                            width: '100%',
                            margin: '30px 0'
                        }}
                        spin
                    /> : ''}
                {lengthUsers >= users.length ?
                    <Button onClick={() => setLengthUsers(maxLength)} className='shadow-1 border-0'>
                        {users.length > 5 ? t("display-less") : t("end")}
                    </Button> :
                    <Button onClick={() => setLengthUsers(pre => pre + maxLength)} className='shadow-1 border-0'>
                        {t("display-more")}
                    </Button>
                }
            </div>
            <div className='mt-5 list-posts'>
                <b>{t("relate-post")}</b>

                <ListPostCards posts={posts} images={images} lengthPosts={lengthPosts} />

                {loadingData ?
                    <LoadingOutlined
                        style={{
                            fontSize: 30,
                            width: '100%',
                            margin: '30px 0'
                        }}
                        spin
                    /> : ''}
                {lengthPosts >= posts.length ?
                    <Button onClick={() => setLengthPosts(maxLength)} className='shadow-1 border-0'>
                        {posts.length > 5 ? t("display-less") : t("end")}
                    </Button> :
                    <Button onClick={() => setLengthPosts(pre => pre + maxLength)} className='shadow-1 border-0'>
                        {t("display-more")}
                    </Button>
                }
            </div>
        </div>
    )
}

export default React.memo(Search)