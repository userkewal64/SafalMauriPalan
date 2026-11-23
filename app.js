/**
 * SAFAL MAURI PALAN — COMPLETE MULTI-PAGE APPLICATION SCRIPT (app.js)
 * Company: Safal Mauri Palan (सफल मौरी पालन)
 * Product: Itahari Honey (इटहरी मह)
 * 
 * Selective English / Nepali Language Engine, 3D Prototype Bottle Tilt,
 * Active Navigation, Gallery Lightbox, FAQ Accordion, and WhatsApp Integration.
 */

// Force page to always reach its top content on refresh or navigation
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('pageshow', () => {
  window.scrollTo(0, 0);
});

window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  initLanguageSwitcher();
  initGlobalNavigation();
  initHeroBottlesInteraction();
  initGalleryLightbox();
  initEquipmentFilter();
  initFaqAccordion();
  initScrollToTop();
  initWhatsAppHelpers();
  initFlyingBee();
  // initInteractiveHoneyFlow();
});

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
});

/* --------------------------------------------------------------------------
   1. SELECTIVE BILINGUAL ENGINE
   Rules:
   - English mode: Completely English.
   - Nepali mode: Natural Nepali prose while strictly preserving technical terms,
     scientific names (Apis mellifera, Apis cerana), product names (Itahari Honey,
     Mustard Honey, Litchi Honey, Multifloral Honey), brand name (Safal Mauri Palan),
     equipment titles, and units (kg, g, tons) in English.
   -------------------------------------------------------------------------- */
