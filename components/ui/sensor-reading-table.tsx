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
} from "./table";
import Link from "next/link";

const headers = [
  { key: "equipmentId", label: "Equipment ID" },
  { key: "averageValue", label: "Average Value (°C)" },
];

interface EquipmentAvarageData {
  equipmentId: string;
  averageValue: string;
  [key: string]: string | number;
}

export default function SensorReadingTable({
  data,
}: {
  data: EquipmentAvarageData[];
}) {
  const [sort, setSort] = useState({
    keyToSort: "equipmentId",
    direction: "asc",
  });

  const handleHeaderClick = (key: string) => {
    const newDirection =
      sort.keyToSort === key && sort.direction === "asc" ? "desc" : "asc";
    setSort({ keyToSort: key, direction: newDirection });
  };

  const sortedData = [...data].sort((a, b) => {
    if (a[sort.keyToSort] < b[sort.keyToSort]) {
      return sort.direction === "asc" ? -1 : 1;
    }
    if (a[sort.keyToSort] > b[sort.keyToSort]) {
      return sort.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const [isMounted, setIsMounted] = useState(false); // State to detect if the component has mounted

  useEffect(() => {
    setIsMounted(true); // Set to true once the component has mounted
  }, []);

  if (!isMounted) return null;

  return (
    <Table className="w-fit">
      <TableCaption>Últimos valores médios de sensores</TableCaption>
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
                <span className="flex h-4 w-4 items-center justify-center">
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
            <Link href={`/equipment/${entry.equipmentId}`}>
              <TableCell className="font-medium hover:bg-slate-800">
                {entry.equipmentId}
              </TableCell>
            </Link>
            <TableCell>{entry.averageValue}°C</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
