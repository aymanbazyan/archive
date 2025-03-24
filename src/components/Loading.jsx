import { Spin } from "antd";

function Loading() {
  return (
    <div className="center-absolute">
      <Spin size="large"></Spin>
      {/* tip="جاري التحميل..." */}
    </div>
  );
}

export default Loading;
