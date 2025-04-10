import { Spin } from "antd";

function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    >
      <Spin size="large"></Spin>
    </div>
  );
}

export default Loading;
