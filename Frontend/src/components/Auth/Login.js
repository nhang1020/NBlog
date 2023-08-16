import { Button, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux'
import { login, loginSocial } from '../../redux/silceReducers/appSlice';
import './Login.scss';
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { NavLink } from 'react-router-dom';
import AnimationPage from '../componentsCustom/AnimationPage';
const Login = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch()
    const onFinish = (user) => {
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

    };
    const onLoginSocial = (user) => {
        messageApi.open({
            type: 'loading',
            content: 'Login in progress...',
            duration: 0,
        });
        dispatch(loginSocial(user)).then(() => {
            messageApi.destroy();
        });
    };


    return (
        <div className="container-custom">
            {contextHolder}
            <img className="money-locker" src="https://www.getfoundquick.com/wp-content/uploads/2015/08/shutterstock_451991974.jpg" alt="SmartSave Money locker" />
            <AnimationPage>
                <div className="detalis-main">
                    <div className="login-main">
                        <div className="logo" ></div>
                        <h1>Welcome Back</h1>
                        <p>Welcome Back , Please enter Your details</p>
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
                                    <Form.Item
                                        name="email"
                                        rules={[{ required: true, message: 'Please input your email!' }]}

                                    >
                                        <Input type='email'
                                            placeholder='Enter your email'
                                            addonBefore={<i className="bi bi-envelope-at-fill"></i>} />
                                    </Form.Item>
                                    <Form.Item
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password
                                            placeholder='Enter your password'
                                            addonBefore={<i className="bi bi-key-fill"></i>} />
                                    </Form.Item>
                                </div>

                            </div>
                        </div>
                        <Button className="continue" htmlType='submit'>Login</Button>
                    </Form>
                    <div className="title-social">Or Continue With</div>
                    <div className="with-social">
                        <div className="">
                            <LoginSocialGoogle
                                client_id={"808454144983-4d1u8nknk399pufuf9t7j22960haom1e.apps.googleusercontent.com"}
                                scope="openid profile email"
                                discoveryDocs="claims_supported"
                                access_type="offline"
                                onResolve={({ provider, data }) => {
                                    onLoginSocial(data)
                                }}
                                onReject={(err) => {
                                    console.log(err);
                                }}
                            >
                                <GoogleLoginButton text='Google' />
                            </LoginSocialGoogle>
                        </div>
                    </div>
                </div>
            </AnimationPage>
        </div>
    )
};
export default Login;