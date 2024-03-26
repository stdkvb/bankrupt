import { Typography, Stack } from "@mui/material";

import TextInput from "./TextInput";

const requisitesInputs = [
  { label: "Юридическое наименование", name: "companyName", defaultValue: "" },
  { label: "Юридический адрес", name: "companyAddress", defaultValue: "" },
  { label: "Почтовый адрес", name: "mailingAddress", defaultValue: "" },
  { label: "ИНН", name: "inn", defaultValue: "" },
  { label: "Расчетный счет", name: "r/s", defaultValue: "" },
  { label: "Корреспондентский счет", name: "k/s", defaultValue: "" },
  { label: "БИК", name: "bik", defaultValue: "" },
  { label: "ОГРНИП", name: "bik", defaultValue: "" },
  { label: "ОКВЭД", name: "okved", defaultValue: "" },
  { label: "ОКПО", name: "okpo", defaultValue: "" },
  { label: "ОКАТО", name: "okato", defaultValue: "" },
  { label: "ОКОГУ", name: "okogu", defaultValue: "" },
  { label: "ОКФС", name: "okfs", defaultValue: "" },
  { label: "ОКОПФ", name: "okopf", defaultValue: "" },
];

const Requisites = ({ readOnly }) => {
  return (
    <>
      <Typography variant="h5">Реквизиты</Typography>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "row",
          columnGap: [4],
          rowGap: [2],
          flexWrap: "wrap",
        }}
      >
        {requisitesInputs.map((input, i) => (
          <TextInput
            key={i}
            label={input.label}
            name={input.name}
            defaultValue={input.defaultValue}
            required={true}
            multiline={false}
            readOnly={readOnly}
          />
        ))}
      </Stack>
    </>
  );
};

export default Requisites;
