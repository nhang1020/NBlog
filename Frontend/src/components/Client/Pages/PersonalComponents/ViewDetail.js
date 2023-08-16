import { DashOutlined, PhoneOutlined } from '@ant-design/icons';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux';

const ViewDetail = (props) => {
    const user = props.user;
    const { t } = useTranslation();
    const language = useSelector(state => state.app.language);
    return (
        <div>
            <p><span className='m-2'><DashOutlined /></span>
                {language === 'vi' ? `${user.lastName} ${user.firstName} ` :
                    `${user.firstName} ${user.lastName} `}
                <span className='m-2'>{user.gender === 'M' && (<i className="bi bi-gender-male"></i>)}</span>
                <span className='m-2'>{user.gender === 'F' && (<i className="bi bi-gender-female"></i>)}</span>
            </p>
            <p><span className='m-2'><i className="bi bi-envelope-at"></i></span>
                {user.email}
            </p>

            {user.phoneNumber ? <p>
                <span className='m-2'><i className="bi bi-telephone"></i></span>
                {user.phoneNumber}
            </p>
                : null
            }
            {user.address ? <p>
                <span className='m-2'><i className="bi bi-geo-alt"></i></span>
                {user.address}
            </p> : null}
            {user.profile ?
                <>
                    <b>{t("description")}</b>
                    <div dangerouslySetInnerHTML={{ __html: user.profile }}></div>
                </> : null
            }
        </div>
    )
}

export default ViewDetail