<h1 align="center">웨더메이트(WeatherMate)🌤️</h1>
</br>

<p align="center">
<img width="400px" alt="thumbnail" src='./public/ThumbNailImage.webp'>

</br>

## 1. 프로젝트 소개

> “현재 위치와 시간에 해당하는 날씨와 알맞은 옷차림을 추천해드립니다!”

- 사용자의 위치 정보에 따른 날씨와 테마별 인근 장소 추천을 도와주는 날씨 친구 서비스

</br>

> ### 배포 페이지 링크

👉🏻 <a target="_blank" href="https://weathermates.netlify.app/" alt="바로가기">WeatherMate</a>

```수정하기
ID: hello@weathermate.com
PW: 11111111
```

</br>

> ### 개발 기간

- #### 2024.03 ~ 2024.04 / 2024.09 ~ 2024.11

  </br>

> ### 사용 기술

<div>
  <img src="https://img.shields.io/badge/typescript-251ef7?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailWindCSS-1ee9f7?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <!-- <img src="https://img.shields.io/badge/Zustand-40374f?style=for-the-badge&logo=zustand&logoColor=white"/> -->
  <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=Recoil&logoColor=white"/>
</br> 
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=react-query&logoColor=white"/>
  <img src="https://img.shields.io/badge/ReactRouter-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/>
</div>
<div>
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white"/>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=white"/>
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>
  <img src="https://img.shields.io/badge/figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>
</div>
<div>
  <img src="https://img.shields.io/badge/Kakao_Map_API-FFCD00?style=for-the-badge&logo=kakao&logoColor=white"/>
  <img src="https://img.shields.io/badge/Kakao_Login_API-FFCD00?style=for-the-badge&logo=kakao&logoColor=white"/>
  <img src="https://img.shields.io/badge/Open_Weather_Map_API-blue?style=for-the-badge&logo=openweathermap&logoColor=white"/>
</div>
  </br>

## 2.팀 소개

<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/woojoung1217"><img src="https://avatars.githubusercontent.com/u/92114270?v=4" width="100px;" alt=""/><br /><sub><b>FE 전희선(팀장)</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/g0meee"><<img src="https://avatars.githubusercontent.com/u/122371491?v=4" width="100px;" alt=""/><br /><sub><b>FE 김경미</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/woojoung1217"><img src="https://avatars.githubusercontent.com/u/34205465?v=4" width="100px;" alt=""/><br /><sub><b>FE 윤우중</b></sub></a><br /></td>
      <td align="center"><a href="https://github.com/holajjm"><img src="https://avatars.githubusercontent.com/u/140300454?v=4" width="100px;" alt=""/><br /><sub><b>FE 정종민</b></sub></a><br /></td>
     </tr>
  </tbody>
</table>

</br>

## 3. 세부 역할 분담

### 💜 정종민

> **⚙️ 공통 컴포넌트 작성 & 커스텀 훅 생성**

- 공통 컴포넌트 개발
  - `DetailPageHeader` 작성
  - `useCustomAxios` 작성
  - 리드미 작성
    <br />

> **UI 구현**

#### 커뮤니티 메인 화면

- 인기 포스팅 출력 화면
- 게시글 목록 렌더링 화면

#### 게시글 작성 화면

- 게시글 작성 영역
- 날씨 이모티콘 선택 버튼 영역
- 파일 첨부 영역

#### 게시글 상세 조회 화면

- 댓글 리스트 영역 출력 화면
- 상세 댓글

<br/>

> **기능 구현**

#### 커뮤니티 메인 페이지

- 각 게시글의 조회 수가 높은 순서대로 인기 게시물 출력
- 각 게시글의 조회 수 및 날씨 정보, 댓글 수,글 내용, 첨부 사진 출력
- 특정 게시글의 내용 검색 시 검색 기능

#### 커뮤니티 게시글 상세 조회 페이지

- 게시글의 조회 수, 댓글 수, 작성 시간 정보 출력
- 게시글에 작성자 유효성 검사를 통한 삭제 기능 제한적 구현

#### 커뮤니티 게시글 작성 페이지

- 게시글 작성 시 이미지 파일 첨부 기능
- 게시글 작성 시 날씨에 따른 이모티콘 설정 후 날씨 정보 첨부 기능
- 게시글 내용 작성 기능

#### 댓글 작성 기능

- 특정 게시글에 댓글 등록 기능 구현
- 댓글 작성 시 작성자 정보, 작성 시간, 댓글 내용 출력 구현
- 댓글 작성자 유효성 검사를 통해 삭제 기능 제한적 구현

