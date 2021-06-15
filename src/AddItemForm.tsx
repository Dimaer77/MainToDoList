import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox, Delete} from "@material-ui/icons";


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
            <TextField
                variant={"outlined"}
                size={"small"}
                value={title}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressAddItem}


                helperText={error ? "Title is required" : ""}
                error={error}
                label={"Title"}
            />

            <IconButton color={"primary"} onClick={onClickAddItem}>
                <AddBox/>
            </IconButton>


            {/*{errorMessage}*/}

        </div>
    )
}