import { Fragment } from "react";
import { CartItemType, useGetCartItems } from "./remote";
import { useCheckedIds } from "./useCheckedIds";

export default function CartPage() {
  return (
    <>
      <CartItemsSection />
      <BottomCTA />
    </>
  );
}

function BottomCTA() {
  // TODO:
  // const hasSelectedItems = Object.values(checkedIds).some((checked) => checked);
  const hasSelectedItems = false;

  return <button disabled={hasSelectedItems}>주문확인</button>;
}

function CartItemsSection() {
  return (
    <div>
      <AllSelectButton />
      <CartItems />
    </div>
  );
}

function AllSelectButton() {
  return <div>AllSelectButton</div>;
}

function CartItems() {
  const cartItems = useGetCartItems();
  // TODO:
  const [checkedIds, setCheckedIds] = useCheckedIds({
    cartItems,
  });

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
