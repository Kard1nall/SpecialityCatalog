import './index.less';
import { Link, Navigate, Outlet } from 'umi';
import { Breadcrumb, Button, Form, Input, Layout, Menu, message, theme } from 'antd';
import { useAccess } from '@umijs/max';
import { Access } from '@umijs/max';
import request from '@/utils/request';
import { useModel } from '@umijs/max';


const { Header, Content, Footer } = Layout;

export default (props: any) => {
  const { initialState, setInitialState, refresh } = useModel("@@initialState");
  const access = useAccess();




  return (

    <>
      <Access accessible={access.isUser}>
          <Navigate to="/docs" />
      </Access>
      <Access accessible={!access.isUser}>
        <Layout className="layout" style={{height:'100vh'}}>
          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              items={[
                {
                  label: <Link to="/">Home</Link>,
                  key: 'home',
                },
                {
                  label: <Link to="/register">Register</Link>,
                  key: 'register',
                },
               
              ]}
            />
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content" style={{ background: '#f5f5f5', paddingTop: '10px' }}>

              {props.children}

            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}> ©2023 </Footer>
        </Layout>

      </Access>

      <Access
        accessible={!access.isUser}>
        <Layout className="layout">
          <Header>
            <div className="logo" />
          </Header>

        </Layout>
       
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content" style={{ paddingTop: '10px' }}>

          </div>
        </Content>
      </Access>
    </>
  );
};





























{/* <Form onFinish={loginHandler} layout="inline" style={{ marginBottom: '10px' }}>
          <Form.Item name="login" style={{ width: '230px' }}>
            <Input allowClear placeholder="Введите логин" />
          </Form.Item>

          <Form.Item name="password" style={{ width: '230px' }}>
            <Input.Password allowClear placeholder="Введите пароль" />
          </Form.Item>

          <Button type="primary" htmlType="submit">Войти</Button>

        </Form> */}