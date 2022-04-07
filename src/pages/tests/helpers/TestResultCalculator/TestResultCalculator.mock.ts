import { ResultInfoDto } from "../../TestPage.api";

export const generateFailResultInfos = (numberOfResultInfos: number): ResultInfoDto[] => {
  return Array.from({ length: numberOfResultInfos }, (_, i) => {
    const orderNumber = i + 1;
    return {
      title: `Title - Fail ${orderNumber}`,
      description: `Description - Fail ${orderNumber}`,
    };
  });
};

export const successResultInfo: ResultInfoDto = {
  title: `Title - Success`,
  description: `Description - Success`,
};
