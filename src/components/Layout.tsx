import React, { ReactNode } from "react";

import "../scss/layout.scss";

const Layout = ({
  header,
  center,
  pad,
  children,
}: {
  header: string;
  center?: boolean;
  pad?: boolean;
  children: ReactNode;
}) => {
  return (
    <>
      <header>
        <h2>{header}</h2>
      </header>
      <main className={center ? "center" : ""}>
        <div className={pad ? "pad content" : "content"}>{children}</div>
      </main>
    </>
  );
};

export default Layout;
