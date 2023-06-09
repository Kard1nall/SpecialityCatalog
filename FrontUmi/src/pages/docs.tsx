import { Link } from "@umijs/max";
import request from "@/utils/request";
import { Button, Form, Input, Popconfirm, Select, Space, Table, Tag, Typography, } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { DeleteFilled, EditFilled, SearchOutlined } from "@ant-design/icons";
import LayoutAuth from "@/layouts/LayoutAuth";

const DocsPage = () => {

  const [dataSource, setDataSource] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getGroups = (data: any) => {
    setLoading(true);
    request('https://localhost:7127/Group/Index', { method: 'POST', data }).then(result => {
      console.log(result);
      setDataSource(result);
      setLoading(false);
    });
  }

  React.useEffect(() => getGroups({}), []);

  const searchGroupHandler = (data: any) => {
    console.log(data);
    getGroups(data);
  }

  const removeHandler = (id: number) => {

    request(`https://localhost:7127/Group/${id}`, { method: 'DELETE' }).then(result => {
      console.log(result);
      const newDataSource = dataSource.filter((value, index) => value.id != id);
      console.log(newDataSource);
      setDataSource(newDataSource);
    });

  }


  const columns: ColumnsType<never> = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Название',
      dataIndex: 'name',
    },
    {
      title: 'Тип',
      dataIndex: 'type',
      render: (_, record, index) => {
        if (record.type === 1) {
          return (<>Бакалавриат</>);
        }
        if (record.type === 2) {
          return (<>Магистратура</>);
        }
        if (record.type === 3) {
          return (<>Аспирантура</>);
        }
        if (record.type === 4) {
          return (<>Специалитет</>);
        }
  
        
      },
    },
    {
      title: 'Действия',
      key: 'action',
      render: (value, record, index) =>
        <>
          <Link to={`/edit/${record.id}`}><EditFilled /></Link>{' / '}
          <a onClick={() => removeHandler(record.id)}><DeleteFilled /></a>
        </>

    }
  ];


  return (
    <LayoutAuth>
      <Space direction="vertical" style={{ marginBottom: '10px' }}>
        <Link to="/create">
          <Button type="primary">Новая группа</Button>
        </Link>
      </Space>

      <Form onFinish={searchGroupHandler} layout="inline" style={{ marginBottom: '10px' }}>
        <Form.Item name="name" style = {{width: '230px'}}>
          <Input allowClear placeholder="Введите название группы" />
        </Form.Item>
        <Form.Item name="type">
          <Select allowClear style = {{width: '200px'}} placeholder="Выберите тип группы"
            options={[
              { value: 1, label: 'Баклавриат' },
              { value: 2, label: 'Магистратура' },
              { value: 3, label: 'Аспирантура' },
              { value: 4, label: 'Специалитет' },
            ]} />
        </Form.Item>
        <Button icon={<SearchOutlined/>} type="primary" htmlType="submit">Искать</Button>

      </Form>

      <Table dataSource={dataSource} columns={columns} loading={loading} />
    </LayoutAuth>
  );
};

export default DocsPage;
