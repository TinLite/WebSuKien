import React, { useEffect, useState } from "react";

const editevent = () => {
  return (
    <div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="container mt-5  col-10">
            <h2 className="text-center">SỬA SỰ KIỆN</h2>
            <form method="post" action="/editevent">
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
                />
              </div>

              <div className="mb-3">
                <label for="description" className="form-label">
                  Mô Tả
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  placeholder="Nhập mô tả sự kiện"
                  name="des"
                ></textarea>
              </div>

              <div className="mb-3">
                <label for="deadline" className="form-label">
                  Thời Hạn Đăng Ký
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="deadline"
                  name="regDeadline"
                />
              </div>

              <div className="mb-3">
                <label for="occasion-date" className="form-label">
                  Ngày Diễn Ra
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="occasion-date"
                  name="occasionDate"
                />
              </div>
              <input type="text" hidden name="idevent" />
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

export default editevent;