#### 마이페이지 작성 글 조회

- 특정 유저가 본인이 작성한 글 조회 기능 구현


## 4. 프로젝트 폴더 구조

```
📦WeatherMate
 ┣ 📂.vercel
 ┣ 📂dist
 ┣ 📂node_modules
 ┣ 📂public
 ┃ ┣ 📂Clothes
 ┃ ┣ 📂icon
 ┃ ┣ 📂Location
 ┃ ┣ 📂MBTIImage
 ┃ ┣ 📂realImage
 ┃ ┣ 📂WeatherIcon
 ┃ ┣ 📂WeatherInfo
 ┃ ┣ 📜robots.txt
 ┃ ┗ 📜sitemap.xml
 ┣ 📂src
 ┃ ┣ 📂assets
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂layout
 ┃ ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┃ ┣ 📜DetailPageHeader.tsx
 ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┣ 📜HeaderCategory.tsx
 ┃ ┃ ┃ ┣ 📜Index.tsx
 ┃ ┃ ┃ ┣ 📜Loading.tsx
 ┃ ┃ ┃ ┣ 📜LocatioLoading.tsx
 ┃ ┃ ┃ ┣ 📜NavigationBar.tsx
 ┃ ┃ ┃ ┣ 📜Search.tsx
 ┃ ┃ ┃ ┣ 📜Submit.tsx
 ┃ ┃ ┃ ┗ 📜ToTheTopButton.tsx
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┣ 📜CommunityModal.tsx
 ┃ ┃ ┃ ┣ 📜MainModal.tsx
 ┃ ┃ ┣ 📂skeleton
 ┃ ┃ ┃ ┣ 📜CommunityPopularSkeleton.tsx
 ┃ ┃ ┃ ┣ 📜LocationItemSkeleton.tsx
 ┃ ┃ ┃ ┣ 📜MainAllWeatherSkeleton.tsx
 ┃ ┃ ┃ ┣ 📜MainComentSkeleton.tsx
 ┃ ┃ ┃ ┣ 📜MainLocationWeatherSkeleton.tsx
 ┃ ┃ ┃ ┣ 📜MainTimeZoneSkeleton.tsx
 ┃ ┃ ┗ 📜KakaoShareButton.tsx
 ┃ ┣ 📂constants
 ┃ ┃ ┣ 📜Coment.ts
 ┃ ┃ ┣ 📜env.ts
 ┃ ┃ ┣ 📜MbtiQuestionData.ts
 ┃ ┃ ┣ 📜MbtiResultData.ts
 ┃ ┃ ┣ 📜WeatherRealImage.ts
 ┃ ┣ 📂features
 ┃ ┃ ┣ 📂weather
 ┃ ┃ ┣ 📜useWeatherQuery.ts
 ┃ ┃ ┣ 📜useWeatherTimeQuery.ts
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜EnvCheck.ts
 ┃ ┃ ┣ 📜modalPortal.ts
 ┃ ┃ ┣ 📜TimeDiff.ts
 ┃ ┃ ┣ 📜UnixTime.ts
 ┃ ┃ ┣ 📜useCoords.ts
 ┃ ┃ ┣ 📜useCustomAxios.ts
 ┃ ┃ ┣ 📜useDebounce.ts
 ┃ ┃ ┣ 📜usePageTitle.ts
 ┃ ┃ ┗ 📜useScrollTop.ts
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂community
 ┃ ┃ ┃ ┣ 📜CommunityDetail.tsx
 ┃ ┃ ┃ ┣ 📜CommunityEdit.tsx
 ┃ ┃ ┃ ┣ 📜CommunityItem.tsx
 ┃ ┃ ┃ ┣ 📜CommunityMain.tsx
 ┃ ┃ ┃ ┣ 📜CommunityNew.tsx
 ┃ ┃ ┃ ┣ 📜CommunityPopularItem.tsx
 ┃ ┃ ┃ ┣ 📜ReplyItem.tsx
 ┃ ┃ ┃ ┣ 📜ReplyMain.tsx
 ┃ ┃ ┃ ┗ 📜ReplyNew.tsx
 ┃ ┃ ┣ 📂location
 ┃ ┃ ┃ ┣ 📜Location.tsx
 ┃ ┃ ┃ ┣ 📜LocationDetailPage.tsx
 ┃ ┃ ┃ ┣ 📜LocationItem.tsx
 ┃ ┃ ┃ ┣ 📜LocationKeyword.tsx
 ┃ ┃ ┃ ┣ 📜LocationMainPage.tsx
 ┃ ┃ ┃ ┣ 📜LocationMap.tsx
 ┃ ┃ ┃ ┣ 📜LocationSearch.tsx
 ┃ ┃ ┃ ┗ 📜noResultMsg.tsx
 ┃ ┃ ┣ 📂main
 ┃ ┃ ┃ ┣ 📜MainAllCitiesWeather.tsx
 ┃ ┃ ┃ ┣ 📜MainHomePage.tsx
 ┃ ┃ ┃ ┣ 📜MainMyLocationWeather.tsx
 ┃ ┃ ┃ ┣ 📜MainNowWeather.tsx
 ┃ ┃ ┃ ┣ 📜MainWeatherDetail.tsx
 ┃ ┃ ┃ ┗ 📜MainWeatherTimeZone.tsx
 ┃ ┃ ┣ 📂Mbti
 ┃ ┃ ┃ ┣ 📜MbtiHome.tsx
 ┃ ┃ ┃ ┣ 📜MbtiQuestion.tsx
 ┃ ┃ ┃ ┗ 📜MbtiResult.tsx
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┣ 📜UserBoard.tsx
 ┃ ┃ ┃ ┣ 📜UserBookmark.tsx
 ┃ ┃ ┃ ┣ 📜UserEdit.tsx
 ┃ ┃ ┃ ┣ 📜UserLogin.tsx
 ┃ ┃ ┃ ┣ 📜UserOauth.tsx
 ┃ ┃ ┃ ┣ 📜UserPage.tsx
 ┃ ┃ ┃ ┣ 📜UserSignUp.tsx
 ┃ ┃ ┃ ┗ 📜UserValidLogin.tsx
 ┃ ┃ ┗ 📜ErrorPage.tsx
 ┃ ┣ 📂recoil
 ┃ ┃ ┗ 📜atom.ts
 ┃ ┣ 📂store
 ┃ ┃ ┗ 📜store.ts
 ┃ ┣ 📂types
 ┃ ┃ ┃ 📜CommunityType.ts
 ┃ ┃ ┃ 📜LocationType.ts
 ┃ ┃ ┃ 📜MbtiType.ts
 ┃ ┃ ┃ 📜UserType.ts
 ┃ ┃ ┗ 📜WeatherType.ts
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜env.d.ts
 ┃ ┣ 📜global.d.ts
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.d.ts
 ┃ ┣ 📜main.tsx
 ┃ ┗ 📜routes.tsx
 ┣ 📜.env
 ┣ 📜.eslintrc.cjs
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.cjs
 ┣ 📜index.html
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜postcss.config.ts
 ┣ 📜README.md
 ┣ 📜tailwind.config.ts
 ┣ 📜tsconfig.json
 ┣ 📜vercel.json
 ┗ 📜vite.config.ts
```

