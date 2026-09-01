
export type Language = 'en' | 'ta' | 'ml';

export const translations = {
  en: {
    nav: {
      dashboard: "Dashboard",
      cropAdvice: "Crop Advice",
      disease: "Disease Detection",
      irrigation: "Irrigation",
      chat: "AI Chat",
      about: "About",
      settings: "Settings"
    },
    home: {
      welcome: "Welcome Back, Farmer!",
      subtitle: "Your personalized agricultural insights are ready.",
      moisture: "Moisture Level",
      temp: "Avg Temp",
      wind: "Wind Speed",
      weatherTitle: "Localized Farming Advice",
      weatherPlaceholder: "Enter your city/region...",
      getAdvice: "Get Advice",
      tasks: "Upcoming Tasks",
      market: "Market Trends"
    },
    crop: {
      title: "AI Crop Recommendation",
      soilType: "Soil Type",
      ph: "Soil pH Level",
      temp: "Avg Temperature (°C)",
      humidity: "Humidity (%)",
      rainfall: "Annual Rainfall (mm)",
      button: "Generate Recommendations",
      reasoning: "Reasoning",
      conditions: "Optimal Conditions",
      tips: "Planting Tip"
    },
    disease: {
      title: "Crop Disease Detection",
      subtitle: "Upload a photo of your crop's leaf for instant diagnosis.",
      upload: "Click to upload or take photo",
      analyze: "Run Diagnostics",
      symptoms: "Symptoms",
      treatment: "Treatment Plan",
      prevention: "Prevention"
    },
    irrigation: {
      title: "Smart Irrigation Guide",
      subtitle: "Water management based on live sensors.",
      moistureLabel: "Soil Moisture",
      tempLabel: "Average Temperature",
      cropType: "Current Crop",
      button: "Calculate Needs",
      schedule: "Irrigation Schedule",
      amount: "Water Amount"
    },
    common: {
      loading: "Processing data...",
      analyzing: "Analyzing...",
      poweredBy: "Intelligent Farming System"
    }
  },
  ta: {
    nav: {
      dashboard: "டாஷ்போர்டு",
      cropAdvice: "பயிர் ஆலோசனை",
      disease: "நோய் கண்டறிதல்",
      irrigation: "நீர்ப்பாசனம்",
      chat: "AI அரட்டை",
      about: "பற்றி",
      settings: "அமைப்புகள்"
    },
    home: {
      welcome: "மீண்டும் வருக, விவசாயி!",
      subtitle: "உங்கள் தனிப்பயனாக்கப்பட்ட விவசாய நுண்ணறிவு தயாராக உள்ளது.",
      moisture: "ஈரப்பதம் நிலை",
      temp: "சராசரி வெப்பநிலை",
      wind: "காற்றின் வேகம்",
      weatherTitle: "உள்ளூர் விவசாய ஆலோசனை",
      weatherPlaceholder: "உங்கள் நகரம்/பகுதியை உள்ளிடவும்...",
      getAdvice: "ஆலோசனை பெறு",
      tasks: "வரவிருக்கும் பணிகள்",
      market: "சந்தை போக்குகள்"
    },
    crop: {
      title: "AI பயிர் பரிந்துரை",
      soilType: "மண் வகை",
      ph: "மண் pH அளவு",
      temp: "சராசரி வெப்பநிலை (°C)",
      humidity: "ஈரப்பதம் (%)",
      rainfall: "ஆண்டு மழைப்பொழிவு (மிமீ)",
      button: "பரிந்துரைகளை உருவாக்கு",
      reasoning: "காரணம்",
      conditions: "உகந்த நிலைமைகள்",
      tips: "நடவு குறிப்பு"
    },
    disease: {
      title: "பயிர் நோய் கண்டறிதல்",
      subtitle: "உடனடி நோயறிதலுக்கு உங்கள் பயிரின் இலையின் புகைப்படத்தைப் பதிவேற்றவும்.",
      upload: "பதிவேற்ற அல்லது புகைப்படம் எடுக்க கிளிக் செய்யவும்",
      analyze: "நோயறிதலை இயக்கவும்",
      symptoms: "அறிகுறிகள்",
      treatment: "சிகிச்சை திட்டம்",
      prevention: "தடுப்பு முறைகள்"
    },
    irrigation: {
      title: "ஸ்மார்ட் நீர்ப்பாசன வழிகாட்டி",
      subtitle: "நேரடி சென்சார்கள் அடிப்படையிலான நீர் மேலாண்மை.",
      moistureLabel: "மண் ஈரப்பதம்",
      tempLabel: "சராசரி வெப்பநிலை",
      cropType: "தற்போதைய பயிர்",
      button: "தேவைகளைக் கணக்கிடு",
      schedule: "நீர்ப்பாசன அட்டவணை",
      amount: "நீரின் அளவு"
    },
    common: {
      loading: "தரவு செயலாக்கப்படுகிறது...",
      analyzing: "பகுப்பாய்வு செய்கிறது...",
      poweredBy: "புத்திசாலித்தனமான விவசாய அமைப்பு"
    }
  },
  ml: {
    nav: {
      dashboard: "ഡാഷ്‌ബോർഡ്",
      cropAdvice: "വിള ഉപദേശം",
      disease: "രോഗനിർണയം",
      irrigation: "ജലസേചനം",
      chat: "AI ചാറ്റ്",
      about: "വിവരം",
      settings: "ക്രമീകരണങ്ങൾ"
    },
    home: {
      welcome: "സ്വാഗതം, കർഷക സുഹൃത്തേ!",
      subtitle: "നിങ്ങളുടെ കാർഷിക വിവരങ്ങൾ തയ്യാറാണ്.",
      moisture: "ഈർപ്പത്തിന്റെ അളവ്",
      temp: "ശരാശരി താപനില",
      wind: "കാറ്റിന്റെ വേഗത",
      weatherTitle: "പ്രാദേശിക കാർഷിക ഉപദേശം",
      weatherPlaceholder: "നിങ്ങളുടെ നഗരം/പ്രദേശം നൽകുക...",
      getAdvice: "ഉപദേശം നേടുക",
      tasks: "വരാനിരിക്കുന്ന ജോലികൾ",
      market: "വിപണി പ്രവണതകൾ"
    },
    crop: {
      title: "AI വിള ശുപാർശ",
      soilType: "മണ്ണിന്റെ തരം",
      ph: "മണ്ണിന്റെ pH അളവ്",
      temp: "ശരാശരി താപനില (°C)",
      humidity: "ആർദ്രത (%)",
      rainfall: "വാർഷിക മഴ (mm)",
      button: "ശുപാർശകൾ തയ്യാറാക്കുക",
      reasoning: "കാരണം",
      conditions: "അനുയോജ്യമായ സാഹചര്യങ്ങൾ",
      tips: "കൃഷി നുറുങ്ങ്"
    },
    disease: {
      title: "വിള രോഗനിർണയം",
      subtitle: "രോഗനിർണയത്തിനായി വിളയുടെ ഇലയുടെ ചിത്രം അപ്‌ലോഡ് ചെയ്യുക.",
      upload: "അപ്‌ലോഡ് ചെയ്യാനോ ഫോട്ടോ എടുക്കാനോ ക്ലിക്ക് ചെയ്യുക",
      analyze: "പരിശോധന ആരംഭിക്കുക",
      symptoms: "ലക്ഷണങ്ങൾ",
      treatment: "ചികിത്സാ രീതി",
      prevention: "പ്രതിരോധം"
    },
    irrigation: {
      title: "സ്മാർട്ട് ജലസേചന സഹായി",
      subtitle: "സെൻസറുകൾ അടിസ്ഥാനമാക്കിയുള്ള ജല മാനേജ്‌മെന്റ്.",
      moistureLabel: "മണ്ണിലെ ഈർപ്പം",
      tempLabel: "ശരാശരി താപനില",
      cropType: "നിലവിലെ വിള",
      button: "ആവശ്യങ്ങൾ കണക്കാക്കുക",
      schedule: "ജലസേചന സമയക്രമം",
      amount: "വെള്ളത്തിന്റെ അളവ്"
    },
    common: {
      loading: "വിവരങ്ങൾ ശേഖരിക്കുന്നു...",
      analyzing: "വിശകലനം ചെയ്യുന്നു...",
      poweredBy: "ഇന്റലിജന്റ് ഫാമിംഗ് സിസ്റ്റം"
    }
  }
};
