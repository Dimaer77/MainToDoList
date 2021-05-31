import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsTodoListType = {
    todoListID: string
    title: string
    tasks: Array<TasksType>
    filter: FilterValueType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTodoListFilter: (filterValuer: FilterValueType, todoListID: string) => void
    removeTodoList:(todoListID:string)=> void


}

function TodoList(props: PropsTodoListType) {
    const {title: taskTitle, tasks, filter, removeTask, addTask, changeTodoListFilter} = props;


    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.todoListID)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatus}/>
                <span>{task.title}</span>

                <button onClick={removeTask}>X</button>
            </li>

        )

    })

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(false)
    }


    const onClickAddTask = () => {

        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addTask(validatedTitle, props.todoListID)
            setTitle("")

        } else {
            setError(true)
        }

    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }
    }


    const onClickSetAllFilter = () => {
        props.changeTodoListFilter("all", props.todoListID)
    }
    const onClickSetActiveFilter = () => {
        props.changeTodoListFilter("active", props.todoListID)
    }
    const onClickSetCompletedFilter = () => {
        props.changeTodoListFilter("completed", props.todoListID)
    }
    const allBtnClass = props.filter === "all" ? "active-filter" : "";
    const activeBtnClass = props.filter === "active" ? "active-filter" : "";
    const completedBtnClass = props.filter === "completed" ? "active-filter" : "";
    const errorMessage = error ? <div style={{color: "red"}}>Title is required</div> : null
    return (

        <div>
            <h3>{props.title} <button onClick={()=>props.removeTodoList(props.todoListID)}>X</button></h3>
            <div>
                <input
                    className={error ? "error" : ""}
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
                {errorMessage}

            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button className={allBtnClass} onClick={onClickSetAllFilter}>All
                </button>
                <button className={activeBtnClass}
                        onClick={onClickSetActiveFilter}>Active
                </button>
                <button className={completedBtnClass}
                        onClick={onClickSetCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}


export default TodoList