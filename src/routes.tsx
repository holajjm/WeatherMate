import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@components/layout';
import MainPage from '@pages/main/MainPage';
import ErrorPage from '@pages/ErrorPage';
import CommunityNew from '@pages/community/CommunityNew';
import CommunityDetail from '@pages/community/CommunityDetail';
import MbtiQuestion from '@pages/Mbti/MbtiQuestion';
import MbtiResult from '@pages/Mbti/MbtiResult';
import SignUp from '@pages/user/SignUp';
import Login from '@pages/user/Login';
import UserPage from '@pages/user/UserPage';
import CommunityMain from '@pages/community/CommunityMain';
import LocationDetailPage from '@pages/location/LocationDetailPage';
import LocationMainPage from '@pages/location/LocationMainPage';
import Setting from '@pages/user/Setting';
import UserEdit from '@pages/user/UserEdit';
import AllCitiesWeather from '@pages/main/AllCitiesWeather';
import Oauth from '@pages/user/Oauth';
import MbtiHome from '@pages/Mbti/MbtiHome';
import ValidLogin from '@pages/user/ValidLogin';
import PreviewMbti from '@pages/main/PreviewMbti';
import ReplyMain from '@pages/community/ReplyMain';
import CommunityEdit from '@pages/community/CommunityEdit';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <MainPage />,
          },
          {
            path: 'main',
            element: <MainPage />,
          },
          {
            path: "mainlogin",
            element: <ValidLogin />
          },
          {
            path: 'allcity',
            element: <AllCitiesWeather />,
          },
          {
            path: 'category',
            element: <PreviewMbti />,
          },
          {
            path: 'community',
            element: <CommunityMain />,
          },
          {
            path: 'community/new',
            element: <CommunityNew />,
          },
          {
            path: 'community/edit',
            element: <CommunityEdit />,
          },
          {
            path: 'community/:_id',
            element: <CommunityDetail />,
            children: [
              {
                index: true,
                element: <ReplyMain />,
              },
            ],
          },
          {
            path: 'location',
            element: <LocationMainPage />,
          },
          {
            path: 'location/:id',
            element: <LocationDetailPage />,
          },
          {
            path: 'mbti',
            element: <MbtiHome />,
          },
          {
            path: 'mbti/question',
            element: <MbtiQuestion />,
          },
          {
            path: 'mbti/result',
            element: <MbtiResult />,
          },
          {
            path: 'user/mypage',
            element: <UserPage />,
          },
          {
            path: 'user/signup',
            element: <SignUp />,
          },
          {
            path: 'user/login',
            element: <Login />,
          },
          {
            path: 'user/validlogin',
            element: <ValidLogin />,
          },
          {
            path: 'user/setting',
            element: <Setting />,
          },
          {
            path: 'user/edit',
            element: <UserEdit />,
          },
          {
            path: 'auth/kakao',
            element: <Oauth />,
          },
        ],
      },
    ],
  },
]);

export default router;
