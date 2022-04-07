import { Box, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { InputTaskDto } from "../../TestPage.api";

interface InputTaskProps {
  task: InputTaskDto;
  onChange: (task: InputTaskDto, answer: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = (props) => {
  const { task, onChange } = props;
  const { question, correctAnswer, id } = task;
  return (
    <Box>
      <FormControl>
        <FormLabel htmlFor={id}>{question}</FormLabel>
        <Input
          id={id}
          type="text"
          onChange={(e) => onChange(task, e.target.value)}
        />
      </FormControl>
    </Box>
  );
};
