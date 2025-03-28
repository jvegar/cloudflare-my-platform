import Footer from "~/components/footer/Footer";
import type { Route as RouterType } from "./+types/index";
import Header from "~/components/header/Header";
import Home from "~/components/home/Home";
import { Route, Routes } from "react-router";

export function meta({}: RouterType.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader({ context }: RouterType.LoaderArgs) {
  return { message: context.cloudflare.env.VALUE_FROM_CLOUDFLARE };
}

function MainContent() {
  return <>
    <Home/>
  </>;
}

export default function Index({ loaderData }: RouterType.ComponentProps) {
  return <><Header/><Routes>
    <Route path="/" element={<MainContent/>}/>
    </Routes><Footer/></>;
}
