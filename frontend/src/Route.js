import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "./pages/login/login";

export const route = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: "*",
        element: <div>Không tìm thấy trang web yêu cầu</div>,
    }
])