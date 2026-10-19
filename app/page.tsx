import ClientPage from "./components/ClientPage";

/* Server component: the route itself ships no client JS of its own. */
export default function Page() {
  return <ClientPage />;
}
