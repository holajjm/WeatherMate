import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { memberState } from "../../recoil/atom.js";

import useCustomAxios from "@hooks/useCustomAxios.js";

const UserOAuth = () => {
  const [loading, setLoading] = useState(true);
  const setUser = useSetRecoilState(memberState);
  const axios = useCustomAxios();
  const navigate = useNavigate();
  const location = useLocation();
  // 토큰 -> 사용자 정보 -> 백엔드
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const redirect_uri = `${window.location.origin}/auth/kakao`;
  console.log(redirect_uri);
  console.log(code);

  const sendUserDataToBackend = async () => {
    try {
      const res = await axios.post("/users/login/kakao", {
        code,
        redirect_uri,
      });
      console.log("User data sent to backend:", res.data);
      if (res.data.item) {
        setUser({
          _id: res.data.item._id,
          email: res.data.item.email,
          name: res.data.item.name,
          phone: res.data.item.phone,
          profile: res.data.item.profileImage,
          token: res.data.item.token,
        });
        alert(res.data.item.name + "님 반갑습니다");
        navigate(location.state?.from ? location.state?.from : "/main");
        console.log(res.data.item);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    sendUserDataToBackend();
  });

  return (
    <div className="max-w-[600px] min-w-[320px] m-auto h-screen p-2 bg-slate-50">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <img className="w-60" src="/error.svg" alt="Loading" />
          <h1 className="text-xl font-semibold font-TTLaundryGothicB">
            Loading
          </h1>
        </div>
      ) : (
        <div>Successfully received user data.</div>
      )}
    </div>
  );
};

export default UserOAuth;
