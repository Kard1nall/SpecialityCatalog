import { Button, Form, Input, Modal, Select } from "antd";
import React from "react";

export default (props: any) => {



    return (
        <>
            <Form.Item name="name" label="Название группы">
                <Input placeholder="Введите название группы"/>
            </Form.Item>
            <Form.Item name="type" label="Тип" >
                <Select placeholder="Выберите тип группы"
                    options={[
                        { value: 1, label: 'Бакалавриат' },
                        { value: 2, label: 'Магистратура' },
                        { value: 3, label: 'Аспирантура' },
                        { value: 4, label: 'Специалитет' },
                    ]} />




            </Form.Item>
        </>
    );
};
