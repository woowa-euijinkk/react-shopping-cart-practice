export default function OrderCheckPage() {
  const orderAmount = 100_000;
  const distinctItemCount = 3;
  return (
    <>
      <div>{`상품 ${distinctItemCount}개를 주문합니다`}</div>
      <div>{`주문금액 : ${orderAmount}`}</div>
    </>
  );
}
