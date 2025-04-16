import { Spin } from "antd";

function Loading() {
  return (
    <html>
      <body>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        >
          <Spin size="large"></Spin>
        </div>
      </body>
    </html>
  );
}

export default Loading;
