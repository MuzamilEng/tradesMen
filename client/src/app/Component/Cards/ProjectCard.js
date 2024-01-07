import React from "react";

function ProjectCard({ image, username, occupation }) {
  return (
    <div className="projectCard m-vw">
      <img src={image ? image : '/img/man.png'}  alt="" />
      <div className="info">
        <img src={image ? image : '/img/man.png'} alt="" />
        <div className="texts">
          <h2>{occupation}</h2>
          <span className="text-vw">{username}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