const translations = {
  ne: {
    // Navigation (7 Global Pages) - INTENTIONAL EXCEPTION: Kept in English in both modes
    nav_home: "Home",
    nav_products: "Honey Varieties",
    nav_accessories: "Beekeeping Accessories",
    nav_gallery: "Gallery",
    nav_resources: "Resources",
    nav_about: "About Us",
    nav_contact: "Contact Us",
    nav_whatsapp: "WhatsApp",
    nav_brand_company: "Safal Mauri Palan",
    nav_brand_sub: "Producer of Itahari Honey",

    // Common Footer & Global Elements
    foot_company: "Safal Mauri Palan",
    foot_tagline: "इटहरी मह तथा दिगो मौरी फार्म (Producer of Itahari Honey)",
    foot_desc: "हाम्रो लक्ष्य आधुनिक र दिगो मौरीपालन मार्फत शुद्ध Itahari Honey उत्पादन गर्नु र नेपालभर गुणस्तरीय मौरीपालन सामग्री उपलब्ध गराउनु हो।",
    foot_quick_links: "महत्वपूर्ण लिङ्कहरू",
    foot_contact_title: "सम्पर्क जानकारी",
    foot_hours: "खुल्ने समय: हप्ताको ७ दिन, बिहान ७:०० देखि साँझ ७:०० सम्म",
    foot_rights: "© २०२६ Safal Mauri Palan. सर्वाधिकार सुरक्षित।",

    // --- PAGE 1: INDEX.HTML (HOMEPAGE) ---
    home_badge: "सफल मौरी पालन • इटहरी-४, सुनसरी",
    home_hero_title: "इटहरीको शुद्ध मह: <span class=\"gold-gradient-text\">Itahari Honey</span>",
    home_hero_tagline: "सफल मौरी पालन द्वारा उत्पादित १००% शुद्ध र प्राकृतिक मह",
    home_hero_desc: "विगत १० वर्षभन्दा बढी समयदेखि आधुनिक र वैज्ञानिक मौरीपालन गर्दै आएको सफल मौरी पालन ले संकलन गरेको शुद्ध र प्राकृतिक Itahari Honey।",
    home_btn_varieties: "महका प्रकारहरू हेर्नुहोस्",
    home_btn_accessories: "मौरीपालनका सामग्रीहरू",
    home_btn_whatsapp: "WhatsApp मा अर्डर गर्नुहोस्",
    home_stat_years_num: "१०+ वर्ष",
    home_stat_years_lbl: "मौरीपालन अनुभव",
    home_stat_yield_num: "१०–१५ टन",
    home_stat_yield_lbl: "वार्षिक मह उत्पादन",
    home_stat_purity_num: "१००% शुद्ध",
    home_stat_purity_lbl: "प्राकृतिक मह",

    // Two Real Honey Bottles in Hero
    home_bottle1_name: "Itahari Honey – १ के.जी.",
    home_bottle1_price: "रु. १२००",
    home_bottle2_name: "Itahari Honey – ५०० ग्राम",
    home_bottle2_price: "रु. ६००",
    home_varieties_available_lbl: "उपलब्ध प्रकारहरू:",
    home_var_mustard: "तोरीको मह (Mustard Honey)",
    home_var_litchi: "लिचीको मह (Litchi Honey)",
    home_var_multi: "बहुफुली मह (Multifloral Honey)",
    home_btn_order_wa: "WhatsApp अर्डर",
    home_explore_varieties_btn: "सबै महका प्रकारहरू र विवरण हेर्नुहोस्",

    home_acc_preview_label: "मौरीपालन सामग्री तथा गोलाहरू",
    home_acc_preview_title: "मौरीपालन सामग्री तथा <span class=\"gold-gradient-text\">मौरीका गोलाहरू</span>",
    home_acc_preview_desc: "Safal Mauri Palan मा व्यावसायिक तथा व्यक्तिगत मौरीपालकहरूका लागि आवश्यक सम्पूर्ण घारहरू, Apis mellifera गोलाहरू, र मह निष्कासन (extraction) उपकरण उपलब्ध छन्।",
    home_acc_explore_btn: "सबै सामग्रीहरू हेर्नुहोस्",

    home_vid_preview_label: "फार्मको प्रत्यक्ष झलक",
    home_vid_preview_title: "सफल मौरी पालन <span class=\"gold-gradient-text\">भिडियो भ्रमण</span>",
    home_vid_preview_desc: "इटहरी फार्ममा मौरीपालन तथा मह संकलनको प्रत्यक्ष भिडियो झलक।",
    home_about_explore_btn: "हाम्रोबारे थप जान्नुहोस्",

    // --- PAGE 2: OURPRODUCTS.HTML (HONEY VARIETIES & CATALOGUE) ---
    prod_hero_label: "शुद्ध र प्राकृतिक मह",
    prod_hero_title: "महका <span class=\"gold-gradient-text\">प्राकृतिक प्रकारहरू</span>",
    prod_hero_desc: "सफल मौरी पालन द्वारा उत्पादित Itahari Honey का ३ प्राकृतिक प्रकारहरू र आधिकारिक साइजहरू।",
    prod_sources_header: "Itahari Honey का प्राकृतिक फूलका स्रोतहरू",
    prod_sources_sub: "कुनै बाह्य मिसावट बिना संकलित शुद्ध र प्राकृतिक मह।",
    
    prod_mustard_title: "Mustard Honey (तोरीको मह)",
    prod_mustard_desc: "हाम्रो Mustard Honey तोरीका फूलहरूबाट संकलन गरिन्छ। यसको स्वाद स्वाभाविक रूपमा मीठो र सुगन्ध प्राकृतिक हुन्छ। चिसो मौसममा यो जम्नु शुद्ध महको स्वाभाविक गुण हो।",
    prod_mustard_p1: "फूलको स्रोत: तोरीको फूल (Mustard Blossoms)",
    prod_mustard_p2: "स्वाद: प्राकृतिक रूपमा मीठो र स्वादिलो",
    prod_mustard_p3: "रङ्ग: सुनौलो पहेँलो (Warm Golden)",

    prod_litchi_title: "Litchi Honey (लिचीको मह)",
    prod_litchi_desc: "हाम्रो Litchi Honey लिचीका फूलहरूबाट संकलन गरिन्छ। यो हल्का, ताजा र प्राकृतिक सुगन्धले भरिपूर्ण हुन्छ।",
    prod_litchi_p1: "फूलको स्रोत: लिचीको फूल (Litchi Blossoms)",
    prod_litchi_p2: "स्वाद: हल्का र सुगन्धित",
    prod_litchi_p3: "रङ्ग: सफा एम्बर (Clear Amber)",

    prod_multi_title: "Multifloral Honey (बहुफुली मह)",
    prod_multi_desc: "हाम्रो Multifloral Honey मौसमअनुसार विभिन्न प्राकृतिक फूलहरूबाट संकलन गरिएको मिश्रण हो। यसमा विविध फूलहरूको सन्तुलित स्वाद र सुगन्ध पाइन्छ।",
    prod_multi_p1: "फूलको स्रोत: विभिन्न जंगली फूलहरू (Wildflowers)",
    prod_multi_p2: "स्वाद: सन्तुलित र विशेष बास्नादार",
    prod_multi_p3: "रङ्ग: गाढा सुनौलो एम्बर (Rich Golden Amber)",

    prod_cat_label: "उत्पादन क्याटलग",
    prod_cat_title: "Itahari Honey का <span class=\"gold-gradient-text\">आधिकारिक बोतलहरू</span>",
    prod_cat_desc: "सफल मौरी पालन द्वारा उत्पादित १ के.जी. र ५०० ग्रामका आधिकारिक ग्लास जारहरू।",
    prod_1kg_title: "Itahari Honey – १ के.जी. Jar",
    prod_1kg_sub: "उत्पादक: सफल मौरी पालन, इटहरी",
    prod_1kg_price: "रु. १२००",
    prod_badge1: "सर्वाधिक रुचाइएको (१ के.जी.)",
    prod_badge2: "पारिवारिक साइज (५०० ग्राम)",
    prod_500g_title: "Itahari Honey – ५०० ग्राम Jar",
    prod_500g_sub: "उत्पादक: सफल मौरी पालन, इटहरी",
    prod_500g_price: "रु. ६००",
    prod_sources_title: "उपलब्ध प्राकृतिक प्रकारहरू:",
    prod_source_1: "१. तोरीको मह (Mustard Honey)",
    prod_source_2: "२. लिचीको मह (Litchi Honey)",
    prod_source_3: "३. बहुफुली मह (Multifloral Honey)",
    prod_order_btn: "WhatsApp मा अर्डर गर्नुहोस्",
    prod_call_btn: "फोनबाट अर्डर गर्नुहोस्",
    prod_purity_tip: "<strong>शुद्धता जानकारी:</strong> चिसो मौसममा मह जम्नु शुद्ध महको प्राकृतिक गुण हो। यसलाई पुनः तरल बनाउन सिसीलाई मनतातो पानीमा केही समय राख्न सक्नुहुन्छ।",

    // --- PAGE 3: MORESERVICES.HTML (BEEKEEPING ACCESSORIES) ---
    acc_hero_label: "मौरीपालन सामग्री तथा गोलाहरू",
    acc_hero_title: "मौरीपालन सामग्री तथा <span class=\"gold-gradient-text\">मौरीका गोलाहरू</span>",
    acc_hero_desc: "सफल मौरी पालन मा व्यावसायिक तथा व्यक्तिगत मौरीपालकहरूका लागि आवश्यक आधुनिक घारहरू, मौरीका गोलाहरू, र मह संकलनका सम्पूर्ण उपकरणहरू उपलब्ध छन्।",
    acc_intro_title: "सम्पूर्ण मौरीपालन सामग्री उपलब्ध",
    acc_intro_quote: "<u>सफल मौरी पालन</u> मा तपाईंको सम्पूर्ण मौरीपालन आवश्यकताहरूको समाधान उपलब्ध छ। हामी केवल उच्च गुणस्तरीय मह मात्र आपूर्ति गर्दैनौं, व्यवसायिक र व्यक्तिगत मौरीपालक दुवैका लागि आधुनिक घारहरू, मौरीका गोलाहरू (Apis mellifera र Apis cerana), सुरक्षा सामग्री जस्तै टोपी, पञ्जा, ब्रस, धुवादानी (smoker) र आधुनिक मह मदानी (centrifugal extractor) उपलब्ध गराउँछौं।",

    acc_filter_all: "सबै सामग्री",
    acc_filter_hives: "घार तथा मौरीका गोलाहरू",
    acc_filter_harvest: "मह संकलन उपकरण",
    acc_filter_gear: "सुरक्षा सामग्री",
    acc_filter_health: "रोग तथा माइट नियन्त्रण",

    eq_1_title: "काठे घार (Apis mellifera)",
    eq_1_sub: "आधुनिक फ्रेमयुक्त काठको घार",
    eq_2_title: "काठे घार (Apis cerana)",
    eq_2_sub: "सुधारिएको स्थानीय मौरीको घार",
    eq_3_title: "मौरीका गोलाहरू (Live Bee Colonies)",
    eq_3_sub: "Apis mellifera र Apis cerana मौरीका गोला",
    eq_4_title: "मह काड्ने मेसिन / मदानी",
    eq_4_sub: "Centrifugal Honey Extractor (मह मदानी)",
    eq_5_title: "मौरी टोपी तथा जाली (Bee Veil)",
    eq_5_sub: "सुरक्षा जालीसहितको टोपी",
    eq_6_title: "स्टेनलेस स्टिल धुवादानी (Smoker)",
    eq_6_sub: "धुवादानी (Bee Smoker)",
    eq_7_title: "नरम मौरी ब्रस (Bee Brush)",
    eq_7_sub: "फ्रेमबाट मौरी हटाउने विशेष ब्रस",
    eq_8_title: "मौरीपालन पञ्जा (Bee Gloves)",
    eq_8_sub: "सुरक्षित र बलियो पञ्जा",
    eq_9_title: "एपिस्टोन स्ट्रिप (Apistone)",
    eq_9_sub: "Varroa Mite नियन्त्रण स्ट्रिप",
    eq_10_title: "फर्मिक एसिड सोलुसन",
    eq_10_sub: "जैविक माइट नियन्त्रण औषधि (Organic Mite Control)",
    eq_inquire_btn: "मूल्य सोधपुछ गर्नुहोस्",

    // --- PAGE 4: GALLERY.HTML (8 CAREFULLY SELECTED FARM PHOTOS) ---
    gal_hero_label: "सुनसरी फार्मको दैनिकी",
    gal_hero_title: "हाम्रो वास्तविक <span class=\"gold-gradient-text\">फार्म ग्यालरी</span>",
    gal_hero_desc: "सफल मौरी पालन को इटहरी-४ स्थित मौरी फार्म, काठका घारहरू, मौरीका चाका र मह संकलनका ८ वास्तविक तस्बिरहरू।",
    gal_img1_caption: "सफल फार्मका आधुनिक मौरी घारहरू",
    gal_img2_caption: "बिक्रीका लागि आधुनिक मौरी घारहरू",
    gal_img3_caption: "मौरीपालन सचेतना तथा समुदाय अन्तरक्रिया",
    gal_img4_caption: "सिलबन्दी महका चाका संकलन",
    gal_img5_caption: "प्याकेजिङ गरिएका महका बोतलहरू",
    gal_img6_caption: "बिक्रीका लागि लेबलयुक्त महका बोतलहरू",
    gal_img7_caption: "बिहानी घाममा मौरीका गोलाहरू",
    gal_img8_caption: "विभिन्न महका प्रकार र रङहरू",

    // --- PAGE 5: RESOURCES.HTML (KNOWLEDGE & FAQS) ---
    res_hero_label: "मौरीपालन ज्ञान केन्द्र",
    res_hero_title: "मौरीपालन स्रोत तथा <span class=\"gold-gradient-text\">जानकारी सँगालो</span>",
    res_hero_desc: "मौरीका प्रजातिहरू, महको वैज्ञानिक गुणहरू, मौरीपालनका आधारभूत कुराहरू र सामान्य जिज्ञासाहरूको सँगालो।",
    
    res_species_title: "१. नेपालमा पाइने मौरीका प्रमुख प्रजातिहरू",
    res_species_desc: "नेपालमा मुख्यतया Apis mellifera (युरोपेली मौरी, उच्च मह उत्पादन र शान्त स्वभाव) र Apis cerana (स्थानीय रैथाने मौरी, स्थानीय हावापानीसँग अनुकूल) पालिन्छ। साथै Apis dorsata र Apis laboriosa जङ्गली प्रजाति हुन्।",
    
    res_crystal_title: "२. मह जम्ने (Crystallization) वैज्ञानिक प्रक्रिया",
    res_crystal_desc: "शुद्ध कच्चा महमा Glucose र Fructose को प्राकृतिक अनुपातका कारण चिसो मौसममा crystallization हुनु स्वाभाविक हो। यो मह बिग्रेको वा चिनी मिसाएको होइन, बरु मह नउमालिएको र शुद्ध रहेको वैज्ञानिक प्रमाण हो।",
    
    res_begin_title: "३. मौरीपालन कसरी सुरु गर्ने?",
    res_begin_desc: "नयाँ मौरीपालकहरूले प्रशस्त फूल फुल्ने ठाउँ, सफा पिउने पानीको स्रोत र तेज हावा नलाग्ने स्थान रोज्नुपर्छ। उचित काठे घार, सुरक्षा जाली, धुवादानी र नियमित निरीक्षणले मौरीपालन सफल बनाउँछ।",
    
    res_faq_title: "बारम्बार सोधिने प्रश्नहरू (FAQ)",
    faq_q1: "Itahari Honey साँच्चिकै १००% शुद्ध छ?",
    faq_a1: "हो, Safal Mauri Palan को Itahari Honey कुनै बाह्य चिनी, केमिकल वा रसायन बिना हाम्रा घारहरूबाट सीधै संकलन गरिएको १००% शुद्ध र प्राकृतिक मह हो।",
    faq_q2: "चिसोमा मह किन जम्छ? के यो मिसावट हो?",
    faq_a2: "मह जम्नु (crystallization) कुनै मिसावट होइन। शुद्ध महमा हुने प्राकृतिक glucose ले गर्दा चिसोमा मह जम्दछ। सिसीलाई मनतातो पानीमा राखेर फेरि तरल बनाउन सकिन्छ।",
    faq_q3: "Mustard र Litchi Honey मा के फरक छ?",
    faq_a3: "Mustard Honey तोरीका फूलबाट संकलित हुन्छ, जुन स्वादिलो र छिटो crystallize हुने खालको हुन्छ। Litchi Honey लिचीका फूलबाट संकलित हल्का, सफा सुनौलो र प्राकृतिक फलफूलको सुगन्धयुक्त हुन्छ।",
    faq_q4: "के म Safal Mauri Palan बाट live bee colony र उपकरण खरिद गर्न सक्छु?",
    faq_a4: "हो, हामी Apis mellifera र Apis cerana का live colonies, beehives, honey extractors, protective veil, smokers र mite control औषधिहरू उपलब्ध गराउँछौं।",

    // --- PAGE 6: ABOUT.HTML (ABOUT US & VIDEO) ---
    abt_hero_label: "हाम्रो यात्रा र अनुभव",
    abt_hero_title: "<span class=\"gold-gradient-text\">सफल मौरी पालन</span> को बारेमा",
    abt_hero_desc: "इटहरी, सुनसरीमा विगत १० वर्षभन्दा बढी समयदेखि आधुनिक, दिगो र वैज्ञानिक मौरीपालन गर्दै आएको अग्रणी मौरी फार्म।",
    abt_quote: "<strong><u>सफल मौरी पालन (Safal Mauri Palan)</u> मा तपाईँलाई हार्दिक स्वागत छ।</strong><br><br>इटहरी, नेपालमा अवस्थित सफल मौरी पालन ले विगत १० वर्षभन्दा बढी समयदेखि आधुनिक, दिगो र वैज्ञानिक मौरीपालन गर्दै आएको छ। हामी <em>Apis mellifera</em> प्रजातिका मौरीहरूलाई आधुनिक तरिकाबाट पालन–पोषण गर्छौं, जसले मौरीहरूको स्वास्थ्य र उत्पादन दुवै उच्च स्तरमा राख्छ।<br><br>दशकभन्दा धेरै अनुभवसहित, हामी हाल हरेक वर्ष <strong>१०–१५ टन शुद्ध मह</strong> उत्पादन गर्दै आएका छौँ। हाम्रो मह विभिन्न प्राकृतिक फूल र बोटबिरुवाबाट संकलित हुने भएकाले प्रत्येक प्रकारमा छुट्टै स्वाद, सुगन्ध र प्राकृतिक गुण पाइन्छ।",
    abt_feat1_title: "शतप्रतिशत प्राकृतिक (Zero Adulteration)",
    abt_feat1_desc: "कुनै बाह्य चिनी वा केमिकल मिसावट बिना संकलित शतप्रतिशत प्राकृतिक मह।",
    abt_feat2_title: "वैज्ञानिक मौरी हेरचाह",
    abt_feat2_desc: "वैज्ञानिक विधिबाट मौरीका गोलाहरूको नियमित स्वास्थ्य परीक्षण र उचित हेरचाह।",
    abt_feat3_title: "वार्षिक १०–१५ टन उत्पादन क्षमता",
    abt_feat3_desc: "वार्षिक १० देखि १५ टन शुद्ध मह उत्पादन गर्न सक्ने अनुभवी क्षमता।",
    abt_feat4_title: "पूर्ण मौरीपालन सहयोग",
    abt_feat4_desc: "नयाँ तथा व्यावसायिक मौरीपालकहरूलाई घार, सामग्री र प्राविधिक सल्लाह।",
    abt_video_title: "प्रत्यक्ष भिडियो: मौरीपालन तथा मह संकलन",
    abt_video_caption: "सफल मौरी पालन, इटहरी-४, सुनसरी — प्राङ्गारिक मौरीपालन र शुद्ध मह संकलनको प्रत्यक्ष भिडियो झलक।",

    // --- PAGE 7: CONTACT.HTML (CONTACT US & MAP) ---
    cnt_hero_label: "हामीलाई सम्पर्क गर्नुहोस्",
    cnt_hero_title: "<span class=\"gold-gradient-text\">सफल मौरी पालन</span> सम्पर्क",
    cnt_hero_desc: "Itahari Honey खरिद गर्न, घार तथा मौरीपालन सामग्री मगाउन वा हाम्रो फार्म भ्रमण गर्न हामीलाई सम्पर्क गर्नुहोस्।",
    cnt_addr_title: "फार्म तथा कम्पनीको ठेगाना",
    cnt_addr_val: "<strong>सफल मौरी पालन (Safal Mauri Palan)</strong><br><strong>Itahari Honey</strong> को आधिकारिक उत्पादक<br>इटहरी-४, सुनसरी जिल्ला, कोशी प्रदेश, नेपाल",
    cnt_phones_title: "सीधा फोन सम्पर्क (Click to Call)",
    cnt_phones_sub: "हाम्रा प्रतिनिधिहरूसँग सीधै कुरा गर्नुहोस्:",
    cnt_social_title: "सामाजिक सञ्जालहरू",
    cnt_social_sub: "हाम्रा भिडियो तथा नयाँ updates हेर्नुहोस्:",
    cnt_map_title: "गुगल म्यापमा हाम्रो स्थान",
    cnt_msg_title: "WhatsApp मा सीधा सन्देश पठाउनुहोस्",
    cnt_msg_sub: "आफ्नो आवश्यकता वा अर्डर तल लेखी पठाउनुहोस्:",
    cnt_msg_ph: "जस्तै: मलाई २ के.जी. तोरीको मह चाहियो।"
  },

  en: {
    // Navigation (7 Global Pages)
    nav_home: "Home",
    nav_products: "Honey Varieties",
    nav_accessories: "Beekeeping Accessories",
    nav_gallery: "Gallery",
    nav_resources: "Resources",
    nav_about: "About Us",
    nav_contact: "Contact Us",
    nav_whatsapp: "WhatsApp",
    nav_brand_company: "Safal Mauri Palan",
    nav_brand_sub: "Producer of Itahari Honey",

    // Common Footer & Global Elements
    foot_company: "Safal Mauri Palan",
    foot_tagline: "Producer of Itahari Honey & Sustainable Apiary Farm",
    foot_desc: "Dedicated to modern, sustainable apiculture, producing pure Itahari Honey and equipping beekeepers with professional apiary equipment across Nepal.",
    foot_quick_links: "Quick Links",
    foot_contact_title: "Contact Information",
    foot_hours: "Opening Hours: 7 Days a Week, 7:00 AM – 7:00 PM",
    foot_rights: "© 2026 Safal Mauri Palan. All rights reserved.",

    // --- PAGE 1: INDEX.HTML (HOMEPAGE) ---
    home_badge: "Safal Mauri Palan • Itahari-4, Sunsari",
    home_hero_title: "Pure Honey from Itahari: <span class=\"gold-gradient-text\">Itahari Honey</span>",
    home_hero_tagline: "100% Pure & Natural Honey by Safal Mauri Palan",
    home_hero_desc: "Safal Mauri Palan has practiced modern and scientific beekeeping in Itahari for over 10 years, producing pure and natural honey from healthy Apis mellifera bee colonies.",
    home_btn_varieties: "Honey Varieties",
    home_btn_accessories: "Beekeeping Accessories",
    home_btn_whatsapp: "Order on WhatsApp",
    home_stat_years_num: "10+ Years",
    home_stat_years_lbl: "Beekeeping Experience",
    home_stat_yield_num: "10–15 Tons",
    home_stat_yield_lbl: "Annual Honey Harvest",
    home_stat_purity_num: "100% Pure",
    home_stat_purity_lbl: "Natural Apiary Honey",

    // Two Real Honey Bottles in Hero
    home_bottle1_name: "Itahari Honey – 1 kg",
    home_bottle1_price: "Rs. 1200",
    home_bottle2_name: "Itahari Honey – 500 g",
    home_bottle2_price: "Rs. 600",
    home_varieties_available_lbl: "Available Varieties:",
    home_var_mustard: "Mustard Honey",
    home_var_litchi: "Litchi Honey",
    home_var_multi: "Multifloral Honey",
    home_btn_order_wa: "Order on WhatsApp",
    home_explore_varieties_btn: "View Honey Varieties & Details",

    home_acc_preview_label: "Apiary Supplies",
    home_acc_preview_title: "Beekeeping Equipment & <span class=\"gold-gradient-text\">Bee Colonies</span>",
    home_acc_preview_desc: "Supplying complete modern beehives, healthy Apis mellifera colonies, centrifugal honey extractors, and protective gear for apiarists.",
    home_acc_explore_btn: "View All Beekeeping Accessories",

    home_vid_preview_label: "Farm In Action",
    home_vid_preview_title: "Safal Mauri Palan <span class=\"gold-gradient-text\">Video Tour</span>",
    home_vid_preview_desc: "Watch authentic video footage of our apiary operations, comb management, and honey extraction in Itahari, Sunsari.",
    home_about_explore_btn: "Read More About Us",

    // --- PAGE 2: OURPRODUCTS.HTML (HONEY VARIETIES & CATALOGUE) ---
    prod_hero_label: "Pure Honey",
    prod_hero_title: "Honey <span class=\"gold-gradient-text\">Varieties</span>",
    prod_hero_desc: "The three natural floral varieties of Itahari Honey and official packaging sizes produced by Safal Mauri Palan.",
    prod_sources_header: "Natural Floral Sources of Itahari Honey",
    prod_sources_sub: "Harvested pure and natural without artificial additives to preserve authentic aroma and taste.",
    
    prod_mustard_title: "Mustard Honey",
    prod_mustard_desc: "Our Mustard Honey is collected from mustard blossoms. It has a naturally sweet taste and distinct aroma. Becoming solid in colder weather is a natural characteristic of pure honey.",
    prod_mustard_p1: "Floral Source: Mustard Blossoms",
    prod_mustard_p2: "Taste: Naturally Sweet & Smooth",
    prod_mustard_p3: "Color: Warm Golden",

    prod_litchi_title: "Litchi Honey",
    prod_litchi_desc: "Our Litchi Honey is collected from litchi orchard blossoms. It is light, smooth, and naturally fragrant.",
    prod_litchi_p1: "Floral Source: Litchi Blossoms",
    prod_litchi_p2: "Taste: Light & Fragrant",
    prod_litchi_p3: "Color: Clear Amber",

    prod_multi_title: "Multifloral Honey",
    prod_multi_desc: "Our Multifloral Honey is collected from a seasonal blend of diverse blossoms. It offers a balanced taste and distinct natural aroma.",
    prod_multi_p1: "Floral Source: Diverse Wildflowers",
    prod_multi_p2: "Taste: Balanced & Aromatic",
    prod_multi_p3: "Color: Rich Golden Amber",

    prod_cat_label: "Product Catalogue",
    prod_cat_title: "Branded Bottles of <span class=\"gold-gradient-text\">Itahari Honey</span>",
    prod_cat_desc: "Official 1 kg and 500 g glass jars produced by Safal Mauri Palan in Itahari-4, Sunsari.",
    prod_1kg_title: "Itahari Honey – 1 kg Jar",
    prod_1kg_sub: "Producer: Safal Mauri Palan, Itahari",
    prod_1kg_price: "Rs. 1200",
    prod_badge1: "1 kg Jar",
    prod_badge2: "500 g Jar",
    prod_500g_title: "Itahari Honey – 500 g Jar",
    prod_500g_sub: "Producer: Safal Mauri Palan, Itahari",
    prod_500g_price: "Rs. 600",
    prod_sources_title: "Available Floral Varieties:",
    prod_source_1: "1. Mustard Honey",
    prod_source_2: "2. Litchi Honey",
    prod_source_3: "3. Multifloral Honey",
    prod_order_btn: "Order on WhatsApp",
    prod_call_btn: "Call to Order",
    prod_purity_tip: "<strong>Purity Note:</strong> Pure honey naturally solidifies in cold temperatures. To gently liquefy it, place the jar in a bowl of warm water for a few minutes.",

    // --- PAGE 3: MORESERVICES.HTML (BEEKEEPING ACCESSORIES) ---
    acc_hero_label: "Apiary Supplies & Colonies",
    acc_hero_title: "Beekeeping Accessories & <span class=\"gold-gradient-text\">Bee Colonies</span>",
    acc_hero_desc: "Providing high-grade beehives, healthy colonies, centrifugal extractors, and protective gear for commercial and individual beekeepers.",
    acc_intro_title: "Comprehensive Beekeeping Equipment",
    acc_intro_quote: "<u>Safal Mauri Palan</u> provides complete solutions for all your beekeeping needs. In addition to producing pure honey, we equip beekeepers across Nepal with wooden frame hives, healthy bee colonies (Apis mellifera and Apis cerana), protective caps, gloves, soft brushes, smokers, and centrifugal honey extractors.",

    acc_filter_all: "All Equipment",
    acc_filter_hives: "Beehives & Colonies",
    acc_filter_harvest: "Harvesting Equipment",
    acc_filter_gear: "Protective Gear",
    acc_filter_health: "Mite Control",

    eq_1_title: "Beehive (Apis mellifera)",
    eq_1_sub: "Modern Wooden Frame Hive",
    eq_2_title: "Beehive (Apis cerana)",
    eq_2_sub: "Improved Indigenous Hive",
    eq_3_title: "Live Bee Colonies",
    eq_3_sub: "Apis mellifera & Apis cerana",
    eq_4_title: "Honey Harvesting Machine",
    eq_4_sub: "Centrifugal Honey Extractor",
    eq_5_title: "Protective Bee Cap & Veil",
    eq_5_sub: "Safety Mesh Cap",
    eq_6_title: "Stainless Steel Bee Smoker",
    eq_6_sub: "Bellows Hive Smoker",
    eq_7_title: "Soft Bristle Bee Brush",
    eq_7_sub: "Gentle Comb Brush",
    eq_8_title: "Heavy-duty Beekeeping Gloves",
    eq_8_sub: "Protective Canvas & Leather Gloves",
    eq_9_title: "Apistone Treatment",
    eq_9_sub: "Varroa Mite Control Strip",
    eq_10_title: "Formic Acid Solution",
    eq_10_sub: "Organic Mite Control Treatment",
    eq_inquire_btn: "Inquire Price via WhatsApp",

    // --- PAGE 4: GALLERY.HTML (8 CAREFULLY SELECTED FARM PHOTOS) ---
    gal_hero_label: "Apiary Life in Sunsari",
    gal_hero_title: "Genuine <span class=\"gold-gradient-text\">Farm Gallery</span>",
    gal_hero_desc: "Eight genuine, carefully curated photographs showcasing our wooden beehives, comb inspections, and honey harvesting in Itahari, Nepal.",
    gal_img1_caption: "Modern Beehives in Safal Bee Farm",
    gal_img2_caption: "Modern Beehives for Sale",
    gal_img3_caption: "Beekeeping Awareness and Community Interaction",
    gal_img4_caption: "Harvesting Fully Sealed Honey Frames",
    gal_img5_caption: "Packaged Honey Bottles",
    gal_img6_caption: "Honey Bottles with Product Labels for Sale",
    gal_img7_caption: "Bee Colonies in Morning Sunlight",
    gal_img8_caption: "Different Honey Varieties and Natural Colors",

    // --- PAGE 5: RESOURCES.HTML (KNOWLEDGE & FAQS) ---
    res_hero_label: "Educational Knowledge Hub",
    res_hero_title: "Beekeeping Resources & <span class=\"gold-gradient-text\">Knowledge Guide</span>",
    res_hero_desc: "A practical guide to honeybee species, honey crystallization science, apiary management basics, and frequently asked questions.",
    
    res_species_title: "1. Honeybee Species in Nepal",
    res_species_desc: "Beekeepers in Nepal primarily manage Apis mellifera (European honeybee, recognized for high honey yield and docile temperament) and Apis cerana (indigenous Asian honeybee, highly adapted to local climate and flora). Wild cliff species include Apis laboriosa and Apis dorsata.",
    
    res_crystal_title: "2. The Science of Honey Crystallization",
    res_crystal_desc: "Natural honey is a concentrated solution of glucose and fructose. When stored in cooler temperatures, glucose naturally separates and forms fine crystals. Crystallization is not spoilage or sugar adulteration; it is scientific evidence that the honey is 100% raw and unpasteurized.",
    
    res_begin_title: "3. Starting Your First Apiary",
    res_begin_desc: "New beekeepers should choose a sheltered location with abundant seasonal floral forage, clean water access, and protection from direct heavy winds. Starting with standard wooden frame hives, a safety veil, a smoker, and regular frame inspections ensures healthy colony establishment.",
    
    res_faq_title: "Frequently Asked Questions (FAQ)",
    faq_q1: "Is Itahari Honey 100% pure and unadulterated?",
    faq_a1: "Yes. Itahari Honey is cold-extracted directly from our hives at Safal Mauri Palan without any added glucose syrup, preservatives, or artificial heating.",
    faq_q2: "Why does raw honey crystallize in cold weather?",
    faq_a2: "Crystallization is a natural physical process caused by the natural glucose in raw honey. Simply place the glass jar in a warm water bath to gently return it to a liquid state.",
    faq_q3: "What is the difference between Mustard and Litchi Honey?",
    faq_a3: "Mustard Honey is gathered from winter mustard fields, characterized by a creamy texture and rapid crystallization. Litchi Honey is harvested from spring litchi orchards, offering a delicate floral aroma and clear golden appearance.",
    faq_q4: "Can beginners purchase live bee colonies and equipment from Safal Mauri Palan?",
    faq_a4: "Yes. We supply healthy Apis mellifera and Apis cerana colonies, wooden hives, centrifugal extractors, protective gear, and essential management guidance for beginners and commercial farms alike.",

    // --- PAGE 6: ABOUT.HTML (ABOUT US & VIDEO) ---
    abt_hero_label: "Our Journey & Legacy",
    abt_hero_title: "About <span class=\"gold-gradient-text\">Safal Mauri Palan</span>",
    abt_hero_desc: "Established in Itahari, Sunsari, Safal Mauri Palan has practiced modern, sustainable, and scientific beekeeping for over a decade.",
    abt_quote: "<strong>Welcome to <u>Safal Mauri Palan</u>.</strong><br><br>Located in Itahari, Nepal, Safal Mauri Palan has been practicing modern, sustainable, and scientific beekeeping for over 10 years. We rear <em>Apis mellifera</em> colonies with modern apiculture techniques, ensuring optimal bee welfare and pure honey harvesting.<br><br>With over a decade of hands-on experience, we harvest <strong>10–15 tons of pure honey annually</strong>. Collected from diverse natural flora, each variety delivers distinctive aroma, taste, and natural goodness.",
    abt_feat1_title: "Zero Adulteration",
    abt_feat1_desc: "100% pure raw honey directly from beehives without added sugar or ultra-heating.",
    abt_feat2_title: "Apis mellifera Management",
    abt_feat2_desc: "Modern scientific care prioritizing colony health and queen vitality.",
    abt_feat3_title: "10–15 Tons Annual Yield",
    abt_feat3_desc: "Proven production capacity serving both individual households and bulk wholesale partners.",
    abt_feat4_title: "Complete Apiary Supply",
    abt_feat4_desc: "Providing beehives, live colonies, extractors, and hands-on guidance for local beekeepers.",
    abt_video_title: "Live Video: Beekeeping & Honey Harvesting",
    abt_video_caption: "Safal Mauri Palan, Itahari-4, Sunsari — Authentic live video of beekeeping and pure honey harvesting.",

    // --- PAGE 7: CONTACT.HTML (CONTACT US & MAP) ---
    cnt_hero_label: "Get In Touch",
    cnt_hero_title: "Contact <span class=\"gold-gradient-text\">Safal Mauri Palan</span>",
    cnt_hero_desc: "Connect with us to purchase Itahari Honey, order beehives and accessories, or visit our apiary farm in Itahari, Sunsari.",
    cnt_addr_title: "Farm & Company Location",
    cnt_addr_val: "<strong>Safal Mauri Palan</strong><br>Producer of <strong>Itahari Honey</strong><br>Itahari-4, Sunsari District, Koshi Province, Nepal",
    cnt_phones_title: "Direct Phone Lines (Click to Call)",
    cnt_phones_sub: "Speak directly with our beekeeping specialists:",
    cnt_social_title: "Social Media Channels",
    cnt_social_sub: "Follow our beekeeping updates and watch our educational videos:",
    cnt_map_title: "Find Us On Google Maps",
    cnt_msg_title: "Direct WhatsApp Message",
    cnt_msg_sub: "Type your order requirement or inquiry below:",
    cnt_msg_ph: "e.g. I would like to order 2 kg of Mustard Honey."
  }
};

