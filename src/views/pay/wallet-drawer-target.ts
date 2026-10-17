import type { PayToken } from "@stableflow/pay-widgets/token-select";
import { chainLabel } from "@/config/chains";
import { CHAIN_KINDS, type ChainKind } from "@/wallet/types";

function isChainKind(value: string): value is ChainKind {
  return (CHAIN_KINDS as readonly string[]).includes(value);
}

export function receiverTokenDisabledReason(
  token: PayToken,
  lockChainKind: string | null | undefined,
): string | null {
  if (!token.supportReceive) return "This token cannot be received";
  if (lockChainKind && token.chain.chainKind !== lockChainKind) {
    const label = isChainKind(lockChainKind) ? chainLabel(lockChainKind) : lockChainKind;
    return `Recipient address is on ${label}; edit the recipient to change chain`;
  }
  return null;
}

export function payerTokenDisabledReason(
  token: PayToken,
  options: {
    allowedBlockchains: readonly string[] | null;
    disabledBlockchains: readonly string[] | null;
    disabledReason?: string;
  },
): string | null {
  if (!token.supportPayment) return "This token cannot be used to pay";
  const code = token.blockchain.toLowerCase();
  if (options.disabledBlockchains?.some((item) => item.toLowerCase() === code)) {
    return options.disabledReason ?? "This network is not available for this payment";
  }
  if (options.allowedBlockchains?.length) {
    const allowed = options.allowedBlockchains.some((item) => item.toLowerCase() === code);
    if (!allowed) return "This network is not available for this payment";
  }
  return null;
}
