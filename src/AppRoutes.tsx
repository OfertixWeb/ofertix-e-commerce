import HomeScreen from "./pages/HomeScreen"
import CategoryScreen from "./pages/CategoryScreen"

const routes = [
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/home",
    element: <HomeScreen />,
  },
  {
    path: "/category/:slug",
    element: <CategoryScreen />,
  },
]

export default routes
