import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "@components/layout";
import ErrorPage from "@pages/ErrorPage";
// MainPage
import MainHomePage from "@pages/main/MainHomePage";
import MainAllCitiesWeather from "@pages/main/MainAllCitiesWeather";
import MainPreviewMbti from "@pages/main/MainPreviewMbti";
// Community
import CommunityNew from "@pages/community/CommunityNew";
import CommunityDetail from "@pages/community/CommunityDetail";
import CommunityMain from "@pages/community/CommunityMain";
import ReplyMain from "@pages/community/ReplyMain";
import CommunityEdit from "@pages/community/CommunityEdit";
// Location
import LocationDetailPage from "@pages/location/LocationDetailPage";
import LocationMainPage from "@pages/location/LocationMainPage";
// Mbti
import MbtiQuestion from "@pages/Mbti/MbtiQuestion";
import MbtiResult from "@pages/Mbti/MbtiResult";
import MbtiHome from "@pages/Mbti/MbtiHome";
// User
import UserLogin from "@pages/user/UserLogin";
import UserValidLogin from "@pages/user/UserValidLogin";
import UserOAuth from "@pages/user/UserOAuth";
import UserSetting from "@pages/user/UserSetting";
import UserSignUp from "@pages/user/UserSignUp";
import UserPage from "@pages/user/UserPage";
import UserEdit from "@pages/user/UserEdit";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <MainHomePage />,
          },

          //Main
          {
            path: "main",
            element: <MainHomePage />,
          },
          {
            path: "allcity",
            element: <MainAllCitiesWeather />,
          },
          {
            path: "category",
            element: <MainPreviewMbti />,
          },

          // Community
          {
            path: "community",
            element: <CommunityMain />,
          },
          {
            path: "community/new",
            element: <CommunityNew />,
          },
          {
            path: "community/edit",
            element: <CommunityEdit />,
          },
          {
            path: "community/:_id",
            element: <CommunityDetail />,
            children: [
              {
                index: true,
                element: <ReplyMain />,
              },
            ],
          },

          // Location
          {
            path: "location",
            element: <LocationMainPage />,
          },
          {
            path: "location/:id",
            element: <LocationDetailPage />,
          },

          // Mbti
          {
            path: "mbti",
            element: <MbtiHome />,
          },
          {
            path: "mbti/question",
            element: <MbtiQuestion />,
          },
          {
            path: "mbti/result",
            element: <MbtiResult />,
          },

          // User
          {
            path: "user/login",
            element: <UserLogin />,
          },
          {
            path: "mainlogin",
            element: <UserValidLogin />,
          },
          {
            path: "auth/kakao",
            element: <UserOAuth />,
          },
          {
            path: "user/setting",
            element: <UserSetting />,
          },
          {
            path: "user/signup",
            element: <UserSignUp />,
          },
          {
            path: "user/mypage",
            element: <UserPage />,
          },
          {
            path: "user/edit",
            element: <UserEdit />,
          },
        ],
      },
    ],
  },
]);

export default router;