let currentLang = 'ne';

function initLanguageSwitcher() {
  let saved = null;
  try {
    saved = localStorage.getItem('smp_lang');
  } catch (err) {}
  // Default to Nepali ('ne') for every first-time visitor regardless of browser language
  currentLang = (saved === 'en') ? 'en' : 'ne';

  const switcherPills = document.querySelectorAll('.lang-switcher-pill');
  switcherPills.forEach(pill => {
    const btns = pill.querySelectorAll('.lang-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetLang = btn.getAttribute('data-lang');
        if (targetLang && targetLang !== currentLang) {
          setLanguage(targetLang);
        }
      });
    });
  });

  setLanguage(currentLang);
}

function setLanguage(lang) {
  currentLang = (lang === 'en') ? 'en' : 'ne';
  try {
    localStorage.setItem('smp_lang', currentLang);
  } catch (err) {}
  
  document.documentElement.lang = currentLang;
  document.documentElement.setAttribute('translate', 'no');
  document.documentElement.classList.add('notranslate');

  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const dict = translations[lang] || translations.ne;

  // 1. Trusted HTML content updates (supports <span>, <strong>, <em>, <br>, etc.)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // 2. Plain text updates (preserves textContent, auto-promotes if translation contains trusted markup)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      if (dict[key].includes('<') && dict[key].includes('>')) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }
    }
  });

  // 3. Form input placeholder updates
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key]) {
      el.setAttribute('placeholder', dict[key]);
    }
  });
}

