/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.
import { createFileRoute } from '@tanstack/react-router';

import { Route as authLoginIndexImport } from './routes/(auth)/Login/index';
// Import Routes
import { Route as rootRoute } from './routes/__root';
import { Route as AuthImport } from './routes/_auth';
import { Route as IndexImport } from './routes/index';

// Create Virtual Routes

const AuthMypageIndexLazyImport = createFileRoute('/_auth/mypage/')();
const AuthTimerIndexLazyImport = createFileRoute('/_auth/Timer/')();
const AuthMypageAccountLazyImport = createFileRoute('/_auth/mypage/account')();

// Create/Update Routes

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any);

const AuthMypageIndexLazyRoute = AuthMypageIndexLazyImport.update({
  id: '/mypage/',
  path: '/mypage/',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/mypage/index.lazy').then((d) => d.Route),
);

const AuthTimerIndexLazyRoute = AuthTimerIndexLazyImport.update({
  id: '/Timer/',
  path: '/Timer/',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/Timer/index.lazy').then((d) => d.Route),
);

const authLoginIndexRoute = authLoginIndexImport.update({
  id: '/(auth)/Login/',
  path: '/Login/',
  getParentRoute: () => rootRoute,
} as any);

const AuthMypageAccountLazyRoute = AuthMypageAccountLazyImport.update({
  id: '/mypage/account',
  path: '/mypage/account',
  getParentRoute: () => AuthRoute,
} as any).lazy(() =>
  import('./routes/_auth/mypage/account.lazy').then((d) => d.Route),
);

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/';
      path: '/';
      fullPath: '/';
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    '/_auth': {
      id: '/_auth';
      path: '';
      fullPath: '';
      preLoaderRoute: typeof AuthImport;
      parentRoute: typeof rootRoute;
    };
    '/_auth/mypage/account': {
      id: '/_auth/mypage/account';
      path: '/mypage/account';
      fullPath: '/mypage/account';
      preLoaderRoute: typeof AuthMypageAccountLazyImport;
      parentRoute: typeof AuthImport;
    };
    '/(auth)/Login/': {
      id: '/(auth)/Login/';
      path: '/Login';
      fullPath: '/Login';
      preLoaderRoute: typeof authLoginIndexImport;
      parentRoute: typeof rootRoute;
    };
    '/_auth/Timer/': {
      id: '/_auth/Timer/';
      path: '/Timer';
      fullPath: '/Timer';
      preLoaderRoute: typeof AuthTimerIndexLazyImport;
      parentRoute: typeof AuthImport;
    };
    '/_auth/mypage/': {
      id: '/_auth/mypage/';
      path: '/mypage';
      fullPath: '/mypage';
      preLoaderRoute: typeof AuthMypageIndexLazyImport;
      parentRoute: typeof AuthImport;
    };
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthMypageAccountLazyRoute: typeof AuthMypageAccountLazyRoute;
  AuthTimerIndexLazyRoute: typeof AuthTimerIndexLazyRoute;
  AuthMypageIndexLazyRoute: typeof AuthMypageIndexLazyRoute;
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthMypageAccountLazyRoute: AuthMypageAccountLazyRoute,
  AuthTimerIndexLazyRoute: AuthTimerIndexLazyRoute,
  AuthMypageIndexLazyRoute: AuthMypageIndexLazyRoute,
};

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren);

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute;
  '': typeof AuthRouteWithChildren;
  '/mypage/account': typeof AuthMypageAccountLazyRoute;
  '/Login': typeof authLoginIndexRoute;
  '/Timer': typeof AuthTimerIndexLazyRoute;
  '/mypage': typeof AuthMypageIndexLazyRoute;
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute;
  '': typeof AuthRouteWithChildren;
  '/mypage/account': typeof AuthMypageAccountLazyRoute;
  '/Login': typeof authLoginIndexRoute;
  '/Timer': typeof AuthTimerIndexLazyRoute;
  '/mypage': typeof AuthMypageIndexLazyRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  '/': typeof IndexRoute;
  '/_auth': typeof AuthRouteWithChildren;
  '/_auth/mypage/account': typeof AuthMypageAccountLazyRoute;
  '/(auth)/Login/': typeof authLoginIndexRoute;
  '/_auth/Timer/': typeof AuthTimerIndexLazyRoute;
  '/_auth/mypage/': typeof AuthMypageIndexLazyRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: '/' | '' | '/mypage/account' | '/Login' | '/Timer' | '/mypage';
  fileRoutesByTo: FileRoutesByTo;
  to: '/' | '' | '/mypage/account' | '/Login' | '/Timer' | '/mypage';
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/_auth/mypage/account'
    | '/(auth)/Login/'
    | '/_auth/Timer/'
    | '/_auth/mypage/';
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  AuthRoute: typeof AuthRouteWithChildren;
  authLoginIndexRoute: typeof authLoginIndexRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  authLoginIndexRoute: authLoginIndexRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/(auth)/Login/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/mypage/account",
        "/_auth/Timer/",
        "/_auth/mypage/"
      ]
    },
    "/_auth/mypage/account": {
      "filePath": "_auth/mypage/account.lazy.tsx",
      "parent": "/_auth"
    },
    "/(auth)/Login/": {
      "filePath": "(auth)/Login/index.tsx"
    },
    "/_auth/Timer/": {
      "filePath": "_auth/Timer/index.lazy.tsx",
      "parent": "/_auth"
    },
    "/_auth/mypage/": {
      "filePath": "_auth/mypage/index.lazy.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
