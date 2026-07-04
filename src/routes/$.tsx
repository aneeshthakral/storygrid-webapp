import { createFileRoute } from "@tanstack/react-router";
import ClientOnlyApp from "@/components/ClientOnlyApp";

export const Route = createFileRoute("/$")({
  component: SpaMount,
});

function SpaMount() {
  return <ClientOnlyApp load={() => import("@/StoryGridApp")} />;
}