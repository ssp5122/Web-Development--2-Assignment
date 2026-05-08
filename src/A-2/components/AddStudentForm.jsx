import { useState } from "react";

function AddStudentForm(props) {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (name === "" || score === "") return;

    props.addStudent(name, score);

    setName("");
    setScore("");
  }

  return (
    <div className="form-wrapper">
      <div className="form-header">
        <span className="form-header-dot"></span>
        <span className="form-header-label">Register Student</span>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student name"
          value={name}
          onChange={function (e) {
            setName(e.target.value);
          }}
        />

        <input
          type="number"
          placeholder="Score (0–100)"
          value={score}
          min="0"
          max="100"
          onChange={function (e) {
            setScore(e.target.value);
          }}
        />

        <button type="submit">
          <span>+ Add</span>
        </button>
      </form>
    </div>
  );
}

export default AddStudentForm;

