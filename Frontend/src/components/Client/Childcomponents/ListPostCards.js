import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsRemainingSelector, postImagesRemainingSelector, userInfoSelector } from '../../../redux/selector';
import { NavLink } from 'react-router-dom'
import { Card, Avatar, Button, Skeleton, Popover, Popconfirm, message, Spin } from 'antd';
import Comment from '../Pages/HomeComponents/MainComponents/Comment';
import { formatDateEn, formatDateVi } from '../../componentsCustom/customTime';
import { deletePost, getPosts } from '../../../redux/silceReducers/postSlice';
import { v1 } from 'uuid'
import { useTranslation } from 'react-i18next'
import { convertImage, createClass, noAvatar } from '../../../utils/constants';
import { icons } from '../../../utils/constants';
import Lighbox from '../../componentsCustom/Lightbox';
import ShowMoreText from 'react-show-more-text';

const PostCard = React.memo((props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const [listPosts, setListPosts] = useState([]);
    const [listImages, setListImages] = useState([]);
    const language = useSelector(state => state.app.language);
    const user = useSelector(userInfoSelector);
    const { t } = useTranslation();
    const [idx, setIdx] = useState(0);
    const [imgIndex, setImgIndex] = useState(-1);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        startTransition(() => {
            setListPosts(props.posts);
            setListImages(props.images);
        })

    }, [props.posts, props.images]);

    const hanldeDeletePost = (id) => {
        dispatch(deletePost(id)).then((res) => {
            if (res.payload.errCode === 0) {
                messageApi.success("Xóa thành công")
            } else {
                messageApi.error(res.payload.message);
            }
        });
    }

    const getPhoto = (index, postId) => {
        setImgIndex(index);
        setIdx(postId);
    }

    return (
        <>
            {contextHolder}
            <div className='m-3'>
                {listPosts && listPosts.length > 0 && listPosts.slice(0, props.lengthPosts).map((item, index) => {
                    return (
                        item.id && item.privacy && item.privacy !== "P2" ?
                            <Card key={index} className='mt-3 card-custom'>
                                <div className='card-header'>
                                    <div className='flex-heder'>
                                        <div className='avatar'>
                                            <NavLink to={`/user/info/${item.userData.id}`}>
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
                                        {user && user.id === item.userData.id ?
                                            <Popover placement="bottomRight"
                                                content={
                                                    <Popconfirm
                                                        title="Thông báo"
                                                        description="Bạn có chắc bài viết này không"
                                                        okText="Có"
                                                        cancelText="Không"
                                                        onConfirm={() => hanldeDeletePost(item.id)}
                                                        key={v1()}
                                                    >
                                                        <Button className='border-0'>Xóa bài viết</Button>
                                                    </Popconfirm>
                                                } trigger="click">
                                                <Button className='border-0'><i className="bi bi-three-dots-vertical"></i></Button>
                                            </Popover>
                                            : ''}
                                    </div>
                                </div>

                                <div className={`card-body theme-${item.theme}`}>
                                    <ShowMoreText
                                        lines={3}
                                        more={<b style={{ cursor: 'pointer' }}>{t("read-more")}</b>}
                                        less={<b style={{ cursor: 'pointer' }}>{t("display-less")}</b>}
                                        anchorClass="oooeeer"
                                        expanded={false}
                                        width={0}
                                    >
                                        {item.contents}
                                    </ShowMoreText>
                                </div>
                                <div className='images'>
                                    {
                                        listImages && listImages.some(img => img.postId === item.id) === true ?

                                            <div className='mt-3'>

                                                {listImages && listImages.length > 0 &&
                                                    listImages
                                                        .filter(i => i.postId == item.id)
                                                        .map
                                                        ((imageItem, imgIndex) => {
                                                            return imageItem.postId === item.id ?
                                                                <div key={imgIndex} className={`${createClass(listImages
                                                                    .filter(i => i.postId == item.id))} ${listImages
                                                                        .filter(i => i.postId == item.id).length === 5 &&
                                                                        (imgIndex === 3 || imgIndex === 4) ? 'another-items' : ''} ${listImages
                                                                            .filter(i => i.postId == item.id).length === 4 && imgIndex === 3 ? 'fourth-item' : ''}`}

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
                            </Card> : ''
                    )
                })
                }
            </div>
            <Lighbox index={imgIndex} setIndex={setImgIndex}
                photos={listImages
                    .filter(i => i.postId == idx)
                    .map(m => ({ src: convertImage(m.image) }))} />


            {isPending ? <Spin style={{ width: '100%' }} /> : null}
        </>
    )
})

export default PostCard