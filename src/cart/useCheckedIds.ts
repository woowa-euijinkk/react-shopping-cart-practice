import { useEffect, useState } from "react";
import { CartItemType } from "./remote";

export function useCheckedIds({ cartItems }: { cartItems: CartItemType[] }) {
  const [checkedIds, setCheckedIds] = useState<
    Record<CartItemType["id"], boolean>
  >({});

  useEffect(() => {
    const shouldInitialize =
      cartItems.length > 0 && Object.keys(checkedIds).length === 0;

    if (shouldInitialize === true) {
      setCheckedIds(
        cartItems.reduce<Record<string, boolean>>((acc, curr) => {
          acc[curr.id] = true;
          return acc;
        }, {})
      );
    }
  }, [cartItems, checkedIds]);

  return [checkedIds, setCheckedIds] as const;
}
