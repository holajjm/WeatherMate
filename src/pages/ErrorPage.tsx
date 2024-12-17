import React from 'react';
import Footer from '@components/layout/Footer';
import Header from '@components/layout/Header';

function ErrorPage() {
  return (
    <>
      <Header />
      <nav className='max-w-[600px] min-w-[320px] m-auto h-screen p-2 bg-slate-50'>
        <div className="h-1/2 bg-white rounded-xl drop-shadow-lg flex flex-col gap-8 items-center justify-center text-center">
          <img className="w-60" src="/error.svg" alt="Error" />
          <h1 className="text-2xl font-semibold font-TTLaundryGothicB">Page not Found</h1>
          <p className="ttext-base text-slate-600">서버와의 통신이 원활하지 않아<br/>데이터를 불러올 수 없습니다</p>
        </div>
      </nav>
      <Footer />
    </>
  );
}

export default ErrorPage;
