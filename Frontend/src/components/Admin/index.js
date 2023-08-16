import React from 'react'
import { NavLink, Outlet } from 'react-router-dom';
import './styles/index.scss';
import Animation from '../componentsCustom/AnimationPage'
const index = () => {
    return (
        <div className='contain-admin'>
            <div className='menu'>
                <NavLink className="nav-link rounded-pill" to="/admin/">Trang chủ</NavLink>
                <NavLink className="nav-link rounded-pill" to="/admin/users-manage">Quản lý người dùng</NavLink>
                <NavLink className="nav-link rounded-pill" to="/admin/posts-manage">Quản lý bài đăng</NavLink>

            </div>
            <div className='content'>
                <Animation>
                    <Outlet></Outlet>
                </Animation>
            </div>


        </div>
    )
}

export default index