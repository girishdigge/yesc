import { Toaster } from './components/ui/toaster';
import AppProvider from './providers';
import AppRouter from './routes';
import { ToastProvider } from '@/components/ui/toast';
export default function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <Toaster />
      </ToastProvider>
      <AppRouter />
    </AppProvider>
  );
}
