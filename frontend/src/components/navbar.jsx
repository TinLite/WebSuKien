import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/user-context";
import { logout } from "../repositories/AuthRepository";

export function MainNavbar() {
  const { user, setUser } = useContext(UserContext);

  const logoutHandler = () => {
    logout().then(() => setUser(undefined));
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Bài tập LTW nâng cao
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link${isActive ? " active" : ""}`
                }
                aria-current="page"
                to="/"
              >
                Trang chủ
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/event/viewall">
                Quản lý sự kiện
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/user/history">
                Sự kiện tôi đã tham gia
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/user/eventUpcoming">
                Sự kiện đã đăng ký
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/profile">
                Thông tin tài khoản
              </NavLink>
            </li>
          </ul>
          {user ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>Xin chào, {user.username}.</div>
              {/* TODO: Gọi API đăng xuất */}
              <button className="btn btn-link" onClick={logoutHandler}>
                Đăng xuất
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="btn btn-outline-primary">
              Đăng nhập
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
