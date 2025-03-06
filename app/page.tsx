import { Get } from "./Get/Get";

export default function Home() {
  return (
    <>
      <h1 className="text-2xl font-bold text-lime-500">Link Management</h1>
      <Get />
    </>
  );
}
