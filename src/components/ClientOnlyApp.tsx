import { useEffect, useState, type ComponentType } from "react";

interface Props {
  load: () => Promise<{ default: ComponentType }>;
}

export default function ClientOnlyApp({ load }: Props) {
  const [Comp, setComp] = useState<ComponentType | null>(null);

  useEffect(() => {
    let mounted = true;
    load().then((m) => {
      if (mounted) setComp(() => m.default);
    });
    return () => {
      mounted = false;
    };
  }, [load]);

  if (!Comp) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-pulse rounded-full bg-ember/40" />
      </div>
    );
  }

  return <Comp />;
}