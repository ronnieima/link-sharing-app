import PreviewNavbar from "./_components/PreviewNavbar";

export default function PreviewLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <PreviewNavbar />
      {children}
    </section>
  );
}
