import { EquipmentChart } from "@/components/ui/equipment-chart";
import { fetchServer } from "@/utils/fetchServer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const res = await fetchServer(
    `${process.env.NEXT_PUBLIC_API_URL}/sensor-reading?equipmentId=${id}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    return <p>Dados indisponíveis</p>;
  }

  const data = await res.json();

  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <p className="mb-4 font-bold">
        Histórico de temperaturas do equipamento {id}
      </p>
      <div className="w-1/2">
        <EquipmentChart rawData={data} />
      </div>
    </div>
  );
}
