import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartItemType, useGetCartItems } from "./remote";

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

const CheckedCartItemIds = createContext<{
  checkedCartItemIds: Record<string, boolean>;
  setCheckedCartItemIds: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
} | null>(null);

export function CheckedCartItemIdsProvider({ children }: PropsWithChildren) {
  const cartItems = useGetCartItems();
  const [checkedCartItemIds, setCheckedCartItemIds] = useCheckedCartItemIds({
    cartItems,
  });

  const values = useMemo(
    () => ({
      checkedCartItemIds,
      setCheckedCartItemIds,
    }),
    [checkedCartItemIds, setCheckedCartItemIds]
  );

  return (
    <CheckedCartItemIds.Provider value={values}>
      {children}
    </CheckedCartItemIds.Provider>
  );
}

export function useCheckedCartItemIdsContext() {
  const ctx = useContext(CheckedCartItemIds);

  if (ctx == null) {
    throw new Error(`CheckedCartItemIds should be initialized`);
  }
  return ctx;
}
