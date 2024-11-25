import { createBrowserRouter } from "react-router-dom";
import { LayoutMain } from "./layouts/main-layout";
import AddEvent from "./pages/event/addevent";
import { EventDetail } from "./pages/event/detailevent";
import EditEvent from "./pages/event/editevent";
import { EventCanJoin } from "./pages/event/eventcanjoin";
import ViewAllEvent from "./pages/event/viewallevent";
import { EventUpComing } from "./pages/history/eventupcoming";
import { History } from "./pages/history/history";
import { LoginPage } from "./pages/login/login";
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
      {
        path: "/event/detail/:idEvent",
        element: <EventDetail/>,
      }
    ],
  },
  {
    path: "*",
    element: <div>Không tìm thấy trang web yêu cầu</div>,
  },
]);
