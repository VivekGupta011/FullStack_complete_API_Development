import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import {
  deleteBlogCategory,
  getBlogCategories,
  resetState,
} from "../features/blogCategory/blogCategorySlice";
import { BiEdit, BiTrash } from "react-icons/bi";
import CustomModal from "../components/CustomModal";

export default function BlogCategoryList() {
  const [open, setOpen] = useState(false);
  const [bCatId, setBCatId] = useState("");
  const showModal = (e) => {
    setBCatId(e);
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, [dispatch]);
  const blogCatState = useSelector(
    (state) => state.blogCategory.blogcategories
  );
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Title",
      dataIndex: "title",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < blogCatState.length; i++) {
    data1.push({
      key: i + 1,
      title: blogCatState[i].title,
      action: (
        <>
          {" "}
          <Link
            to={`/admin/blog-category/${blogCatState[i]._id}`}
            className="fs-3 text-primary"
          >
            <BiEdit />
          </Link>{" "}
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              showModal(blogCatState[i]._id);
            }}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteBCategory = (e) => {
    dispatch(deleteBlogCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Blog Category List</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteBCategory(bCatId);
        }}
        title="Are you sure you want to delete this blog category?"
      />
    </div>
  );
}
