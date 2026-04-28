import StudentRow from "./StudentRow";

function StudentTable(props) {
  const students = props.students;
  const total = students.length;
  const passed = students.filter((s) => s.score >= 50).length;
  const avg = total ? Math.round(students.reduce((sum, s) => sum + s.score, 0) / total) : 0;

  return (
    <>
      <div className="stats-strip">
        <div className="stat-cell">
          <div className="stat-label">Total</div>
          <div className="stat-value">{total}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">Passed</div>
          <div className="stat-value">{passed}</div>
        </div>
        <div className="stat-cell">
          <div className="stat-label">Avg Score</div>
          <div className="stat-value">{avg}</div>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-header-bar">
          <span className="table-header-label">Student Records</span>
          <span className="table-header-count">{total} entries</span>
        </div>

        {total === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">—</div>
            <div className="empty-state-text">No students registered yet</div>
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Score</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>

            <tbody>
              {students.map(function (student) {
                return (
                  <StudentRow
                    key={student.id}
                    student={student}
                    updateScore={props.updateScore}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      <div className="footer">ACADEMIC TERMINAL · SECURE SESSION</div>
    </>
  );
}

export default StudentTable;

