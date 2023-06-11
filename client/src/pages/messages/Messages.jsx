import React from "react";
import { Link } from "react-router-dom";
import "./Messages.scss";
import { useMutation, useQuery, useQueryClient } from "react-query";
import newRequests from "../../utils/newRequests";
import moment from "moment";

const Messages = () => {
  const queryClient = useQueryClient();
  const currentUser = localStorage.getItem("currentUser");

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequests.get(`/conversations`).then((res) => {
        console.log("res", res.data);
        return res.data;
      }),
  });

  const mutation = useMutation({
    mutationKey: ["conversation"],
    mutationFn: (id) => {
      console.log(id);
      return newRequests.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (c) => {
    mutation.mutate(c.id);
  };

  return (
    <div className="messages">
      {isLoading ? (
        "loading..."
      ) : error ? (
        "error"
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <tr>
              <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
              <th>Last Message</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
            {data.map((conversation) => (
              <tr className="active" key={conversation.id}>
                <td>
                  {currentUser.isSeller
                    ? conversation.buyerId
                    : conversation.sellerId}
                </td>
                <td>
                  <Link to={`/message/${conversation.id}`} className="link">
                    {conversation?.lastMessage?.substring(0, 100)}...
                  </Link>
                </td>
                <td>{moment(conversation.updatedAt).fromNow()}</td>
                <td>
                  {((currentUser.isSeller && !conversation.readBySeller) ||
                    (!currentUser.isSeller && !conversation.readByBuyer)) && (
                    <button onClick={() => handleRead(conversation)}>
                      Mark as Read
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
