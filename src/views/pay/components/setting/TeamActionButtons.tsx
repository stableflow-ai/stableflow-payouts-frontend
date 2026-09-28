import { IconLink } from "@stableflow/pay-ui/icons/link";
import { IconPlus } from "@stableflow/pay-ui/icons/plus";
import { Button } from "@stableflow/pay-ui/button";
import { BUTTON_SIZE, BUTTON_VARIANT } from "@stableflow/pay-ui/button";
import { cn } from "@/lib/utils";

export function TeamActionButtons(props: {
  onAddMember: () => void;
  onInvite: () => void;
  className?: string;
  buttonClassName?: string;
}) {
  const { onAddMember, onInvite, className, buttonClassName } = props;
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Button
        variant={BUTTON_VARIANT.Normal}
        size={BUTTON_SIZE.Sm}
        className={cn(
          "h-9 rounded-[8px] border-dashed border-[#aaa] bg-white px-3 text-black shadow-[0_0_6px_0_rgba(0,0,0,0.06)]",
          buttonClassName,
        )}
        onClick={onAddMember}
      >
        <IconPlus className="size-3.5 shrink-0" />
        Add Member
      </Button>
      <Button
        size={BUTTON_SIZE.Sm}
        className={cn(
          "h-9 min-w-[120px] rounded-[8px] px-3",
          buttonClassName,
        )}
        onClick={onInvite}
      >
        <IconLink className="size-3.5 shrink-0 text-white" />
        Invite
      </Button>
    </div>
  );
}
