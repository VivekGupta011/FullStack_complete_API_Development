import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import blog from "../images/blog-1.jpg";
import Container from '../components/Container';
import { getBlog } from '../features/blogs/blogSlice';

const SingleBlog = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const getBlogId = location.pathname.split("/")[2]
    useEffect(() => {
        dispatch(getBlog(getBlogId))
    },[dispatch, getBlogId])
    const singleBlogState = useSelector((state) => state?.blog?.singleBlog)
    return (
        <>
            <Meta title="Single Blog" />
            <BreadCrumb title="Single Blog" />
            <Container class1="singleblog-wrapper home-wrapper-2 py-5">
                <div className="row">
                    <div className="col-12">
                        <div className="single-blog-card">
                            <Link to="/blogs" className='d-flex align-items-center gap-10'><HiOutlineArrowLeft className='fs-5' /> Go Back To Blogs</Link>
                            <h3 className="title">{singleBlogState?.title}</h3>
                            <img src={singleBlogState?.image[0]?.url} className='img-fluid w-100 my-4' alt="blog" />
                            <p dangerouslySetInnerHTML={{__html: singleBlogState?.description}}></p>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    );
}

export default SingleBlog;
