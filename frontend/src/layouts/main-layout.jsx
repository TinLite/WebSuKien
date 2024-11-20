import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer";
import { MainNavbar } from "../components/navbar";

export function LayoutMain() {
  return (
    <div className="d-flex min-vh-100 flex-column"> {/* https://getbootstrap.com/docs/5.3/utilities/flex/#direction */}
      <MainNavbar />
      <div className="flex-grow-1"> {/* https://getbootstrap.com/docs/5.3/utilities/flex/#grow-shrink */}
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}