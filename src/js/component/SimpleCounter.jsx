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
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [reachedThirtySeconds, setReachedThirtySeconds] = useState(false);

  useEffect(() => {
    console.log("Counter class changed:", counterClass);
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setMilliseconds(prevMilliseconds => (prevMilliseconds + 1) % 100);
        if (milliseconds === 99) {
          setSeconds(prevSeconds => (prevSeconds + 1) % 60);
          if (seconds === 59) {
            setMinutes(prevMinutes => (prevMinutes + 1) % 60);
          }
          if (hours === 24) {
            setHours(prevHours => (prevHours + 1) % 24);
          }
        }
        if (milliseconds >= 1) {
          setTimeToTarget(true);
          setMessage("Time To Target");
          setCounterClass("text-light fs-4");
        }
        if (seconds >= 10) {
          setTimeToTarget(true);
          setMessage("2000 mts. To Target!!");
          setCounterClass("text-info fs-3");
        }
        if (seconds >= 20) {
          setMessage("1000 mts TO TARGET!!!!!!");
          setCounterClass("text-warning fs-2");
        }
        if (seconds >= 30) {
          setMessage("🤦🏻‍♂️ you missed it Luke! you SUCK!!!!");
          setCounterClass("text-danger fs-1");
          setReachedThirtySeconds(true);
        }

      }, 10);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, milliseconds, seconds, minutes, hours]);

  const formatTime = value => {
    return value < 10 ? `0${value}` : value.toString(); // Formatea el tiempo para que tenga dos dígitos
  };
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      setTextStart('Stop');
      setTitle("Chronometer")
      setMessage("Time To Target");
      setIcon("fas fa-stopwatch");
      setReachedThirtySeconds(false);
      const newInterval = setInterval(() => {
        setCounter(prevCounter => prevCounter + 1);
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
    setIcon("far fa-clock")
    clearInterval(intervalId);
    setMilliseconds(0);
    setSeconds(0);
    setMinutes(0);
    setHours(0);

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
        <div>{formatTime(hours)}</div>
        <div>{formatTime(minutes)}</div>
        <div>{formatTime(seconds)}</div>
        <div>{formatTime(milliseconds)}</div>
        <div className="btn-group-vertical" role="group" aria-label="Vertical button group">

          <button onClick={handleStart} type="button" className="btn btn-outline-success">
            {isRunning ? 'Pause' : counter === 0 ? 'Start' : 'Continue' }
          </button>
          <button onClick={handleReset} type="button" className="btn btn-outline-danger">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}