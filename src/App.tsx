import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from "./TodoList";
import {v1} from "uuid";

export type FilterValueType = "all" | "active" | "completed";

export function App() {

    const [filter, setFilter] = useState<FilterValueType>("all")
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "JS", isDone: false},
    ])

//BLL
    function changeTodoListFilter(filterValue: FilterValueType) {
        setFilter(filterValue)

    }

    function removeTask(taskId: string) {
        const filteredTask = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTask)
        // return   tasks = filteredTask
    }

    function addTask(title: string) {

        const newTask: TasksType = {
            id: v1(),
            title,
            isDone: false
        }
        const newTasks = [newTask, ...tasks]
        return setTasks(newTasks)
        //setTasks([{id: v1(), title,isDone: false}, ...tasks])
    }

    //UI
    function getFilterTasks() {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false);
            case "completed":
                return tasks.filter(t => t.isDone === true);
            default:
                return tasks
        }
    }


    return (
        <div className="App">
            <TodoList title={"What to learn"}
                      tasks={getFilterTasks()}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}

            />

        </div>
    );
}


