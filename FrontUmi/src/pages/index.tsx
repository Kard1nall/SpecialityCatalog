import ModalComponent from '@/components/ModalComponent';
import LayoutAuth from '@/layouts/LayoutAuth';
import { Line, Pie } from '@ant-design/charts';
import { useModel } from '@umijs/max';
import { Button, Modal } from 'antd';
import React from 'react';


export default function HomePage() {

  const { initialState } = useModel("@@initialState");


  const modalCallback = () => {
    console.log("Modal callback")
  };


  const data = [
    {
      type: 'Бакалавриат',
      value: 86,
    },
    {
      type: 'Специалитет',
      value: 2,
    },
    {
      type: 'Магистратура',
      value: 10,
    },
    {
      type: 'Аспирантура',
      value: 2,
    },

  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Студенты',
      },
    },
  };
  
  


  return (
    <LayoutAuth>
      <h2>Welcome, {initialState?.name}! </h2>
      <p>

      
      </p>
      <div>
      <Pie {...config} />
      </div>
    </LayoutAuth>
  );
}
