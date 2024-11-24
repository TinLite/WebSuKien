import React, { useEffect, useState } from "react";
import { addEvent } from "../../repositories/EventRepository";
import { useNavigate } from "react-router-dom";
const AddEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    des: "",
    group_id: "",
    regDeadline: "",
    occasionDate: "",
  });
  const navigate = useNavigate();
  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleAddEvent = (event) => {
    event.preventDefault();
    addEvent(formData).then((res) => {
      navigate("/event/viewall");
    });
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="container mt-5  col-10">
            <h2 className="text-center">THÊM SỰ KIỆN</h2>
            <form method="post" action="/addevent" onSubmit={handleAddEvent}>
              <div className="mb-3">
                <label for="name" className="form-label">
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
                <label for="description" class="form-label">
                  Mô Tả
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                  placeholder="Nhập mô tả sự kiện"
                  name="des"
                  value={formData.des}
                  onChange={handleChangeInput}
                  required
                ></textarea>
              </div>

              <div class="mb-3">
                <label for="group-id" class="form-label">
                  Mã nhóm (Để trống nếu dành cho tất cả)
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="group-id"
                  placeholder="Nhập tên sự kiện"
                  name="group_id"
                  value={formData.group_id}
                  onChange={handleChangeInput}
                />
              </div>

              <div class="mb-3">
                <label for="deadline" class="form-label">
                  Thời Hạn Đăng Ký
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="deadline"
                  name="regDeadline"
                  value={formData.regDeadline}
                  onChange={handleChangeInput}
                  required
                />
              </div>

              <div class="mb-3">
                <label for="occasion-date" class="form-label">
                  Ngày Diễn Ra
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="occasion-date"
                  name="occasionDate"
                  value={formData.occasionDate}
                  onChange={handleChangeInput}
                  required
                />
              </div>

              <button type="submit" class="btn btn-primary">
                Thêm sự kiện
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
