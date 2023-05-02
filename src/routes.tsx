import { useRoutes } from 'react-router-dom'

// layouts
import GuestLayout from './layouts/guest/GuestLayout'

// pages
import Homepage from './pages/Homepage'
import Ranking from './pages/Ranking'

// ----------------------------------------------------------------------

export default function Router (): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null {
  const routes = useRoutes([
    {
      path: '/',
      element: <GuestLayout />,
      children: [
        { path: '/', element: <Homepage /> },
        { path: '/rankings/*', element: <Ranking /> }
        /* { path: 'user', element: <UserPage /> },
              { path: 'products', element: <ProductsPage /> },
              { path: 'blog', element: <BlogPage /> }, */
      ]
    }
    /* {
          path: 'login',
          element: <LoginPage />,
        },
        {/*
          element: <SimpleLayout />,
          children: [
            { element: <Navigate to="/dashboard/app" />, index: true },
            { path: '404', element: <Page404 /> },
            { path: '*', element: <Navigate to="/404" /> },
          ],
        },
        {
          path: '*',
          element: <Navigate to="/404" replace />,
        }, */
  ])

  return routes
}
