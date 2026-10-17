import { MyWalletsDrawer } from "@stableflow/pay-widgets/my-wallets";
import { WalletChainsButton } from "@stableflow/pay-widgets/wallet-chains-button";
import { MultisigBadge } from "@/components/multisig/MultisigBadge";
import { PayFromSquadSection } from "@/components/multisig/PayFromSquadSection";
import { useWalletDrawerStore } from "@/stores/wallet-drawer";
import { useWalletStore } from "@/stores/wallet";
import { useSquadsMode } from "@/wallet/solana/multisig/use-squads-mode";
import type { ChainKind } from "@/wallet/types";

const BADGE_KINDS = new Set<ChainKind>(["evm", "near", "solana"]);

export function HeaderWalletEntry(props: { withDrawer?: boolean }) {
  const withDrawer = props.withDrawer !== false;
  const open = useWalletDrawerStore((state) => state.open);
  const setOpen = useWalletDrawerStore((state) => state.setOpen);
  const target = useWalletDrawerStore((state) => state.target);
  const chains = useWalletStore((state) => state.chains);
  const squads = useSquadsMode();
  const solanaConnected = Boolean(chains.solana.account?.address);

  return (
    <>
      <WalletChainsButton onClick={() => setOpen(true)} />
      {withDrawer ? (
        <MyWalletsDrawer
          open={open}
          onClose={() => setOpen(false)}
          onSelectToken={target ? (token) => target.onSelect(token) : undefined}
          getTokenDisabledReason={target?.disabledReason}
          renderKindBadge={(kind) => {
            if (!BADGE_KINDS.has(kind as ChainKind)) return null;
            if (!chains[kind as ChainKind]?.account?.address) return null;
            return <MultisigBadge chainKind={kind as ChainKind} />;
          }}
          renderKindExtra={(kind) => {
            if (kind !== "solana" || !solanaConnected || squads.isSquadsX) return null;
            return <PayFromSquadSection visible />;
          }}
        />
      ) : null}
    </>
  );
}
