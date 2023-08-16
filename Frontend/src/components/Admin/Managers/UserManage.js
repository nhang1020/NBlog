import React, { useEffect } from 'react';
import { Table } from 'antd';
import FormUser from './FormUser';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser } from '../../../redux/silceReducers/adminReducers';
import { usersRemainingSelector } from '../../../redux/selector';

const columns = [
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Full name',
        dataIndex: 'fullName',
        sorter: {
            compare: (a, b) => a.fullName - b.fullName,
            multiple: 1,
        },
    },
    {
        title: 'Adress',
        dataIndex: 'address',
        sorter: {
            compare: (a, b) => a.address - b.address,
            multiple: 1,
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
    },
    {
        title: 'Action',
        dataIndex: 'action',

    },

];
const UserManage = () => {
    const dispatch = useDispatch();
    // const [users, setUsers] = useState([]);
    const users = useSelector(usersRemainingSelector);
    const data = [];
    useEffect(() => {
        if (users && users.length) {
            users.map((item, index) => {
                let obj = {};
                obj.key = index;
                obj.email = item.email;
                obj.fullName = `${item.firstName} ${item.lastName}`;
                obj.address = item.address;
                obj.status = item.status;
                obj.action = <a onClick={() => handleDeleteUser(item.id)}>Delete</a>;
                data.push(obj);
            })
        }
    }, [users])

    useEffect(() => {
        dispatch(getUsers({
            limit: "All"
        }));
    }, [dispatch]);
    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));
    }
    return (
        <>
            <FormUser />
            <Table
                columns={columns}
                dataSource={data}
                className='container'
            />
        </>
    )
}

export default UserManage