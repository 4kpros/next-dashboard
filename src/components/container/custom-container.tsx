export function CustomContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-screen-2xl flex flex-col flex-wrap items-center justify-center mx-auto px-4">
      {children}
    </div>
  );
}

export function CustomContainerXl({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full max-w-[1650px] flex flex-col flex-wrap items-center justify-center mx-auto px-4">
      {children}
    </div>
  );
}

export function CustomContainerMd({
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

export function CustomContainerFullHeight({
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

