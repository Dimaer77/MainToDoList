import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValueType} from "./App";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type PropsTodoListType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    changeTodoListFilter: (filterValuer: FilterValueType) => void


}

function TodoList(props: PropsTodoListType) {
    let [title, setTitle] = useState<string>("")


    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id)
        return (<li>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>X</button>
            </li>

        )

    })

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onClickAddTask = () => {
        props.addTask(title)
        setTitle("")
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddTask()
        }
    }
    const onClickSetAllFilter =()=>{
        props.changeTodoListFilter("all")
    }
    const onClickSetActiveFilter =()=>{
        props.changeTodoListFilter("active")
    }
    const onClickSetCompletedFilter =()=>{
        props.changeTodoListFilter("completed")
    }
    return (

        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onClickAddTask}>+</button>
            </div>
            <ul>
                {tasksJSXElements}

            </ul>
            <div>
                <button onClick={onClickSetAllFilter}>All</button>
                <button onClick={onClickSetActiveFilter}>Active</button>
                <button onClick={onClickSetCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}


export default TodoList