import { useContext, useState } from "react";
import { Typography, Grid } from "@mui/material";

import AutocompleteDadata from "./Autocomplete";
import TextInput from "./TextInput";

import { UserContext } from "../utils/context";

const Requisites = ({ readOnly }) => {
  //current user
  const user = useContext(UserContext).user.personal;

  const defaultRequisitesInputs = [
    {
      label: "Юридическое наименование",
      name: "companyName",
      defaultValue: `${user.companyName}`,
      dadata: true,
    },
    { label: "ИНН", name: "inn", defaultValue: `${user.inn}`, dadata: true },
    {
      label: "Юридический адрес",
      name: "companyAddress",
      defaultValue: `${user.companyAddress}`,
    },
    {
      label: "Почтовый адрес",
      name: "mailingAddress",
      defaultValue: `${user.mailingAddress}`,
    },
    { label: "Расчетный счет", name: "rs", defaultValue: `${user.rs}` },
    { label: "Корреспондентский счет", name: "ks", defaultValue: `${user.ks}` },
    { label: "БИК", name: "bik", defaultValue: `${user.bik}` },
    { label: "ОГРНИП", name: "ogrnip", defaultValue: `${user.ogrnip}` },
    { label: "ОКВЭД", name: "okved", defaultValue: `${user.okved}` },
    { label: "ОКПО", name: "okpo", defaultValue: `${user.okpo}` },
    { label: "ОКАТО", name: "okato", defaultValue: `${user.okato}` },
    { label: "ОКОГУ", name: "okogu", defaultValue: `${user.okogu}` },
    { label: "ОКФС", name: "okfs", defaultValue: `${user.okfs}` },
    { label: "ОКОПФ", name: "okopf", defaultValue: `${user.okopf}` },
  ];

  const [requisitesInputs, setRequisitesInputs] = useState(
    defaultRequisitesInputs
  );

  //fill data from dadata
  const handleDadata = (data) => {
    const filledRequisitesInputs = requisitesInputs.map((input) => {
      const name = input.name;
      if (data.data.hasOwnProperty(name)) {
        return { ...input, defaultValue: data.data[name] };
      }
      if (input.name == "companyName") {
        return { ...input, defaultValue: data.value };
      }
      if (input.name == "companyAddress") {
        return { ...input, defaultValue: data.data.address.value };
      }
      return input;
    });

    setRequisitesInputs([...filledRequisitesInputs]);
  };

  return (
    <>
      <Typography variant="h5">Реквизиты</Typography>
      <Grid container rowGap={2} columnGap={4}>
        {requisitesInputs.map((input, i) => {
          if (input.dadata == true) {
            return (
              <Grid item xs={12} md={12} lg={5} xl={3}>
                <AutocompleteDadata
                  key={i}
                  label={input.label}
                  name={input.name}
                  required={true}
                  readOnly={readOnly}
                  defaultValue={input.defaultValue}
                  handleDadata={handleDadata}
                />
              </Grid>
            );
          } else {
            return (
              <Grid item xs={12} md={12} lg={5} xl={3}>
                <TextInput
                  key={i}
                  label={input.label}
                  name={input.name}
                  defaultValue={input.defaultValue}
                  required={true}
                  multiline={true}
                  readOnly={readOnly}
                />
              </Grid>
            );
          }
        })}
      </Grid>
    </>
  );
};

export default Requisites;
