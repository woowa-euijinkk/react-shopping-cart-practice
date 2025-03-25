export default function CartPage() {
  const orderAmount = 100_000;
  const distinctItemCount = 3;

  return (
    <button
      onClick={() => {
        // TODO: OrderCheckPage 와 orderAmount, distinctItemCount 공유하기
      }}
    >
      주문 확인
    </button>
  );
}
