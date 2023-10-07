function ResultBoard({ score, gameLose, resetGame }) {
  return (
    <>
      <div className="result-board">
        {score === 10 && (
          <div className="result">
            <div className="result1">Congratulations!</div>
            <div className="result2">YOU WIN</div>
            <div className="result3">Achieved Best Score of 10</div>
            <button className="replay-btn" onClick={resetGame}>
              Replay
            </button>
          </div>
        )}

        {gameLose && (
          <div className="result">
            <div className="result1">Whoops!</div>
            <div className="result2">YOU LOSE</div>
            <div className="result3">Try again...</div>
            <button className="replay-btn" onClick={resetGame}>
              Retry
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ResultBoard;
