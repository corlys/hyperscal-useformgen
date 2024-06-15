type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <main className="w-full min-h-screen bg-[#FFF6E9] flex flex-col items-center justify-center px-5">
      {props.children}
    </main>
  );
}
