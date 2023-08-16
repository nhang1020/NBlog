import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { postsRemainingSelector, postImagesRemainingSelector, relationshipsRemainingSelector, userInfoSelector } from '../../../redux/selector';
import { convertImage } from '../../../utils/constants';
import Lighbox from '../../componentsCustom/Lightbox';
import PostCard from './PostCard';


const FollowingTab = () => {
    const [listPosts, setListPosts] = useState([]);
    const [listImages, setListImages] = useState([]);
    const posts = useSelector(postsRemainingSelector);
    const images = useSelector(postImagesRemainingSelector);
    const [idx, setIdx] = useState(0);
    const [imgIndex, setImgIndex] = useState(-1);
    const relationships = useSelector(relationshipsRemainingSelector);
    const user = useSelector(userInfoSelector);
    // const users = useSelector(getUsersSelector);
    useEffect(() => {
        let userFollow = relationships.filter(item => {
            if (item.performerId == user.id) {
                return item
            }
        })
        setListPosts(posts.filter(item => {
            if (userFollow.some(u => u.receiverId == item.userId)) {
                return item;
            }
        }))
        setListImages(images);

    }, [posts, images]);

    const getPhoto = (index, postId) => {
        setImgIndex(index);
        setIdx(postId);
    }
    return (
        <>
            <div className='m-3'>
                {listPosts && listPosts.length > 0 && listPosts.map((item, index) => {
                    return (
                        <PostCard item={item} key={index} listImages={listImages} getPhoto={getPhoto}
                        // userData={users && users.length > 0 ? users.find(user => user.id === item.userId) : {}}
                        />
                    )
                })
                }
            </div>
            <Lighbox index={imgIndex} setIndex={setImgIndex}
                photos={listImages
                    .filter(i => i.postId === idx)
                    .map(m => ({ src: convertImage(m.image) }))} />


        </>
    )
}

export default FollowingTab