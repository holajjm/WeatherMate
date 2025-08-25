import React, { Suspense } from "react";

import Loading from "@components/layout/Loading";

function WithSuspense(Component: React.ReactNode) {
  return <Suspense fallback={<Loading />}>{Component}</Suspense>;
}

export default WithSuspense;
