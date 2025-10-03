import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation dictionaries
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.opportunities': 'Opportunities',
    'nav.about': 'About',
    'nav.organizations': 'Organizations',
    'nav.contact': 'Contact',
    'nav.signin': 'Sign In',
    'nav.signup': 'Sign Up',
    'nav.startVolunteering': 'Start Volunteering',
    
    // Hero Section
    'hero.badge': '🇦🇪 Proudly Serving the UAE Community',
    'hero.title': 'Make a Difference in the UAE',
    'hero.subtitle': 'Join thousands of volunteers across the Emirates making a positive impact in their communities. Find meaningful opportunities, earn certificates, and be part of the UAE\'s vision for a better tomorrow.',
    'hero.startVolunteering': 'Start Volunteering',
    'hero.browseOpportunities': 'Browse Opportunities',
    
    // Stats
    'stats.activeVolunteers': 'Active Volunteers',
    'stats.partnerOrganizations': 'Partner Organizations',
    'stats.hoursContributed': 'Hours Contributed',
    'stats.eventsCompleted': 'Events Completed',
    
    // Volunteers in Action
    'volunteers.title': 'Our Volunteers in Action',
    'volunteers.subtitle': 'Capturing the spirit of community service and making a difference together',
    'volunteers.viewMore': 'View More Photos',
    
    // Features
    'features.title': 'Why Choose SwaedUAE?',
    'features.subtitle': 'Everything you need to make volunteering meaningful and rewarding',
    'features.certificates.title': 'Earn Certificates',
    'features.certificates.description': 'Get recognized for your contributions with official certificates and digital badges.',
    'features.community.title': 'Join Communities',
    'features.community.description': 'Connect with like-minded volunteers and build lasting friendships.',
    'features.tracking.title': 'Track Impact',
    'features.tracking.description': 'Monitor your volunteer hours and see the real difference you\'re making.',
    
    // Opportunities
    'opportunities.title': 'Latest Opportunities',
    'opportunities.viewAll': 'View All',
    'opportunities.joinNow': 'Join Now',
    'opportunities.environment': 'Environment',
    'opportunities.education': 'Education',
    'opportunities.healthcare': 'Healthcare',
    'opportunities.ongoing': 'Ongoing',
    
    // Testimonials
    'testimonials.title': 'What Our Volunteers Say',
    'testimonials.subtitle': 'Real stories from our amazing volunteer community',
    
    // CTA
    'cta.title': 'Ready to Make a Difference?',
    'cta.subtitle': 'Join thousands of volunteers across the UAE and start your journey of giving back to the community.',
    'cta.getStarted': 'Get Started Today',
    'cta.learnMore': 'Learn More',
    
    // Footer
    'footer.quickLinks': 'Quick Links',
    'footer.forVolunteers': 'For Volunteers',
    'footer.forOrganizations': 'For Organizations',
    'footer.certificates': 'Certificates',
    'footer.helpCenter': 'Help Center',
    'footer.registerOrg': 'Register Organization',
    'footer.orgLogin': 'Organization Login',
    'footer.partners': 'Partners',
    'footer.resources': 'Resources',
    'footer.copyright': '© 2024 SwaedUAE. All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.date': 'Date',
    'common.time': 'Time',
    'common.location': 'Location',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.name': 'Name',
    'common.description': 'Description',
    
    // Login
    'login.title': 'Welcome Back',
    'login.subtitle': 'Sign in to your volunteer account',
    'login.email': 'Email Address',
    'login.password': 'Password',
    'login.rememberMe': 'Remember me',
    'login.forgotPassword': 'Forgot password?',
    'login.signIn': 'Sign In',
    'login.noAccount': 'Don\'t have an account?',
    'login.signUpHere': 'Sign up here',
    'login.orgLogin': 'Organization Login',
    'login.adminLogin': 'Admin Login',
    
    // Search & Filters
    'search.placeholder': 'Search opportunities...',
    'search.location': 'Location',
    'search.category': 'Category',
    'search.skills': 'Skills',
    'search.timeCommitment': 'Time Commitment',
    'search.availability': 'Availability',
    'search.clearFilters': 'Clear Filters',
    'search.applyFilters': 'Apply Filters',
    
    // Emirates
    'emirates.dubai': 'Dubai',
    'emirates.abuDhabi': 'Abu Dhabi',
    'emirates.sharjah': 'Sharjah',
    'emirates.ajman': 'Ajman',
    'emirates.ummalQuwain': 'Umm Al Quwain',
    'emirates.rasAlKhaimah': 'Ras Al Khaimah',
    'emirates.fujairah': 'Fujairah',
    
    // Achievements
    'achievements.environmentalChampion': 'Environmental Champion',
    'achievements.communityHelper': 'Community Helper',
    'achievements.healthcareHero': 'Healthcare Hero',
    'achievements.educationAdvocate': 'Education Advocate',
    'achievements.bronzeLevel': 'Bronze Volunteer',
    'achievements.silverLevel': 'Silver Volunteer',
    'achievements.goldLevel': 'Gold Volunteer',
    'achievements.platinumLevel': 'Platinum Volunteer',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.opportunities': 'الفرص',
    'nav.about': 'حول',
    'nav.organizations': 'المنظمات',
    'nav.contact': 'اتصل بنا',
    'nav.signin': 'تسجيل الدخول',
    'nav.signup': 'التسجيل',
    'nav.startVolunteering': 'ابدأ التطوع',
    
    // Hero Section
    'hero.badge': '🇦🇪 نخدم مجتمع دولة الإمارات بفخر',
    'hero.title': 'اصنع فرقاً في دولة الإمارات',
    'hero.subtitle': 'انضم إلى آلاف المتطوعين في جميع أنحاء الإمارات الذين يحدثون تأثيراً إيجابياً في مجتمعاتهم. اعثر على فرص ذات معنى، واحصل على شهادات، وكن جزءاً من رؤية الإمارات لغد أفضل.',
    'hero.startVolunteering': 'ابدأ التطوع',
    'hero.browseOpportunities': 'تصفح الفرص',
    
    // Stats
    'stats.activeVolunteers': 'المتطوعون النشطون',
    'stats.partnerOrganizations': 'المنظمات الشريكة',
    'stats.hoursContributed': 'الساعات المساهمة',
    'stats.eventsCompleted': 'الفعاليات المكتملة',
    
    // Volunteers in Action
    'volunteers.title': 'متطوعونا في العمل',
    'volunteers.subtitle': 'نلتقط روح الخدمة المجتمعية وصنع الفرق معاً',
    'volunteers.viewMore': 'عرض المزيد من الصور',
    
    // Features
    'features.title': 'لماذا تختار سواعد الإمارات؟',
    'features.subtitle': 'كل ما تحتاجه لجعل التطوع ذا معنى ومجزي',
    'features.certificates.title': 'احصل على شهادات',
    'features.certificates.description': 'احصل على التقدير لمساهماتك مع الشهادات الرسمية والشارات الرقمية.',
    'features.community.title': 'انضم للمجتمعات',
    'features.community.description': 'تواصل مع المتطوعين ذوي التفكير المماثل وابن صداقات دائمة.',
    'features.tracking.title': 'تتبع التأثير',
    'features.tracking.description': 'راقب ساعات التطوع الخاصة بك وشاهد الفرق الحقيقي الذي تحدثه.',
    
    // Opportunities
    'opportunities.title': 'أحدث الفرص',
    'opportunities.viewAll': 'عرض الكل',
    'opportunities.joinNow': 'انضم الآن',
    'opportunities.environment': 'البيئة',
    'opportunities.education': 'التعليم',
    'opportunities.healthcare': 'الرعاية الصحية',
    'opportunities.ongoing': 'مستمر',
    
    // Testimonials
    'testimonials.title': 'ماذا يقول متطوعونا',
    'testimonials.subtitle': 'قصص حقيقية من مجتمع المتطوعين المذهل لدينا',
    
    // CTA
    'cta.title': 'مستعد لصنع فرق؟',
    'cta.subtitle': 'انضم إلى آلاف المتطوعين في جميع أنحاء الإمارات وابدأ رحلتك في رد الجميل للمجتمع.',
    'cta.getStarted': 'ابدأ اليوم',
    'cta.learnMore': 'تعلم المزيد',
    
    // Footer
    'footer.quickLinks': 'روابط سريعة',
    'footer.forVolunteers': 'للمتطوعين',
    'footer.forOrganizations': 'للمنظمات',
    'footer.certificates': 'الشهادات',
    'footer.helpCenter': 'مركز المساعدة',
    'footer.registerOrg': 'تسجيل منظمة',
    'footer.orgLogin': 'دخول المنظمة',
    'footer.partners': 'الشركاء',
    'footer.resources': 'الموارد',
    'footer.copyright': '© 2024 سواعد الإمارات. جميع الحقوق محفوظة.',
    'footer.privacy': 'سياسة الخصوصية',
    'footer.terms': 'شروط الخدمة',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.sort': 'ترتيب',
    'common.date': 'التاريخ',
    'common.time': 'الوقت',
    'common.location': 'الموقع',
    'common.email': 'البريد الإلكتروني',
    'common.phone': 'الهاتف',
    'common.name': 'الاسم',
    'common.description': 'الوصف',
    
    // Login
    'login.title': 'مرحباً بعودتك',
    'login.subtitle': 'سجل الدخول إلى حساب المتطوع الخاص بك',
    'login.email': 'عنوان البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.rememberMe': 'تذكرني',
    'login.forgotPassword': 'نسيت كلمة المرور؟',
    'login.signIn': 'تسجيل الدخول',
    'login.noAccount': 'ليس لديك حساب؟',
    'login.signUpHere': 'سجل هنا',
    'login.orgLogin': 'دخول المنظمة',
    'login.adminLogin': 'دخول المدير',
    
    // Search & Filters
    'search.placeholder': 'البحث في الفرص...',
    'search.location': 'الموقع',
    'search.category': 'الفئة',
    'search.skills': 'المهارات',
    'search.timeCommitment': 'الالتزام الزمني',
    'search.availability': 'التوفر',
    'search.clearFilters': 'مسح المرشحات',
    'search.applyFilters': 'تطبيق المرشحات',
    
    // Emirates
    'emirates.dubai': 'دبي',
    'emirates.abuDhabi': 'أبوظبي',
    'emirates.sharjah': 'الشارقة',
    'emirates.ajman': 'عجمان',
    'emirates.ummalQuwain': 'أم القيوين',
    'emirates.rasAlKhaimah': 'رأس الخيمة',
    'emirates.fujairah': 'الفجيرة',
    
    // Achievements
    'achievements.environmentalChampion': 'بطل البيئة',
    'achievements.communityHelper': 'مساعد المجتمع',
    'achievements.healthcareHero': 'بطل الرعاية الصحية',
    'achievements.educationAdvocate': 'مدافع عن التعليم',
    'achievements.bronzeLevel': 'متطوع برونزي',
    'achievements.silverLevel': 'متطوع فضي',
    'achievements.goldLevel': 'متطوع ذهبي',
    'achievements.platinumLevel': 'متطوع بلاتيني',
  }
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('swaed_language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
    
    // Set document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('swaed_language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{
      language,
      setLanguage: handleSetLanguage,
      t,
      isRTL
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}