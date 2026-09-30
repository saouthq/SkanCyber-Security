import type { Route } from "./+types/not-found";
import { NotFound } from "~/sections/NotFound";

export const meta: Route.MetaFunction = () => [{ title: "Page introuvable — SkanCyber" }, { name: "robots", content: "noindex" }];

export default function NotFoundRoute() {
  return <NotFound />;
}
