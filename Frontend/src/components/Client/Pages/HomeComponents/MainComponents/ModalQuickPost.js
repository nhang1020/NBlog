import { Button, Input, Modal, Card, Avatar, Select, Col, Row, Upload, Popover, Radio, message } from 'antd';
import { SmileOutlined, StopOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { createPost, editPost } from '../../../../../redux/silceReducers/postSlice'
import { useDispatch, useSelector } from 'react-redux';
import { allCodeRemainingSelector, userInfoSelector } from '../../../../../redux/selector'
import { useTranslation } from 'react-i18next';
import { convertImage, icons, noAvatar } from '../../../../../utils/constants';
import imageCompression from 'browser-image-compression';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react';
import '../styles/ModalQuickPost.scss';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
const { TextArea } = Input;


const ModalQuickPost = (props) => {
    const [messageApi, contextHolder] = message.useMessage();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const user = useSelector(userInfoSelector);
    const allCodes = useSelector(allCodeRemainingSelector);
    const [contents, setContents] = useState('');
    const [privacy, setPrivacy] = useState('P0');
    const [theme, setTheme] = useState('none');
    const [fileList, setFileList] = useState([]);
    const [disableImage, setDisableImage] = useState(false);
    const language = useSelector(state => state.app.language);
    const showModal = () => {
        setOpen(true);
        setContents(props.content ? props.content : '');
        setPrivacy(props.privacy ? props.privacy : 'P0');
    };
    const handlePost = () => {
        setOpen(false);

        dispatch(createPost({
            userId: user.id,
            topic: 'T1',
            privacy: privacy,
            contents: contents,
            theme: theme,
            listImage: fileList
        })).then(res => { console.log(res); });


    };
    const hanldeEdit = () => {
        setOpen(false);
        dispatch(editPost({
            id: props.id,
            contents: contents,
            privacy: privacy,
        })).then((res) => {
            if (res.payload.errCode === 0) {
                messageApi.success(t("update-post-success"))
            } else {
                messageApi.error(res.payload.message);
            }
        });



    };
    const handleCancel = () => {
        setOpen(false);
    };
    const onChangeAllCode = (value) => {
        setPrivacy(value);
    }
    //Upload
    const handleOnchangeContent = (e) => {
        setContents(e.target.value)

    }

    const handleCancelViewImage = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChangeImage = (data) => {
        convertImagesToBase64(data.fileList)
            .then((base64Strings) => {
                setFileList(base64Strings) // Mảng chứa các chuỗi base64 của hình ảnh
            })
            .catch((error) => {
                console.error(error);
            });
    }
    const onChangeTheme = (e) => {
        let value = e.target.value
        setTheme(value);
        displayTheme(value);
        if (value === 'none') {
            setDisableImage(false);
        } else {
            setDisableImage(true);
        }

    }
    const displayTheme = (value) => {
        document.querySelector('.ck-content').classList.remove(theme);
        document.querySelector('.ck-content').classList.add(value);
    }
    // const [styleTheme, setStyleTheme] = useState()
    function convertImagesToBase64(images) {
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 300,
            useWebWorker: true,
        }
        const promises = images.map((image) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => {
                    resolve(reader.result);
                };

                reader.onerror = (error) => {
                    reject(error);
                };
                if (image.originFileObj && (image.originFileObj.size / 1024) >= options.maxWidthOrHeight) {
                    imageCompression(image.originFileObj, options).then(async (x) => {
                        reader.readAsDataURL(x);
                    })
                } else {
                    reader.readAsDataURL(image.originFileObj);
                }
            });
        });

        return Promise.all(promises);
    }
    let i = 0;
    const onEmojiSelect = (value) => {
        setContents(preValue => preValue + value.native)
    }
    const emoji = (
        <Picker data={data} onEmojiSelect={onEmojiSelect} />
    );
    return (
        <>
            {contextHolder}
            {!props.edit ?
                <Button className='rounded-pill border-0 shadow-1' size='large'
                    style={{ color: 'silver', width: '100%', textAlign: 'left' }}
                    onClick={showModal} >{`Hey ${user.firstName}! ${t("what-think")}`}
                </Button>
                :
                <Button className='border-0 d'
                    onClick={showModal} > <i className="bi bi-sliders"></i>{t("edit-post")}
                </Button>
            }
            <Modal
                // width={'100%'}
                className='modal-quick-post'
                style={{ marginLeft: '4%', minWidth: '42%' }}
                title={props.edit ? t("edit-post") : t("create-post")}
                centered
                open={open}
                onCancel={handleCancel}
                footer={[<Button className='border-0 shadow-1'
                    disabled={contents || fileList ? false : true}
                    key=''
                    onClick={props.edit ? hanldeEdit : handlePost}>{props.edit ? t("update") : t("create")}
                </Button>]
                }
            >
                <Card bordered={false} style={{ display: 'flex' }} >
                    <Row>
                        {user ?
                            <Col span={15}>
                                <Avatar size='large' src={user.avatar && user.avatar.data.length > 0 ? convertImage(user.avatar) : noAvatar} />
                                <strong className='m-2'>{language === 'vi' ? `${user.lastName} ${user.firstName}`
                                    : `${user.firstName} ${user.lastName}`}</strong>
                            </Col> : ''
                        }
                        <Col span={9}>
                            <Select style={{ minWidth: '80%', boxShadow: '1px 1px 4px #fdd', borderRadius: '5px' }}
                                bordered={false} value={privacy}
                                className=''
                                onChange={onChangeAllCode}
                            >
                                {allCodes && allCodes.length > 0 &&
                                    allCodes.map((item, index) => {
                                        return item.type === 'Privacy' ?
                                            <Select.Option value={item.keyMap} key={index} >
                                                {icons[i++]} {language === 'vi' ? item.valueVi : item.valueEn}
                                            </Select.Option>
                                            : ''
                                    })
                                }
                            </Select>
                        </Col>
                    </Row>
                </Card>

                <TextArea
                    onChange={handleOnchangeContent}
                    placeholder={t("what-think")}
                    className='mt-3 mb-5 content ck-content'
                    size='large'
                    bordered={false}
                    value={contents}
                    rows={7}
                    id='write-content'
                />

                <div className='content-more'>
                    <div className='theme'>
                        <Radio.Group
                            value={theme} buttonStyle="outline"
                            onChange={onChangeTheme}>
                            <Radio.Button className="custom-button" value="none">
                            </Radio.Button>
                            <Radio.Button className="custom-button-danger" value="danger">

                            </Radio.Button>
                            <Radio.Button className="custom-button-warning" value="warning">

                            </Radio.Button>
                            <Radio.Button className="custom-button-success" value="success">

                            </Radio.Button>
                            <Radio.Button className="custom-button-primary" value="primary">

                            </Radio.Button>
                            <Radio.Button className="custom-button-gradient" value="gradient">

                            </Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className='emoji'>
                        <Popover placement="bottomRight" content={emoji} >
                            <Button className='border-0'><SmileOutlined /></Button>
                        </Popover>
                    </div>
                </div>
                <hr />
                <Upload method='GET'
                    onPreview={handlePreview}
                    accept="image/png, image/jpeg, image/jpg"
                    maxCount={6} listType="picture-card"
                    multiple={true}
                    onChange={handleChangeImage}
                    disabled={disableImage}
                >
                    <div>
                        <div
                            style={{
                                marginTop: 8,
                            }}
                        >
                            <h3>+ <i className="bi bi-file-earmark-image"></i></h3>
                        </div>
                    </div>
                </Upload>

                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancelViewImage}>
                    <img
                        alt="example"
                        style={{
                            width: '100%',
                        }}
                        src={previewImage}
                    />
                </Modal>
            </Modal >
        </>
    );
};
export default ModalQuickPost;