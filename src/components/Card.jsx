function Card({ character, handleChoice }) {
  const handleClick = () => {
    handleChoice(character);
  };

  return (
    <>
      <div className="card" onClick={handleClick}>
        <img
          className="card-img"
          src={character.src}
          alt={character.name}
        ></img>

        <div className="card-name">
          <div>{character.name}</div>
        </div>
      </div>
    </>
  );
}

export default Card;
