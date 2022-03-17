import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => (
  <div className="loader">
    <LoadingOutlined style={{fontSize: '50px', color: 'blue'}}/>
  </div>
);

export default Loader;