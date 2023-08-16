import React, { useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postsRemainingSelector, postImagesRemainingSelector, relationshipsRemainingSelector, userInfoSelector, getUsersSelector } from '../../../../redux/selector';
import { Spin } from 'antd';
import { getPosts } from '../../../../redux/silceReducers/postSlice';
import InfiniteScroll from "react-infinite-scroll-component";
import { convertImage } from '../../../../utils/constants';
import './styles/MainContent.scss';
import Lighbox from '../../../componentsCustom/Lightbox';
import PostCard from '../../Childcomponents/PostCard';
import { getFollows } from '../../../../redux/silceReducers/userSlice';

const MainContent = React.memo(() => {
    const dispatch = useDispatch();
    const [listPosts, setListPosts] = useState([]);
    const [listImages, setListImages] = useState([]);
    const posts = useSelector(postsRemainingSelector);
    const images = useSelector(postImagesRemainingSelector);
    const [offset, setOffset] = useState(0);
    const [idx, setIdx] = useState(0);
    const [imgIndex, setImgIndex] = useState(-1);
    const [isPending, startTransition] = useTransition();
    const relationships = useSelector(relationshipsRemainingSelector);
    // const users = useSelector(getUsersSelector);
    useEffect(() => {
        if (posts && !posts.length || !images.length) {
            dispatch(getPosts({
                offset: offset,
                limit: 5
            }));
        }
        if (relationships && !relationships.length) {
            dispatch(getFollows())
        }
        //, posts.length, images.length, offset, relationships.length
    }, [dispatch]);

    useEffect(() => {
        startTransition(() => {
            setListPosts(posts);
            setListImages(images);
        });
    }, [posts, images]);


    const fetchMoreData = () => {
        dispatch(getPosts({ offset: offset + 5, limit: 5 }))
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
            >
                <div className='m-3'>
                    {listPosts && listPosts.length > 0 && listPosts.map((item, index) => {
                        return (
                            item.privacy === "P0" ?
                                <PostCard item={item} key={index} listImages={listImages} getPhoto={getPhoto} /> : ''
                        )
                    })
                    }
                </div>
                <Lighbox index={imgIndex} setIndex={setImgIndex}
                    photos={listImages
                        .filter(i => i.postId === idx)
                        .map(m => ({ src: convertImage(m.image) }))} />
            </InfiniteScroll>

            {isPending ? <Spin style={{ width: '100%' }} /> : null}
        </>
    )
})

export default MainContent