import React, { lazy, Suspense, useContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import './App.css';

import {
  AuthProvider,
  AuthContext
} from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';

import AppShell from './AppShell';

// import Home from './pages/Home';
import Login from './pages/Login';
import FourOFour from './pages/FourOFour';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Companies = lazy(() => import('./pages/Companies'));
const Account = lazy(() => import('./pages/Account'));
const HrUser = lazy(() => import('./pages/HrUser'));
const CompaniesHR = lazy(() => import('./pages/CompaniesHR'));
const Settings = lazy(() => import('./pages/Settings'));
const AddCompany = lazy(() => import('./pages/AddCompany'));
const CompanyUsers = lazy(() => import('./pages/CompanyUsers'))
const AddCompanyUser = lazy(() => import('./pages/AddCompanyUser'));
const AddCompanyHRUser = lazy(() => import('./pages/AddCompanyHRUser'));
const EditCompanyProfile = lazy(() => import('./pages/EditCompanyProfile'));
const EditCompanyUserProfile = lazy(() => import('./pages/EditCompanyUserProfile'));
const EditSystemUserProfile = lazy(() => import('./pages/EditSystemUser'));
const EditCompanyHRUserProfile = lazy(() => import('./pages/EditCompanyHRUserProfile'));
const SystemUser = lazy(() => import('./pages/SystemUsers'));
const AddSystemUser = lazy(() => import('./pages/AddSystemUser'));

const LoadingFallback = () => (
  <AppShell>
    <div className="p-4">Loading...</div>
  </AppShell>
);

const UnauthenticatedRoutes = () => (
  <Switch>
    <Route path="/login">
      <Login />
    </Route>
    <Route exact path="/">
      <Login />
    </Route>
    <Route path="*">
      <FourOFour />
    </Route>
  </Switch>
);

const AuthenticatedRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};


const AdminRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() && auth.isAdmin() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

const AdminOrClientAccessRoute = ({ children, ...rest }) => {
  const auth = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() && auth.isAdminOrClientAccess() ? (
          <AppShell>{children}</AppShell>
        ) : (
          <Redirect to="/" />
        )
      }
    ></Route>
  );
};

const AppRoutes = () => {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <Switch>
          <AuthenticatedRoute path="/dashboard">
            <Dashboard />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/companies">
            <Companies />
          </AuthenticatedRoute>
          <AdminOrClientAccessRoute path="/addCompanyHRUser">
            <AddCompanyHRUser/>
          </AdminOrClientAccessRoute>
          <AdminOrClientAccessRoute path="/companiesHR">
            <CompaniesHR />
          </AdminOrClientAccessRoute>
          <AdminRoute path="/systemUsers">
            <SystemUser />
          </AdminRoute>
          <AdminRoute path="/addSystemUser">
            <AddSystemUser />
          </AdminRoute>
          <AdminRoute path="/editSystemUserProfile">
            <EditSystemUserProfile />
          </AdminRoute>
          <AdminOrClientAccessRoute path="/editCompanyHRUserProfile">
            <EditCompanyHRUserProfile />
          </AdminOrClientAccessRoute>
          <AuthenticatedRoute path="/account">
            <Account />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/settings">
            <Settings />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/addCompany">
            <AddCompany />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/addCompanyUser">
            <AddCompanyUser />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/companyUsers">
            <CompanyUsers />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/editCompany">
            <EditCompanyProfile />
          </AuthenticatedRoute>
          <AuthenticatedRoute path="/editCompanyUserProfile">
            <EditCompanyUserProfile />
          </AuthenticatedRoute>
          <UnauthenticatedRoutes />
        </Switch>
      </Suspense>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <FetchProvider>
          <div className="bg-gray-100">
            <AppRoutes />
          </div>
        </FetchProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
