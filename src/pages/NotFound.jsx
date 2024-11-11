import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>حدث خطأ ما</h1>
      <Link to="/">القائمة الرئيسية</Link>
    </div>
  );
};

export default NotFound;
