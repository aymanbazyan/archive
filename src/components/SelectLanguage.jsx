import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { saveToLocal } from "../helpers/helpers";

function SelectLanguage() {
  const [t, i] = useTranslation("global");

  const handleChange = (value) => {
    i.changeLanguage(value);
    saveToLocal("lang", value);
    window.location.reload();
  };

  return (
    <Select
      defaultValue={i.language}
      title={t("header.changeLang")}
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: "en",
          label: "English",
        },
        {
          value: "ar",
          label: "Arabic",
        },
      ]}
    />
  );
}

export default SelectLanguage;
