import React, { useEffect, useState } from 'react'
import PostCard from './PostCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getPostDetail } from '../../../redux/silceReducers/postSlice';
import { imagesPostRemainingSelector, postDetailRemainingSelector, getUsersSelector } from '../../../redux/selector';
import Lighbox from '../../componentsCustom/Lightbox';
import { convertImage } from '../../../utils/constants';
import { Button } from 'antd';
const PostDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const [post, setPost]=useState({});
    const post = useSelector(postDetailRemainingSelector);
    const images = useSelector(imagesPostRemainingSelector);
    const [idx, setIdx] = useState(0);
    const [imgIndex, setImgIndex] = useState(-1);
    const users = useSelector(getUsersSelector);
    const getPhoto = (index, postId) => {
        setImgIndex(index);
        setIdx(postId);
    }
    useEffect(() => {
        dispatch(getPostDetail(id)).then((res) => {
        })
    }, []);


    return (
        <div className='mid-content'>

            <PostCard item={post} key={0} listImages={images} getPhoto={getPhoto}
                userData={users && users.length > 0 ? users.find(user => user.id === post.userId) : {}}
            />
            <Button className='btn-backhome'></Button>
            <Lighbox index={imgIndex} setIndex={setImgIndex}
                photos={images
                    .filter(i => i.postId === idx)
                    .map(m => ({ src: convertImage(m.image) }))} />
        </div>
    )
}

export default PostDetail