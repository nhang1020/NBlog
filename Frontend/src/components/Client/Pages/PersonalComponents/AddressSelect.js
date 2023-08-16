import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { EditOutlined } from '@ant-design/icons';
import { fetchProvinces, fetchDistricts, fetchWards } from '../../../../services/callApiProvinces'
import { Button, Input } from 'antd';
import { useTranslation } from 'react-i18next'
const AddressSelect = (props) => {

    const { t } = useTranslation();
    const [selectedOption] = useState(null);
    const [editAddressHide, setEditAddressHide] = useState(props.hidden);

    const [province, setProvince] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [ward, setWard] = useState([]);
    const [address, setAddress] = useState(props.address);
    const [prov, setProv] = useState('');
    const [distr, setDistr] = useState('');
    const [detail, seDetail] = useState('');

    const handleAddress = () => {
        setEditAddressHide(!editAddressHide);
        setAddress(props.address);
        fetchProvinces().then((res) => {
            if (res) {
                const newProvince = res.map((item, index) => ({
                    value: item.code,
                    label: item.name
                }))
                setProvince(newProvince);
            }
        });
    }
    const onChangeAddress = (e) => {
        seDetail(e.target.value);
    }
    const onChangeProvince = (e) => {
        setDistricts([]);
        setWard([]);
        setAddress(props.address);
        fetchDistricts(`p/${e.value}?depth=2`).then((res) => {
            const newDistricts = res.districts.map((item, index) => ({
                value: item.code,
                label: item.name
            }))
            setDistricts(newDistricts);
        });
        setProv(e.label);
    }
    const onChangeDistrict = (e) => {
        setAddress(props.address);
        fetchWards(`d/${e.value}?depth=2`).then((res) => {
            const newWards = res.wards.map((item, index) => ({
                value: item.code,
                label: item.name
            }))
            setWard(newWards);
        });
        setDistr(e.label);
    }
    const onChangeWard = (e) => {
        let wa = e.label;
        if (detail !== '') {
            setAddress(`${detail}, ${wa}, ${distr}, ${prov}`);
            props.getAddressChildren(`${detail}, ${wa}, ${distr}, ${prov}`);
        } else {
            setAddress(`${wa}, ${distr}, ${prov}`);
            props.getAddressChildren(`${wa}, ${distr}, ${prov}`);
        }

    }

    return (
        <>
            <p className=''>{t("address")}: <strong>{address}</strong>
                <Button
                    onClick={handleAddress}
                    className='border-0 edit-btn'
                    icon={<EditOutlined />}></Button>
            </p>
            <div className='form-group mb-4 edit-address' hidden={editAddressHide}>
                <div className='select'>
                    <div className='s1'>
                        <Input
                            onChange={onChangeAddress}
                            placeholder='số nhà, đường, khóm,...' className='address input control' />
                        <Select
                            placeholder={t("province")}
                            defaultValue={selectedOption}
                            onChange={onChangeProvince}
                            options={province}
                            className='address'
                        />

                    </div>
                    <div className='s2'>
                        <Select
                            placeholder={t("district")}
                            defaultValue={selectedOption}
                            options={districts}
                            onChange={onChangeDistrict}
                            className='address border-0'
                        />
                        <Select
                            placeholder={t("ward")}
                            defaultValue={selectedOption}
                            options={ward}
                            onChange={onChangeWard}
                            className='address'
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddressSelect