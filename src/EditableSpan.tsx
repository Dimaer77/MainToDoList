import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState<boolean>(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }
    const onKeyPressOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            offEditMode()
        }
    }
    return (
        editMode
            ? <TextField
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={onChangeTitle}
                onKeyPress={onKeyPressOffEditMode}
                label={"title"}


            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>


    )
}