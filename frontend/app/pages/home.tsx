import type { Route } from "../pages/+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Real Time Chat Application" },
    { name: "Technology", content: "React, ExpressJs, Postgress" },
  ];
}

export default function Home() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <h1>Home Page</h1>
    </main>
  );
}
