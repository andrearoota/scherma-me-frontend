import { useRoutes } from 'react-router-dom'

// layouts
import GuestLayout from './layouts/guest/GuestLayout'

// pages
import Homepage from './pages/Homepage'
import RankingGeneralPage from './pages/RankingGeneralPage'
import RankingSinglePage from './pages/RankingSinglePage'
import TestAthlete from './pages/TestAthlete'
import TestCalendar from './pages/TestCalendar'

// ----------------------------------------------------------------------

export default function Router (): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null {
  const routes = useRoutes([
    {
      path: '/',
      element: <GuestLayout />,
      children: [
        { path: '/', element: <Homepage /> },
        { path: '/rankings/:category', element: <RankingGeneralPage /> },
        { path: '/rankings/:category/:weapon/:gender/:id?', element: <RankingSinglePage /> }
        /* { path: 'user', element: <UserPage /> },
              { path: 'products', element: <ProductsPage /> },
              { path: 'blog', element: <BlogPage /> }, */
      ]
    },
    {
      path: '/athlete',
      element: <TestAthlete />
    },
    {
      path: '/calendar',
      element: <TestCalendar />
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
