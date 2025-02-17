import React from "react";

import Location from "@pages/location/Location";
import usePageTitle from "@hooks/usePageTitle";
import useScrollTop from "@hooks/useScrollTop";
import ToTheTopButton from "@components/layout/ToTheTopButton";

function LocationMainPage() {
  usePageTitle("Location");
  useScrollTop();
  return (
    <div className="max-w-[600px] min-w-[320px] m-auto">
      <ToTheTopButton />
      <Location />
    </div>
  );
}

export default LocationMainPage;
