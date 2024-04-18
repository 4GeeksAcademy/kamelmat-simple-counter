import React, { useState, useEffect } from "react";


export const SimpleCounterBonus = () => {
	const [counter, setCounter] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
    const [status, setStatus] = useState({icon: "fas fa-clock", 
                                          title: "Clock", 
                                          titleStyle:"text-center text-success"});
	const [countUp, setCountUp] = useState(true);

    const handleStart = () => {
        setIsRunning(!isRunning);
        if (countUp) {
            setStatus({icon: "fas fa-stopwatch", 
                       title:"Chronometer", 
                       titleStyle:"text-center text-primary"});
        } else {
            setStatus({icon: "fas fa-history", 
                       title:"Timer", 
                       titleStyle:"text-center text-danger"});
        }
    };

	const handleReset = () => {
		setCounter(0);
		setIsRunning(false);
        setStatus({icon:"fas fa-clock", 
                   title:"Clock", 
                   titleStyle:"text-center text-success"});
        setCountUp(true);
	};

    const handleTimer = (event) => {
        if (event.target.value !== null && 
            event.target.value >= 0 && 
            event.target.value.length > 0 && 
            !isNaN(event.target.value)) 
        {
            setCounter(parseInt(event.target.value));
            setStatus({icon: "fas fa-history", 
                       title:"Timer", 
                       titleStyle:"text-center text-danger"});
            setCountUp(false);
        } else {
            setCounter(0);
            event.target.value = "";
        }
    }

	useEffect(() => {
		if (isRunning) {
			const newInterval = setInterval(() => {
				if (countUp) {
					setCounter(counter => counter + 1);
				} else {
                    if (countUp === false && counter >= 0) {
                        if (counter === 0) {
                            setCounter(0);
                            setIsRunning(false);
                        } else {
                            setCounter(counter => counter - 1);
                        }
    				}
                }
			}, 10);

			return () => clearInterval(newInterval);
		}
	}, [isRunning, counter, countUp]);


    return ( 
        <div className="container">
            <h1 className="mt-5">Simple Counter</h1>
            <h2 className={status.titleStyle}>{status.title}</h2>
            <div className="big-counter">
                <div><i className={status.icon}/></div>
                <div>{Math.floor(counter / 100000000) % 10}</div>
                <div>{Math.floor(counter / 10000000) % 10}</div>
                <div>{Math.floor(counter / 1000000) % 10}</div>
                <div>{Math.floor(counter / 100000) % 10}</div>
                <div>{Math.floor(counter / 10000) % 10}</div>
                <div>{Math.floor(counter / 1000) % 10}</div>
                <div>{Math.floor(counter / 100) % 10}</div>
                <div>{','}</div>
                <div>{Math.floor(counter / 10) % 10}</div>
                <div>{Math.floor(counter) % 10}</div>
                <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
                    <button type="button" onClick={handleStart} className="btn btn-outline-success">
                        {isRunning ? 'Pause' : counter == 0 ? 'Start' : 'Continue'}
                    </button>
                    <button type="button" onClick={handleReset} className="btn btn-outline-danger">
                        Reset
                    </button>
                </div>
            </div>
            <div className="container bg-dark">
                <div className="input-group my-3 p-3">
                    <span className="input-group-text bg-warning">Set Timer</span>
                    <input type="text" onChange={(event) => handleTimer(event)} aria-label="First name" className="form-control" placeholder="Set the timer in tenths of a second"/>
                </div>
            </div>
        </div>
    );
};
