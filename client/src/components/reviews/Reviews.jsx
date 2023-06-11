import React from "react";
import "./Reviews.scss";
import "../../pages/gig/Gig.scss";
import Review from "../review/Review";

import newRequests from "../../utils/newRequests";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Reviews = ({ gigId }) => {
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["reviews"],
    queryFn: () =>
      newRequests.get(`/reviews/${gigId}`).then((res) => {
        return res.data;
      }),
  });
  const mutation = useMutation({
    mutationKey: ["addReview"],
    mutationFn: (review) => newRequests.post("/reviews", review),
    onSuccess: () => {
      queryClient.invalidateQueries("reviews");
    },
  });
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    const desc = e.target[0].value;
    const star = e.target[1].value;
       mutation.mutate({ gigId, desc, star });
  };
  return (
    <div className="reviews">
      <h2>Reviews</h2>
      {isLoading
        ? "Loading..."
        : error
        ? "Error fetching reviews"
        : data.map((review) => <Review key={review._id} review={review} />)}
      <div className="add">
        <h3>Add a review</h3>
        <form className="addForm" onSubmit={handleSubmit}>
          <input type="text" placeholder="write your opinion" />
          <select name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
