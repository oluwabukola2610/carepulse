import Image from "next/image";
import React from "react";

const Layout = ({children}:{ children: React.ReactNode;}) => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">{children}</section>
      <Image
        src="/assets/images/onboarding-img.png"
        height={1000}
        width={1000}
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
};

export default Layout;
