import React, { useState, useEffect } from "react";


export const SimpleCounter = () => {
  const [counter, setCounter] = useState(0);
  const [isRunning, setIsRunning] = useState(false)
  const [textStart, setTextStart] = useState('Start');
  const [title, setTitle] = useState('Clock')
  const [icon, setIcon] = useState("far fa-clock")
  const [intervalId, setIntervalId] = useState(null);
  const [showTheForce, setShowTheForce] = useState(false);
  const [timeToTarget, setTimeToTarget] = useState(false);
  const [message, setMessage] = useState("");
  const [counterClass, setCounterClass] = useState("");

    useEffect(() => {
        console.log("Counter class changed:", counterClass);
        if (counter >= 1) {
            setTimeToTarget(true);
            setMessage("Time To Target");
            
            setCounterClass("text-light fs-4");
          }
        if (counter >= 1000) {
          setTimeToTarget(true);
          setMessage("2000 mts. To Target!!");
          
          setCounterClass("text-info fs-3");
        }
        if (counter >= 2000) {
          setMessage("1000 mts TO TARGET!!!!!!");
        
          setCounterClass("text-warning fs-2");
        }
        if (counter >= 3000) {
          setMessage("🤦🏻‍♂️ you missed it Luke! you SUCK!!!!");
        
          setCounterClass("text-danger fs-1");
        }
      }, [counter]);

 
  const handleStart = () => {
    if (!isRunning) {
    setIsRunning(true);
    setTextStart('Stop');
   setTitle("Chronometer")
   setMessage("Time To Target");
    /* setCounterClass("text-info"); */
    setIcon("fas fa-stopwatch");
    const newInterval = setInterval(() => {
      setCounter((counter) => { return counter + 1 });
    }, 10);
    setIntervalId(newInterval);
    setShowTheForce(false); 
  } else {
    clearInterval(intervalId);
    setIsRunning(false);
    setTextStart('Start');
    setShowTheForce(true);
    setTitle("Clock")
  }
}

  const handleReset = () => {
    setCounter(0); 
    clearInterval(intervalId); 
    setIsRunning(false); 
    setTextStart('Start');
    setShowTheForce(false);
    setTitle("Clock")
    setMessage("");
    setCounterClass("text-light fs-5")

  };
 

  return (
    <div className="container">
         {showTheForce && (
        <div className="the-force">
            <h1 className="text-info">USE THE FORCE LUKE!</h1>
          <img src="https://www.independent.com/wp-content/uploads/2022/06/Obi-Wan.jpeg?w=1200" alt="The Force" />
        </div>
      )}
     <h1 className={`${counterClass}`}>{message ? message : "Target"}</h1>
      <h2 className={"text-primary"}>{title}</h2>
      <div className="big-counter">
        <div><i className={icon}></i></div>
        <div>{Math.floor(counter / 100000000 % 10)}</div>
        <div>{Math.floor(counter / 10000000 % 10)}</div>
        <div>{Math.floor(counter / 1000000 % 10)}</div>
        <div>{Math.floor(counter / 100000 % 10)}</div>
        <div>{Math.floor(counter / 10000 % 10)}</div>
        <div>{Math.floor(counter / 1000 % 10)}</div>
        <div>{Math.floor(counter / 100 % 10)}</div>
        <div>{','}</div>
        <div>{Math.floor(counter / 10 % 10)}</div>
        <div>{Math.floor(counter % 10)}</div>
        <div className="btn-group-vertical" role="group" aria-label="Vertical button group">

          <button onClick={handleStart} type="button" className="btn btn-outline-success">
            {textStart}
          </button>
          <button onClick={handleReset} type="button" className="btn btn-outline-danger">
            Reset
          </button>
    
        </div>
      </div>
    </div>
  )
}