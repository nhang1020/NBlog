import React, { useEffect, useState } from 'react';
import { Avatar, Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, deletePost } from '../../../redux/silceReducers/postSlice';
import { postsRemainingSelector, postImagesRemainingSelector } from '../../../redux/selector';
import { formatDateEn, formatDateVi } from '../../componentsCustom/customTime';
import { convertImage } from '../../../utils/constants';
import "./PostManage.scss"
const columns = [
    {
        title: 'Người đăng',
        dataIndex: 'fullName',
        sorter: {
            compare: (a, b) => a.fullName - b.fullName,
            multiple: 1,
        },
        width: '20%'
    },
    {
        title: 'Thời gian',
        dataIndex: 'time',
        width: '20%'
    },
    {
        title: 'Nội dung',
        dataIndex: 'contents',
        width: '40%'
    },
    {
        title: 'Action',
        dataIndex: 'action',
        width: '20%'

    },

];
const PostManage = () => {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const posts = useSelector(postsRemainingSelector);
    const images = useSelector(postImagesRemainingSelector)


    useEffect(() => {
        dispatch(getPosts({
            offset: 0,
            limit: 100
        }));
    }, [dispatch]);

    useEffect(() => {
        if (posts && posts.length) {
            let getData = posts.map((item, index) => ({
                key: index,
                fullName: `${item.userData.lastName} ${item.userData.firstName}`,
                time: formatDateVi(item.createdAt),
                contents: item.contents ? <p className='content-text'>{item.contents}</p> :
                    images.map(img => {
                        return img.postId === item.id ? <Avatar src={convertImage(img.image)} /> : null
                    }),

                action: <a onClick={() => handleDeleteUser(item.id)}>Delete</a>,
            }))


            setData(getData);
        }
    }, [posts])

    const handleDeleteUser = (postId) => {
        dispatch(deletePost(postId));
    }
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                className='container'
            />
        </>
    )
}

export default PostManage