import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import './AddItemForm.css';

type AddItemFormPropsType = {
    addItem: (title: string) => void;
    isTask: boolean;
};

export function AddItemForm(props: AddItemFormPropsType) {
    let [error, setError] = useState('');
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('');
        if (e.charCode === 13) {
            props.addItem(newTaskTitle);
            setNewTaskTitle('');
        }
    };

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };

    const addItem = () => {
        if (newTaskTitle.trim() === '') {
            setError('Title is required');
        } else {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        }
    };

    return (
        <div className="add-item-form-container">
            <TextField
                className="text-field"
                variant="outlined"
                label={props.isTask ? 'Type task name' : 'Type project name'}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addItem}>
                <Add />
            </IconButton>
        </div>
    );
}
