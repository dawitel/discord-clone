import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const state = false;

export default function Home() {
  return (
    <p className={cn(
      "font-bold text-3xl text-indigo-500",
      state && "text-indigo-200"
    )}>
      hello from discord clone
      <Button variant="outline">Click me</Button>
    </p>
  );
}
