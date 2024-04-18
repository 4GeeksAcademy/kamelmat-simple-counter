import React from "react";

import PropTypes from "prop-types";
import { SimpleCounter } from "./SimpleCounter";
import { SimpleCounterBonus } from "./SimpleCounterBonus";
//include images into your bundle

const Home = () => {
/*     const counterRef = useRef(0); */
    console.log("Hello World");
    return (
        <div className="SimpleCounter text-center d-flex p-5">
        
         <SimpleCounter /> 
         {/*   <SimpleCounterBonus /> */}

    
        </div>
    );
};

export default Home;