import React from "react";
import "./Review.scss";
import { useQuery } from "react-query";
import newRequests from "../../utils/newRequests";

const Review = ({ review }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [`${review.userId}`],
    queryFn: () =>
      newRequests.get(`/users/${review.userId}`).then((res) => res.data),
  });

  return (
    <div className="review">
      <div className="item">
        {isLoading ? (
          "Loading..."
        ) : error ? (
          "Error fetching user"
        ) : (
          <div className="user">
            <img
              className="pp"
              src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
            <div className="info">
              <span>{data.username}</span>
              <div className="country">
                <img
                  src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                  alt=""
                />
                <span>{data.country}</span>
              </div>
            </div>
          </div>
        )}
        <div className="stars">
          {Array(review.star)
            .fill()
            .map((_, i) => (
              <img key={i} src="/img/star.png" alt="" />
            ))}

          <span>{review.star}</span>
        </div>
        <p>{review.desc}</p>
        <div className="helpful">
          <span>Helpful?</span>
          <img src="/img/like.png" alt="" />
          <span>Yes</span>
          <img src="/img/dislike.png" alt="" />
          <span>No</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
