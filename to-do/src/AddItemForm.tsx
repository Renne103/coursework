import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Button } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
  let [error, setError] = useState("");
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError("");
    if (e.charCode === 13) {
      props.addItem(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const addItem = () => {
    if (newTaskTitle.trim() === "") {
      setError("Title is required");
    }
    props.addItem(newTaskTitle.trim());
    setNewTaskTitle("");
  };

  return (
    <div>
      <input
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <Button
        onClick={addItem}
        variant={"contained"}
        color={"primary"}
        sx={{
          borderRadius: "8xp",
          bgcolor: deepPurple[500],
          "&:hover": { bgcolor: deepPurple[300] },
        }}
      >
        +
      </Button>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
