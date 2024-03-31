import AuthedNavbar from "./_components/AuthedNavbar";

export default async function AuthedLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <section>
      <AuthedNavbar />
      {children}
    </section>
  );
}
