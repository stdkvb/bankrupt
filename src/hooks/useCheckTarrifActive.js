import { useContext } from "react";
import { UserContext } from "../utils/UserContext";
import dayjs from "dayjs";

const useCheckTarrifActive = () => {
  // работает без учета часовых поясов, исправить
  const { currentTarif } = useContext(UserContext).user;

  if (currentTarif && currentTarif.endDateTimeStamp) {
    // console.log(dayjs(currentTarif.endDateTimeStamp * 1000).$d);
    return dayjs().isBefore(dayjs(currentTarif.endDateTimeStamp * 1000));
  }

  return false;
};

export default useCheckTarrifActive;
