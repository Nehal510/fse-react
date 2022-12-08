import React from "react";

const TuitStats = ({tuit, likeTuit, dislikeTuit}) =>  {
    return (
        <div className="row mt-2">
            <div className="col">
        <span onClick={() => likeTuit(tuit)}>
        {
            tuit.stats.likes > 0 &&
            <i className="fas fa-thumbs-up me-1"
               style={{color: 'blue'}}></i>
        }
            {
                tuit.stats.likes <= 0 &&
                <i className="fas fa-thumbs-up"></i>
            }
            {tuit.stats && tuit.stats.likes}
        </span>
            </div>
            <div className="col">
                <h1>Hi</h1>
        <span onClick={() => dislikeTuit(tuit)}>
          {

              tuit.stats.dislikes > 0 &&
              <i className="fas fa-thumbs-down me-1"
                 style={{color: 'red'}}></i>
          }
        {

            tuit.stats.dislikes > 0 &&
            <i className="fas fa-thumbs-down me-1"
               style={{color: 'red'}}></i>
        }
            {
                tuit.stats.dislikes <= 0 &&
                <i className="fas fa-thumbs-down me-1"></i>
            }
            {tuit.stats && tuit.stats.dislikes}
        </span>
            </div>
        </div>
    );
}
export default TuitStats;

