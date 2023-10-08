import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const BlogCard = ({ data }) => {
  //const{ _id, title, description, image, createdAt } = data;
  return (
      <div className="blog-card">
        <div className="card-image">
            <img src={data?.image[0]?.url ? data?.image[0]?.url : "images/blog-1.jpg"} className='img-fluid w-100' alt="blog" />
        </div>
        <div className="blog-content">
            <p className="date">
              <Moment format="MMMM Do YYYY  hh:mm">{data?.createdAt}</Moment>
            </p>
            <h5 className="title">{data?.title}</h5>
            <p className="desc" dangerouslySetInnerHTML={{ __html: data?.description.substr(0,80) + "..." }}></p>
            <Link to={`/blogs/${data?._id}`} className="button">Read More</Link>
        </div>
      </div>
  );
}

export default BlogCard;
