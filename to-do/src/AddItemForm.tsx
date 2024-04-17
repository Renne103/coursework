import { ChangeEvent, KeyboardEvent, useState } from "react";

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

  const addTask = () => {
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
      <button onClick={addTask}>+</button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
