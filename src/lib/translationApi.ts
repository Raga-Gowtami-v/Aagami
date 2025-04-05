
// Translation API utilities
const TRANSLATE_API_KEY = "AIzaSyAu3TfJeV_xa6VoPXZwoKdVfJ5k1g8qtZk";

export interface SupportedLanguage {
  code: string;
  name: string;
  nativeName: string;
}

export const getSupportedLanguages = (): SupportedLanguage[] => {
  return [
    { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు" },
    { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ" },
    { code: "ml", name: "Malayalam", nativeName: "മലയാളം" },
    { code: "mr", name: "Marathi", nativeName: "मराठी" },
    { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা" },
    { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
    { code: "ur", name: "Urdu", nativeName: "اردو" },
    { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ" },
    { code: "as", name: "Assamese", nativeName: "অসমীয়া" },
    { code: "en", name: "English", nativeName: "English" },
  ];
};

// Function to translate text
export const translateText = async (text: string, targetLanguage: string = "hi"): Promise<string> => {
  try {
    // In a real implementation, this would be a call to the Google Translate API
    console.log(`Translating text to ${targetLanguage}: "${text}"`);
    
    // Simple mock translation for demo purposes
    if (targetLanguage === "hi") {
      if (text.includes("Introduction")) return "परिचय: " + text;
      if (text.includes("Chapter")) return "अध्याय: " + text;
      return "हिंदी अनुवाद: " + text;
    } else if (targetLanguage === "ta") {
      return "தமிழ் மொழிபெயர்ப்பு: " + text;
    } else if (targetLanguage === "te") {
      return "తెలుగు అనువాదం: " + text;
    } else {
      return "Translated: " + text;
    }
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Failed to translate text");
  }
};
