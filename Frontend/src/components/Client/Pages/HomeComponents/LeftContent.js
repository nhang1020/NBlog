import React, { useState } from 'react'
import './styles/LeftContent.scss';
import moment from 'moment';
import { useSelector } from 'react-redux';
const LeftContent = () => {
    const [time, setTime] = useState(new Date())
    const language = useSelector(state => state.app.language);
    const month = moment().month(time.getMonth());

    setTimeout(() => {
        setTime(new Date())
    }, time.getSeconds * 1000)

    return (
        <>
            <section className="container-clock">
                <div className="time-cus">
                    <h1 className="hour">{`${time.getHours()}:${time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()}`}</h1>
                </div>
                <div className="days">
                    <ul>
                        <li className="month">{language === 'vi' ? `Tháng ${time.getMonth() + 1}` : month.format("MMMM")}</li>
                        <li className="day">{time.getDate()}</li>
                    </ul>
                </div>
            </section>
        </>
    )
}

export default LeftContent