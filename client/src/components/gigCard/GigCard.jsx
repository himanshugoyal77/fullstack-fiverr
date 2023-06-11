import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import newRequests from "../../utils/newRequests";

const GigCard = ({ item }) => {
  const { isLoading, error, data, refetch } = useQuery("userData", () =>
    newRequests.get(`/users/${item.userId}`).then((res) => res.data)
  );
  console.log("user id", data);
  console.log("single item id", item._id);
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            "Loading..."
          ) : error ? (
            "somrthing went wrong"
          ) : (
            <div className="user">
              <img
                src={
                  data.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/9/9a/No_avatar.png"
                }
                alt=""
              />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.desc}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>
              {" "}
              {!isNaN(item.totalStars / item.starNumber) &&
                Math.round(item.totalStars / item.starNumber)}
            </span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>$ {item.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
