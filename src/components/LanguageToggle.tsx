import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4 text-gray-600" />
      <div className="flex rounded-md border border-gray-200 overflow-hidden">
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          className="rounded-none px-3 py-1 text-xs"
          onClick={() => setLanguage('en')}
        >
          🇺🇸 EN
        </Button>
        <Button
          variant={language === 'ar' ? 'default' : 'ghost'}
          size="sm"
          className="rounded-none px-3 py-1 text-xs"
          onClick={() => setLanguage('ar')}
        >
          🇦🇪 العربية
        </Button>
      </div>
    </div>
  );
}