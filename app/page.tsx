import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";


export default function Home() {
  console.log("Hello from home")
  return (
    <div className="m-4">
      <h1>HomePage content</h1>
    </div>
  );
}
