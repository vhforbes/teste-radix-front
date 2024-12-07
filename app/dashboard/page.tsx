import { SelectInput } from "@/components/ui/input-select";
import SensorReadingTable from "@/components/ui/sensor-reading-table";
import { fetchServer } from "@/utils/fetchServer";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: {
    timePeriod?: string;
  };
}) {
  const res = await fetchServer(
    `${process.env.NEXT_PUBLIC_API_URL}/sensor-reading/average?timePeriod=${searchParams.timePeriod}`,
    {
      method: "GET",
    },
  );

  if (!res.ok) {
    return <p>Dados indisponíveis</p>;
  }

  const data = await res.json();

  return (
    <div className="mt-10 flex w-full flex-col items-center gap-4">
      <div className="flex items-center gap-4">
        <label>Selecione o período:</label>
        <SelectInput
          className=""
          name="Tempo"
          options={[
            {
              label: "24 Horas",
              value: "24h",
            },
            {
              label: "48 Horas",
              value: "48h",
            },
            {
              label: "1 Semana",
              value: "1w",
            },
            {
              label: "1 Mês",
              value: "1m",
            },
          ]}
        />
      </div>
      <div className="">
        {!data.length ? (
          <p>Não existem dados para o período selecionado.</p>
        ) : (
          <SensorReadingTable data={data} />
        )}
      </div>
    </div>
  );
}
