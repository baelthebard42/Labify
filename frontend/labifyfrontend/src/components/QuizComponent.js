import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
export default function Quiz({type}) {


  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [time, setTime] = useState(180); 



  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if ( type==='instructor') {
    return(
        <Navigate to ="/"/>
    )
    
}
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  const questions = [
  
        {
          "query": "Which of the following teams has not won the ICC Cricket World Cup?",
          "choices": ["Australia", "India", "England", "South Africa"],
          "answer": 3,
          "explanation": "South Africa has not won the ICC Cricket World Cup. Australia has won it 5 times, India has won it 2 times, and England won it for the first time in 2019."
        },
        {
          "query": "What is the highest individual score by a batsman in Test cricket?",
          "choices": ["400", "375", "365", "300"],
          "answer": 0,
          "explanation": "The highest individual score by a batsman in Test cricket is 400 runs. This record is held by Brian Lara of the West Indies."
        },
        {
          "query": "Which country has won the most number of ICC Champions Trophies?",
          "choices": ["India", "Australia", "Pakistan", "South Africa"],
          "answer": 1,
          "explanation": "Australia has won the most number of ICC Champions Trophies. They have won it 3 times, while India and Pakistan have won it 2 times each, and South Africa has never won it."
        },
        {
          "query": "Who has scored the most runs in One Day International (ODI) cricket?",
          "choices": ["Sachin Tendulkar", "Virat Kohli", "Ricky Ponting", "Kumar Sangakkara"],
          "answer": 0,
          "explanation": "Sachin Tendulkar from India has scored the most runs in One Day International (ODI) cricket. He scored a total of 18,426 runs in his ODI career, which is the highest by any batsman."
        },
        {
          "query": "What is the duration of a T20 International cricket match?",
          "choices": ["3 hours", "4 hours", "5 hours", "6 hours"],
          "answer": 0,
          "explanation": "The duration of a T20 International cricket match is approximately 3 hours. Each team gets to play 20 overs, and the match is usually completed within this time frame."
        }
   
  ];

  const calculateTotalMarks = () => {
    let totalMarks = 0;
    questions.forEach((question, index) => {
      if (question.answer === userAnswers[index]) {
        totalMarks += 1;
      }
    });
    return totalMarks;
  };

  const handleAnswerSelect = (selectedAnswerIndex) => {
    setUserAnswers([...userAnswers, selectedAnswerIndex]);
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };


  return (
    <div>
      {showResults ? (
        <div style={{marginLeft:'15px'}}>
          <h4>Quiz Results</h4>
          <h6>
            Total Marks: {calculateTotalMarks()} out of {questions.length}
         
          <br/>
            {calculateTotalMarks() > 3
  ? <span style={{color:'green'}}>You have earned eligibility for today's lab.</span>
  : <span style={{color:'red'}}>You did not meet the minimum criteria for today's lab. Better luck next time!</span>}

       </h6>
          {questions.map((question, index) => (
        <p key={index}>
          Explanation for Question {index + 1}: <br /> {question.explanation}
        </p>
      ))}

     
        </div>
      ) : (
        <div style={{padding:'20px', marginLeft:'10px'}}>
           <p>Time Remaining: {formatTime(time)}</p>
          <h2 >Question {currentQuestionIndex + 1}</h2>
          <p style={{marginLeft:'20px'}}>{questions[currentQuestionIndex].query}</p>
          <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 15px' }}>
            {questions[currentQuestionIndex].choices.map((choice, index) => (
              <div
                key={index}
                style={{
                  border: '1px solid #ddd',
                  padding: '8px',
                  margin: '5px 0',
                  cursor: 'pointer',
                }}
                onClick={() => handleAnswerSelect(index)}
              >
                {choice}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}