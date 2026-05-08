import { useState } from "react";

function StudentRow(props) {
  const student = props.student;
  const [editScore, setEditScore] = useState(student.score);

  // Decide pass or fail
  let status = "Fail";
  if (student.score >= 40) {
    status = "Pass";
  }

  const isPass = student.score >= 40;

  function handleSave() {
    props.updateScore(student.id, editScore);
  }

  return (
    <tr className={isPass ? "pass" : "fail"}>
      {/* Student Name */}
      <td>
        <span className="student-name">{student.name}</span>
      </td>

      {/* Score Display */}
      <td>
        <span className="score-display">{student.score}</span>
      </td>

      {/* Pass / Fail Status */}
      <td>
        <span className={`badge ${isPass ? "badge-pass" : "badge-fail"}`}>
          {status}
        </span>
      </td>

      {/* Update Score */}
      <td>
        <div className="update-cell">
          <input
            type="number"
            value={editScore}
            min="0"
            max="100"
            onChange={function (e) {
              setEditScore(e.target.value);
            }}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      </td>
    </tr>
  );
}

export default StudentRow;

