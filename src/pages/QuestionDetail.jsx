import { Link, useParams } from "react-router-dom";
import QuestionBox from "../components/QuestionBox";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../utils/Spinner";
import { Image } from "react-bootstrap";
import { format } from "timeago.js";
import AddComments from "../components/comments/AddComments";
import { AiFillLike } from "react-icons/ai";
import axiosInstance from "../utils/axiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

export default function QuestionDetail() {
  const { questionId } = useParams();
  const { data, error, isLoading } = useFetch(`/questions/find/${questionId}`);
  const { data: comments } = useFetch(`/comments/get/${questionId}`);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <p className="text-white">{error}</p>;
  }

  console.log(data);

  return (
    <>
      <div
        className="py-4 mb-4 rounded-3 shadow text-white"
        style={{ backgroundColor: "var(--lightGray)" }}
      >
        <div className="px-3 mb-3">
          <Link
            to={`/profile/${data?.askedBy.username}`}
            className="d-flex gap-2"
          >
            <Image
              src={data?.askedBy.profilePhoto}
              alt={data?.askedBy.username}
              style={{ width: "45px", height: "45px" }}
              roundedCircle
              className="object-fit-cover"
            />
            <div className="text-white">
              <p className="fw-bold mb-0">{data?.askedBy.username}</p>
              <span className="small text-white-50">
                asked: {format(data.createdAt)}
              </span>
            </div>
          </Link>
        </div>
        <div>
          <div className="px-3">
            <Link to={`/question/${data._id}`}>
              <h1 className="fs-6 text-white">{data.title}</h1>
              <p className="small text-white-50">{data.question}</p>
            </Link>
          </div>
          {data.image && (
            <div style={{ height: "300px" }}>
              <Link to={`/question/${data._id}`}>
                <Image
                  src={data.image}
                  className="w-100 h-100 object-fit-cover"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      <p>Comments</p>
      {comments?.length > 0 ? (
        <>
          <div
            className="py-4 mb-4 rounded-3 shadow text-white px-3"
            style={{ backgroundColor: "var(--lightGray)" }}
          >
            {comments?.map((comment) => (
              <div key={comment._id} className="d-flex gap-2 mb-3">
                <Image
                  src={comment?.askedBy?.profilePhoto}
                  alt="user"
                  style={{ width: "35px", height: "35px" }}
                  roundedCircle
                  className="object-fit-cover"
                />
                <div className="flex-grow-1">
                  <div className="d-flex flex-grow-1 gap-2">
                    <p className="fw-bold small mb-0">
                      {comment?.askedBy?.username}
                    </p>
                    <span className="small flex-grow-1">{comment.comment}</span>
                    {/* <AiOutlineLike size="20px" /> */}
                  </div>
                  <div className="d-flex gap-4 text-white-50">
                    <span className="small">{format(comment.createdAt)}</span>
                    <span className="small">{comment.likeCount} likes</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-white">No answers yet.</p>
      )}
    </>
  );
}