/* --------------------------------------------------------------------------
   2. GLOBAL NAVIGATION & ACTIVE LINK HIGHLIGHTING
   -------------------------------------------------------------------------- */
function initGlobalNavigation() {
  const navbar = document.querySelector('.navbar');
  const toggleBtn = document.querySelector('.nav-toggle');
  const closeBtn = document.querySelector('.mobile-close');
  const mobileMenu = document.querySelector('.mobile-menu');
  const backdrop = document.querySelector('.backdrop');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  function openMenu() {
    mobileMenu?.classList.add('open');
    backdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu?.classList.remove('open');
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);

  // Active page highlighting based on current URL path
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    } else if (href && currentPath.includes(href) && href !== 'index.html') {
      link.classList.add('active');
    }
  });
}

/* --------------------------------------------------------------------------
   3. HERO REAL BOTTLES PERSPECTIVE TILT (HOMEPAGE)
   -------------------------------------------------------------------------- */
function initHeroBottlesInteraction() {
  const cards = document.querySelectorAll('.hero-bottle-card');
  if (!cards.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   4. GALLERY LIGHTBOX MODAL (gallery.html)
   -------------------------------------------------------------------------- */
function initGalleryLightbox() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const modalCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.lightbox-close');

  if (!modal || !modalImg) return;

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const caption = card.querySelector('.gallery-overlay span');
      if (img) {
        modalImg.src = img.src;
        modalImg.alt = img.alt || 'Safal Mauri Palan Genuine Apiary Photograph';
        if (modalCaption && caption) {
          modalCaption.textContent = caption.textContent;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  closeBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   6. BEEKEEPING EQUIPMENT FILTER TABS (moreservices.html)
   -------------------------------------------------------------------------- */
function initEquipmentFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.equipment-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter') || 'all';

      cards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || category.includes(filterVal)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. FAQ ACCORDION (resources.html)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      faqItems.forEach(other => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. SCROLL TO TOP BUTTON
   -------------------------------------------------------------------------- */
function initScrollToTop() {
  const btn = document.querySelector('.scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --------------------------------------------------------------------------
   9. BILINGUAL WHATSAPP ORDER & INQUIRY HELPERS
   -------------------------------------------------------------------------- */
function initWhatsAppHelpers() {
  const primaryPhone = '9779802313025';

  // Honey product order buttons
  const orderBtns = document.querySelectorAll('.order-honey-btn');
  orderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const weight = btn.getAttribute('data-weight') || '1 kg';
      const price = btn.getAttribute('data-price') || (weight.includes('500') ? (currentLang === 'ne' ? 'रु. ६००' : 'Rs. 600') : (currentLang === 'ne' ? 'रु. १२००' : 'Rs. 1200'));

      let msgText = '';
      if (currentLang === 'ne') {
        msgText = `नमस्ते Safal Mauri Palan!\nम Itahari Honey अर्डर गर्न चाहन्छु:\n• Packaging: ${weight} Jar (${price})\nकृपया उपलब्ध variety (Mustard / Litchi / Multifloral) र डेलिभरी जानकारी दिनुहोला।`;
      } else {
        msgText = `Namaste Safal Mauri Palan!\nI would like to order Itahari Honey:\n• Packaging: ${weight} Jar (${price})\nPlease confirm the available floral variety (Mustard / Litchi / Multifloral) and delivery options.`;
      }

      window.open(`https://wa.me/${primaryPhone}?text=${encodeURIComponent(msgText)}`, '_blank');
    });
  });

  // Equipment inquiry buttons
  const equipBtns = document.querySelectorAll('.equipment-inquire-btn');
  equipBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const itemTitle = btn.getAttribute('data-item') || 'Beekeeping Equipment';

      let msgText = '';
      if (currentLang === 'ne') {
        msgText = `नमस्ते Safal Mauri Palan!\nमलाई यो beekeeping item को बारेमा सोधपुछ गर्नु थियो:\n• Item: ${itemTitle}\nकृपया यसको हालको मूल्य र उपलब्धता जानकारी गराउनुहोला।`;
      } else {
        msgText = `Namaste Safal Mauri Palan!\nI am inquiring about the following beekeeping item:\n• Item: ${itemTitle}\nPlease share the current price, availability, and delivery options.`;
      }

      window.open(`https://wa.me/${primaryPhone}?text=${encodeURIComponent(msgText)}`, '_blank');
    });
  });

  // Custom Quick Message Box
  const customInquiryBtn = document.getElementById('custom-inquiry-btn');
  if (customInquiryBtn) {
    customInquiryBtn.addEventListener('click', () => {
      const input = document.getElementById('inquiry-msg-input');
      const val = input && input.value.trim() ? input.value.trim() : '';

      let text = '';
      if (val) {
        text = `नमस्ते Safal Mauri Palan!\n\n${val}`;
      } else {
        text = currentLang === 'ne' 
          ? 'नमस्ते Safal Mauri Palan! म Itahari Honey तथा beekeeping सेवाबारे बुझ्न चाहन्छु।' 
          : 'Namaste Safal Mauri Palan! I would like to inquire about Itahari Honey and your beekeeping services.';
      }

      window.open(`https://wa.me/${primaryPhone}?text=${encodeURIComponent(text)}`, '_blank');
    });
  }
}

