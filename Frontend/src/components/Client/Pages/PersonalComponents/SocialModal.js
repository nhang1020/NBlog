import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Input, message } from 'antd';
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { editUser, followUser } from '../../../../redux/silceReducers/userSlice';
import { UserAddOutlined, LoadingOutlined } from '@ant-design/icons';
const App = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { t } = useTranslation();
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const relationships = props.relationships;
    const [user, setUser] = useState(props.user);
    const isLoading = useSelector(state => state.user.loading);
    useEffect(() => {
        setUser(props.user)
    }, [props.user])
    const showModal = () => {
        form.setFieldsValue({ facebook: user.facebook, youtube: user.youtube, twitter: user.twitter })
        setIsModalOpen(true);
    };
    const handleOk = (userInput) => {
        userInput.id = user.id;
        setIsModalOpen(false);
        dispatch(editUser(userInput)).then((res) => {
            if (res.payload.errCode === 0) {
                messageApi.open({
                    type: 'success',
                    content: 'Lưu thông tin cá nhân thành công!',
                });
            } else {
                messageApi.open({
                    type: 'success',
                    content: res.payload.message,
                });
            }
        })
    };
    const hanldeFollow = (receiverId) => {
        dispatch(followUser({
            performerId: props.id,
            receiverId
        }))
    }
    return (
        <>
            {contextHolder}
            {props.id == user.id ?
                <Button className='border-0' onClick={showModal}><i className="bi bi-pen-fill"></i></Button> :
                <>
                    {relationships && relationships.some(relate => relate.performerId == props.id && relate.receiverId == user.id) === true ?
                        <Button onClick={() => hanldeFollow(user.id)} className='btn-follow border-0 btn followed'>
                            {isLoading ? <LoadingOutlined /> : <i className="bi bi-person-check-fill"></i>}
                        </Button>
                        :
                        <Button onClick={() => hanldeFollow(user.id)} className='btn-follow border-0 btn'>
                            {isLoading ? <LoadingOutlined /> : <i className="bi bi-person-plus-fill"></i>}
                        </Button>
                    }
                </>
            }
            <Modal title={t("another-social")} open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
            >
                <Form onFinish={handleOk} name="wrap" labelAlign="left" form={form}
                    labelCol={{
                        flex: '110px',
                    }}>

                    <Form.Item label="Facebook link" name="facebook">
                        <Input addonAfter={<i className="bi bi-facebook text-primary"></i>} />
                    </Form.Item>

                    <Form.Item label="Youtube link" name="youtube" >
                        <Input addonAfter={<i className="bi bi-youtube text-danger"></i>} />
                    </Form.Item>

                    <Form.Item label="Twitter link" name="twitter" >
                        <Input addonAfter={<i className="bi bi-twitter text-info"></i>} />
                    </Form.Item>

                    <Form.Item label="" >
                        <Button htmlType="submit" className='btn-custom'>
                            {t("save")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};
export default App;