import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { Footer } from "../components/footer";
import { MainNavbar } from "../components/navbar";
import { UserContext } from "../context/user-context";

export function LayoutMain() {
  const {user} = useContext(UserContext);
  return (
    <div className="d-flex min-vh-100 flex-column"> {/* https://getbootstrap.com/docs/5.3/utilities/flex/#direction */}
      <MainNavbar />
      { user ?
      <div className="flex-grow-1"> {/* https://getbootstrap.com/docs/5.3/utilities/flex/#grow-shrink */}
        <Outlet />
      </div> :
      <div className="flex-grow-1" style={{
        display: "grid",
        placeItems: "center",
      }}>
        <div className="text-center">
          <p>Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.</p>
          <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
        </div>
      </div>
      }
      <Footer />
    </div>
  )
}