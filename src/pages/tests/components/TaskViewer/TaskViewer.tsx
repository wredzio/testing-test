import React from 'react';
import { assertUnreachable } from '../../../../helpers/assertUnreachable';
import { InputTask } from '../../tasks/inputTask/InputTask';
import { TaskDto } from '../../TestPage.api';

interface TaskViewerProps {
  task: TaskDto;
  onChange: (task: TaskDto, answer: string) => void;
}

export const TaskViewer: React.FC<TaskViewerProps> = (props) => {
  const { task, onChange } = props
  const { title, description, _type } = task;

  const renderTask = () => {
    switch(_type) {
      case "Input":
       return <InputTask task={task} onChange={onChange} />
      // case "Checkbox":
      //   return <>Checkbox task not implemented</>
      default:
        assertUnreachable(_type);
    }
  }

  return (
    <div className='TaskViewer'>
      <h2>{title}</h2>
      <p>{description}</p>
      {renderTask()}
    </div>
  )
}
