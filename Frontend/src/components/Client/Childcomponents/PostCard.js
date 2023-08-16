import { Avatar, Button, Card, Popconfirm, Popover, message } from 'antd'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { convertImage, icons, noAvatar } from '../../../utils/constants';
import Comment from '../Pages/HomeComponents/MainComponents/Comment';
import ShowMoreText from "react-show-more-text";
import { v1 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { relationshipsRemainingSelector, userInfoSelector } from '../../../redux/selector';
import { formatDateEn, formatDateVi } from '../../componentsCustom/customTime';
import { useTranslation } from 'react-i18next';
import { deletePost } from '../../../redux/silceReducers/postSlice';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { followUser } from '../../../redux/silceReducers/userSlice';
import ModalQuickPost from '../Pages/HomeComponents/MainComponents/ModalQuickPost';
import { LoadingOutlined } from '@ant-design/icons'
const PostCard = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const language = useSelector(state => state.app.language);
    const user = useSelector(userInfoSelector);
    const relationships = useSelector(relationshipsRemainingSelector);
    const { t } = useTranslation();
    const loading = useSelector(state => state.user.loading);
    const item = props.item;
    const listImages = props.listImages;
    const getPhoto = props.getPhoto;
    // const userData = props.userData;
    const hanldeDeletePost = (id) => {
        dispatch(deletePost(id)).then((res) => {
            if (res.payload.errCode === 0) {
                messageApi.success(`${t("delete-post")} ${t("successful")}`)
            } else {
                messageApi.error(res.payload.message);
            }
        });
    }


    const createClass = (list) => {
        let length = list.length;
        if (length === 1) {
            return 'one-item'
        } else if (length === 2) {
            return 'two-items'
        } else {
            return 'photo'
        }
    }
    const hanldeFollow = (receiverId) => {
        dispatch(followUser({
            performerId: user.id,
            receiverId
        }))
    }
    const handleCopy = () => {
        messageApi.open({
            icon: <i className="bi bi-clipboard-check-fill m-2"></i>,
            // type: 'success',
            content: t("copy-link-success"),
        });
    }
    return (
        <>
            {item.id && item.userData
                ?
                <Card className='mt-3 card-custom'>
                    {contextHolder}

                    <div className='card-header'>
                        <div className='flex-heder'>
                            <div className='avatar'>
                                <NavLink to={`/user/info/${item.userId}`}>
                                    <Avatar src={item.userData.avatar && item.userData.avatar.data.length > 0 ? convertImage(item.userData.avatar) : noAvatar} size={'large'} />
                                </NavLink>
                            </div>
                            <div className='text'>
                                <NavLink to={`/user/info/${item.userData.id}`} className='nav-link'>
                                    {language === 'vi' ? `${item.userData.lastName} ${item.userData.firstName}`
                                        : `${item.userData.firstName} ${item.userData.lastName}`}
                                </NavLink>
                                <p className='time'>
                                    {language === 'vi' ? formatDateVi(item.createdAt) : formatDateEn(item.createdAt)} &#x2022; &nbsp;

                                    {item.privacy === 'P0' ? icons[0] : ''}
                                    {item.privacy === 'P1' ? icons[1] : ''}
                                    {item.privacy === 'P2' ? icons[2] : ''}
                                </p>
                            </div>
                            {item.userData.role === 'R0' ?
                                <Popover content={t("admin")} placement='topLeft'>
                                    <i className="bi bi-patch-check-fill text-primary m-2"></i>
                                </Popover> : ''}
                        </div>
                        <div className='more'>

                            <Popover placement="bottomRight"
                                content={<>
                                    {user && user.id === item.userData.id ?
                                        <><Popconfirm
                                            title={t("notification")}
                                            description={t("are-you-sure-delete-post")}
                                            okText={t("yes")}
                                            cancelText={t("no")}
                                            onConfirm={() => hanldeDeletePost(item.id)}
                                            key={v1()}
                                        >
                                            <Button className='border-0 d text-center'><i className="bi bi-trash"></i>{t("delete-post")}</Button>
                                        </Popconfirm>

                                            <ModalQuickPost edit={"edit"} content={item.contents} privacy={item.privacy} id={item.id} />
                                        </>
                                        : ''}
                                    {user.id !== item.userId ?
                                        <>
                                            {
                                                relationships.length > 0 && relationships.some(
                                                    relate => relate.performerId == user.id && relate.receiverId === item.userId) ?
                                                    <Button className='border-0 d' onClick={() => hanldeFollow(item.userId)}>
                                                    {loading ? <LoadingOutlined /> : <><i className="bi bi-person-dash"></i>{`${t("unfollow")} ${item.userData.lastName}`}</>}
                                                </Button>
                                                :
                                                <Button className='border-0 d' onClick={() => hanldeFollow(item.userId)}>
                                                    {loading ? <LoadingOutlined /> : <><i className="bi bi-person-plus"></i>{t("follow")}</>}
                                                </Button>
                                            }
                                        </> : null
                                    }
                                    <CopyToClipboard text={`${process.env.REACT_APP_ROUTER_BASE_NAME}/post/${item.id}`} onCopy={handleCopy} >
                                        <Button className='border-0 d'><i className="bi bi-link-45deg"></i>{t("copy-link")}</Button>
                                    </CopyToClipboard>
                                </>

                                } trigger="click">
                                <Button className='border-0'><i className="bi bi-three-dots-vertical"></i></Button>
                            </Popover>

                        </div>
                    </div>

                    <div className={`card-body theme-${item.theme}`}>
                        <ShowMoreText
                            lines={3}
                            more={<b style={{ cursor: 'pointer' }}>{t("read-more")}</b>}
                            less={<b style={{ cursor: 'pointer' }}>{t("display-less")}</b>}
                            expanded={false}
                            width={0}
                        >{item.contents}

                        </ShowMoreText>

                    </div>
                    <div className='images'>
                        {
                            listImages && listImages.some(img => img.postId === item.id) === true ?

                                <div className='mt-3'>

                                    {listImages && listImages.length > 0 &&
                                        listImages
                                            .filter(i => i.postId === item.id)
                                            .map
                                            ((imageItem, imgIndex) => {
                                                return imageItem.postId === item.id ?
                                                    <div key={imgIndex} className={`${createClass(listImages
                                                        .filter(i => i.postId === item.id))} ${listImages
                                                            .filter(i => i.postId === item.id).length === 5 &&
                                                            (imgIndex === 3 || imgIndex === 4) ? 'another-items' : ''} ${listImages
                                                                .filter(i => i.postId === item.id).length === 4 && imgIndex === 3 ? 'fourth-item' : ''}`}

                                                        style={{ background: `url(${convertImage(imageItem.image)})` }}
                                                        onClick={() => getPhoto(imgIndex, item.id)}></div>
                                                    : null
                                            })
                                    }
                                </div>
                                : ''}
                    </div>
                    <div className='card-action'>
                        <hr />
                        <Comment post={item} />
                    </div>
                </Card>
                : ''
            }
        </>
    )
}

export default PostCard
