import React from "react";


const Restart = ({ onClick }) => {

    return (
        <button className="restart" onClick={onClick}>
            Reset
        </button>
    );
}

export default Restart;