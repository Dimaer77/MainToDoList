import React from "react";
import {FilterValueType} from "./App";


export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type PropsTodoListType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (taskID: number) => void
    changeTodoListFilter: (filterValuer: FilterValueType) => void

}

function TodoList(props: PropsTodoListType) {

    const tasksJSXElements = props.tasks.map(task => {
            const removeTask = () => props.removeTask(task.id)
            return (<li>
                    <input type="checkbox" checked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTask}>X</button>
                </li>

            )

        }
    )

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSXElements}

            </ul>
            <div>
                <button onClick={()=> props.changeTodoListFilter("all")}>All</button>
                <button onClick={()=> props.changeTodoListFilter("active")}>Active</button>
                <button onClick={()=> props.changeTodoListFilter("completed")}>Completed</button>
            </div>
        </div>
    )
}


export default TodoList