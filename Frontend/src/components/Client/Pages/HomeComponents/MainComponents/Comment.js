import { LoadingOutlined, SendOutlined, SmileOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import { Avatar, Button, Drawer, Empty, Input, Popover, Spin } from 'antd';
import '../styles/Comment.scss'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { v1 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux'
import { commentPost, getComments, likePost } from '../../../../../redux/silceReducers/postSlice'
import { likePostsRemainingSelector, userInfoSelector } from '../../../../../redux/selector';
import { formatDateEn, formatDateVi } from '../../../../componentsCustom/customTime';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CardComment from './CardComment';
import { convertImage } from '../../../../../utils/constants'

const Comment = (props) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [comment, setComment] = useState('');
    const [list, setList] = useState([]);
    let comments = useSelector(state => state.post.comments);
    const postId = props.post.id;
    const user = useSelector(userInfoSelector);
    const [idCmt, setIdCmt] = useState('')
    const language = useSelector(state => state.app.language);
    const [listChild, setListChild] = useState([]);
    const likes = useSelector(likePostsRemainingSelector);
    const [countLike, setCountLike] = useState(0);
    const isLoading = useSelector(state => state.post.loading);
    const [likeLoading, setLikeLoading] = useState(false);
    const showDrawer = () => {
        setOpen(true);
        setList([]);
        dispatch(
            getComments({
                postId: postId
            })
        );

    };

    const onClose = () => {
        setOpen(false)
    }
    useEffect(() => {
        setList(comments);
        setListChild([...comments].reverse());

    }, [comments]);

    const onEmojiSelect = (value) => {
        setComment(preValue => preValue + value.native)
    }
    const emoji = (
        <Picker data={data} onEmojiSelect={onEmojiSelect} />
    );

    const onChangeComment = (value) => {
        setComment(value);
    };
    const sendComment = () => {
        dispatch(commentPost({
            postId: postId,
            userId: user.id,
            content: comment,
            parentComment: idCmt
        }))
        setComment('');
        setIdCmt('');
    }

    const onReply = (name, id) => {
        // alert(name)
        setComment(`↳${name}: `);
        setIdCmt(id);
    };
    const onLikePost = () => {
        setLikeLoading(true);
        dispatch(likePost({
            postId: postId,
            userId: user.id
        })).then(() => {
            setLikeLoading(false)
        })
    }
    useEffect(() => {
        if (likes) {
            const countLikes = likes.filter(like => like.postId === postId)
            setCountLike(countLikes.length)
        }
    }, [likes])
    return (
        <>
            <div className='action-buton'>
                <button className='btn border-0' onClick={onLikePost}>
                    {likeLoading ? <LoadingOutlined style={{ margin: '11px' }} /> :
                        <>
                            {likes && likes.some((like) => like.userId === user.id && like.postId === postId) ?
                                <i className="bi bi-heart-fill" key={v1()} ></i> : <i className="bi bi-heart like" key={v1()} ></i>
                            }
                            <p>{countLike}</p>
                        </>
                    }
                </button>
                <button className='btn border-0' onClick={showDrawer}>
                    <i className="bi bi-chat-text"></i>
                </button>
            </div>
            <Drawer placement='bottom'
                open={open} onClose={onClose}
                extra={<h5>{list.length} bình luận</h5>}>
                <div className='cmt'>
                    <div className='comment-content'>

                        {list.length > 0 && list.map((item, index) => {
                            return !item.parentComment ? <div key={index} className='mb-5'>
                                <div className='flex-heder'>
                                    <div className='avatar'>
                                        <NavLink to={`/user/info/${item.userComment.id}`}>
                                            {item.userComment.avatar ?
                                                <Avatar src={convertImage(item.userComment.avatar)} size="large" />
                                                :
                                                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" size="large" />
                                            }
                                        </NavLink>
                                    </div>
                                    <div className='text'>
                                        <div className='info'>
                                            <div style={{ display: 'flex' }}>
                                                <NavLink to={`/user/info/${item.userComment.id}`} className='nav-link'>
                                                    {language === 'vi' ? `${item.userComment.lastName} ${item.userComment.firstName}`
                                                        : `${item.userComment.firstName} ${item.userComment.lastName}`}
                                                </NavLink>
                                                {item.userComment.role === 'R0' ?
                                                    <Popover content={t("admin")} placement='topLeft'>
                                                        <i className="bi bi-patch-check-fill text-primary m-2"></i>
                                                    </Popover> : ''}
                                            </div>

                                            &nbsp;
                                            <p className='time'>
                                                &#x2022; {language === 'vi' ? formatDateVi(item.createdAt) : formatDateEn(item.createdAt)}
                                            </p>
                                        </div>

                                        <div className='contents'>
                                            <p>{item.content}</p>
                                            <div style={{ width: '100%' }}>
                                                <label
                                                    htmlFor='input'
                                                    onClick={() => onReply(`${item.userComment.lastName} ${item.userComment.firstName}`, item.id)}
                                                    className='btn border-0 p-0'>Trả lời
                                                </label>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div>
                                    {listChild.length > 0 && listChild.map((childItem, childIndex) => {
                                        if (childItem.parentComment && childItem.parentComment === item.id) {
                                            return <div key={childIndex}> <CardComment
                                                onReply={onReply}
                                                childItem={childItem} index={childIndex}
                                            /></div>
                                        }
                                    })
                                    }
                                </div>
                            </div> : ''
                        })
                        }
                        {isLoading === true ? <Spin style={{ margin: 'auto', width: '100%' }} /> :
                            <> {list.length === 0 ? <Empty description={t("no-comment")} /> : ''}</>}

                    </div>
                    <div className='form-comment'>
                        <Popover placement="topLeft" content={emoji} trigger="click">
                            <Button className='send border-0'><SmileOutlined /></Button>
                        </Popover>

                        <Input onChange={(e) => onChangeComment(e.target.value)}
                            placeholder={`${t("write-comment")}...`} value={comment}
                            bordered={false}
                            id='input'

                        />
                        <Button
                            disabled={comment !== '' ? false : true}
                            className='border-0 send' onClick={sendComment}>
                            <SendOutlined />
                        </Button>
                    </div>
                </div >
            </Drawer>

        </>
    )
}

export default Comment