import Image from "next/image";
import { RecoilRoot } from "recoil";

export default function Home() {
  return (
    <RecoilRoot>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      This is the main file
    </main>
    </RecoilRoot>
  );
}
