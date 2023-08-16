import React, { useEffect, useState, useRef } from 'react';
import { Avatar, Popover } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { formatDateEn, formatDateVi } from '../../../../componentsCustom/customTime';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { noAvatar } from '../../../../../utils/constants';
const Buffer = require('buffer/').Buffer;
const CardComment = (props) => {
    const { t } = useTranslation();
    // const loading = useSelector(state => state.post.loading);
    const language = useSelector(state => state.app.language);

    const childItem = props.childItem;
    const index = props.index;
    const convertImage = (image) => {
        let base64String = ''
        if (image) {
            base64String = new Buffer(image, 'base64').toString('binary');
        }
        return base64String;
    }

    const onReply = (name, id) => {
        props.onReply(name, id)
    };
    return (
        <div key={index} className='mt-4 child-comment'>
            <div className='flex-heder'>
                <div className='avatar'>
                    <NavLink to={`/user/info/${childItem.userComment.id}`}>
                        <Avatar size='large' src={childItem.userComment.avatar && childItem.userComment.avatar.data.length > 0 ? convertImage(childItem.userComment.avatar) : noAvatar} />
                    </NavLink>
                </div>
                <div className='text'>
                    <div className='info'>
                        <div style={{ display: 'flex' }}>
                            <NavLink to={`/user/info/${childItem.userComment.id}`} className='nav-link'>
                                {language === 'vi' ? `${childItem.userComment.lastName} ${childItem.userComment.firstName}`
                                    : `${childItem.userComment.firstName} ${childItem.userComment.lastName}`}
                            </NavLink>
                            {childItem.userComment.role === 'R0' ?
                                <Popover content={t("admin")} placement='topLeft'>
                                    <i className="bi bi-patch-check-fill text-primary m-2"></i>
                                </Popover> : ''}
                        </div>

                        &nbsp;
                        <p className='time'>
                            &#x2022; {language === 'vi' ? formatDateVi(childItem.createdAt) : formatDateEn(childItem.createdAt)}
                        </p>
                    </div>
                    <div className='contents'>
                        <p>{childItem.content}</p>
                        <div style={{ width: '100%' }}>
                            <label
                                htmlFor='input'
                                onClick={() => onReply(`${childItem.userComment.lastName} ${childItem.userComment.firstName}`, childItem.parentComment)}
                                className='btn border-0 p-0'>Trả lời
                            </label>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CardComment