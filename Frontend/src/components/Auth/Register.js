import { Button, message, Form, Input, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { login, sendEmail } from '../../redux/silceReducers/appSlice';
import './Login.scss'
import PinInput from "react-pin-input";
import { NavLink } from 'react-router-dom';
import { userSignUpService, checkExistsEmailService } from '../../services/appServices';
import { useEffect, useState } from 'react';
import AnimationPage from '../componentsCustom/AnimationPage';
import { ArrowLeftOutlined } from '@ant-design/icons';
const Login = () => {
    const dispatch = useDispatch();
    const [otp, setOtp] = useState('');
    const [otpTmp, setOtpTmp] = useState('');
    const [messageApi, contextHolder] = message.useMessage();
    const [user, setUser] = useState({});
    const loading = useSelector(state => state.app.loading);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(loading);
    }, [loading])
    const onFinish = async (user) => {
        let code = Math.floor(10000 + Math.random() * 90000);
        let response = await checkExistsEmailService({ email: user.email });
        if (response && response.errCode === 0) {

            dispatch(sendEmail({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                phoneNumber: user.phoneNumber,
                otp: code
            }));

            document.getElementById('main-regis').style.display = 'none';
            document.getElementById('main-confirm').style.display = 'block';

            setOtpTmp(code);
            setUser(user);

        } else {
            messageApi.error(response.message);
        }

    };
    const handlePrevious = () => {
        document.getElementById('main-regis').style.display = 'block';
        document.getElementById('main-confirm').style.display = 'none';
    }

    const onChangeOtp = value => {
        setOtp(value);
    }
    const handleConfirm = () => {
        if (+otp === otpTmp) {
            regisAndLogin(user)
        } else {
            messageApi.error('Your code incorrect');
        }
    }

    const regisAndLogin = async (user) => {
        let res = await userSignUpService({
            email: user.email,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            status: 1
        })
        if (res && res.errCode === 0) {
            messageApi.open({
                type: 'loading',
                content: 'Login in progress...',
                duration: 0,
            });
            dispatch(login({
                email: user.email,
                password: user.password,
            })).then(() => {
                messageApi.destroy();
            });
        } else {
            messageApi.error("Sign up failed, " + res.message)
        }
    }

    return (
        <>
            {contextHolder}
            <div className="container-custom">
                <img className="money-locker" src="https://www.getfoundquick.com/wp-content/uploads/2015/08/shutterstock_451991974.jpg" alt="SmartSave Money locker" />
                <AnimationPage>
                    <div className="detalis-main" id='main-regis'>
                        <div className="login-main m-4">
                            <h1>Welcome to NBlog</h1>
                            <p>Welcome, Please enter Your details</p>
                        </div>
                        <div className="switch-details">
                            <NavLink className="signin btn-switch" to='/login' >Sign in</NavLink>
                            <NavLink className="signin btn-switch" to='/register' style={{ float: 'left' }}>Sign up</NavLink>
                        </div>
                        <Form
                            name="basic"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            autoComplete="off"
                        >
                            <div className="form-detalis">

                                <div className="input-main">

                                    <div className="input-box">
                                        <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
                                            <Form.Item
                                                name="firstName"
                                                rules={[{ required: true, message: 'Please input your first name!' }]}
                                                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                                            >
                                                <Input placeholder="First name" />
                                            </Form.Item>
                                            <Form.Item
                                                name="lastName"
                                                rules={[{ required: true, message: 'Please input your last name!' }]}
                                                style={{ display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px' }}
                                            >
                                                <Input placeholder="Last name" />
                                            </Form.Item>
                                        </Form.Item>

                                        <Form.Item
                                            name="phoneNumber"
                                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                                        >
                                            <Input type='number' placeholder='Enter your phone' addonBefore={<i className="bi bi-telephone-plus-fill"></i>} />
                                        </Form.Item>

                                        <Form.Item
                                            name="email"
                                            rules={[{ required: true, message: 'Please input your email!' }]}>

                                            <Input type=''
                                                placeholder='Enter your email'
                                                addonBefore={<i className="bi bi-envelope-at-fill"></i>} />
                                        </Form.Item>

                                        <Form.Item name="password"
                                            rules={[{ required: true, message: 'Please input your password!' }]}>
                                            <Input.Password
                                                placeholder='Enter your password'
                                                addonBefore={<i className="bi bi-key-fill"></i>} />
                                        </Form.Item>
                                        <Form.Item name="confirm"
                                            dependencies={['password']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please confirm your password!',
                                                },
                                                ({ getFieldValue }) => ({
                                                    validator(rule, value) {
                                                        if (!value || getFieldValue('password') === value) {
                                                            return Promise.resolve();
                                                        }
                                                        return Promise.reject('The comfirmation passwords that you entered do not match!');
                                                    },
                                                }),
                                            ]}>
                                            <Input.Password
                                                placeholder='Enter your password'
                                                addonBefore={<i className="bi bi-key-fill"></i>} />
                                        </Form.Item>

                                    </div>

                                </div>
                            </div>
                            <Button className="continue" htmlType='submit'>Sign up</Button>
                        </Form>
                    </div>

                    <div className="detalis-main" id='main-confirm' style={{ display: 'none' }}>
                        <div className="login-main m-4">
                            <Button className='pt-0' onClick={handlePrevious}><ArrowLeftOutlined /></Button>
                            {isLoading === true ?
                                <Spin size='large' className='mt-5' /> :
                                <div>
                                    <h1>Cofirm your email</h1>
                                    <p>Please check your email to get code</p>
                                    <PinInput
                                        length={5}
                                        focus
                                        type="numeric"
                                        onChange={onChangeOtp}
                                        inputStyle={{ borderColor: 'silver', borderRadius: '10px' }}
                                    />
                                    <Button className='m-5' onClick={handleConfirm}>Confirm</Button>
                                </div>
                            }
                        </div>
                    </div>
                </AnimationPage>
            </div>
        </>
    )
};
export default Login;