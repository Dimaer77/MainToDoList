import React, {ChangeEvent} from "react";
import "./App.css"
import {FilterValueType, TasksType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";


type PropsTodoListType = {
    todoListID: string
    title: string
    tasks: Array<TasksType>
    filter: FilterValueType
    addTask: (title: string, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTodoListFilter: (filterValuer: FilterValueType, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void


}

function TodoList(props: PropsTodoListType) {


    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.todoListID)
        const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListID)
        }
        const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todoListID)

        return (

            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={onChangeTaskStatus}
                />
                <EditableSpan title={task.title}
                              changeTitle={changeTaskTitle}
                />
                <button onClick={removeTask}>X</button>
            </li>

        )

    })
    const addTask = (title: string) => props.addTask(title, props.todoListID)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListID)
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

    return (

        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={() => props.removeTodoList(props.todoListID)}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<div>*/}
            {/*    <input*/}
            {/*        className={  error ? "error" : ""}*/}
            {/*        value={title}*/}
            {/*        onChange={onChangeTitle}*/}
            {/*        onKeyPress={onKeyPressAddTask}*/}
            {/*    />*/}
            {/*    <button onClick={onClickAddTask}>+</button>*/}

            {/*    {errorMessage}*/}
            {/*   */}
            {/*</div>*/}
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button className={allBtnClass} onClick={onClickSetAllFilter}>All</button>
                <button className={activeBtnClass} onClick={onClickSetActiveFilter}>Active</button>
                <button className={completedBtnClass} onClick={onClickSetCompletedFilter}>Completed</button>
            </div>
        </div>
    )
}


export default TodoList