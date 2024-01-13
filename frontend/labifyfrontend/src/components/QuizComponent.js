import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
export default function Quiz({type}) {

  const location=useLocation();
  const questions=location.state.questions
  


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