import { Fragment } from "react";
import { CartItemType, useGetCartItems } from "./remote";
import { useCheckedCartItemIds } from "./useCheckedCartItemIds";

export default function CartPage() {
  const cartItems = useGetCartItems();
  const [checkedCartItemIds, setCheckedCartItemIds] = useCheckedCartItemIds({
    cartItems,
  });
  const hasSelectedItems = Object.values(checkedCartItemIds).some(
    (checked) => checked
  );

  return (
    <>
      <CartItemsSection
        checkedCartItemIds={checkedCartItemIds}
        setCheckedCartItemIds={setCheckedCartItemIds}
      />
      <BottomCTA disabled={hasSelectedItems} />
    </>
  );
}

function BottomCTA({ disabled }: { disabled: boolean }) {
  return <button disabled={disabled}>주문확인</button>;
}

function CartItemsSection({
  checkedCartItemIds,
  setCheckedCartItemIds,
}: {
  checkedCartItemIds: Record<string, boolean>;
  setCheckedCartItemIds: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) {
  return (
    <div>
      <AllSelectButton />
      <CartItems
        checkedCartItemIds={checkedCartItemIds}
        setCheckedCartItemIds={setCheckedCartItemIds}
      />
    </div>
  );
}

function AllSelectButton() {
  return <div>AllSelectButton</div>;
}

function CartItems({
  checkedCartItemIds,
  setCheckedCartItemIds,
}: {
  checkedCartItemIds: Record<string, boolean>;
  setCheckedCartItemIds: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}) {
  const cartItems = useGetCartItems();

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
