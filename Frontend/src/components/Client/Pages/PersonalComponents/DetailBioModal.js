import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Modal, DatePicker, Select, message } from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '../styles/DetailBioModal.scss'
import AddressSelect from './AddressSelect';
import { getAllCode } from '../../../../redux/silceReducers/adminReducers'
import { useDispatch, useSelector } from 'react-redux';
import { allCodeRemainingSelector, userInfoSelector } from '../../../../redux/selector'
import { editUser } from '../../../../redux/silceReducers/userSlice';
import moment from 'moment';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import ViewDetail from './ViewDetail';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const App = (props) => {
    const { t } = useTranslation();
    const language = useSelector(state => state.app.language);
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState('');
    const user = props.user;
    const userLogin = useSelector(userInfoSelector);
    const [address, setAddress] = useState('');
    const [size, setSize] = useState('60%');
    const [hidden, setHidden] = useState(true);

    const allcodes = useSelector(allCodeRemainingSelector);
    const [listGenders, setListGenders] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [birth, setBirth] = useState('');
    const [profile, setProfile] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const showModal = () => {
        setIsModalOpen(true);
        setData(user.profile)
        setHidden(true);
        setAddress(user.address);
        setPhoneNumber(user.phoneNumber);
        setGender(user.gender);
        setLastName(user.lastName);
        setFirstName(user.firstName);
        if (user.birth) {
            let timeVal = moment(user.birth).toDate();
            setBirth(timeVal.toISOString().slice(0, 10).replace('T', ' '));
        }
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const containerRef = useRef(null);

    useEffect(() => {
        dispatch(getAllCode());
        //Resize
        const handleResize = () => {
            if (window.innerWidth < 1000) {
                setSize('100%')
            } else {
                setSize('60%')
            }
        };
        const resizeObserver = new ResizeObserver(handleResize);
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        return () => {
            resizeObserver.disconnect();
        };
    }, [dispatch]);
    useEffect(() => {
        setListGenders(allcodes)
    }, [allcodes]);

    const handleSaveBio = () => {
        dispatch(editUser({
            id: userLogin.id,
            phoneNumber: phoneNumber,
            gender: gender,
            firstName: firstName,
            lastName: lastName,
            birth: birth,
            address: address
        })).then(() => {
            messageApi.open({
                type: 'success',
                content: 'Lưu thông tin cá nhân thành công!',
            });
        })
    }
    const onChangeBirth = (value) => {
        if (value && new Date().getFullYear() - value.$d.getFullYear() > 14) {
            setBirth(moment(value.$d).format("YYYY-MM-DD"));
        } else {
            messageApi.error("Bạn phải đủ từ 14 tuổi trở lên.")
        }
    }
    const onChangeGender = (value) => {
        setGender(value);
    }
    const onChangePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }
    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }
    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }

    const saveBio = () => {
        dispatch(editUser({
            id: userLogin.id,
            profile: profile
        })).then((res) => {
            if (res.payload.errCode === 0) {
                messageApi.open({
                    type: 'success',
                    content: 'Lưu thông tin cá nhân thành công!',
                });
            }
        })
    }

    const getAddressChildren = (value) => {
        setAddress(value);
    }
    const footer = [
        <Button key={1} onClick={handleCancel} className='btn-custom btn border-0'>{t("cancel")}</Button>,
        <Button key={2} onClick={saveBio} className='btn-custom btn border-0 save'>{t("save-bio")}</Button>,
    ]
    return (
        <div ref={containerRef}>
            {contextHolder}
            <Button className='info-detail shadow-1' onClick={(showModal)}>{t("view-info-detail")}</Button>
            <Modal width={size} title={t("info-detail")} open={isModalOpen} onCancel={handleCancel}
                footer={userLogin.id === user.id ? footer : null}
            >
                {userLogin.id === user.id ?
                    <div>
                        <AddressSelect
                            getAddressChildren={getAddressChildren}
                            hidden={hidden} address={address} />
                        <div className='form'>
                            <div className='contain1'>
                                <div className='name'>
                                    <Input className='control-name'
                                        onChange={onChangeFirstName}
                                        value={firstName}
                                        placeholder={t("first-name")}
                                        addonBefore={firstName ? t("first-name") : null}
                                    />
                                    <Input className='control-name'
                                        onChange={onChangeLastName}
                                        value={lastName}
                                        addonBefore={lastName ? t("last-name") : null}
                                        placeholder={t("last-name")} />
                                </div>
                                <Input className='control2 border-0'
                                    addonBefore={'(+84)'}
                                    onChange={onChangePhoneNumber}
                                    type='number'
                                    value={phoneNumber} placeholder={t("phone-number")} />
                            </div>
                            <div className='contain2'>
                                <DatePicker value={dayjs(birth !== '' ? birth : '2023-01-01', language === 'vi' ? 'YYYY/MM/DD' : 'YYYY/DD/MM')}
                                    className='control' onChange={onChangeBirth} placeholder='Ngày sinh'
                                    format={dateFormatList} />
                                <Select placeholder={t("gender")}
                                    value={gender}
                                    className='control2'
                                    onChange={onChangeGender}
                                >
                                    {listGenders && listGenders.length > 0 &&
                                        listGenders.map((item, index) => {
                                            return item.type === 'Gender' ?
                                                <Select.Option key={index} value={item.keyMap} >
                                                    {language === 'vi' ? item.valueVi : item.valueEn}
                                                </Select.Option> : ''
                                        })
                                    }
                                </Select>
                            </div>
                        </div>

                        <Button className='mb-5 mt-3 btn-custom btn border-0' style={{ width: '100%' }} htmlType="submit" onClick={handleSaveBio}>
                            {t("save-info")}
                        </Button>

                        <CKEditor
                            editor={ClassicEditor}
                            data={data}
                            onChange={(event, editor) => {
                                setProfile(editor.getData());
                            }}
                        />
                    </div>
                    : <ViewDetail user={user} />
                }<div>

                </div>
            </Modal>

        </div>
    );
};
export default App;