## 5. UI 미리보기
<!-- 
|                        시작 화면                         |                        메인 화면                         |                  메인 화면 - 전국 날씨                   |
| :------------------------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
| <img width="250px" alt="thumbnail" src='./public/a.gif'> | <img width="250px" alt="thumbnail" src='./public/b.gif'> | <img width="250px" alt="thumbnail" src='./public/c.gif'> |

|                메인 화면 - 추천 장소 상세                |               메인 화면 - 날씨 성격 테스트               |                       로그인 화면                        |
| :------------------------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
| <img width="250px" alt="thumbnail" src='./public/d.gif'> | <img width="250px" alt="thumbnail" src='./public/e.gif'> | <img width="250px" alt="thumbnail" src='./public/f.gif'> |

|                   커뮤니티 - 메인화면                    |                커뮤니티 - 게시글 상세보기                |                  장소 추천 - 메인 화면                   |
| :------------------------------------------------------: | :------------------------------------------------------: | :------------------------------------------------------: |
| <img width="250px" alt="thumbnail" src='./public/g.gif'> | <img width="250px" alt="thumbnail" src='./public/h.gif'> | <img width="250px" alt="thumbnail" src='./public/i.gif'> |

|                        마이페이지                        |            카테고리 - 상세 내용            |            카테고리 - 상세 내용            |
| :------------------------------------------------------: | :----------------------------------------: | :----------------------------------------: |
| <img width="250px" alt="thumbnail" src='./public/j.gif'> | <img width="250px" alt="thumbnail" src=''> | <img width="250px" alt="thumbnail" src=''> | -->
