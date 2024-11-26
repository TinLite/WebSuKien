import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getListEventByIdCreater,
  deleteEvent,
} from "../../repositories/EventRepository";
const ViewAllEvent = () => {
  const [listEvent, setListEvent] = useState([]);
  const [find, setFind] = useState("");
  const handleInpFind = (event) => {
    setFind(event.target.value);
  };
  const handleDeleteEvent = (idevent) => {
    deleteEvent(idevent).then((res) => {
      setListEvent(listEvent.filter((event) => event.ID != idevent));
    });
  };
  const handleSubmitFind = (event) => {
    event.preventDefault();
    getListEventByIdCreater(find).then((res) => {
      setListEvent(res.data);
      console.log(res.data);
    });
  };
  useEffect(() => {
    getListEventByIdCreater("").then((res) => {
      setListEvent(res.data);
    });
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="container mt-5 col-10">
            <h2 className="text-center">BẢNG SỰ KIỆN</h2>
            <div className="d-flex justify-content-between mb-3">
              <Link to="/event/add" className="btn btn-primary">
                Thêm sự kiện
              </Link>
              <form onSubmit={handleSubmitFind}>
                <input
                  type="text"
                  name="find"
                  value={find}
                  onChange={handleInpFind}
                />
                <button type="submit">Tìm</button>
              </form>
            </div>
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Người tạo sự kiện</th>
                  <th scope="col">Tên sự kiện</th>
                  <th scope="col">Khóa</th>
                  <th scope="col">Khóa</th>
                  <th scope="col">Thời hạn đăng ký</th>
                  <th scope="col">Thời gian tạo sự kiện</th>
                  <th scope="col">Ngày diễn ra sự kiện</th>
                  <th scope="col">Hành động</th>
                </tr>
              </thead>
              <tbody>
                {listEvent.map((event, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{event.username}</td>
                    <td>{event.name}</td>
                    <td>
                      <input type="checkbox" checked={event.is_locked} hand />
                    </td>
                    <td>
                      <input type="checkbox" checked={event.is_hidden} />
                    </td>
                    <td>
                      {new Date(event.reg_deadline).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      {new Date(event.created_at).toLocaleDateString("en-GB")}
                    </td>
                    <td>
                      {new Date(event.occasion_date).toLocaleDateString(
                        "en-GB"
                      )}
                    </td>
                    <td>
                      <Link
                        className="btn btn-success"
                        to={`/event/detail/${event.ID}`}
                      >
                        Xem
                      </Link>
                      <Link
                        className="btn btn-primary"
                        to={`/event/edit/${event.ID}`}
                      >
                        Sửa
                      </Link>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handleDeleteEvent(event.ID);
                        }}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllEvent;
