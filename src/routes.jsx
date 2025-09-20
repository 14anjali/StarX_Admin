// export default renderRoutes;

import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// project import
import AdminLayout from './layouts/AdminLayout';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Loader from './components/Loader/Loader';
import SellerList from 'views/Seller/SellerList';

// Lazy load components
const SignUp1 = lazy(() => import('./views/auth/signup/SignUp1'));
const SignIn1 = lazy(() => import('./views/auth/signin/SignIn1'));
const ResetPassword1 = lazy(() => import('./views/auth/reset-password/ResetPassword1'));

const Dashboard = lazy(() => import('./views/dashboard'));
const ProductList = lazy(() => import('./views/product/ProductList'));
const UserList = lazy(() => import('./views/user/UserList'));
const UserDetail = lazy(() => import('./views/user/UserDetail'));
const TransationList = lazy(() => import('./views/transation/TransationList'));
const QRCodeList = lazy(() => import('./views/qrcode/QRCodeList'));
const BasicButton = lazy(() => import('./views/ui-elements/BasicButton'));
const BasicBadges = lazy(() => import('./views/ui-elements/BasicBadges'));
const BasicBreadcrumbPagination = lazy(() => import('./views/ui-elements/BasicBreadcrumbPagination'));
const BasicCollapse = lazy(() => import('./views/ui-elements/BasicCollapse'));
const BasicTypography = lazy(() => import('./views/ui-elements/BasicTypography'));
const BasicTooltipsPopovers = lazy(() => import('./views/ui-elements/BasicTooltipsPopovers'));
const SamplePage = lazy(() => import('./views/extra/SamplePage'));

// ==============================|| ROUTES RENDERER ||============================== //

const renderRoutes = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {/* Public routes */}
      <Route path="/auth/signup-1" element={<SignUp1 />} />
      <Route path="/auth/signin-1" element={<SignIn1 />} />
      <Route path="/auth/reset-password-1" element={<ResetPassword1 />} />

      {/* Protected /app routes */}
      <Route
        path="/app/dashboard/analytics"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/product/analytics"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ProductList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/user/analytics"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <UserList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/user/:userId"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <UserDetail />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/transation/analytics"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <TransationList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/qrcode/analytics"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <QRCodeList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/seller/analytics"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <SellerList />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/basic/button"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <BasicButton />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/basic/badges"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <BasicBadges />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/basic/breadcrumb-pagination"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <BasicBreadcrumbPagination />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/basic/collapse"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <BasicCollapse />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/basic/typography"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <BasicTypography />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/basic/tooltip-popovers"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <BasicTooltipsPopovers />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/app/sample-page"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <SamplePage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Top-level fallback */}
      <Route path="*" element={<Navigate to="/auth/signin-1" replace />} />
    </Routes>
  </Suspense>
);

export const routes = renderRoutes;

export default renderRoutes;
