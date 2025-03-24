import { useEffect } from "react";
import { CartItemType } from "./remote";
import { atom, useRecoilState } from "recoil";

const checkedAtom = atom<Record<string, boolean>>({
  key: "checked",
  default: {},
});

export function useCheckedCartItemIds({
  cartItems,
}: {
  cartItems: CartItemType[];
}) {
  const [checkedCartItemIds, setCheckedCartItemIds] =
    useRecoilState(checkedAtom);

  useEffect(() => {
    const shouldInitialize =
      cartItems.length > 0 && Object.keys(checkedCartItemIds).length === 0;

    if (shouldInitialize === true) {
      setCheckedCartItemIds(
        cartItems.reduce<Record<string, boolean>>((acc, curr) => {
          acc[curr.id] = true;
          return acc;
        }, {})
      );
    }
  }, [cartItems, checkedCartItemIds, setCheckedCartItemIds]);

  return [checkedCartItemIds, setCheckedCartItemIds] as const;
}
