import { createBrowserRouter } from "react-router-dom";
import { LayoutMain } from "./layouts/main-layout";
import { LoginPage } from "./pages/login/login";

export const route = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        element: <LayoutMain />,
        children: [
            {
                path: '/',
                element: <div>Trang chủ</div>,
            }
        ]
    },
    {
        path: "*",
        element: <div>Không tìm thấy trang web yêu cầu</div>,
    }
])