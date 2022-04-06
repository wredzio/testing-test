import axios from "axios";

interface CheckboxTask {
  _type: "Checkbox";
  numberOdCheckbox: number;
}

interface InputTask {
  _type: "Input";
  question: string;
}

type TaskDto = CheckboxTask | InputTask;

export interface TestDto {
  id: string;
  tasks: TaskDto[];
}

export const getTest = async (id: string): Promise<TestDto> => {
  const response = await axios.get<TestDto>(`/api/test/${id}`);
  return response.data;
};
