import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { getEnquiry, resetState, updateEnquiry } from "../features/enquiries/enquireSlice";
import { BiArrowBack } from "react-icons/bi";

const ViewEnq = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getEnqId = location.pathname.split("/")[3];
  const { getEnq } = useSelector((state) => state.enquiry);
  useEffect(() => {
    if (getEnqId !== undefined) {
      dispatch(getEnquiry(getEnqId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getEnqId]);

  const goBack = () => {
    navigate("/admin/enquiries");
  };

  const setEnquiryStatus = (e, i) => {
    console.log(e, i)
    const data = { id: i, enqData: e }
    dispatch(updateEnquiry(data))
   // dispatch(resetState())
    setTimeout(() => {
        dispatch(getEnquiry(getEnqId))
    },100)
  }
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="mb-4 title">View Enquiry</h3>
        <button
          onClick={goBack}
          className="bg-transparent border-0 fs-6 mb-0 d-flex align-items-center gap-1"
        >
          <BiArrowBack className="fs-5 mb-0" /> Go Back
        </button>
      </div>
      <div className="mt-5 bg-white p-4 rounded-3 d-flex flex-column gap-3">
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Name:</h6>
          <p className="mb-0">{getEnq?.name}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Mobile:</h6>
          <p className="mb-0">
            <a href={`tel:${getEnq?.mobile}`}>{getEnq?.mobile}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Email:</h6>
          <p className="mb-0">
            <a href={`mailto: ${getEnq?.email}`}>{getEnq?.email}</a>
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Comment:</h6>
          <p className="mb-0">{getEnq?.comment}</p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Status:</h6>
          <p className="mb-0">{getEnq?.status}</p>
        </div>

        <div className="d-flex align-items-center gap-3">
          <h6 className="mb-0">Change Status:</h6>
          <div>
            <select
              name=""
              defaultValue={getEnq?.status ? getEnq?.status : "Submitted"}
              className="form-control form-select"
              onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEnq;
