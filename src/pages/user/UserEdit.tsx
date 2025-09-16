import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memberState } from "@recoil/atom";

import useCustomAxios from "@hooks/useCustomAxios";

import { toast } from "react-toastify";
import type { UserMainData } from "types/UserType";
import Button from "@components/layout/Button";

function UserEdit() {
  const [user, setUser] = useRecoilState<UserMainData>(memberState);
  const [name, setName] = useState<string>(user.name);
  const [phone, setPhone] = useState<string>(user.phone);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>("");
  const axios = useCustomAxios();
  const navigate = useNavigate();
  // console.log(user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedData = {
        name,
        phone,
        email,
        password
      };
      let updated = false;
      console.log(updatedData);

      if (name !== user.name) {
        updatedData.name = name;
        updated = true;
      }
      if (phone !== user.phone) {
        updatedData.phone = phone;
        updated = true;
      }
      if (email !== user.email) {
        updatedData.email = email;
        updated = true;
      }
      if (password !== "") {
        updatedData.password = password;
        updated = true;
      }

      if (!updated) {
        toast("변경된 정보가 없습니다.");
        return;
      }

      const response = await axios.patch(`/users/${user._id}`, updatedData);
      if (response.status !== 200) {
        throw new Error("회원가입 정보를 수정하는 데 실패했습니다.");
      }

      setUser(prevUser => ({
        ...prevUser,
        ...updatedData
      }));

      // 변경된 부분만 초기화
      if (updatedData.name) {
        setName(updatedData.name);
      }
      if (updatedData.phone) {
        setPhone(updatedData.phone);
      }
      if (updatedData.email) {
        setEmail(updatedData.email);
      }
      setPassword(updatedData.password);
      toast("회원 정보가 성공적으로 수정되었습니다.");
      navigate("/user/mypage");
    } catch (error) {
      console.error(error);
      toast("회원 정보 수정에 실패했습니다.");
    }
  };

  return (
    <nav className="m-auto h-screen min-w-[320px] max-w-[600px] bg-slate-50">
      <div className="flex w-full flex-col gap-4 bg-white p-4 drop-shadow-sm">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 bg-white text-body drop-shadow-sm"
        >
          <div className="flex flex-col gap-2">
            <div className="relative flex w-full items-center justify-center">
              <svg
                className="absolute left-0 top-0 h-5 w-5 cursor-pointer hover:scale-110"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                onClick={() => window.history.back()}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <h1 className="text-subtitle font-bold">회원 정보 수정</h1>
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="flex w-1/6 items-center justify-start text-body text-toss-gray"
              >
                닉네임
              </label>
              <input
                id="name"
                type="text"
                placeholder="수정할 닉네임을 입력하세요"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-3/4 rounded-button border-gray-300 bg-slate-100 p-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="flex w-1/6 items-center justify-start text-body text-toss-gray"
              >
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="새로운 이메일을 입력하세요"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-3/4 rounded-button border-gray-300 bg-slate-100 p-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="flex w-1/6 items-center justify-start text-body text-toss-gray"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="새로운 비밀번호 입력하세요"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-3/4 rounded-button border-gray-300 bg-slate-100 p-3 focus:border-transparent focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <Button
            text={"수정하기"}
            bgColor="blue"
            textColor="white"
            width="full"
            height="12"
            onClick={() => {}}
          ></Button>
        </form>
      </div>
    </nav>
  );
}

export default UserEdit;
