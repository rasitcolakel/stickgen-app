import {
  Info,
  LucideIcon,
  MoonStar,
  Sun,
  CheckIcon,
  Loader2Icon,
  DownloadIcon,
} from "lucide-react-native";
import { cssInterop } from "nativewind";

function interopIcon(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
      },
    },
  });
}

interopIcon(Info);
interopIcon(MoonStar);
interopIcon(Sun);
interopIcon(CheckIcon);
interopIcon(Loader2Icon);
interopIcon(DownloadIcon);

export { Info, MoonStar, Sun, CheckIcon, Loader2Icon, DownloadIcon };
