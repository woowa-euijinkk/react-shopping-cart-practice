import { Fragment } from "react";
import { CartItemType, useGetCartItems } from "./remote";
import { useCheckedCartItemIds } from "./useCheckedCartItemIds";

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
  const [checkedCartItemIds, setCheckedCartItemIds] = useCheckedCartItemIds({
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
              checked={checkedCartItemIds[cartItem.id]}
              onCheck={() => {
                setCheckedCartItemIds((prev) => ({
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
      <button onClick={onCheck}>toggle button</button>
    </>
  );
}
