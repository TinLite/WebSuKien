import React, { useState } from "react";
import { changepassword } from "../../repositories/AuthRepository";
import { AlertDanger } from "../../components/alert";
import { AlertSuccess } from "../../components/alert";
export function ChangePass() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [reNewPass, setReNewPass] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError(null);
    // setSuccess(null);
    if (newPass !== reNewPass) {
      setError("Mật khẩu mới không khớp");
      return;
    }
    try {
      const response = await changepassword(oldPass, newPass);
      setSuccess("Đổi mật khẩu thành công");
      return response;
    } catch (error) {
      setError(error);
    }
  };
  const onAlertClose = () => {
    setError(null);
    setSuccess(null);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "24rem",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <h2>Đổi mật khẩu</h2>
        {error && <AlertDanger onClose={onAlertClose}>{error}</AlertDanger>}
        {success && (
          <AlertSuccess onClose={onAlertClose}>{success}</AlertSuccess>
        )}
        <div className="mb-3">
          <label htmlFor="oldpassword" className="form-label w-100">
            Nhập mật khẩu cũ
          </label>
          <input
            type="password"
            id="oldpassword"
            className="form-control"
            value={oldPass}
            onChange={(e) => setOldPass(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newpass" className="form-label w-100">
            Nhập mật khẩu mới
          </label>
          <input
            type="password"
            id="newpass"
            className="form-control"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label w-100">
            Nhập lại mật khẩu mới
          </label>
          <input
            type="password"
            id="reNewpass"
            className="form-control"
            value={reNewPass}
            onChange={(e) => setReNewPass(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
