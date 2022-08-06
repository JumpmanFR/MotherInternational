const VERSION = "3.0";

const ELT_PARENT_IFRAME = "mi-frame";

const ELT_ANIMATION_MASK = "animation-mask";
const ELT_ANIMATION = "animation";
const ELT_AREA_INPUT = "input-area";
const ELT_AREA_OUTPUT = "output-area";
const ELT_ARROW = "arrow-between-areas";
const ELT_ROM_FILE = "rom-file";
const ELT_ROM_BTN = "rom-btn";
const ELT_ROM_LABEL = "rom-label";
const ELT_MSG = "msg";
const ELT_CHECKSUM = "input-rom-checksum";
const ELT_PATCH_SELECT_LABEL = "patch-select-label";
const ELT_PATCH_SELECT = "patch-select";
const ELT_SHOW_ALL_OPTION = "show-all-option";
const ELT_INFO_INPUT = "input-rom-info";
const ELT_INFO_OUTPUT = "output-rom-info";
const ELT_APPLY = "apply-btn";

const ELT_ABOUT_BTN = "about-btn";
const ELT_ABOUT_CLOSE_BTN = "about-close-btn";
const ELT_ABOUT_WINDOW = "about-window";
const ELT_ABOUT_LAYER = "about-window-layer";
const ELT_ABOUT_TRANSLATOR_CONTACT = "about-translator-contact";
const ELT_ABOUT_SOURCE = "about-source";
const ELT_ABOUT_ALL_TRANSLATIONS = "about-all-translations";
const ELT_ABOUT_VERSION = "about-version";

const CLASS_CLOSED_CREDITS = "closed-credits";
const CLASS_DISABLED = "disabled";
const CLASS_DRAG = "drag";
const CLASS_HIDDEN = "hidden"
const CLASS_OPTION_UNAVAILABLE = "unavailable";
const CLASS_FIRST_DROP = "first-drop";

const CLASS_MESSAGE = "message";
const CLASS_MESSAGE_OK = "ok";
const CLASS_MESSAGE_LOADING = "loading";
const CLASS_MESSAGE_LOADING_SPIN = "loading-spin";
const CLASS_MESSAGE_LOADING_TEXT = "loading-text";
const CLASS_MESSAGE_WARNING = "warning";
const CLASS_MESSAGE_ERROR = "error";

const CLASS_INFO_TITLE = "info-title";
const CLASS_INFO_BOXART = "info-boxart";
const CLASS_INFO_REFERENCES = "info-references";
const CLASS_INFO_VERSION_LABEL = "info-version-label";
const CLASS_INFO_WEBSITE = "info-website";
const CLASS_INFO_LINK_HOST = "info-link-host";
const CLASS_INFO_DOC = "info-doc";
const CLASS_INFO_NB_USES = "info-nb-uses";
const CLASS_INFO_LOADING = "info-loading";

const ID_MOTHER_1 = 'm1';
const ID_MOTHER_2 = 'm2';
const ID_MOTHER_1_2 = 'm12';
const ID_MOTHER_3 = 'm3';

// ISO 639 values
const LANG_JAPANESE	 = 'ja';
const LANG_ENGLISH	 = 'en-GB';
const LANG_FRENCH	 = 'fr';
const LANG_GERMAN	 = 'de';
const LANG_ITALIAN	 = 'it';
const LANG_SPANISH	 = 'es';
const LANG_SP_SPAIN	 = 'es-ES';
const LANG_SP_MEXICO = 'es-MX';
const LANG_SP_ARGENT = 'es-AR';
const LANG_PORTUGUES = 'pt';
const LANG_PT_PORTUG = 'pt-PT';
const LANG_PT_BRAZIL = 'pt-BR';
const LANG_DUTCH	 = 'nl';
const LANG_POLISH	 = 'pl';
const LANG_RUSSIAN	 = 'ru';
const LANG_CHINESE	 = 'zh';
const LANG_KOREAN	 = 'ko';

const LANG_DEFAULT = LANG_ENGLISH;

const STATS_FAKE = false;                        // Change it use the real patch usage data!
const STATS_VALUE_URL = "php/getpatchusage.php";
const STATS_VALUE_PARAM = "patchId";
const STATS_INCREMENT_URL = "php/addpatchusage.php";
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
