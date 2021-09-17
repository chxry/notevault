import React, { ReactNode } from "react";

import "../scss/layout.scss";

const Layout = ({
  header,
  center,
  children,
}: {
  header: string;
  center?: boolean;
  children: ReactNode;
}) => {
  return (
    <>
      <header>
        <h2>{header}</h2>
      </header>
      <main className={center ? "center" : ""}>
        <div className="content">{children}</div>
      </main>
    </>
  );
};

export default Layout;
