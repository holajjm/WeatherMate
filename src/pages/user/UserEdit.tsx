import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { memberState } from "@recoil/atom";

import useCustomAxios from "@hooks/useCustomAxios";

import { toast } from "react-toastify";
import type { UserMainData } from "types/UserType";

function UserEdit() {
  const [user, setUser] = useRecoilState<UserMainData>(memberState);
  const [name, setName] = useState<string>(user.name);
  const [phone, setPhone] = useState<string>(user.phone);
  const [email, setEmail] = useState<string>(user.email);
  const [password, setPassword] = useState<string>("");
  const axios = useCustomAxios();
  const navigate = useNavigate();
  console.log(user);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedData = {
        name,
        phone,
        email,
        password,
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
        ...updatedData,
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
    <nav className="m-auto h-screen min-w-[320px] max-w-[600px] bg-slate-50 p-2">
      <div className="flex w-full flex-col gap-4 rounded-xl bg-white p-4 drop-shadow-lg">
        <h1 className="font-UhBeeKangJa m-auto h-16 p-4 text-2xl font-bold">
          회원 정보 수정
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            id="name"
            type="text"
            placeholder="수정할 이름을 입력하세요"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full rounded-xl border-gray-300 bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
          />
          <input
            id="phone"
            type="text"
            placeholder="수정할 번호을 입력하세요"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="w-full rounded-xl border-gray-300 bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
          />
          <input
            id="email"
            type="email"
            placeholder="새로운 이메일을 입력하세요"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-xl border-gray-300 bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
          />
          <input
            id="password"
            type="password"
            placeholder="새로운 비밀번호 입력하세요"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-xl border-gray-300 bg-slate-100 p-4 focus:border-transparent focus:ring-2 focus:ring-primary"
          />
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/user/mypage")}
              type="button"
              className="font-UhBeeKangJa w-full text-nowrap rounded-lg border-2 border-slate-100 bg-slate-200 p-4 text-gray-500 transition-all duration-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
            >
              취소하기
            </button>
            <button
              type="submit"
              className="font-UhBeeKangJa w-full text-nowrap rounded-lg border-2 border-slate-100 bg-sky-400 p-4 text-white transition-all duration-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
            >
              수정하기
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
}

export default UserEdit;
