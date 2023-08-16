import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersSelector, userInfoSelector, userPostsRemainingSelector } from '../../../../redux/selector';
import { Spin } from 'antd';
import { getUserPosts } from '../../../../redux/silceReducers/postSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import { convertImage } from '../../../../utils/constants';
import Lighbox from '../../../componentsCustom/Lightbox';
import PostCard from '../../Childcomponents/PostCard';
const MainContent = React.memo((props) => {
    const [isPending, startTransition] = useTransition();
    const dispatch = useDispatch();
    const [listPosts, setListPosts] = useState([]);
    const [listImages, setListImages] = useState([]);
    // const language = useSelector(state => state.app.language);
    const user = useSelector(userInfoSelector);
    const posts = useSelector(userPostsRemainingSelector);
    const images = useSelector(state => state.post.images);
    const [offset, setOffset] = useState(0);
    const [idx, setIdx] = useState(0);
    const [imgIndex, setImgIndex] = useState(-1);
    const users = useSelector(getUsersSelector);
    useEffect(() => {
        // if (!posts.length || !images.length) {
        startTransition(() => {
            dispatch(getUserPosts({
                offset: offset,
                limit: 5,
                userId: props.userId
            }));
        })
        // }
    }, [dispatch]);

    useEffect(() => {
        startTransition(() => {
            setListPosts(posts);
            setListImages(images);
        })
    }, [posts, images]);


    const fetchMoreData = () => {
        startTransition(() => {
            dispatch(getUserPosts({ offset: offset + 5, limit: 5, userId: props.userId }));
        })
        setOffset((prevOffset) => prevOffset + 5);
    };
    const getPhoto = (index, postId) => {
        setImgIndex(index);
        setIdx(postId);
    }
    return (
        <>
            <InfiniteScroll
                dataLength={listPosts.length + 5}
                next={fetchMoreData}
                hasMore={true}
                loader={isPending ? <Spin style={{ width: '100%' }} /> : null}
            >
                <div className='m-3'>
                    {listPosts && listPosts.length > 0 && listPosts.map((item, index) => {
                        return item.userId === +props.userId ? (
                            user.id !== +props.userId && item.privacy === "P2" ? null :
                                <PostCard item={item} key={index} listImages={listImages} getPhoto={getPhoto}
                                />
                        ) : null
                    })
                    }
                </div>
                <Lighbox index={imgIndex} setIndex={setImgIndex}
                    photos={listImages
                        .filter(i => i.postId === idx)
                        .map(m => ({ src: convertImage(m.image) }))} />
            </InfiniteScroll>
        </>
    )
})

export default MainContent