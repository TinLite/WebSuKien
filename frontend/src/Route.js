import { createBrowserRouter } from "react-router-dom";
import { LayoutMain } from "./layouts/main-layout";
import { LoginPage } from "./pages/login/login";
import { History } from "./pages/history/history";
import { EventUpComing } from "./pages/history/eventupcoming";
import ViewAllEvent from "./pages/event/viewallevent";
import AddEvent from "./pages/event/addevent";
import EditEvent from "./pages/event/editevent";
import { EventCanJoin } from "./pages/event/eventcanjoin";
export const route = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <LayoutMain />,
    children: [
      {
        path: "/",
        element: <EventCanJoin />,
      },
      {
        path: "/user/history",
        element: <History />,
      },
      {
        path: "/user/eventUpcoming",
        element: <EventUpComing />,
      },
      {
        path: "/event/viewall",
        element: <ViewAllEvent />,
      },
      {
        path: "/event/edit/:idEvent",
        element: <EditEvent />,
      },
      {
        path: "/event/add",
        element: <AddEvent />,
      },
    ],
  },
  {
    path: "*",
    element: <div>Không tìm thấy trang web yêu cầu</div>,
  },
]);
