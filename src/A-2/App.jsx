import { useState } from "react";
import Header from "./components/Header";
import StudentTable from "./components/StudentTable";
import AddStudentForm from "./components/AddStudentForm";

function App() {
  const [students, setStudents] = useState([
    { id: 1, name: "Aman", score: 78 },
    { id: 2, name: "Riya", score: 45 },
    { id: 3, name: "Karan", score: 90 },
    { id: 4, name: "Neha", score: 32 }
  ]);

  function addStudent(name, score) {
    setStudents([...students, { id: Date.now(), name, score: Number(score) }]);
  }

  function updateScore(id, newScore) {
    setStudents(students.map((s) =>
      s.id === id ? { ...s, score: Number(newScore) } : s
    ));
  }

  return (
    <div className="container">
      <Header />
      <AddStudentForm addStudent={addStudent} />
      <StudentTable students={students} updateScore={updateScore} />
    </div>
  );
}

export default App;

