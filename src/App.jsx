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
    const newStudent = {
      id: Date.now(),
      name: name,
      score: Number(score)
    };

    setStudents([...students, newStudent]);
  }

  function updateScore(id, newScore) {
    const updated = students.map(function (student) {
      if (student.id === id) {
        return { ...student, score: Number(newScore) };
      } else {
        return student;
      }
    });

    setStudents(updated);
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

