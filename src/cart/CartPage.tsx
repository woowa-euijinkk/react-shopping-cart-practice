import { Fragment } from "react";
import { CartItemType, useCartItem } from "./remote";

export default function CartPage() {
  return (
    <>
      <Title />
      <CartItemsSection />
    </>
  );
}

function Title() {
  // TODO:
  const cartItemLength = 10;
  return (
    <div>
      <h2>장바구니</h2>
      {cartItemLength > 0 && (
        <h3>{`현재 ${cartItemLength}종류의 상품이 담겨있습니다.`}</h3>
      )}
    </div>
  );
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
  // TODO:
  const cartItems = useCartItem();

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
  return <div>{cartItem.id}</div>;
}
