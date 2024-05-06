import { useState } from 'react';
import { TaskType, Todolist } from '../../components/Todolist.tsx';
import { v1 } from 'uuid';
import '../../App.css';
import { AddItemForm } from '../../components/AddItemForm.tsx';
import '../../components/Todolist.css';

export type FilterValuesType = 'all' | 'completed' | 'active';
export type TodolistType = {
    id: string;
    title: string;
    filter: FilterValuesType;
};

type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export const DashboardPage = () => {
    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasks({ ...tasksObj });
    }

    function addTask(title: string, todolistId: string) {
        let task = { id: v1(), title: title, isDone: false };
        let tasks = tasksObj[todolistId];
        let newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;
        setTasks({ ...tasksObj });
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        }
    }

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasks({ ...tasksObj });
        }
    }

    function changeTaskTitle(
        taskId: string,
        newTitle: string,
        todolistId: string,
    ) {
        // достанем нужный массив по todolistId
        let tasks = tasksObj[todolistId];
        // находим нужный task
        let task = tasks.find(t => t.id === taskId);
        // изменяем task, если он нашёлся
        if (task) {
            task.title = newTitle;
            // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
            setTasks({ ...tasksObj });
        }
    }
    function changeTodolistTitle(todolistId: string, newTitle: string) {
        const todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.title = newTitle;
            setTodolists([...todolists]);
        }
    }

    function addTodolist(title: string) {
        let todolist: TodolistType = {
            id: v1(),
            filter: 'all',
            title: title,
        };
        setTodolists([todolist, ...todolists]);
        setTasks({ ...tasksObj, [todolist.id]: [] });
    }

    let todolistId1 = v1(); // sssd2-2323ss-23d2-22d2d
    let todolistId2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        { id: todolistId1, title: 'What to learn', filter: 'all' },
        { id: todolistId2, title: 'What to buy', filter: 'all' },
    ]);

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            { id: v1(), title: 'CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'React', isDone: true },
            { id: v1(), title: 'Redux', isDone: false },
        ],
        [todolistId2]: [
            { id: v1(), title: 'Milk', isDone: true },
            { id: v1(), title: 'Egg', isDone: true },
        ],
    });

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolist);
        delete tasksObj[todolistId];
        setTasks({ ...tasksObj });
    };
    return (
        <div className="App background">
            <AddItemForm addItem={addTodolist} isTask={false} />
            {todolists.map(tl => {
                let tasksForTodolist = tasksObj[tl.id];

                if (tl.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(
                        t => t.isDone === false,
                    );
                }
                if (tl.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(
                        t => t.isDone === true,
                    );
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                        filter={tl.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                );
            })}
        </div>
    );
};
