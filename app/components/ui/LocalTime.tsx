import { useEffect, useState } from "react";

/** Heure locale du visiteur, mise à jour chaque minute (vide au pré-rendu). */
export function LocalTime({ className }: { className?: string }) {
  const [now, setNow] = useState<string>("--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" });
    const update = () => setNow(fmt.format(new Date()));
    update();
    const id = window.setInterval(update, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className={className} suppressHydrationWarning>
      {now}
    </time>
  );
}
