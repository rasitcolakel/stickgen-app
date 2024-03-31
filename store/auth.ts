import { Session } from "@supabase/supabase-js";
import { atom } from "jotai";

import { selectAtom } from "jotai/utils";

type Auth = {
  session: Session | null;
};

export const sessionAtom = atom<Auth>({
  session: null,
});

export const userIdAtom = selectAtom(
  sessionAtom,
  (session) => session?.session?.user?.id
);
