import OrderPage from "./OrderPage";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  console.log("Reservation Number in Order Page:", id);

  return <OrderPage reservationNumber={id} />;
}
