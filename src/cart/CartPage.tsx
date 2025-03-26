import { Fragment, useState, useEffect } from "react";
import { CartItemType, useGetCartItems } from "./remote";

export default function CartPage() {
  const cartItems = useGetCartItems();
  const [checkedIds, setCheckedIds] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (cartItems.length > 0 && Object.keys(checkedIds).length === 0) {
      setCheckedIds(
        cartItems.reduce<Record<number, boolean>>((acc, curr) => {
          acc[curr.id] = true;
          return acc;
        }, {})
      );
    }
  }, [cartItems, checkedIds]);

  return (
    <>
      <CartItemsSection
        cartItems={cartItems}
        checkedIds={checkedIds}
        setCheckedIds={setCheckedIds}
      />
      <BottomCTA checkedIds={checkedIds} />
    </>
  );
}

function BottomCTA({ checkedIds }: { checkedIds: Record<number, boolean> }) {
  const hasSelectedItems = Object.values(checkedIds).some(
    (isChecked) => isChecked
  );

  return <button disabled={!hasSelectedItems}>주문확인</button>;
}

function CartItemsSection({
  cartItems,
  checkedIds,
  setCheckedIds,
}: {
  cartItems: CartItemType[];
  checkedIds: Record<number, boolean>;
  setCheckedIds: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}) {
  return (
    <div>
      <AllSelectButton
        cartItems={cartItems}
        checkedIds={checkedIds}
        setCheckedIds={setCheckedIds}
      />
      <CartItems
        cartItems={cartItems}
        checkedIds={checkedIds}
        setCheckedIds={setCheckedIds}
      />
    </div>
  );
}

function AllSelectButton({
  cartItems,
  checkedIds,
  setCheckedIds,
}: {
  cartItems: CartItemType[];
  checkedIds: Record<number, boolean>;
  setCheckedIds: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}) {
  const allSelected = cartItems.every((item) => checkedIds[item.id]);

  const toggleAll = () => {
    const newCheckedState = !allSelected;
    setCheckedIds(
      cartItems.reduce<Record<number, boolean>>((acc, item) => {
        acc[item.id] = newCheckedState;
        return acc;
      }, {})
    );
  };

  return (
    <button onClick={toggleAll}>
      {allSelected ? "전체 해제" : "전체 선택"}
    </button>
  );
}

function CartItems({
  cartItems,
  checkedIds,
  setCheckedIds,
}: {
  cartItems: CartItemType[];
  checkedIds: Record<number, boolean>;
  setCheckedIds: React.Dispatch<React.SetStateAction<Record<number, boolean>>>;
}) {
  if (cartItems == null) {
    return null;
  }

  return (
    <>
      {cartItems.map((cartItem) => {
        return (
          <Fragment key={cartItem.id}>
            <CartItem
              cartItem={cartItem}
              checked={checkedIds[cartItem.id]}
              onCheck={() => {
                setCheckedIds((prev) => ({
                  ...prev,
                  [cartItem.id]: !prev[cartItem.id],
                }));
              }}
            />
          </Fragment>
        );
      })}
    </>
  );
}

function CartItem({
  cartItem,
  checked,
  onCheck,
}: {
  cartItem: CartItemType;
  checked: boolean;
  onCheck: () => void;
}) {
  return (
    <>
      <div>{cartItem.id}</div>
      <div>{String(checked)}</div>
      <button onClick={onCheck}>check button</button>
    </>
  );
}
