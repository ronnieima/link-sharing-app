import { getApi } from "./actions";

export default async function Home() {
  const message = await getApi();
  return (
    <main>
      <h1 className="text-heading-m ">Let’s get you started</h1>
      <h2 className="text-heading-s">Let’s get you started</h2>
      <p className="text-body-m">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
        Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
        Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
      </p>
      <p className="text-body-s">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio.
        Quisque volutpat mattis eros. Nullam malesuada erat ut turpis.
        Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.
      </p>
      <p>{message}</p>
    </main>
  );
}
