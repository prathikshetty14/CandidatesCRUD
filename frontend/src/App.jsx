import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Page404 from "./components/Page404";
import Home from "./components/Home";
import Candidate from "./components/Candidate";

function App() {
  const browserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      errorElement: <Page404 />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "/candidate",
          element: <Candidate />
        },
        {
          path: "/candidate/:candidateId",
          element: <Candidate />,
        },
      ],
    },
  ]);

  return <RouterProvider router={browserRouter} />;
}

export default App;
