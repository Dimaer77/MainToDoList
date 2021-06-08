import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string,
    title: string,
    filter: FilterValueType

}
type TasksStateType = {
    [key: string]: Array<TasksType>
}
export type FilterValueType = "all" | "active" | "completed";

export function App() {

    //BLL
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoListID_1]: [
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Eggs", isDone: true},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Beef", isDone: false},
        ]
    })


    function removeTask(taskID: string, todoListID: string) {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
        // return   tasks = filteredTask
    }
    function addTask(title: string, todoListID: string) {
        const newTask: TasksType = {
            id: v1(),
            title,
            isDone: false
        }
        let copyTasks = {...tasks}
        copyTasks[todoListID].push(newTask)
        // copyTasks[todoListID]= [newTask, ...tasks[todoListID]]
        // const newTasks = [newTask, ...tasks[todoListID]]
        return setTasks(copyTasks)
        //setTasks([{id: v1(), title,isDone: false}, ...tasks])
    }
    function changeTaskStatus(taskID: string, isDone: boolean, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        setTasks(copyTasks)
    }
    function changeTaskTitle(taskID: string, title:string, todoListID: string) {
        const copyTasks = {...tasks}
        copyTasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        setTasks(copyTasks)
    }
    function changeTodoListFilter(filter: FilterValueType, todoListID: string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, filter: filter} : tl))
    }
    function changeTodoListTitle(title:string, todoListID:string) {
        setTodoLists(todoLists.map(tl => tl.id === todoListID ? {...tl, title:title} : tl))
    }
    function removeTodoList (todoListID: string){
         setTodoLists(todoLists.filter(tl=> tl.id !== todoListID))
        const copyTasks = {...tasks}
        delete copyTasks[todoListID]
        setTasks(copyTasks)
    }
    function addTodoList (title:string) {
        const newTodoListID = v1()
        const newTodoList :TodoListType ={
            id:newTodoListID,
            title:title,
            filter:"all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]:[]})
    }

    //UI
    function getFilterTasks(tl: TodoListType,) {
        switch (tl.filter) {
            case "active":
                return tasks[tl.id].filter(t => t.isDone === false);
            case "completed":
                return tasks[tl.id].filter(t => t.isDone === true);
            default:
                return tasks[tl.id]
        }
    }

    const todoListComponents = todoLists.map(tl => {
        return (<TodoList
                key={tl.id}
                todoListID={tl.id}
                title={tl.title}
                tasks={getFilterTasks(tl)}
                filter={tl.filter}
                addTask={addTask}
                removeTask={removeTask}
                removeTodoList={removeTodoList}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
                changeTodoListFilter={changeTodoListFilter}
                changeTodoListTitle={changeTodoListTitle}

            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoListComponents}
        </div>
    );
}