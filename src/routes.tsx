import React from "react";
import { createBrowserRouter } from "react-router-dom";

import Layout from "@components/layout/index";
export const ErrorPage = React.lazy(() => import("@pages/ErrorPage"));
// MainPage
import MainHomePage from "@pages/main/MainHomePage";
// Community
export const CommunityNew = React.lazy(
  () => import("@pages/community/CommunityNew")
);
export const CommunityDetail = React.lazy(
  () => import("@pages/community/CommunityDetail")
);
export const CommunityMain = React.lazy(
  () => import("@pages/community/CommunityMain")
);
export const CommunityEdit = React.lazy(
  () => import("@pages/community/CommunityEdit")
);
// Location
export const LocationDetailPage = React.lazy(
  () => import("@pages/location/LocationDetailPage")
);
export const LocationMainPage = React.lazy(
  () => import("@pages/location/LocationMainPage")
);
// Mbti
export const MbtiQuestion = React.lazy(
  () => import("@pages/Mbti/MbtiQuestion")
);
export const MbtiResult = React.lazy(() => import("@pages/Mbti/MbtiResult"));
export const MbtiHome = React.lazy(() => import("@pages/Mbti/MbtiHome"));
// User
export const UserLogin = React.lazy(() => import("@pages/user/UserLogin"));
export const UserValidLogin = React.lazy(
  () => import("@pages/user/UserValidLogin")
);
export const UserOAuth = React.lazy(() => import("@pages/user/UserOAuth"));
export const UserSignUp = React.lazy(() => import("@pages/user/UserSignUp"));
export const UserPage = React.lazy(() => import("@pages/user/UserPage"));
export const UserDetail = React.lazy(() => import("@pages/user/UserDetail"));
export const UserEdit = React.lazy(() => import("@pages/user/UserEdit"));

import WithSuspense from "@components/WithSuspense";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: WithSuspense(<ErrorPage />),
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <MainHomePage />
          },

          //Main
          {
            path: "/",
            element: <MainHomePage />
          },

          // Community
          {
            path: "community",
            element: WithSuspense(<CommunityMain />)
          },
          {
            path: "community/new",
            element: WithSuspense(<CommunityNew />)
          },
          {
            path: "community/:_id/edit",
            element: WithSuspense(<CommunityEdit />)
          },
          {
            path: "community/:_id",
            element: WithSuspense(<CommunityDetail />)
          },

          // Location
          {
            path: "location",
            element: WithSuspense(<LocationMainPage />)
          },
          {
            path: "location/:id",
            element: WithSuspense(<LocationDetailPage />)
          },

          // Mbti
          {
            path: "mbti",
            element: WithSuspense(<MbtiHome />)
          },
          {
            path: "mbti/question",
            element: WithSuspense(<MbtiQuestion />)
          },
          {
            path: "mbti/result",
            element: WithSuspense(<MbtiResult />)
          },

          // User
          {
            path: "user/login",
            element: WithSuspense(<UserLogin />)
          },
          {
            path: "mainlogin",
            element: WithSuspense(<UserValidLogin />)
          },
          {
            path: "auth",
            element: WithSuspense(<UserOAuth />)
          },
          {
            path: "user/signup",
            element: WithSuspense(<UserSignUp />)
          },
          {
            path: "user/mypage",
            element: WithSuspense(<UserPage />)
          },
          {
            path: "user/detail",
            element: WithSuspense(<UserDetail />)
          },
          {
            path: "user/edit",
            element: WithSuspense(<UserEdit />)
          }
        ]
      }
    ]
  }
]);

export default router;
