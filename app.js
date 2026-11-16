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
    foot_desc: "हाम्रो लक्ष्य आधुनिक र दिगो apiculture मार्फत शुद्ध Itahari Honey उत्पादन गर्नु र नेपालभर गुणस्तरीय beekeeping equipment उपलब्ध गराउनु हो।",
    foot_quick_links: "Quick Links",
    foot_contact_title: "Contact Information",
    foot_hours: "खुल्ने समय: हप्ताको ७ दिन, बिहान ७:०० देखि साँझ ७:०० सम्म",
    foot_rights: "© २०२६ Safal Mauri Palan. सर्वाधिकार सुरक्षित।",

    // --- PAGE 1: INDEX.HTML (HOMEPAGE) ---
    home_badge: "Safal Mauri Palan • Itahari-4, Sunsari",
    home_hero_title: "इटहरीको शुद्ध मह: <span class=\"gold-gradient-text\">Itahari Honey</span>",
    home_hero_tagline: "सफल मौरी पालन द्वारा उत्पादित १००% शुद्ध र प्राकृतिक मह",
    home_hero_desc: "विगत १० वर्षभन्दा बढी समयदेखि आधुनिक र वैज्ञानिक मौरीपालन गर्दै आएको सफल मौरी पालन ले संकलन गरेको शुद्ध र प्राकृतिक Itahari Honey।",
    home_btn_varieties: "Honey Varieties हेर्नुहोस्",
    home_btn_accessories: "Beekeeping Accessories",
    home_btn_whatsapp: "WhatsApp मा अर्डर गर्नुहोस्",
    home_stat_years_num: "१०+ वर्ष",
    home_stat_years_lbl: "मौरीपालन अनुभव",
    home_stat_yield_num: "१०–१५ टन",
    home_stat_yield_lbl: "वार्षिक मह उत्पादन",
    home_stat_purity_num: "१००% शुद्ध",
    home_stat_purity_lbl: "प्राकृतिक मह",

    // Two Real Honey Bottles in Hero
    home_bottle1_name: "Itahari Honey – 1 kg",
    home_bottle1_price: "रु. १२००",
    home_bottle2_name: "Itahari Honey – 500 g",
    home_bottle2_price: "रु. ६००",
    home_varieties_available_lbl: "उपलब्ध प्रकारहरू:",
    home_var_mustard: "Mustard Honey",
    home_var_litchi: "Litchi Honey",
    home_var_multi: "Multifloral Honey",
    home_btn_order_wa: "WhatsApp अर्डर",
    home_explore_varieties_btn: "सबै Honey Varieties र विवरण हेर्नुहोस्",

    home_acc_preview_label: "Apiary Supplies",
    home_acc_preview_title: "Beekeeping Equipment & <span class=\"gold-gradient-text\">Bee Colonies</span>",
    home_acc_preview_desc: "Safal Mauri Palan मा व्यावसायिक तथा व्यक्तिगत मौरीपालकहरूका लागि आवश्यक सम्पूर्ण beehives, Apis mellifera colonies, र extraction equipment उपलब्ध छन्।",
    home_acc_explore_btn: "सबै Accessories हेर्नुहोस्",

    home_vid_preview_label: "Farm In Action",
    home_vid_preview_title: "Safal Mauri Palan <span class=\"gold-gradient-text\">Video Tour</span>",
    home_vid_preview_desc: "इटहरी फार्ममा मौरीपालन तथा honey extraction को प्रत्यक्ष भिडियो झलक।",
    home_about_explore_btn: "हाम्रोबारे थप जान्नुहोस् (About Us)",

    // --- PAGE 2: OURPRODUCTS.HTML (HONEY VARIETIES & CATALOGUE) ---
    prod_hero_label: "शुद्ध मह",
    prod_hero_title: "महका <span class=\"gold-gradient-text\">प्रकारहरू (Honey Varieties)</span>",
    prod_hero_desc: "Safal Mauri Palan द्वारा उत्पादित Itahari Honey का ३ प्राकृतिक प्रकारहरू र आधिकारिक साइजहरू।",
    prod_sources_header: "Itahari Honey का प्राकृतिक फूलका स्रोतहरू",
    prod_sources_sub: "कुनै बाह्य मिसावट बिना संकलित शुद्ध र प्राकृतिक मह।",
    
    prod_mustard_title: "Mustard Honey (तोरीको मह)",
    prod_mustard_desc: "हाम्रो Mustard Honey तोरीका फूलहरूबाट संकलन गरिन्छ। यसको स्वाद स्वाभाविक रूपमा मीठो र सुगन्ध प्राकृतिक हुन्छ। चिसो मौसममा यो जम्नु शुद्ध महको स्वाभाविक गुण हो।",
    prod_mustard_p1: "Floral Source: Mustard Blossoms",
    prod_mustard_p2: "Taste: Naturally Sweet & Smooth",
    prod_mustard_p3: "Color: Warm Golden",

    prod_litchi_title: "Litchi Honey (लिचीको मह)",
    prod_litchi_desc: "हाम्रो Litchi Honey लिचीका फूलहरूबाट संकलन गरिन्छ। यो हल्का र प्राकृतिक सुगन्धले भरिपूर्ण हुन्छ।",
    prod_litchi_p1: "Floral Source: Litchi Blossoms",
    prod_litchi_p2: "Taste: Light & Fragrant",
    prod_litchi_p3: "Color: Clear Amber",

    prod_multi_title: "Multifloral Honey (बहुफुली मह)",
    prod_multi_desc: "हाम्रो Multifloral Honey मौसमअनुसार विभिन्न प्राकृतिक फूलहरूबाट संकलन गरिएको मिश्रण हो। यसमा विविध फूलहरूको सन्तुलित स्वाद र सुगन्ध पाइन्छ।",
    prod_multi_p1: "Floral Source: Diverse Wildflowers",
    prod_multi_p2: "Taste: Balanced & Aromatic",
    prod_multi_p3: "Color: Rich Golden Amber",

    prod_cat_label: "Product Catalogue",
    prod_cat_title: "Branded Bottles of <span class=\"gold-gradient-text\">Itahari Honey</span>",
    prod_cat_desc: "Safal Mauri Palan द्वारा उत्पादित १ के.जी. र ५०० ग्रामका आधिकारिक glass jar हरू।",
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
    prod_order_btn: "WhatsApp मा अर्डर गर्नुहोस्",
    prod_call_btn: "फोनबाट अर्डर गर्नुहोस्",
    prod_purity_tip: "<strong>शुद्धता जानकारी:</strong> चिसो मौसममा मह जम्नु शुद्ध महको प्राकृतिक गुण हो। यसलाई पुनः तरल बनाउन सिसीलाई मनतातो पानीमा केही समय राख्न सक्नुहुन्छ।",

    // --- PAGE 3: MORESERVICES.HTML (BEEKEEPING ACCESSORIES) ---
    acc_hero_label: "Apiary Supplies & Colonies",
    acc_hero_title: "Beekeeping Accessories & <span class=\"gold-gradient-text\">Bee Colonies</span>",
    acc_hero_desc: "Safal Mauri Palan मा व्यावसायिक तथा व्यक्तिगत मौरीपालकहरूका लागि आवश्यक सम्पूर्ण modern beehives, colonies, र extraction equipment उपलब्ध छन्।",
    acc_intro_title: "सम्पूर्ण Beekeeping आवश्यकताबारे",
    acc_intro_quote: "<u>Safal Mauri Palan</u> मा तपाईंको सम्पूर्ण beekeeping आवश्यकताहरूको समाधान उपलब्ध छ। हामी केवल उच्च गुणस्तरीय मह मात्र आपूर्ति गर्दैनौं, व्यवसायिक र व्यक्तिगत मौरीपालक दुवैका लागि beehives, bee colonies (Apis mellifera र Apis cerana), protective gear जस्तै cap, gloves, brush, smoker र modern honey extraction machines उपलब्ध गराउँछौं।",

    acc_filter_all: "सबै सामान",
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
    eq_4_sub: "Centrifugal Honey Extractor (मह मदानी)",
    eq_5_title: "Protective Bee Cap & Veil",
    eq_5_sub: "मौरी टोपी (Safety Net Cap)",
    eq_6_title: "Stainless Steel Bee Smoker",
    eq_6_sub: "धुवादानी (Bee Smoker)",
    eq_7_title: "Soft Bristle Bee Brush",
    eq_7_sub: "मौरी हटाउने ब्रस",
    eq_8_title: "Heavy-duty Beekeeping Gloves",
    eq_8_sub: "मौरीपालन पञ्जा",
    eq_9_title: "Apistone Treatment",
    eq_9_sub: "Varroa Mite Control Strip",
    eq_10_title: "Formic Acid Solution",
    eq_10_sub: "Organic Mite Control Solution",
    eq_inquire_btn: "मूल्य सोधपुछ गर्नुहोस्",

    // --- PAGE 4: GALLERY.HTML (8 CAREFULLY SELECTED FARM PHOTOS) ---
    gal_hero_label: "Apiary Life in Sunsari",
    gal_hero_title: "Genuine <span class=\"gold-gradient-text\">Farm Gallery</span>",
    gal_hero_desc: "Safal Mauri Palan को Itahari-4 स्थित मौरी फार्म, काठका घारहरू, मौरीका चाका र honey harvesting का ८ वास्तविक तस्बिरहरू।",
    gal_img1_caption: "Sunsari Farm मा modern wooden beehives को दृश्य",
    gal_img2_caption: "Beekeeper द्वारा honeycomb frame को नियमित निरीक्षण",
    gal_img3_caption: "Comb मा active रहेको स्वस्थ Apis mellifera colony",
    gal_img4_caption: "शान्त hive management का लागि bee smoker को प्रयोग",
    gal_img5_caption: "Centrifugal extractor बाट ताजा pure honey संकलन",
    gal_img6_caption: "सूर्यको प्रकाशमा व्यवस्थित hive boxes को पंक्ति",
    gal_img7_caption: "बिहानी घाममा सफा र हराभरा Safal Mauri Palan apiary",
    gal_img8_caption: "स्वाभाविक रूपमा beeswax ले सिल गरिएको mature honeycomb",

    // --- PAGE 5: RESOURCES.HTML (KNOWLEDGE & FAQS) ---
    res_hero_label: "Educational Knowledge Hub",
    res_hero_title: "Beekeeping Resources & <span class=\"gold-gradient-text\">Knowledge Guide</span>",
    res_hero_desc: "मौरीका प्रजातिहरू, महको वैज्ञानिक गुणहरू, beekeeping का आधारभूत कुराहरू र सामान्य जिज्ञासाहरूको सँगालो।",
    
    res_species_title: "1. Honeybee Species in Nepal",
    res_species_desc: "नेपालमा मुख्यतया Apis mellifera (युरोपेली मौरी, उच्च मह उत्पादन र शान्त स्वभाव) र Apis cerana (स्थानीय रैथाने मौरी, स्थानीय हावापानीसँग अनुकूल) पालिन्छ। साथै Apis dorsata र Apis laboriosa जङ्गली प्रजाति हुन्।",
    
    res_crystal_title: "2. The Science of Honey Crystallization",
    res_crystal_desc: "शुद्ध कच्चा महमा Glucose र Fructose को प्राकृतिक अनुपातका कारण चिसो मौसममा crystallization हुनु स्वाभाविक हो। यो मह बिग्रेको वा चिनी मिसाएको होइन, बरु मह नउमालिएको र शुद्ध रहेको वैज्ञानिक प्रमाण हो।",
    
    res_begin_title: "3. Starting Your First Apiary",
    res_begin_desc: "नयाँ beekeepers ले प्रशस्त फूल फुल्ने ठाउँ, सफा पिउने पानीको स्रोत र तेज हावा नलाग्ने स्थान रोज्नुपर्छ। उचित beehive box, safety veil, smoker र regular colony checkup ले मौरीपालन सफल बनाउँछ।",
    
    res_faq_title: "Frequently Asked Questions (FAQ)",
    faq_q1: "Itahari Honey साँच्चिकै १००% शुद्ध छ?",
    faq_a1: "हो, Safal Mauri Palan को Itahari Honey कुनै बाह्य चिनी, केमिकल वा रसायन बिना हाम्रा घारहरूबाट सीधै संकलन गरिएको १००% शुद्ध र प्राकृतिक मह हो।",
    faq_q2: "चिसोमा मह किन जम्छ? के यो मिसावट हो?",
    faq_a2: "मह जम्नु (crystallization) कुनै मिसावट होइन। शुद्ध महमा हुने प्राकृतिक glucose ले गर्दा चिसोमा मह जम्दछ। सिसीलाई मनतातो पानीमा राखेर फेरि तरल बनाउन सकिन्छ।",
    faq_q3: "Mustard र Litchi Honey मा के फरक छ?",
    faq_a3: "Mustard Honey तोरीका फूलबाट संकलित हुन्छ, जुन स्वादिलो र छिटो crystallize हुने खालको हुन्छ। Litchi Honey लिचीका फूलबाट संकलित हल्का, सफा सुनौलो र प्राकृतिक फलफूलको सुगन्धयुक्त हुन्छ।",
    faq_q4: "के म Safal Mauri Palan बाट live bee colony र उपकरण खरिद गर्न सक्छु?",
    faq_a4: "हो, हामी Apis mellifera र Apis cerana का live colonies, beehives, honey extractors, protective veil, smokers र mite control औषधिहरू उपलब्ध गराउँछौं।",

    // --- PAGE 6: ABOUT.HTML (ABOUT US & VIDEO) ---
    abt_hero_label: "Our Journey & Legacy",
    abt_hero_title: "About <span class=\"gold-gradient-text\">Safal Mauri Palan</span>",
    abt_hero_desc: "Itahari, Sunsari मा विगत १० वर्षभन्दा बढी समयदेखि आधुनिक, दिगो र वैज्ञानिक beekeeping गर्दै आएको अग्रणी मौरी फार्म।",
    abt_quote: "<strong><u>Safal Mauri Palan</u> मा तपाईँलाई हार्दिक स्वागत छ।</strong><br><br>Itahari, Nepal मा अवस्थित Safal Mauri Palan ले विगत १० वर्षभन्दा बढी समयदेखि आधुनिक, दिगो र scientific beekeeping गर्दै आएको छ। हामी <em>Apis mellifera</em> प्रजातिका मौरीहरूलाई आधुनिक तरिकाबाट पालन–पोषण गर्छौं, जसले मौरीहरूको स्वास्थ्य र उत्पादन दुवै उच्च स्तरमा राख्छ।<br><br>दशकभन्दा धेरै अनुभवसहित, हामी हाल हरेक वर्ष <strong>१०–१५ tons शुद्ध मह</strong> उत्पादन गर्दै आएका छौँ। हाम्रो मह विभिन्न प्राकृतिक फूल र बोटबिरुवाबाट संकलित हुने भएकाले प्रत्येक variety मा छुट्टै स्वाद, सुगन्ध र गुण पाइन्छ।",
    abt_feat1_title: "Zero Adulteration",
    abt_feat1_desc: "कुनै बाह्य चिनी वा केमिकल मिसावट बिना संकलित शतप्रतिशत प्राकृतिक मह।",
    abt_feat2_title: "Apis mellifera Care",
    abt_feat2_desc: "वैज्ञानिक विधिबाट मौरीका गोलाहरूको नियमित स्वास्थ्य परीक्षण र हेरचाह।",
    abt_feat3_title: "10–15 Tons Capacity",
    abt_feat3_desc: "वार्षिक १० देखि १५ टन शुद्ध मह उत्पादन गर्न सक्ने अनुभवी क्षमता।",
    abt_feat4_title: "Complete Apiary Support",
    abt_feat4_desc: "नयाँ तथा व्यावसायिक मौरीपालकहरूलाई घार, सामग्री र प्राविधिक सल्लाह।",
    abt_video_title: "Live Video: Beekeeping & Honey Harvesting",
    abt_video_caption: "Safal Mauri Palan, Itahari-4, Sunsari — प्राङ्गारिक मौरीपालन र शुद्ध मह संकलनको प्रत्यक्ष भिडियो झलक।",

    // --- PAGE 7: CONTACT.HTML (CONTACT US & MAP) ---
    cnt_hero_label: "Get In Touch",
    cnt_hero_title: "Contact <span class=\"gold-gradient-text\">Safal Mauri Palan</span>",
    cnt_hero_desc: "Itahari Honey खरिद गर्न, beehives तथा accessories मगाउन वा हाम्रो फार्म भ्रमण गर्न हामीलाई सम्पर्क गर्नुहोस्।",
    cnt_addr_title: "Farm & Company Location",
    cnt_addr_val: "<strong>Safal Mauri Palan</strong><br>Producer of <strong>Itahari Honey</strong><br>Itahari-4, Sunsari District, Koshi Province, Nepal",
    cnt_phones_title: "Direct Phone Lines (Click to Call)",
    cnt_phones_sub: "हाम्रा प्रतिनिधिहरूसँग सीधै कुरा गर्नुहोस्:",
    cnt_social_title: "Social Media Channels",
    cnt_social_sub: "हाम्रा भिडियो तथा नयाँ updates हेर्नुहोस्:",
    cnt_map_title: "Find Us On Google Maps",
    cnt_msg_title: "Direct WhatsApp Message",
    cnt_msg_sub: "आफ्नो requirement वा अर्डर तल लेखी पठाउनुहोस्:",
    cnt_msg_ph: "e.g. मलाई 2 kg Mustard Honey चाहियो।"
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
    gal_img1_caption: "Apiary landscape with modern wooden beehives in Sunsari",
    gal_img2_caption: "Careful honeycomb frame inspection by experienced beekeeper",
    gal_img3_caption: "Healthy Apis mellifera colony active on brood comb",
    gal_img4_caption: "Using stainless smoker for calm and gentle hive management",
    gal_img5_caption: "Pure golden honey extraction using centrifugal machine",
    gal_img6_caption: "Wooden hive boxes neatly aligned in natural sunlight",
    gal_img7_caption: "Morning view across the green Safal Mauri Palan apiary",
    gal_img8_caption: "Mature honeycomb naturally capped with pure beeswax",

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
  const saved = localStorage.getItem('smp_lang');
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
  currentLang = lang;
  localStorage.setItem('smp_lang', lang);
  document.documentElement.lang = lang;

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