// Synchronously apply language as soon as script executes at bottom of body
try {
  const initialLang = (function() {
    try {
      return localStorage.getItem('smp_lang') === 'en' ? 'en' : 'ne';
    } catch (e) {
      return 'ne';
    }
  })();
  setLanguage(initialLang);
} catch (e) {}


/* --------------------------------------------------------------------------
   REALISTIC FLYING HONEYBEE (Apis mellifera)
   Fluidly follows cursor / touch with fluttering wings and natural hovering.
   Offset so it never obstructs cursor, buttons, links, or text.
   -------------------------------------------------------------------------- */
function initFlyingBee() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  let beeContainer = document.querySelector('.flying-bee-container');
  if (!beeContainer) {
    beeContainer = document.createElement('div');
    beeContainer.className = 'flying-bee-container';
    beeContainer.setAttribute('aria-hidden', 'true');
    beeContainer.innerHTML = `
      <svg class="realistic-bee-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="beeShadowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#3c2610" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="#3c2610" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="beeAbdomenGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stop-color="#e29124"/>
            <stop offset="25%" stop-color="#f5ad3b"/>
            <stop offset="55%" stop-color="#c97711"/>
            <stop offset="85%" stop-color="#6e3c04"/>
            <stop offset="100%" stop-color="#241403"/>
          </linearGradient>
          <radialGradient id="beeThoraxGrad" cx="48%" cy="45%" r="50%">
            <stop offset="0%" stop-color="#73471c"/>
            <stop offset="45%" stop-color="#3b2310"/>
            <stop offset="80%" stop-color="#211308"/>
            <stop offset="100%" stop-color="#140b04"/>
          </radialGradient>
          <linearGradient id="beeWingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.88"/>
            <stop offset="40%" stop-color="#fdfcf7" stop-opacity="0.75"/>
            <stop offset="80%" stop-color="#faebd2" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0.85"/>
          </linearGradient>
        </defs>

        <!-- Ground hover shadow -->
        <ellipse cx="50" cy="88" rx="16" ry="4.5" fill="url(#beeShadowGrad)"/>

        <!-- Jointed Legs -->
        <g class="bee-legs" stroke="#26170a" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
          <path d="M44,38 L34,32 L26,36"/>
          <path d="M56,38 L66,32 L74,36"/>
          <path d="M43,45 L31,46 L24,53"/>
          <path d="M57,45 L69,46 L76,53"/>
          <path d="M45,54 L32,62 L22,74"/>
          <path d="M55,54 L68,62 L78,74"/>
          <ellipse cx="27" cy="67" rx="3.5" ry="2.2" fill="#e59824" stroke="#8c570b" stroke-width="0.7" transform="rotate(-30 27 67)"/>
          <ellipse cx="73" cy="67" rx="3.5" ry="2.2" fill="#e59824" stroke="#8c570b" stroke-width="0.7" transform="rotate(30 73 67)"/>
        </g>

        <!-- Abdomen with natural segments -->
        <g class="bee-abdomen">
          <path d="M50,45 C41,45 35,53 35,63 C35,74 44,85 50,89 C56,85 65,74 65,63 C65,53 59,45 50,45 Z" fill="url(#beeAbdomenGrad)" stroke="#1a0d02" stroke-width="1.2"/>
          <path d="M37,52 Q50,56 63,52" stroke="#1d1004" stroke-width="3" stroke-linecap="round" fill="none"/>
          <path d="M36,53.5 Q50,57.5 64,53.5" stroke="#f0aa37" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.85"/>
          <path d="M35.5,60 Q50,65 64.5,60" stroke="#1d1004" stroke-width="3.5" stroke-linecap="round" fill="none"/>
          <path d="M35.5,62 Q50,67 64.5,62" stroke="#f0aa37" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.85"/>
          <path d="M38,68 Q50,74 62,68" stroke="#1d1004" stroke-width="3.5" stroke-linecap="round" fill="none"/>
          <path d="M38.5,70 Q50,76 61.5,70" stroke="#f0aa37" stroke-width="1" stroke-linecap="round" fill="none" opacity="0.85"/>
          <path d="M43,76 Q50,81 57,76" stroke="#1d1004" stroke-width="3" stroke-linecap="round" fill="none"/>
          <path d="M49,88.5 L50,92 L51,88.5 Z" fill="#140b04"/>
        </g>

        <!-- Thorax with downy fluff -->
        <g class="bee-thorax">
          <ellipse cx="50" cy="40" rx="12" ry="10" fill="url(#beeThoraxGrad)" stroke="#1a0e05" stroke-width="1"/>
          <ellipse cx="50" cy="38" rx="8" ry="5.5" fill="#c47a1c" opacity="0.45"/>
          <path d="M44,35 Q50,33 56,35" stroke="#f0b64f" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.7"/>
          <path d="M45,41 Q50,39 55,41" stroke="#f0b64f" stroke-width="1.2" stroke-linecap="round" fill="none" opacity="0.7"/>
        </g>

        <!-- Head & Antennae -->
        <g class="bee-head">
          <ellipse cx="50" cy="27" rx="8.5" ry="7" fill="#1b1007" stroke="#0f0803" stroke-width="0.8"/>
          <ellipse cx="43.5" cy="26.5" rx="3.2" ry="5" fill="#0d0702" stroke="#241407" stroke-width="0.6" transform="rotate(-12 43.5 26.5)"/>
          <ellipse cx="56.5" cy="26.5" rx="3.2" ry="5" fill="#0d0702" stroke="#241407" stroke-width="0.6" transform="rotate(12 56.5 26.5)"/>
          <circle cx="42.5" cy="25" r="0.9" fill="#ffffff" opacity="0.65"/>
          <circle cx="55.5" cy="25" r="0.9" fill="#ffffff" opacity="0.65"/>
          <path d="M47,22 Q43,14 36,16" stroke="#1d1106" stroke-width="1.4" stroke-linecap="round" fill="none"/>
          <path d="M53,22 Q57,14 64,16" stroke="#1d1106" stroke-width="1.4" stroke-linecap="round" fill="none"/>
          <circle cx="36" cy="16" r="1.1" fill="#2d1c0e"/>
          <circle cx="64" cy="16" r="1.1" fill="#2d1c0e"/>
        </g>

        <!-- Fluttering Translucent Wings -->
        <g class="bee-wing wing-left-fore">
          <path d="M46,37 C35,20 12,12 8,24 C5,33 22,43 46,38 Z" fill="url(#beeWingGrad)" stroke="rgba(140, 95, 45, 0.5)" stroke-width="0.9"/>
          <path d="M44,37 C30,28 17,21 10,24" stroke="rgba(120, 80, 35, 0.45)" stroke-width="0.8" fill="none"/>
          <path d="M26,26 C22,32 18,36 14,35" stroke="rgba(120, 80, 35, 0.35)" stroke-width="0.6" fill="none"/>
          <path d="M34,31 C32,36 28,40 24,39" stroke="rgba(120, 80, 35, 0.35)" stroke-width="0.6" fill="none"/>
        </g>
        <g class="bee-wing wing-left-hind">
          <path d="M46,39 C34,31 19,34 17,44 C15,51 28,51 46,41 Z" fill="url(#beeWingGrad)" stroke="rgba(140, 95, 45, 0.45)" stroke-width="0.8"/>
          <path d="M43,39 C33,36 24,38 20,44" stroke="rgba(120, 80, 35, 0.35)" stroke-width="0.6" fill="none"/>
        </g>
        <g class="bee-wing wing-right-fore">
          <path d="M54,37 C65,20 88,12 92,24 C95,33 78,43 54,38 Z" fill="url(#beeWingGrad)" stroke="rgba(140, 95, 45, 0.5)" stroke-width="0.9"/>
          <path d="M56,37 C70,28 83,21 90,24" stroke="rgba(120, 80, 35, 0.45)" stroke-width="0.8" fill="none"/>
          <path d="M74,26 C78,32 82,36 86,35" stroke="rgba(120, 80, 35, 0.35)" stroke-width="0.6" fill="none"/>
          <path d="M66,31 C68,36 72,40 76,39" stroke="rgba(120, 80, 35, 0.35)" stroke-width="0.6" fill="none"/>
        </g>
        <g class="bee-wing wing-right-hind">
          <path d="M54,39 C66,31 81,34 83,44 C85,51 72,51 54,41 Z" fill="url(#beeWingGrad)" stroke="rgba(140, 95, 45, 0.45)" stroke-width="0.8"/>
          <path d="M57,39 C67,36 76,38 80,44" stroke="rgba(120, 80, 35, 0.35)" stroke-width="0.6" fill="none"/>
        </g>
      </svg>
    `;
    document.body.appendChild(beeContainer);
  }

  let currentX = window.innerWidth * 0.75;
  let currentY = 160;
  let targetX = currentX;
  let targetY = currentY;
  let currentAngle = 0;
  let time = 0;

  function setTarget(clientX, clientY, isTouch = false) {
    const offsetX = isTouch ? 30 : 38;
    const offsetY = isTouch ? -36 : -32;
    targetX = Math.min(window.innerWidth - 50, Math.max(12, clientX + offsetX));
    targetY = Math.min(window.innerHeight - 50, Math.max(60, clientY + offsetY));
  }

  window.addEventListener('mousemove', (e) => {
    setTarget(e.clientX, e.clientY, false);
  }, { passive: true });

  window.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      setTarget(e.touches[0].clientX, e.touches[0].clientY, true);
    }
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      setTarget(e.touches[0].clientX, e.touches[0].clientY, true);
    }
  }, { passive: true });

  let isPageVisible = true;
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
  });

  function animateBee() {
    if (isPageVisible) {
      time += 0.04;
      const hoverWobbleX = Math.sin(time) * 6;
      const hoverWobbleY = Math.cos(time * 1.3) * 4.5;

      const dx = (targetX + hoverWobbleX) - currentX;
      const dy = (targetY + hoverWobbleY) - currentY;

      currentX += dx * 0.065;
      currentY += dy * 0.065;

      const targetBank = Math.max(-28, Math.min(28, dx * 1.6));
      currentAngle += (targetBank - currentAngle) * 0.08;

      beeContainer.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) rotate(${currentAngle.toFixed(2)}deg)`;
    }
    requestAnimationFrame(animateBee);
  }

  requestAnimationFrame(animateBee);
}


/* --------------------------------------------------------------------------
   INTERACTIVE LIQUID HONEY VISUAL EXPERIENCE
   Fluidly modulates golden honey stream with natural viscosity,
   harmonic wave breathing, and mouse/touch responsiveness.
   -------------------------------------------------------------------------- */
function initInteractiveHoneyFlow() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const primaryPath = document.getElementById('honeyStreamPrimary');
  const corePath = document.getElementById('honeyStreamCore');
  const highlightPath = document.getElementById('honeyStreamHighlight');
  const branchPath = document.getElementById('honeyStreamBranch');
  const branchHighlight = document.getElementById('honeyStreamBranchHighlight');
  const heroSection = document.querySelector('.hero-section');

  if (!primaryPath || !corePath || !highlightPath || !heroSection) return;

  let curOffsetX = 0;
  let curOffsetY = 0;
  let targetOffsetX = 0;
  let targetOffsetY = 0;
  let time = 0;
  let isPageVisible = true;

  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
  });

  function onPointer(clientX, clientY) {
    const rect = heroSection.getBoundingClientRect();
    if (clientY >= rect.top - 100 && clientY <= rect.bottom + 100) {
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.5;
      targetOffsetX = Math.max(-55, Math.min(55, (clientX - centerX) * 0.08));
      targetOffsetY = Math.max(-45, Math.min(45, (clientY - centerY) * 0.06));
    }
  }

  window.addEventListener('mousemove', (e) => {
    onPointer(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches.length > 0) {
      onPointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  function renderFluid() {
    if (isPageVisible) {
      time += 0.016;
      const idleWaveX = Math.sin(time * 0.9) * 16 + Math.cos(time * 0.5) * 8;
      const idleWaveY = Math.cos(time * 1.1) * 12 + Math.sin(time * 0.6) * 6;

      curOffsetX += ((targetOffsetX + idleWaveX) - curOffsetX) * 0.04;
      curOffsetY += ((targetOffsetY + idleWaveY) - curOffsetY) * 0.04;

      const cp1x = (900 + curOffsetX * 0.6).toFixed(1);
      const cp1y = (100 + curOffsetY * 0.4).toFixed(1);
      const cp2x = (1080 + curOffsetX * 1.1).toFixed(1);
      const cp2y = (180 + curOffsetY * 0.7).toFixed(1);
      const cp3x = (1020 + curOffsetX * 0.9).toFixed(1);
      const cp3y = (360 + curOffsetY * 0.5).toFixed(1);
      const cp4x = (950 + curOffsetX * 0.7).toFixed(1);
      const cp4y = (540 + curOffsetY * 0.5).toFixed(1);
      const cp5x = (720 + curOffsetX * 0.4).toFixed(1);
      const cp5y = (580 + curOffsetY * 0.3).toFixed(1);
      const endX = (620 + curOffsetX * 0.2).toFixed(1);
      const endY = 840;

      const d = `M 750, -40 C ${cp1x},${cp1y} ${cp2x},${cp2y} ${cp3x},${cp3y} C ${cp4x},${cp4y} ${cp5x},${cp5y} ${endX},${endY}`;

      primaryPath.setAttribute('d', d);
      corePath.setAttribute('d', d);
      highlightPath.setAttribute('d', d);

      if (branchPath && branchHighlight) {
        const bCp1x = (1120 + curOffsetX * 0.6).toFixed(1);
        const bCp1y = (450 + curOffsetY * 0.4).toFixed(1);
        const bCp2x = (1190 + curOffsetX * 0.5).toFixed(1);
        const bCp2y = (580 + curOffsetY * 0.4).toFixed(1);
        const bEndX = (1140 + curOffsetX * 0.3).toFixed(1);
        const bD = `M ${cp3x},${cp3y} C ${bCp1x},${bCp1y} ${bCp2x},${bCp2y} ${bEndX},780`;
        branchPath.setAttribute('d', bD);
        branchHighlight.setAttribute('d', bD);
      }
    }
    requestAnimationFrame(renderFluid);
  }

  requestAnimationFrame(renderFluid);
}
