import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import { BiEdit, BiTrash } from "react-icons/bi";
import {
  deleteProductCategory,
  getProductCategory,
  resetState,
} from "../features/productCategory/productCategorySlice";
import CustomModal from "../components/CustomModal";

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setPCatId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setPCatId(e);
  };
  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getProductCategory());
  }, [dispatch]);
  const pCategoryState = useSelector(
    (state) => state.productCategory.productcategories
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
  for (let i = 0; i < pCategoryState.length; i++) {
    data1.push({
      key: i + 1,
      title: pCategoryState[i].title,
      action: (
        <>
          {" "}
          <Link
            to={`/admin/category/${pCategoryState[i]._id}`}
            className="fs-3 text-primary"
          >
            <BiEdit />
          </Link>{" "}
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() =>{ showModal(pCategoryState[i]._id) } }
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteCategory = (e) => {
    dispatch(deleteProductCategory(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getProductCategory());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        open={open}
        hideModal={hideModal}
        performAction={() => { deleteCategory(pCatId) }}
        title="Are you sure you want to delete this product category?"
      />
    </div>
  );
};

export default CategoryList;
