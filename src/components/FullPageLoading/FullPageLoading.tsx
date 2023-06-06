import { Spin } from 'antd';

const FullPageLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Spin size="large" />
    </div>
  );
};

export default FullPageLoading;
