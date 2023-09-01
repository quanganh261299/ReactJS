import ManagementLayout from "../Layout/ManagementLayout";
import HomePage from "../Components/HomePage/HomePage";
import Login from "../Components/Login/Login";
import ErrorPage from "../Components/Error/ErrorPage";
import Department from "../Components/Department/Department";
import NewDepartment from "../Components/Department/NewDepartment";
import EditDepartment from "../Components/Department/EditDepartment";

export const route = [
    {
      path: "/",
      element: <ManagementLayout />,
      errorElement: <ErrorPage />,
      children:[
        {
          path: "/",
          element: <HomePage />
        },
        {
          path:"/departments",
          element: <Department />,

        },
        {
          path:"/departments/create",
          element: <NewDepartment />
        },
        {
          path:"/departments/:id",
          element: <EditDepartment />
        },
        {
          path:"/accounts",
          element: <p>accounts</p>
        },
        {
          path:"/login",
          element: <Login />
        }
      ]
    },
  ]