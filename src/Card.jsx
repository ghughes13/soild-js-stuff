import ThumbsUpIcon from "./assets/ThumbsUpSVG";
import "./card.css";

const Card = (props) => {
  return (
    <button
      className="card-container"
      onClick={() => {
        console.log("click");
        props.selectCharacter(props.mal_id);
      }}
    >
      <div className="card-info">
        <h2>{props.characterName}</h2>
        <img src={props.imageUrl} alt={props.characterName} />
      </div>
      <div>
        <div class="thumbs-up-icon-container">
          <ThumbsUpIcon />
        </div>
      </div>
    </button>
  );
};

export default Card;
