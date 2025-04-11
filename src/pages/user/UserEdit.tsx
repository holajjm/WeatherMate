import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { memberState } from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import useCustomAxios from "@hooks/useCustomAxios";
import { UserMainData } from "type";

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
        alert("변경된 정보가 없습니다.");
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
      alert("회원 정보가 성공적으로 수정되었습니다.");
      navigate('/user/mypage')
    } catch (error) {
      console.error(error);
      alert("회원 정보 수정에 실패했습니다.");
    }
  };

  return (
    <nav className="max-w-[600px] min-w-[320px] m-auto h-screen p-2 bg-slate-50">
      <div className="bg-white flex flex-col gap-4 rounded-xl p-4 w-full drop-shadow-lg">
        <h1 className="font-bold text-2xl p-4 h-16 font-UhBeeKangJa m-auto">
          회원 정보 수정
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            id="name"
            type="text"
            placeholder="수정할 이름을 입력하세요"
            value={name}
            onChange={e => setName(e.target.value)}
            className="p-4 rounded-xl bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
          />
          <input
            id="phone"
            type="text"
            placeholder="수정할 번호을 입력하세요"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="p-4 rounded-xl bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
          />
          <input
            id="email"
            type="email"
            placeholder="새로운 이메일을 입력하세요"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="p-4 rounded-xl bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
          />
          <input
            id="password"
            type="password"
            placeholder="새로운 비밀번호 입력하세요"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="p-4 rounded-xl bg-slate-100 border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent w-full"
          />
          <div className="flex gap-2">
            <button
              onClick={() => navigate("/user/mypage")}
              type="button"
              className="w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-gray-500 bg-slate-200 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
            >
              취소하기
            </button>
            <button
              type="submit"
              className="w-full p-4 border-2 border-slate-100 rounded-lg font-UhBeeKangJa transition-all duration-200 text-nowrap text-white bg-sky-400 hover:shadow-[0_4px_8px_1px] hover:shadow-slate-400"
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
