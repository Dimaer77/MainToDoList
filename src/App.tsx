import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from "./TodoList";

export type FilterValueType = "all" | "active" | "completed";

export function App() {

    const [filter, setFilter] = useState<FilterValueType>("all")
    const [tasks, setTasks] = useState<Array<TasksType>>([
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "HTML", isDone: true},
        {id: 3, title: "JS", isDone: false},
    ])


    function changeTodoListFilter (filterValue:FilterValueType){
        setFilter(filterValue)

    }
    function removeTask(taskId: number) {
        const filteredTask = tasks.filter(t => t.id !== taskId)
        setTasks(filteredTask)
        // return   tasks = filteredTask
    }
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
                      removeTask={removeTask}
                      changeTodoListFilter={changeTodoListFilter}
            />

        </div>
    );
}


