import { Fragment } from "react";
import { CartItemType, useGetCartItems } from "./remote";
import {
  CheckedCartItemIdsProvider,
  useCheckedCartItemIdsContext,
} from "./useCheckedCartItemIds";

export default function CartPage() {
  const cartItems = useGetCartItems();
  return (
    <CheckedCartItemIdsProvider cartItems={cartItems}>
      <CartItemsSection />
      <BottomCTA />
    </CheckedCartItemIdsProvider>
  );
}

function BottomCTA() {
  const { checkedCartItemIds } = useCheckedCartItemIdsContext();
  const hasSelectedItems = Object.values(checkedCartItemIds).some((c) => c);
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

  if (cartItems == null) {
    return null;
  }

  return (
    <>
      {cartItems.map((cartItem) => {
        return (
          <Fragment key={cartItem.id}>
            <CartItem cartItem={cartItem} />
          </Fragment>
        );
      })}
    </>
  );
}

function CartItem({ cartItem }: { cartItem: CartItemType }) {
  const { checkedCartItemIds, setCheckedCartItemIds } =
    useCheckedCartItemIdsContext();
  return (
    <>
      <div>{cartItem.id}</div>
      <div>{checkedCartItemIds[cartItem.id]}</div>
      <button
        onClick={() => {
          setCheckedCartItemIds((prev) => {
            return {
              ...prev,
              [cartItem.id]: !prev[cartItem.id],
            };
          });
        }}
      >
        toggle button
      </button>
    </>
  );
}
