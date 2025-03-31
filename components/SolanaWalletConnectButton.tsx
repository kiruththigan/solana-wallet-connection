"use client";
import React, { useState } from "react";
import { Wallet, X } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { truncateMiddle } from "@/lib/utils";
import { Button } from "./ui/button";
import { isMobile, isTablet, isDesktop } from "react-device-detect";

interface WalletConnectionProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;
}

const WalletConnection = ({
  open,
  onOpenChange,
  trigger,
}: WalletConnectionProps) => {
  const { select, wallets, publicKey, disconnect, connecting } = useWallet();
  const [internalOpen, setInternalOpen] = useState<boolean>(false);
  const isControlled = open !== undefined && onOpenChange !== undefined;
  const dialogOpen = isControlled ? open : internalOpen;
  const setDialogOpen = isControlled ? onOpenChange : setInternalOpen;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleWalletSelect = async (walletName: any) => {
    if (walletName) {
      try {
        select(walletName);
        setDialogOpen(false);
      } catch (error) {
        console.log("wallet connection err : ", error);
      }
    }
  };

  const handleDisconnect = async () => {
    disconnect();
  };

  const defaultTrigger = (
    <Button className="button-header !bg-transparent sm:!bg-[#00FF001A] border border-[#333333] sm:border-none uppercase px-3 w-full">
      <div
        className="corner-tl sm:!border-[#00ff00]"
        style={{ borderColor: "#FFFFFF" }}
      ></div>
      <div
        className="corner-tr sm:!border-[#00ff00]"
        style={{ borderColor: "#FFFFFF" }}
      ></div>
      <div
        className="corner-br sm:!border-[#00ff00]"
        style={{ borderColor: "#FFFFFF" }}
      ></div>
      <div
        className="corner-bl sm:!border-[#00ff00]"
        style={{ borderColor: "#FFFFFF" }}
      ></div>

      {connecting ? (
        <p>connecting...</p>
      ) : (
        <div className="flex w-full justify-center items-center gap-2">
          <Wallet className="sm:text-primary" />{" "}
          <span className="sm:hidden">Connect Wallet</span>
        </div>
      )}
    </Button>
  );

  return (
    <div className="text-white w-full">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="flex gap-2 items-center w-full">
          {!publicKey ? (
            <div className="w-full">
              <DialogTrigger className="w-full" asChild>
                {trigger || defaultTrigger}
              </DialogTrigger>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="button-header px-5 w-full">
                  <div className="corner-tl"></div>
                  <div className="corner-tr"></div>
                  <div className="corner-br"></div>
                  <div className="corner-bl"></div>
                  <div className="truncate">
                    {truncateMiddle(publicKey.toBase58())}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="border-none rounded-sm bg-dark ring-1 ring-inset ring-white/10">
                <DropdownMenuItem className="flex justify-center hover:bg-black focus:bg-transparent">
                  <Button
                    className="button-header !bg-red-600 !text-white "
                    onClick={handleDisconnect}
                  >
                    Disconnect
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <DialogContent className="border-none  rounded-sm bg-gray-400 dark:!bg-[#0C0C0C] ring-1 ring-inset ring-white/10 sm:w-[370px]">
            <div className="absolute right-4 top-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDialogOpen(false)}
                className="hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <DialogTitle className="title-regular-semi-bold text-center">
              <p>Connect a wallet on</p>
              <p>Solana to continue</p>
            </DialogTitle>
            <div className="flex flex-col justify-start space-y-3 overflow-y-auto mt-5">
              {wallets
                .filter(
                  (wallet) => !(isMobile && wallet.adapter.name === "Phantom")
                )
                .map((wallet) => (
                  <Button
                    key={wallet.adapter.name}
                    onClick={() => handleWalletSelect(wallet.adapter.name)}
                    variant={"ghost"}
                    className="font-barlow flex justify-start gap-4 text-lg hover:bg-white/30 rounded-none p-5 transition-all duration-300"
                  >
                    <div>
                      <Image
                        src={wallet.adapter.icon}
                        alt={wallet.adapter.name}
                        height={30}
                        width={30}
                        className="rounded-sm"
                      />
                    </div>
                    <div>{wallet.adapter.name}</div>
                  </Button>
                ))}
            </div>
            <DialogDescription></DialogDescription>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
};

export default WalletConnection;
