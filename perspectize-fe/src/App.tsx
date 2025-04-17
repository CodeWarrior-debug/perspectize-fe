import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import YouTubeTable from './components/YouTubeTable';
import EquipmentComparisonTable from './components/EquipmentComparisonTable';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container mx-auto px-4 py-8">
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">YouTube Video Information</h2>
          <YouTubeTable />
        </div>
        
        <EquipmentComparisonTable />
      </div>
    </QueryClientProvider>
  );
};

export default App;