import { Fragment } from "react";
import { CartItemType, useGetCartItems } from "./remote";

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
  const cartItemsLength = useGetCartItems()?.length;

  if (cartItemsLength == null) {
    return null;
  }

  return (
    <div>
      <h2>장바구니</h2>
      {cartItemsLength > 0 && (
        <h3>{`현재 ${cartItemsLength}종류의 상품이 담겨있습니다.`}</h3>
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
  return <div>{cartItem.id}</div>;
}
