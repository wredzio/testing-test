import React from 'react';
import { InputTaskDto } from '../../TestPage.api';

interface InputTaskProps {
  task: InputTaskDto;
  onChange: (task: InputTaskDto, answer: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = (props) => {
  const { task, onChange } = props
  const { question, correctAnswer, id } = task;
  return (
    <div className="InputTask">
      <label htmlFor={id}>{question}</label>
      <input id={id} type="text" onChange={e => onChange(task, e.target.value)} />
    </div>
  )
}
