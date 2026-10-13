import { Button } from "@stableflow/pay-ui/button";
import { Dialog } from "@stableflow/pay-ui/dialog";
import { HEADER_CHAIN_LOGO } from "@/components/layout/config";
import { MultisigBadge } from "@/components/multisig/MultisigBadge";
import { PayFromSquadSection } from "@/components/multisig/PayFromSquadSection";
import { chainLabel, FIXED_CHAIN_KINDS } from "@/config/chains";
import { useWallet } from "@/hooks/use-wallet";
import { chainLogoUrl } from "@/lib/logo";
import { formatAddress } from "@/utils";
import { useSafeMode } from "@/wallet/evm/safe";
import { useSquadsMode } from "@/wallet/solana/multisig";
import type { ChainKind } from "@/wallet/types";

function kindHint(kind: ChainKind): string {
  if (kind === "near") return "MyNearWallet, HOT, or Meteor.";
  if (kind === "solana") return "Phantom, Solflare, or OKX on mobile.";
  if (kind === "tron") return "TronLink, OKX, or WalletConnect.";
  if (kind === "zec") return "Connect Noir Wallet.";
  return "MetaMask, OKX, or WalletConnect.";
}

function SolanaPayFromSquad() {
  const squads = useSquadsMode();
  if (squads.isSquadsX) return null;
  return <PayFromSquadSection visible />;
}

function ChainRow(props: {
  kind: ChainKind;
  onConnect: () => void;
}) {
  const { kind, onConnect } = props;
  const wallet = useWallet(kind);
  const address = wallet.account?.address || null;
  const safeApp = useSafeMode().mode === "app";
  const hideDisconnect = kind === "evm" && safeApp;
  const showMultisig = Boolean(address) && (kind === "evm" || kind === "near" || kind === "solana");

  return (
    <div className="rounded-[16px] border border-black/10 px-3 py-2.5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <img
            src={chainLogoUrl(HEADER_CHAIN_LOGO[kind])}
            alt=""
            width={24}
            height={24}
            className="size-6 rounded-[6px] object-cover"
          />
          <div className="min-w-0">
            <div className="flex min-w-0 items-center gap-2">
              <p className="font-montserrat text-[14px] font-medium text-black">{chainLabel(kind)}</p>
              {showMultisig ? <MultisigBadge chainKind={kind} /> : null}
            </div>
            {address ? (
              <p className="truncate font-montserrat text-[12px] text-[#606060]">
                {formatAddress(address)}
              </p>
            ) : (
              <p className="font-montserrat text-[12px] text-[#606060]">{kindHint(kind)}</p>
            )}
          </div>
        </div>
        {address ? (
          hideDisconnect ? null : (
            <Button
              type="button"
              size="sm"
              variant="normal"
              className="h-8 shrink-0 px-3 text-[12px]"
              onClick={() => wallet.disconnect()}
            >
              Disconnect
            </Button>
          )
        ) : (
          <Button
            type="button"
            size="sm"
            className="h-8 shrink-0 px-3 text-[12px]"
            loading={wallet.isConnecting}
            onClick={() => {
              onConnect();
              wallet.connect();
            }}
          >
            Connect
          </Button>
        )}
      </div>
      {kind === "solana" && address ? <SolanaPayFromSquad /> : null}
    </div>
  );
}

function walletDialogDescription(): string {
  const kinds = Array.from(FIXED_CHAIN_KINDS.values());
  const simultaneous = kinds.length > 1
    ? `Connect a wallet per chain. ${kinds.map((option) => option.chainKindLabel.toUpperCase()).join(", ")} can stay connected at the same time. `
    : "";
  return `${simultaneous}The connected wallet is used when you send payouts.`;
}

export function WalletConnectDialog({
  open,
  onClose,
  title = "Payment wallet",
  description = walletDialogDescription(),
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}) {
  return (
    <Dialog open={open} onClose={onClose} title={title}>
      <p className="font-montserrat text-[13px] leading-5 text-[#606060]">
        {description}
      </p>
      <div className="mt-4 flex flex-col gap-2">
        {Array.from(FIXED_CHAIN_KINDS.values()).map((option) => (
          <ChainRow key={option.chainKind} kind={option.chainKind} onConnect={onClose} />
        ))}
      </div>
    </Dialog>
  );
}
