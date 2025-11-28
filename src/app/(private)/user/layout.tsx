

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" w-full">
      <div className="  relative w-full h-screen ">{children}</div>
    </div>
  );
}
