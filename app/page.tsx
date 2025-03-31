"use client";
import WalletConnection from "@/components/SolanaWalletConnectButton";
import WalletConnectionCustom from "@/components/WalletConnection";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { isMobile, isTablet, isDesktop } from "react-device-detect";

export default function Home() {
  const [isMOunt, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    if (isMobile) {
      const buttons = document.querySelectorAll(".wallet-adapter-button");
      buttons.forEach((btn) => {
        if (btn.textContent?.includes("Phantom")) {
          (btn as HTMLElement).hidden = true;
        }
      });
    }
  },[isMOunt]);

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMOunt) {
    return null;
  }
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* <WalletMultiButton /> */}
        {/* <WalletConnection/> */}
        <WalletConnectionCustom/>
      </main>
      <div>
        {isMobile && <p>You're using a mobile device</p>}
        {isTablet && <p>You're using a tablet</p>}
        {isDesktop && <p>You're using a desktop</p>}
      </div>
    </div>
  );
}
