import React, { useEffect } from 'react'
import LeftContent from './HomeComponents/LeftContent'
import RightContent from './HomeComponents/RightContent'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCode } from '../../../redux/silceReducers/adminReducers'
import './styles/HomePage.scss'
import ModalQuickPost from './HomeComponents/MainComponents/ModalQuickPost';
import { Badge, Card, Spin, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import MainContent from './HomeComponents/MainContent'
import FollowingTab from '../Childcomponents/FollowingTab'

const Home = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const allCodes = useSelector(state => state.admin.allCodes);
  const loading = useSelector(state => state.post.postLoading);
  useEffect(() => {
    document.title = `NBlog · ${t("home")}`;
    if (allCodes && !allCodes.length) {
      dispatch(getAllCode());
    }
  }, [dispatch]);
  const itemPosts = [
    {
      key: 'all',
      label: <span className='label-tab'>{t("all")}</span>,
      children: <MainContent />,
    },
    {
      key: 'following',
      label: <span className='label-tab'>{t("following")}</span>,
      children: <FollowingTab />,
    },
  ]

  return (
    <div style={{ display: 'flex' }}>
      <div className='left-content'>
        <LeftContent />
      </div>
      <div className='mid-content mt-3'>

        <Badge.Ribbon style={{ marginRight: '1rem' }} text={t("create-quick-post")} color="cyan" >
          <Card title={t("create-post")} className='m-3 card-custom'>
            <ModalQuickPost />
          </Card>
        </Badge.Ribbon>
        {loading ? <Spin style={{ width: '100%' }} /> : null}
        <Tabs defaultActiveKey="1" items={itemPosts} />

      </div>
      <div className='right-content'>
        <RightContent />
      </div>
    </div>
  )
}

export default Home