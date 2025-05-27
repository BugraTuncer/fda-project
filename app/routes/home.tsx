import { DeviceContainer } from "~/containers/DeviceContainer";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FDA Medical Device Explorer" },
    {
      name: "description",
      content: "Explore FDA medical device data",
    },
  ];
}

export default function Home() {
  return <DeviceContainer />;
}
