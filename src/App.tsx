import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import Index from './pages/Index';
import About from './pages/About';
import Contact from './pages/Contact';
import Opportunities from './pages/Opportunities';
import Login from './pages/auth/Login';
import OrgLogin from './pages/auth/OrgLogin';
import AdminLogin from './pages/auth/AdminLogin';
import Register from './pages/auth/Register';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/opportunities" element={<Opportunities />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/org/login" element={<OrgLogin />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;