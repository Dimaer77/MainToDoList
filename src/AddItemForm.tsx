import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props:AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        setError(false)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }
    const onClickAddItem = () => {

        const validatedTitle = title.trim()
        if (validatedTitle) {
            props.addItem(validatedTitle)
            setTitle("")

        } else {
            setError(true)
        }

    }
    const errorMessage = error
        ? <div style={{color: "red"}}>Title is required</div>
        : null
    return (
        <div>
            <input
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}
                className={error ? "error" : ""}
            />
            <button onClick={onClickAddItem}>+</button>

            {errorMessage}

        </div>
    )
}