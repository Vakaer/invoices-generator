import { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

interface Language {
    id:string
  name: string;

}

interface UseLanguageData {
  allLanguages: Language[];
  englishLanguage: Language ;
  error: any;
}

const useLanguageData = (): UseLanguageData => {
  const [allLanguages, setAllLanguages] = useState<Language[]>([]);
  const [englishLanguage, setEnglishLanguage] = useState<Language>({id:"", name:""});
  const [error, setError] = useState<any>(null);

  const getAllLanguages = async (): Promise<void> => {
    try {
      const response: AxiosResponse<{ data: { languages: Language[] } }> = await axios.get('/api/language');
      
      if (response && response.status === 200) {
        setAllLanguages(response.data?.data.languages);

        const englishLanguage = response.data?.data.languages.find(
          (language: Language) => language.name.toLowerCase() === 'english'
        );

        if (englishLanguage) {
          setEnglishLanguage(englishLanguage);
        } else {
          throw new Error('English language not found in the language data');
        }
      } else {
        throw new Error('Failed to fetch language data');
      }
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getAllLanguages();
  }, []); 

  return { allLanguages, englishLanguage, error };
};

export default useLanguageData;
