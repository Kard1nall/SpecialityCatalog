import { Link } from "@umijs/max";
import request from "@/utils/request";
import { Button, Form, Input, Popconfirm, Select, Space, Table, Typography, message, } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import LayoutNoAuth from "@/layouts/LayoutNoAuth";
import { useModel } from "@/.umi/plugin-model";

const DocsPage = () => {

  const { initialState, setInitialState, refresh } = useModel("@@initialState");

  const loginHandler = (data: any) => {
    request('https://localhost:7127/auth/login', { method: 'POST', data }).then((result: any) => {
      if (result.status == 0) {
        localStorage.setItem('token', result.token);
        refresh();
      }
      else {
        message.error("Ошибка авторизации");

      }


    })
  };

  // const logoutHandler = (data: any) => {
  //   localStorage.removeItem('token');
  //   setInitialState({});
  // };

  return (
    <LayoutNoAuth>

<Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, paddingTop: '10px' }}
          initialValues={{ remember: true }}
          onFinish={loginHandler}
          autoComplete="off"
        >
          <Form.Item
            label="Логин"
            name="login"
            rules={[{ required: true, message: 'Введите ваш логин!' }]}
          >
            <Input allowClear placeholder="Введите логин" />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите ваш пароль!' }]}
          >
            <Input.Password allowClear placeholder="Введите пароль" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">Войти</Button>
          </Form.Item>

        </Form>

    </LayoutNoAuth>
  );
};

export default DocsPage;
function refresh() {
  throw new Error("Function not implemented.");
}

function setInitialState(arg0: {}) {
  throw new Error("Function not implemented.");
}

