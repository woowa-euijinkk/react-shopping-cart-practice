import { useEffect, useState } from "react";
import { CartItemType } from "./remote";

export function useCheckedCartItemIds({
  cartItems,
}: {
  cartItems: CartItemType[];
}) {
  const [checkedCartItemIds, setCheckedCartItemIds] = useState<
    Record<string, boolean>
  >({});

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
  }, [cartItems, checkedCartItemIds]);

  return [checkedCartItemIds, setCheckedCartItemIds] as const;
}
