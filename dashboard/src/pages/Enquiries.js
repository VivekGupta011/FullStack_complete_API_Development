import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import {
  deleteEnquiry,
  getEnquiries,
  updateEnquiry,
} from "../features/enquiries/enquireSlice";
import CustomModal from "../components/CustomModal";
import { BiTrash } from "react-icons/bi";
import { AiOutlineEye } from "react-icons/ai";

const Enquiries = () => {
  const [open, setOpen] = useState(false);
  const [enqId, setEnqId] = useState("");
  const showModal = (e) => {
    setEnqId(e);
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, [dispatch]);
  const enquiriesState = useSelector((state) => state.enquiry.enquiries);

  const setEnquiryStatus = (e, i) => {
    // console.log(e, i)
    const data = { id: i, enqData: e }
    dispatch(updateEnquiry(data))
  }
  const columns = [
    {
      title: "SNo",
      dataIndex: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  const data1 = [];
  for (let i = 0; i < enquiriesState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiriesState[i].name,
      email: enquiriesState[i].email,
      mobile: enquiriesState[i].mobile,
      status: (
        <select
          name=""
          id=""
          defaultValue={
            enquiriesState[i]?.status ? enquiriesState[i]?.status : "Submitted"
          }
          className="form-control form-select"
          onChange={(e) => setEnquiryStatus(e.target.value, enquiriesState[i]._id)}
        >
          <option value="Submitted">Submitted</option>
          <option value="Contacted">Contacted</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      ),
      action: (
        <>
          <Link
            className="fs-3 text-primary"
            to={`/admin/enquiries/${enquiriesState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger bg-transparent border-0"
            onClick={() => {
              showModal(enquiriesState[i]._id);
            }}
          >
            <BiTrash />
          </button>
        </>
      ),
    });
  }

  const deleteEnq = (e) => {
    dispatch(deleteEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-4 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        hideModal={hideModal}
        open={open}
        performAction={() => {
          deleteEnq(enqId);
        }}
        title="Are you sure you want to delete this enquiry?"
      />
    </div>
  );
};

export default Enquiries;
