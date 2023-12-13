import React from "react";

function ProjectCard({ card }) {
  return (
    <div className="projectCard">
      <img src={card.img} alt="" />
      <div className="info">
        <img src={card.pp} alt="" />
        <div className="texts">
          <h2>{card.cat}</h2>
          <span className="text-vw">{card.username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
