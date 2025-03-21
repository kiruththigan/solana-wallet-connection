"use client";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { use, useEffect, useState } from "react";

export default function Home() {
  const [isMOunt, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMOunt) {
    return null;
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <WalletMultiButton />
      </main>
    </div>
  );
}
