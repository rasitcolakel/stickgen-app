// generate a divider component
import { type VariantProps, cva } from "class-variance-authority";
import { View } from "react-native";

import { cn } from "~/lib/utils";

const dividerVariants = cva("h-px border-t border-border", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface DividerProps extends VariantProps<typeof dividerVariants> {}

function Divider({ variant }: DividerProps) {
  return <View className={cn(dividerVariants({ variant }))} />;
}

export { Divider };
