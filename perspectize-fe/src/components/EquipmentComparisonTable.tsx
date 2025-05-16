import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { EquipmentComparison } from '../types/youtube';
import { fetchEquipmentComparison } from '../services/youtubeService';

const EquipmentComparisonTable: React.FC = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ['equipmentComparison'],
    queryFn: fetchEquipmentComparison,
  });

  const columnHelper = createColumnHelper<EquipmentComparison>();

  const columns = React.useMemo(
    () => [
      columnHelper.accessor('equipmentType', {
        header: 'Equipment',
        cell: info => (
          <span className="font-semibold capitalize">
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('advantages', {
        header: 'Advantages',
        cell: info => (
          <ul className="list-disc pl-5">
            {info.getValue().map((adv, i) => (
              <li key={i}>{adv}</li>
            ))}
          </ul>
        ),
      }),
      columnHelper.accessor('bestExercises', {
        header: 'Best Exercises',
        cell: info => (
          <ul className="list-disc pl-5">
            {info.getValue().map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ul>
        ),
      }),
      columnHelper.accessor('targetMuscles', {
        header: 'Target Muscles',
        cell: info => (
          <div className="flex flex-wrap gap-1">
            {info.getValue().map((m, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {m}
              </span>
            ))}
          </div>
        ),
      }),
      columnHelper.accessor('skillLevel', {
        header: 'Skill Level',
        cell: info => {
          const lvl = info.getValue();
          const bgClass =
            lvl === 'beginner'
              ? 'bg-green-100 text-green-800'
              : lvl === 'intermediate'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800';
          return (
            <span className={`capitalize px-2 py-1 rounded ${bgClass}`}>
              {lvl}
            </span>
          );
        },
      }),
      columnHelper.accessor('bestFor', {
        header: 'Best For',
        cell: info => (
          <ul className="list-disc pl-5">
            {info.getValue().map((u, i) => (
              <li key={i}>{u}</li>
            ))}
          </ul>
        ),
      }),
    ],
    [columnHelper]
  );

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="text-center py-4">
        Loading comparison data…
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-center py-4 text-red-600">
        Error loading comparison: {(error as Error).message}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto mt-8">
      <h2 className="text-xl font-bold mb-4">
        Kettlebells vs. Dumbbells Comparison
      </h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          {table.getHeaderGroups().map(hg => (
            <tr key={hg.id}>
              {hg.headers.map(hdr => (
                <th
                  key={hdr.id}
                  className="py-3 px-6 text-left bg-gray-50 text-gray-600"
                >
                  {flexRender(
                    hdr.column.columnDef.header,
                    hdr.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="py-4 px-6">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentComparisonTable;
