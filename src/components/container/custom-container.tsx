import React from "react";

function CustomContainer({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="w-full max-w-screen-xl flex flex-col flex-wrap items-center justify-center mx-auto px-4">
      {children}
    </div>
  );
}

function CustomContainerFullHeight({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className="w-full h-screen max-w-screen-xl flex flex-col flex-wrap items-center justify-center mx-auto p-4">
      {children}
    </div>
  );
}

export {
  CustomContainer,
  CustomContainerFullHeight
}