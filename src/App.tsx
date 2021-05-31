import React, {useState} from 'react';
import './App.css';
import TodoList, {TasksType} from "./TodoList";
import {v1} from "uuid";
import {strict} from "assert";


type TodoListType = {
    id: string,
    title: string
    filter: FilterValueType

}
type TasksStateType = {
    [key: string]: Array<TasksType>
}
export type FilterValueType = "all" | "active" | "completed";

export function App() {
//BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()


    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: false},],
        [todoListID_2]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: false},
        ]
    })
    // const [filter, setFilter] = useState<FilterValueType>("all")
    // const [tasks, setTasks] = useState<Array<TasksType>>([
    //     {id: v1(), title: "CSS", isDone: true},
    //     {id: v1(), title: "HTML", isDone: true},
    //     {id: v1(), title: "JS", isDone: false},
    // ])


    function changeTodoListFilter(filter: FilterValueType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))


    }

    function removeTask(taskId: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskId)
        setTasks({...tasks})
        // return   tasks = filteredTask
    }


    function addTask(title: string, todoListID: string) {

        const newTask: TasksType = {
            id: v1(),
            title,
            isDone: false
        }
        const copyTasks = {...tasks, [todoListID]: [newTask, ...tasks[todoListID]]}
        // copyTasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks(copyTasks)

    }

    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(copyTasks)
    }
    function removeTodoList (todoListID:string){
        setTodoLists(todoLists.filter(tl=> tl.id !== todoListID))
        const copyTasks = {...tasks}
        delete copyTasks[todoListID]
        setTasks(copyTasks)
            }
    //UI
    function getFilterTasks(t: TodoListType) {
        const copyTasks = {...tasks}
        switch (t.filter) {
            case "active":
                return tasks[t.id].filter(t => t.isDone === false);
            case "completed":
                return tasks[t.id].filter(t => t.isDone === true);
            default:
                return tasks[t.id]
        }
    }


    const todoListComponents = todoLists.map(tl => {
        const tasksForTodoList = getFilterTasks(tl)
        return (
            <TodoList
                key={tl.id}
                todoListID={tl.id}
                title={tl.title}
                filter={tl.filter}
                tasks={tasksForTodoList}
                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeTodoListFilter={changeTodoListFilter}
                changeTaskStatus={changeTaskStatus}
            />
        )
    })
    return (
        <div className="App">
            {todoListComponents}
        </div>
    );
}


