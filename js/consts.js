const VERSION = "3.0";

const ELT_AREA_INPUT = "input-area";
const ELT_AREA_OUTPUT = "output-area";
const ELT_ARROW = "arrow-between-areas";
const ELT_ROM_FILE = "rom-file";
const ELT_ROM_BTN = "rom-btn";
const ELT_ROM_LABEL = "rom-label";
const ELT_MSG = "msg";
const ELT_PATCH_SELECT_LABEL = "patch-select-label";
const ELT_PATCH_SELECT = "patch-select";
const ELT_SHOW_ALL_CONTAINER = "show-all-container";
const ELT_SHOW_ALL_OPTION = "show-all-option";
const ELT_INFO_INPUT = "input-rom-info";
const ELT_INFO_OUTPUT = "output-rom-info";
const ELT_APPLY = "apply-btn";

const ELT_ABOUT_BTN = "about-btn";
const ELT_ABOUT_CLOSE_BTN = "about-close-btn";
const ELT_ABOUT_WINDOW = "about-window";
const ELT_ABOUT_WRAPPER = "about-window-wrapper";
const ELT_ABOUT_TRANSLATOR_CONTACT = "about-translator-contact";
const ELT_ABOUT_SOURCE = "about-source";
const ELT_ABOUT_ALL_TRANSLATIONS = "about-all-translations";
const ELT_ABOUT_VERSION = "about-version";

const CLASS_CLOSED_CREDITS = "closed-credits";
const CLASS_DISABLED = "disabled";
const CLASS_DRAG = "drag";
const CLASS_FIRST_DROP = "first-drop";

const CLASS_INFO_TITLE = "info-title";
const CLASS_INFO_BOXART = "info-boxart";
const CLASS_INFO_DETAILS = "info-details";
const CLASS_INFO_VERSION_LABEL = "info-version-label";
const CLASS_INFO_WEBSITE = "info-website";
const CLASS_INFO_WEBSITE_HOST = "info-website-host";
const CLASS_INFO_DOC = "info-doc";
const CLASS_INFO_NB_USES = "info-nb-uses";

const ID_MOTHER_1 = 'm1';
const ID_MOTHER_2 = 'm2';
const ID_MOTHER_1_2 = 'm12';
const ID_MOTHER_3 = 'm3';

// ISO 639 values
const LANG_JAPANESE	 = 'ja';
const LANG_ENGLISH	 = 'en';
const LANG_FRENCH	 = 'fr';
const LANG_GERMAN	 = 'de';
const LANG_ITALIAN	 = 'it';
const LANG_SPANISH	 = 'es';
const LANG_SP_SPAIN	 = 'es-ES';
const LANG_SP_LATINO = 'es-419';
const LANG_PORTUGUES = 'pt';
const LANG_PT_PORTUG = 'pt-BR';
const LANG_PT_BRAZIL = 'pt-BR';
const LANG_DUTCH	 = 'nl';
const LANG_POLISH	 = 'pl';
const LANG_RUSSIAN	 = 'ru';
const LANG_CHINESE	 = 'zh';
const LANG_KOREAN	 = 'ko';

var LANG_NAMES = {[LANG_JAPANESE]: "日本語", [LANG_ENGLISH]: "English", [LANG_FRENCH]: "français", [LANG_GERMAN]: "Deutsch", [LANG_ITALIAN]: "italiano", [LANG_SPANISH]: "español", [LANG_SP_SPAIN]: "español de España", [LANG_SP_LATINO]: "español americano", [LANG_PORTUGUES]: "português", [LANG_PT_PORTUG]: "português de Portugal", [LANG_PT_BRAZIL]: "português do Brasil", [LANG_POLISH]: "polski", [LANG_DUTCH]: "Nederlands", [LANG_RUSSIAN]: "русский", [LANG_CHINESE]: "中文", [LANG_KOREAN]: "한국어"}

const LANG_DEFAULT = LANG_ENGLISH;

const STATS_FAKE = true;
const STATS_VALUE_URL = "getpatchusage.php";
const STATS_VALUE_PARAM = "patchId";
const STATS_INCREMENT_URL = "addpatchusage.php";
const STATS_INCREMENT_PARAM = "patchId";

const MAIL_ADDRESS = 'contact@mother4ever.net';
const MAIL_SUBJECT = 'Translator feedback for Mother International';
const MAIL_BODY = `Team or translator’s name:

Translated game and language:

Select an option:
• I want my translation to appear in Mother International!
• My translation is already listed and I’d like to change something!
• I made a new version of my translation and I’d to add it to Mother International!
• I don’t want my translation to appear in Mother International!
• Other (please specify)`;
