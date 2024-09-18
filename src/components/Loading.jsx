import { Spin } from "antd";

function Loading() {
  return (
    <div className="center-absolute">
      <Spin tip="جاري التحميل..." size="large"></Spin>
    </div>
  );
}

export default Loading;
