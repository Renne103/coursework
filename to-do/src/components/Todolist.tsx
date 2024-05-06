import { ChangeEvent } from 'react';
import { FilterValuesType } from '../pages/DashboardPage/DashboardPage';
import { AddItemForm } from './AddItemForm';
import { Checkbox, IconButton } from '@mui/material';
import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { EditableSpan } from './EditableSpan';
import './Todolist.css';

export type TaskType = {
    id: string; //long id
    title: string;
    // description: string;
    // deadline: string; //date
    // tag: string;
    // status: string
    isDone: boolean;
};

type PropsType = {
    id: string;
    title: string;
    tasks: TaskType[]; //Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (todolistId: string, value: FilterValuesType) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (
        taskId: string,
        isDone: boolean,
        todolistId: string,
    ) => void;
    changeTaskTitle: (
        taskId: string,
        newTitle: string,
        todolistId: string,
    ) => void;
    filter: FilterValuesType;
    removeTodolist: (todolistId: string) => void;
    changeTodolistTitle: (todolistId: string, newTitle: string) => void;
};

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => props.changeFilter(props.id, 'all');
    const onActiveClickHandler = () => props.changeFilter(props.id, 'active');
    const onCompletedClickHandler = () =>
        props.changeFilter(props.id, 'completed');
    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    };
    const addTask = (title: string) => {
        props.addTask(title, props.id);
    };

    return (
        <div className="todolist-container">
            <h3>
                <EditableSpan
                    title={props.title}
                    onChange={changeTodolistTitle}
                ></EditableSpan>
                <IconButton aria-label="delete" onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask} isTask={true}></AddItemForm>

            <ul>
                {props.tasks.map(t => {
                    const onChangeHandler = (
                        e: ChangeEvent<HTMLInputElement>,
                    ) => {
                        props.changeTaskStatus(
                            t.id,
                            e.currentTarget.checked,
                            props.id,
                        );
                    };

                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id);
                    };

                    const onChangeTitleHandler = (newValue: string) => {
                        props.changeTaskTitle(t.id, newValue, props.id);
                    };

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox
                                onChange={onChangeHandler}
                                checked={t.isDone}
                            />

                            <EditableSpan
                                title={t.title}
                                onChange={onChangeTitleHandler}
                            ></EditableSpan>

                            <IconButton
                                aria-label="delete"
                                onClick={onRemoveHandler}
                            >
                                <Delete />
                            </IconButton>
                        </li>
                    );
                })}
            </ul>
            <div>
                <Button
                    variant={props.filter === 'all' ? 'contained' : 'outlined'}
                    onClick={onAllClickHandler}
                    color="primary"
                >
                    All
                </Button>
                <Button
                    variant={
                        props.filter === 'active' ? 'contained' : 'outlined'
                    }
                    onClick={onActiveClickHandler}
                    color="primary"
                >
                    Active
                </Button>
                <Button
                    variant={
                        props.filter === 'completed' ? 'contained' : 'outlined'
                    }
                    onClick={onCompletedClickHandler}
                    color="primary"
                >
                    Completed
                </Button>
            </div>
        </div>
    );
}
