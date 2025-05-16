import React, { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { YouTubeVideo } from '../types/youtube';
import { fetchSingleVideo, formatDuration } from '../services/youtubeService';

const YouTubeTable: React.FC = () => {

    const videoId = 'wzgsNBKtaE4';

    const { data, isLoading, error } = useQuery({
        queryKey: ['youtubeVideo', videoId],
        queryFn: () => fetchSingleVideo(videoId),
        staleTime: 5 * 60 * 1000,
      });

      function toArray(input: YouTubeVideo | YouTubeVideo[] | undefined): YouTubeVideo[] {
        if (!input) return [];
        return Array.isArray(input) ? input : [input];
      }
      const tableData = useMemo(() => toArray(data), [data]);
      

      const columnHelper = createColumnHelper<YouTubeVideo>();
      const columns = useMemo(
        () => [
          columnHelper.accessor(row => row.snippet.title, {
            id: 'video',
            header: 'Video',
            cell: info => (
              <a
                href={`https://www.youtube.com/watch?v=${info.row.original.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {info.getValue()}
              </a>
            ),
          }),
          columnHelper.accessor(row => row.snippet.channelTitle, {
            id: 'channel',
            header: 'YouTube Channel',
            cell: info => (
              <a
                href={`https://www.youtube.com/channel/${info.row.original.snippet.channelId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {info.getValue()}
              </a>
            ),
          }),
          columnHelper.accessor(row => row.snippet.categoryId, {
            id: 'category',
            header: 'Category',
          }),
          columnHelper.accessor(row => row.snippet.tags ?? [], {
            id: 'tags',
            header: 'Tags',
            cell: info => (
              <div className="flex flex-wrap gap-1">
                {info.getValue().map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ),
          }),
          columnHelper.accessor(row => row.contentDetails.duration, {
            id: 'duration',
            header: 'Duration',
            cell: info => formatDuration(info.getValue()),
          }),
        ],
        [columnHelper]
      );
    
      /* ---------- table instance ---------- */
      const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
      });

    if (isLoading) return <div className="text-center py-4">Loading...</div>;

    if (error) return <div className="text-center py-4 text-red-600">Error: {(error as Error).message}</div>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="py-3 px-6 text-left bg-gray-50 text-gray-600 border-b"
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
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
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default YouTubeTable;