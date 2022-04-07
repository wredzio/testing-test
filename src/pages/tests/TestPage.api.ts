import axios from "axios";

interface BaseTask {
  id: string;
  title: string;
  description?: string;
}

export interface CheckboxTaskDto extends BaseTask {
  _type: "Checkbox";
  numberOfCheckbox: number;
}

export interface InputTaskDto extends BaseTask {
  _type: "Input";
  question: string;
  correctAnswer: string;
}

export type TaskDto = InputTaskDto;

export interface TestDto {
  id: string;
  tasks: TaskDto[];
}

export const getTest = async (id: string): Promise<TestDto> => {
  const response = await axios.get<TestDto>(`/api/test/${id}`);
  return response.data;
};
