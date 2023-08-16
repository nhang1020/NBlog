import { PlusOutlined } from '@ant-design/icons';
import {
    Button, DatePicker, Form, Input, Select, Switch, Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCode, createUser } from '../../../redux/silceReducers/adminReducers';
import { allCodeRemainingSelector } from '../../../redux/selector';
// import * as adminServices from '../../../services/adminServices'
import { toast, ToastContainer } from 'react-toastify';

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const FormDisabledDemo = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
        phoneNumber: '',
        birth: new Date().toISOString().slice(0, 10).replace('T', ' '),
        gender: 'M',
        role: 'R1',
        avatar: 'avatar',
        status: true,
        action: '',
    });
    const [allCodes, setAllCodes] = useState([]);
    const [form] = Form.useForm();
    const data = useSelector(allCodeRemainingSelector);
    const listUsers = useSelector(state => state.admin.users)
    const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllCode());
    }, [dispatch]);

    useEffect(() => {
        setAllCodes(data);
    }, [data]);
    useState(() => {
        setState((prevState) => ({
            ...prevState,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            birth: new Date().toISOString().slice(0, 10).replace('T', ' '),
            gender: 'M',
            role: 'R1',
            avatar: '',
            status: true,
        }));
    }, [listUsers])

    const onChangeInput = (event, id) => {
        const { value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };
    const onChangeSelect = (value, id) => {
        setState((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    }
    const onChangeDate = (e) => {
        setState((prevState) => ({
            ...prevState,
            birth: e.$d.toISOString().slice(0, 10).replace('T', ' '),
        }));
    }
    const hanldeSaveUser = async () => {
        try {
            await form.validateFields();
            if (new Date().getFullYear() - new Date(state.birth).getFullYear() < 14) {
                toast.warning("Tuổi chưa phù hợp");
                return;
            }
            dispatch(createUser({
                email: state.email,
                password: state.password,
                firstName: state.firstName,
                lastName: state.lastName,
                address: state.address,
                birth: state.birth,
                phoneNumber: state.phoneNumber,
                gender: state.gender,
                avatar: state.avatar,
                role: state.role,
                status: state.status
            }));
        } catch (errorInfo) {
            console.log('Failed:', errorInfo);
        }
    }
    return (
        <div className='container'>

            <Form labelCol={{ span: 10 }}
                wrapperCol={{ span: 17 }} layout="horizontal" style={{ maxWidth: '100%' }}
                className='row'
                form={form} name="dynamic_rule"
            >
                <div className='col-6'>
                    <Form.Item label="Email"
                        name="Email"
                        value={state.email}
                        rules={[{ required: true }]} >
                        <Input
                            onChange={(event) => onChangeInput(event, "email")} />
                    </Form.Item>

                    <Form.Item label="Password"
                        name="Password"
                        rules={[{ required: true }]} >
                        <Input
                            value={state.password}
                            type='password'
                            onChange={(event) => onChangeInput(event, "password")} />
                    </Form.Item>

                    <Form.Item label="Full Name" style={{ marginBottom: 0 }}>
                        <Form.Item
                            name="First name"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                        >
                            <Input value={state.firstName} placeholder="First name" onChange={(event) => onChangeInput(event, "firstName")} />
                        </Form.Item>
                        <Form.Item
                            name="Last name"
                            rules={[{ required: true }]}
                            style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                        >
                            <Input value={state.lastName} placeholder="Last name" onChange={(event) => onChangeInput(event, "lastName")} />
                        </Form.Item>
                    </Form.Item>
                    <Form.Item label="Gender" style={{ marginBottom: 0 }}>
                        <Form.Item label="" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                            <Select defaultValue={state.gender} onChange={(event) => onChangeSelect(event, "gender")} >
                                {allCodes && allCodes.length > 0 &&
                                    allCodes.map((item, index) => {
                                        return item.type === 'Gender' ? <Select.Option key={item.id} value={item.keyMap}>{item.valueVi}</Select.Option>
                                            : ''
                                    })}
                            </Select>
                        </Form.Item>
                        <Form.Item label="Role" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
                            <Select defaultValue={state.role} onChange={(event) => onChangeSelect(event, "role")} >
                                {allCodes && allCodes.length > 0 &&
                                    allCodes.map((item, index) => {
                                        return item.type === 'Role' ? <Select.Option key={item.id} value={item.keyMap}>{item.valueVi}</Select.Option>
                                            : ''
                                    })}
                            </Select>
                        </Form.Item>

                    </Form.Item>
                </div>
                <div className='col-6 row'>
                    <Form.Item label="Address"
                        name="Address"
                        rules={[{ required: true }]}
                    >
                        <Input value={state.address} onChange={(event) => onChangeInput(event, "address")} />
                    </Form.Item>

                    <Form.Item label="Phone Number"
                        name="Phone number"
                        rules={[{ required: true }]}
                    >
                        <Input value={state.phoneNumber} type='number' onChange={(event) => onChangeInput(event, "phoneNumber")} />
                    </Form.Item>
                    <Form.Item label="Birth" style={{ marginBottom: 0 }}
                    >
                        <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}>
                            <DatePicker onChange={onChangeDate} format={dateFormatList} />
                        </Form.Item>

                        <Form.Item label="Status" valuePropName="checked" style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}>
                            <Switch checked={state.status} onChange={(event) => onChangeSelect(event, "status")} />
                        </Form.Item>
                    </Form.Item>

                    <Form.Item label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload action="/upload.do" accept="image/png, image/jpeg" maxCount={1} listType="picture-card">

                            <div>
                                <PlusOutlined />
                                <div
                                    style={{
                                        marginTop: 8,
                                    }}
                                >
                                    Upload
                                </div>
                            </div>
                        </Upload>
                    </Form.Item>
                </div>

                <Form.Item label="">
                    <Button onClick={hanldeSaveUser}>Save</Button>
                </Form.Item>
            </Form>
            <ToastContainer />
        </div>
    );
};
export default FormDisabledDemo;