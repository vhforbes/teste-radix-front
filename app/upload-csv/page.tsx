import { UploadCSVForm } from "@/components/ui/forms/csv-upload-form";
import UploadCsvTable from "@/components/ui/upload-csv-table";
import { fetchServer } from "@/utils/fetchServer";

export default async function UploadCsv() {
  const res = await fetchServer(
    `${process.env.NEXT_PUBLIC_API_URL}/csv-upload`,
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
      <div className="w-1/3">
        <UploadCSVForm />
      </div>
      <div className="md:w-1/2">
        <UploadCsvTable data={data} />
      </div>
    </div>
  );
}
