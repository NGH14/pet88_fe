import { Card as AntdCard } from 'antd';
import React from 'react';

export const Card = () => (
  <>
    <AntdCard
      
      title="Default size card"
      extra={<a href="#">More</a>}
      style={{
        width: 300,
      }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </AntdCard>
    <AntdCard
      size="small"
      title="Small size card"
      extra={<a href="#">More</a>}
      style={{
        width: 300,
      }}
    >
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </AntdCard>
  </>
);

