import type { ButtonHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: LucideIcon;
  label: string;
};

export function ActionButton({ icon: Icon, label, ...props }: ActionButtonProps) {
  return (
    <button className="action-button" type="button" {...props}>
      <Icon size={21} aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}
