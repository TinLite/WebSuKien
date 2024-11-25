import React, { useEffect, useState } from "react";
import {
  editEvent,
  getEventById,
  getGroupByIdManager,
} from "../../repositories/EventRepository";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
const EditEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    des: "",
    group_id: "",
    regDeadline: "",
    occasionDate: "",
    idevent: "",
  });
  const [groups, setGroups] = useState([]);
  const { idEvent } = useParams();
  const navigate = useNavigate();
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleEditEvent = (event) => {
    event.preventDefault();
    editEvent(formData).then((res) => {
      navigate("/event/viewall");
    });
  };
  useEffect(() => {
    getEventById(idEvent).then((res) => {
      setFormData({
        name: res.data.name,
        des: res.data.des,
        group_id: res.data.group_id,
        regDeadline: moment
          .utc(res.data.reg_deadline)
          .utcOffset(7)
          .format("YYYY-MM-DD"),
        occasionDate: moment
          .utc(res.data.occasion_date)
          .utcOffset(7)
          .format("YYYY-MM-DD"),
        idevent: idEvent,
      });
    });
  }, []);
  useEffect(() => {
    getGroupByIdManager().then((res) => {
      setGroups(res.data.groups);
    });
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="container mt-5  col-10">
            <h2 className="text-center">SỬA SỰ KIỆN</h2>
            <form method="post" action="/editevent" onSubmit={handleEditEvent}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Tên
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Nhập tên sự kiện"
                  name="name"
                  value={formData.name}
                  onChange={handleChangeInput}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Mô Tả
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder="Nhập mô tả sự kiện"
                  name="des"
                  value={formData.des}
                  onChange={handleChangeInput}
                  required
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="group-id" className="form-label">
                  Mã nhóm
                </label>
                <select
                  name="group_id"
                  id="group-id"
                  className="form-control"
                  value={formData.group_id}
                  onChange={handleChangeInput}
                  required
                >
                  {groups.map((group, index) => (
                    <option key={index} value={group.group_id}>
                      {group.group_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="deadline" className="form-label">
                  Thời Hạn Đăng Ký
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="deadline"
                  name="regDeadline"
                  value={formData.regDeadline}
                  onChange={handleChangeInput}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="occasion-date" className="form-label">
                  Ngày Diễn Ra
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="occasion-date"
                  name="occasionDate"
                  value={formData.occasionDate}
                  onChange={handleChangeInput}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Sửa sự kiện
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEvent;
