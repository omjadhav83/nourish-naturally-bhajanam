import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'te' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.personalizedDiet': 'Personalized Diet Plans',
    'nav.regionalDiet': 'Regional Diet Plans',
    'nav.organDiet': 'Organ-Specific Diet',
    'nav.scanner': 'Document Scanner',
    'nav.lookup': 'Disease Lookup',
    'nav.tracker': 'Nutrition Tracker',
    'nav.community': 'Community',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.search': 'Search',
    'common.loading': 'Loading...',
    'common.submit': 'Submit',
    'common.update': 'Update',
    
    // Profile
    'profile.title': 'User Profile',
    'profile.subtitle': 'Manage your account settings and wellness preferences',
    'profile.personalInfo': 'Personal Information',
    'profile.healthProfile': 'Health Profile',
    'profile.preferences': 'Preferences',
    'profile.achievements': 'Achievements',
    'profile.fullName': 'Full Name',
    'profile.email': 'Email',
    'profile.phone': 'Phone Number',
    'profile.address': 'Address',
    'profile.age': 'Age',
    'profile.gender': 'Gender',
    'profile.height': 'Height (cm)',
    'profile.weight': 'Weight (kg)',
    'profile.activityLevel': 'Activity Level',
    'profile.healthGoals': 'Health Goals',
    'profile.medicalConditions': 'Medical Conditions',
    'profile.allergies': 'Allergies',
    'profile.medications': 'Current Medications',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.notifications': 'Notifications',
    'settings.privacy': 'Privacy',
    'settings.selectLanguage': 'Select Language',
    
    // Disease Lookup
    'disease.title': 'Disease & Disorder Lookup',
    'disease.subtitle': 'Comprehensive information about diseases and disorders',
    'disease.symptoms': 'Symptoms',
    'disease.causes': 'Causes',
    'disease.prevention': 'Prevention',
    'disease.treatment': 'Treatment',
    'disease.dietary': 'Dietary Recommendations',
    
    // Community
    'community.title': 'Community',
    'community.subtitle': 'Connect with others on their natural wellness journey',
    'community.feed': 'Community Feed',
    'community.challenges': 'Challenges',
    'community.recipes': 'Recipe Exchange',
    'community.share': 'Share with Community',
    'community.stats': 'Community Stats',
    'community.trending': 'Trending Topics',
    'community.contributors': 'Top Contributors'
  },
  
  hi: {
    // Navigation
    'nav.dashboard': 'डैशबोर्ड',
    'nav.personalizedDiet': 'व्यक्तिगत आहार योजना',
    'nav.regionalDiet': 'क्षेत्रीय आहार योजना',
    'nav.organDiet': 'अंग-विशिष्ट आहार',
    'nav.scanner': 'दस्तावेज़ स्कैनर',
    'nav.lookup': 'रोग खोज',
    'nav.tracker': 'पोषण ट्रैकर',
    'nav.community': 'समुदाय',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.settings': 'सेटिंग्स',
    
    // Common
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.search': 'खोजें',
    'common.loading': 'लोड हो रहा है...',
    'common.submit': 'जमा करें',
    'common.update': 'अपडेट करें',
    
    // Profile
    'profile.title': 'उपयोगकर्ता प्रोफ़ाइल',
    'profile.subtitle': 'अपने खाते की सेटिंग्स और कल्याण प्राथमिकताएं प्रबंधित करें',
    'profile.personalInfo': 'व्यक्तिगत जानकारी',
    'profile.healthProfile': 'स्वास्थ्य प्रोफ़ाइल',
    'profile.preferences': 'प्राथमिकताएं',
    'profile.achievements': 'उपलब्धियां',
    'profile.fullName': 'पूरा नाम',
    'profile.email': 'ईमेल',
    'profile.phone': 'फोन नंबर',
    'profile.address': 'पता',
    'profile.age': 'आयु',
    'profile.gender': 'लिंग',
    'profile.height': 'ऊंचाई (से.मी.)',
    'profile.weight': 'वजन (कि.ग्रा.)',
    'profile.activityLevel': 'गतिविधि स्तर',
    'profile.healthGoals': 'स्वास्थ्य लक्ष्य',
    'profile.medicalConditions': 'चिकित्सा स्थितियां',
    'profile.allergies': 'एलर्जी',
    'profile.medications': 'वर्तमान दवाएं',
    
    // Settings
    'settings.title': 'सेटिंग्स',
    'settings.language': 'भाषा',
    'settings.notifications': 'सूचनाएं',
    'settings.privacy': 'गोपनीयता',
    'settings.selectLanguage': 'भाषा चुनें',
    
    // Disease Lookup
    'disease.title': 'रोग और विकार खोज',
    'disease.subtitle': 'रोगों और विकारों के बारे में व्यापक जानकारी',
    'disease.symptoms': 'लक्षण',
    'disease.causes': 'कारण',
    'disease.prevention': 'रोकथाम',
    'disease.treatment': 'उपचार',
    'disease.dietary': 'आहार सिफारिशें',
    
    // Community
    'community.title': 'समुदाय',
    'community.subtitle': 'अपनी प्राकृतिक कल्याण यात्रा पर दूसरों से जुड़ें',
    'community.feed': 'समुदाय फीड',
    'community.challenges': 'चुनौतियां',
    'community.recipes': 'रेसिपी एक्सचेंज',
    'community.share': 'समुदाय के साथ साझा करें',
    'community.stats': 'समुदाय आंकड़े',
    'community.trending': 'ट्रेंडिंग विषय',
    'community.contributors': 'शीर्ष योगदानकर्ता'
  },
  
  mr: {
    // Navigation
    'nav.dashboard': 'डॅशबोर्ड',
    'nav.personalizedDiet': 'वैयक्तिक आहार योजना',
    'nav.regionalDiet': 'प्रादेशिक आहार योजना',
    'nav.organDiet': 'अवयव-विशिष्ट आहार',
    'nav.scanner': 'कागदपत्र स्कॅनर',
    'nav.lookup': 'रोग शोध',
    'nav.tracker': 'पोषण ट्रॅकर',
    'nav.community': 'समुदाय',
    'nav.profile': 'प्रोफाइल',
    'nav.settings': 'सेटिंग्ज',
    
    // Common
    'common.save': 'सेव्ह करा',
    'common.cancel': 'रद्द करा',
    'common.search': 'शोधा',
    'common.loading': 'लोड होत आहे...',
    'common.submit': 'सबमिट करा',
    'common.update': 'अपडेट करा',
    
    // Profile (abbreviated for space)
    'profile.title': 'वापरकर्ता प्रोफाइल',
    'profile.fullName': 'पूर्ण नाव',
    'profile.email': 'ईमेल',
    'profile.phone': 'फोन नंबर',
    'profile.address': 'पत्ता'
  },
  
  gu: {
    // Navigation
    'nav.dashboard': 'ડેશબોર્ડ',
    'nav.personalizedDiet': 'વ્યક્તિગત આહાર યોજના',
    'nav.regionalDiet': 'પ્રાદેશિક આહાર યોજના',
    'nav.organDiet': 'અંગ-વિશિષ્ટ આહાર',
    'nav.scanner': 'દસ્તાવેજ સ્કેનર',
    'nav.lookup': 'રોગ શોધ',
    'nav.tracker': 'પોષણ ટ્રેકર',
    'nav.community': 'સમુદાય',
    'nav.profile': 'પ્રોફાઇલ',
    'nav.settings': 'સેટિંગ્સ',
    
    // Common
    'common.save': 'સાચવો',
    'common.cancel': 'રદ કરો',
    'common.search': 'શોધો',
    'common.loading': 'લોડ થઈ રહ્યું છે...',
    
    // Profile (abbreviated)
    'profile.title': 'વપરાશકર્તા પ્રોફાઇલ',
    'profile.fullName': 'પૂરું નામ',
    'profile.email': 'ઈમેઇલ'
  },
  
  te: {
    // Navigation
    'nav.dashboard': 'డాష్‌బోర్డ్',
    'nav.personalizedDiet': 'వ్యక్తిగత ఆహార ప్రణాళిక',
    'nav.regionalDiet': 'ప్రాంతీయ ఆహార ప్రణాళిక',
    'nav.organDiet': 'అవయవ-నిర్దిష్ట ఆహారం',
    'nav.scanner': 'డాక్యుమెంట్ స్కానర్',
    'nav.lookup': 'వ్యాధి శోధన',
    'nav.tracker': 'పోషణ ట్రాకర్',
    'nav.community': 'కమ్యూనిటీ',
    'nav.profile': 'ప్రొఫైల్',
    'nav.settings': 'సెట్టింగ్స్',
    
    // Common
    'common.save': 'సేవ్ చేయండి',
    'common.cancel': 'రద్దు చేయండి',
    'common.search': 'వెతకండి',
    
    // Profile (abbreviated)
    'profile.title': 'వినియోగదారు ప్రొఫైల్',
    'profile.fullName': 'పూర్తి పేరు'
  },
  
  bn: {
    // Navigation
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.personalizedDiet': 'ব্যক্তিগত ডায়েট প্ল্যান',
    'nav.regionalDiet': 'আঞ্চলিক ডায়েট প্ল্যান',
    'nav.organDiet': 'অঙ্গ-নির্দিষ্ট ডায়েট',
    'nav.scanner': 'ডকুমেন্ট স্ক্যানার',
    'nav.lookup': 'রোগ অনুসন্ধান',
    'nav.tracker': 'পুষ্টি ট্র্যাকার',
    'nav.community': 'কমিউনিটি',
    'nav.profile': 'প্রোফাইল',
    'nav.settings': 'সেটিংস',
    
    // Common
    'common.save': 'সংরক্ষণ করুন',
    'common.cancel': 'বাতিল করুন',
    'common.search': 'অনুসন্ধান করুন',
    
    // Profile (abbreviated)
    'profile.title': 'ব্যবহারকারী প্রোফাইল',
    'profile.fullName': 'পূর্ণ নাম'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const languages: { code: Language; name: string; nativeName: string }[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' }
];