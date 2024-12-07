"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"; // Assuming these components are already defined
import Link from "next/link";

const headers = [
  { key: "filename", label: "Nome do Arquivo" },
  { key: "status", label: "Status" },
  { key: "errors", label: "Erros" },
  { key: "createdAt", label: "Data de Envio" },
];

interface CsvUploadData {
  id: string;
  filename: string;
  status: string;
  errors: string | null;
  createdAt: string;
  updatedAt: string;
  [key: string]: string | number | null;
}

export default function UploadCsvTable({ data }: { data: CsvUploadData[] }) {
  const [sort, setSort] = useState({
    keyToSort: "createdAt",
    direction: "desc",
  });

  const handleHeaderClick = (key: string) => {
    const newDirection =
      sort.keyToSort === key && sort.direction === "asc" ? "desc" : "asc";
    setSort({ keyToSort: key, direction: newDirection });
  };

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sort.keyToSort];
    const bValue = b[sort.keyToSort];

    if (aValue === null || aValue === undefined) return 1;
    if (bValue === null || bValue === undefined) return -1;

    if (aValue < bValue) {
      return sort.direction === "asc" ? -1 : 1;
    }
    if (aValue > bValue) {
      return sort.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead
              className="cursor-pointer hover:bg-slate-800"
              onClick={() => handleHeaderClick(header.key)}
              key={header.key}
            >
              <div className="flex items-center gap-2">
                {header.label}
                <span className="flex h-4 items-center justify-center">
                  {sort.keyToSort === header.key ? (
                    sort.direction === "asc" ? (
                      <span>↑</span>
                    ) : (
                      <span>↓</span>
                    )
                  ) : null}
                </span>
              </div>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((entry, index) => (
          <TableRow key={index}>
            <Link href={`/csv-upload/${entry.id}`}>
              <TableCell className="font-medium hover:bg-slate-800">
                {entry.filename}
              </TableCell>
            </Link>
            <TableCell>{entry.status}</TableCell>
            <TableCell className="max-w-24 overflow-auto">
              {entry.errors ? entry.errors : "Nenhum erro"}
            </TableCell>
            <TableCell>{new Date(entry.createdAt).toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
