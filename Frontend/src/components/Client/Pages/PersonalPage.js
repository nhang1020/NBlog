import { useNavigate, useParams } from 'react-router-dom';
import './styles/PersonalPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState, useTransition } from 'react';
import { Card, Empty, Popover, Spin } from 'antd'
import SocialModal from './PersonalComponents/SocialModal'
import DetailBioModal from './PersonalComponents/DetailBioModal';
import { getFollows, getUserDetail } from '../../../redux/silceReducers/userSlice';
import { postImagesRemainingSelector, relationshipsRemainingSelector, userDetailRemainingSelector, userInfoSelector } from '../../../redux/selector';
import AvatarModal from './PersonalComponents/AvatarModal';
import { useTranslation } from 'react-i18next'
import MyPost from './PersonalComponents/MyPost';
import { noAvatar, socialLink, convertImage } from '../../../utils/constants';

import Lighbox from '../../componentsCustom/Lightbox';

import ModalQuickPost from './HomeComponents/MainComponents/ModalQuickPost'
const PersonalPage = () => {
    const { t } = useTranslation();
    const language = useSelector(state => state.app.language);
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userInfo = useSelector(userInfoSelector);
    const getUser = useSelector(userDetailRemainingSelector);
    const images = useSelector(postImagesRemainingSelector);
    const [user, setUser] = useState({});
    const [isPending, startTransition] = useTransition();
    const loading = useSelector(state => state.post.postLoading);
    const [galleries, setGalleries] = useState([]);
    const [index, setIndex] = useState(-1);
    const relationships = useSelector(relationshipsRemainingSelector);
    useEffect(() => {
        startTransition(() => {
            dispatch(getUserDetail(id))
                .then((res) => {
                    if (res && !res.payload.id) {
                        navigate('not-found')
                    }
                });
            if (relationships && !relationships.length) {
                dispatch(getFollows());
            }
        })

    }, [id, dispatch]);

    useEffect(() => {

        document.title = language === 'vi' ? `NBlog · ${getUser.lastName} ${getUser.firstName}` :
            `NBlog · ${getUser.firstName} ${getUser.lastName}`
            ;
        setUser(getUser);
    }, [getUser])
    useEffect(() => {
        if (images.length) {
            let myGalleries = images
                .filter(item => item.userId == id)
                .map(item => ({ src: convertImage(item.image), width: 800, height: 600 }));
            setGalleries(myGalleries);
        }
    }, [images]);
    return (
        <>
            <div className='personal-container'>
                <div className='background'></div>
                <div className='info-content'>
                    <div className='info-header'>
                        <AvatarModal id={id} image={getUser.avatar && getUser.avatar.data.length > 0 ? convertImage(getUser.avatar) : noAvatar} />
                        <div className='name'>
                            <h4>{language === 'vi' ? `${user.lastName} ${user.firstName} ` :
                                `${user.firstName} ${user.lastName} `}
                                {user.role === 'R0' ?
                                    <Popover content={t("admin")} placement='topLeft'>
                                        <i className="bi bi-patch-check-fill text-primary"></i>
                                    </Popover> : ''}

                            </h4>
                            <p> {user.email} <i className="bi bi-envelope-at-fill"></i></p>
                            <p className='social-link'>
                                <a href={getUser.facebook} target='_blank' className='nav-link'> <i className="bi bi-facebook text-primary"></i></a>
                                <a href={getUser.youtube} target='_blank' className='nav-link'> <i className="bi bi-youtube text-danger"></i></a>
                                <a href={getUser.twitter} target='_blank' className='nav-link'> <i className="bi bi-twitter text-info"></i></a>

                                <SocialModal socialLink={socialLink} id={userInfo.id} user={getUser} relationships={relationships} />
                            </p>
                        </div>
                    </div>

                    <div className='infomation'>
                        <h5>{t("introduce")}</h5>
                        <div className='table'>
                            <p><i className="bi bi-pin-map-fill"></i> {user.address ? user.address : t("not-update")}</p>
                            <p><i className="bi bi-person-heart"></i>
                                &nbsp;
                                {relationships && relationships.length > 0 && (relationships.filter(rel => rel.receiverId == id).length)}
                                &nbsp;
                                {t("follower")}</p>
                        </div>

                        <DetailBioModal user={user} />

                        <Card title={t("photo")} extra={<button className='nav-link' onClick={() => setIndex(0)}>{t("view-all")}</button>} className='shadow-1'>
                            <div className='galleries'>
                                {galleries && galleries.slice(0, 4).map((item, index) => {
                                    return <div className='photos' key={index} onClick={() => setIndex(index)}
                                        style={{ background: `url(${item.src})` }}
                                    >
                                    </div>
                                })
                                }
                                {galleries && galleries.length > 4 && (
                                    <div className='more-photos' style={{ background: `url(${galleries[4].src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                        onClick={() => setIndex(4)}>
                                        <h3>+{galleries.length - 4}</h3>
                                    </div>
                                )}
                                <Lighbox index={index} setIndex={setIndex} photos={galleries} />

                                {galleries && !galleries.length ? <Empty description={t("empty")} style={{ width: '100%' }} /> : null}
                            </div>
                        </Card>

                    </div>
                </div>

                <div className='post-content'>
                    <div className='m-3'>
                        {userInfo.id == id ?
                            <Card title={t("create-post")} className='m-3 card-custom'>
                                <ModalQuickPost />
                            </Card>
                            : null
                        }
                        {loading ? <Spin style={{ width: '100%' }} /> : null}
                        <MyPost userId={id} />
                    </div>
                </div>

            </div >

        </>
    )
}

export default PersonalPage