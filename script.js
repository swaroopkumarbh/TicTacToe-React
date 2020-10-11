import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./style.css";
import Restart from "./Components/Restart";


const App = () => {
    const [squares, setSquares] = useState(localStorage.getItem('squares') ? JSON.parse(localStorage.getItem('squares')) : Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const nextSymbol = isXNext ? "X" : "O";
    const winner = checkWinner(squares);
    const [message, setMessage] = useState('Next player: X');

    useEffect(() => {
        localStorage.setItem('squares', JSON.stringify(squares));
    }, [squares]);

    const getStatus = () => {
        if (winner) {
            return "Winner: " + winner;
        } else if (isBoardFull(squares)) {
            return "Draw!";
        } else {
            return "Next player: " + nextSymbol;
        }
    }

    function renderSquare(i) {
        return (
            <Square
                value={squares[i]}
                onClick={() => {
                    if (squares[i] != null || winner != null) {
                        return;
                    }
                    const nextSquares = squares.slice();
                    nextSquares[i] = nextSymbol;
                    setSquares(nextSquares);

                    setIsXNext(!isXNext);
                }}
            />
        );
    }

    const renderRestartButton = () => {
        return (
            <Restart
                onClick={() => {
                    setSquares(Array(9).fill(null));
                    setIsXNext(true);
                }}
            />
        );
    }

    return (
        <div className="container">
            <div className="game">
                <div className="game-board">
                    <div className="board-row">
                        {renderSquare(0)}
                        {renderSquare(1)}
                        {renderSquare(2)}
                    </div>
                    <div className="board-row">
                        {renderSquare(3)}
                        {renderSquare(4)}
                        {renderSquare(5)}
                    </div>
                    <div className="board-row">
                        {renderSquare(6)}
                        {renderSquare(7)}
                        {renderSquare(8)}
                    </div>
                </div>
                <div className="game-info">{getStatus()}</div>
                <div className="restart-button">{renderRestartButton()}</div>
            </div>
        </div>
    );
}

const Square = ({ value, onClick }) => {

    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}




ReactDOM.render(<App />, document.getElementById("root"));

function checkWinner(squares) {
    const possibleMoves = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < possibleMoves.length; i++) {
        const [a, b, c] = possibleMoves[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function isBoardFull(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] == null) {
            return false;
        }
    }
    return true;
}