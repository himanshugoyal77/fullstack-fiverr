import React from "react";
import "./Gig.scss";
import { Slider } from "infinite-react-carousel/lib";
import { Link, useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import newRequests from "../../utils/newRequests";
import Reviews from "../../components/reviews/Reviews";

function Gig() {
  const { id } = useParams();

  const { isLoading, error, data, refetch } = useQuery("singleGig", () =>
    newRequests.get(`/gigs/single/${id}`).then((res) => res.data)
  );
  const userId = data?.userId;
  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: [`${userId}`],
    queryFn: () =>
      newRequests.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  return (
    <div className="gig">
      {isLoading ? (
        "Loading..."
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Liverr {">"} Graphics & Design {">"}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              "loading"
            ) : errorUser ? (
              "Something went wrong"
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={
                    dataUser.img ||
                    "https://t4.ftcdn.net/jpg/03/59/58/91/360_F_359589186_JDLl8dIWoBNf1iqEkHxhUeeOulx0wOC5.jpg"
                  }
                  alt=""
                />
                <span>{dataUser.username}</span>
                {
                  <div className="stars">
                    {!isNaN(data.totalStars / data.starNumber) &&
                      Array(Math.round(data.totalStars / data.starNumber))
                        .fill()
                        .map((item, i) => {
                          return <img key={i} src="/img/star.png" alt="" />;
                        })}
                    <span>
                      {" "}
                      {!isNaN(data.totalStars / data.starNumber) &&
                        Math.round(data.totalStars / data.starNumber)}
                    </span>
                  </div>
                }
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data.images.map((img) => (
                <img key={img} src={img} />
              ))}
            </Slider>
            <h2>About This Gig</h2>
            <p>{data.desc}</p>
            <div className="seller">
              <h2>About The Seller</h2>
              <div className="user">
                <img
                  src="https://images.pexels.com/photos/720327/pexels-photo-720327.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Anna Bell</span>
                  {!isNaN(data.totalStars / data.starNumber) &&
                    Math.round(data.totalStars / data.starNumber) && (
                      <div className="stars">
                        {Array(Math.round(data.totalStars / data.starNumber))
                          .fill()
                          .map((item, i) => {
                            return <img key={i} src="/img/star.png" alt="" />;
                          })}
                        <span>
                          {Math.round(data.totalStars / data.starNumber)}
                        </span>
                      </div>
                    )}
                  <button>Contact Me</button>
                </div>
              </div>
              <div className="box">
                <div className="items">
                  <div className="item">
                    <span className="title">From</span>
                    <span className="desc">USA</span>
                  </div>
                  <div className="item">
                    <span className="title">Member since</span>
                    <span className="desc">Aug 2022</span>
                  </div>
                  <div className="item">
                    <span className="title">Avg. response time</span>
                    <span className="desc">4 hours</span>
                  </div>
                  <div className="item">
                    <span className="title">Last delivery</span>
                    <span className="desc">1 day</span>
                  </div>
                  <div className="item">
                    <span className="title">Languages</span>
                    <span className="desc">English</span>
                  </div>
                </div>
                <hr />
                <p>
                  My name is Anna, I enjoy creating AI generated art in my spare
                  time. I have a lot of experience using the AI program and that
                  means I know what to prompt the AI with to get a great and
                  incredibly detailed result.
                </p>
              </div>
            </div>
            <Reviews gigId={id} />
          </div>
          <div className="right">
            <div className="price">
              <h3>{data.shortTitle}</h3>
              <h2>$ {data.price}</h2>
            </div>
            <p>{data.shortDesc}</p>
            <div className="details">
              <div className="item">
                <img src="/img/clock.png" alt="" />
                <span>{data.deliveryDate}</span>
              </div>
              <div className="item">
                <img src="/img/recycle.png" alt="" />
                <span>{data.revisoinNumber}</span>
              </div>
            </div>
            <div className="features">
              {data.features.map((feature) => (
                <div key={feature} className="item">
                  <img src="/img/greencheck.png" alt="" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button>
              <Link to={`/pay/${id}`}>Continue</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
