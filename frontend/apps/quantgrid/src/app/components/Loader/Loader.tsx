import { Spin } from 'antd';
import { useContext } from 'react';

import { AppContext } from '../../context';

export function Loader() {
  const { loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="absolute top-0 left-0 w-screen h-screen bg-gray-100/[.9] z-50 flex items-center justify-center">
        <Spin className="z-50" size="large"></Spin>
      </div>
    );
  }

  return null;
}
