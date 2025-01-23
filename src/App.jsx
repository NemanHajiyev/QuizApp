import { useEffect, useState, } from 'react';
import { useNavigate } from "react-router"
import './App.css';

function App() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const Total_Questions = 11;

  const startQuiz = () => {
    if (value) {
      navigate(`/quiz/${value}/${Total_Questions}`)
    }
  }
  return (
    <div className='general'>

      <img
        src="https://l24.im/c6YuDU" className='img' />

      <h1>Select <span style={{ color: "red" }}>Difficulty</span> Level</h1>

      <select id="select" onChange={(e) => setValue(e.target.value)} >

        <option disabled selected hidden >Select Difficulty ...</option>
        <option value="easy">Easy 😄</option>
        <option value="medium">Medium 🤔</option>
        <option value="hard">Hard 🔥</option>
      </select>
      <button className='start-btn' onClick={startQuiz}>Start Quiz</button>
    </div >
  );
}

export default App;
