const VERSION = "3.3";

const ELT_ANIMATION_MASK = "animation-mask";
const ELT_ANIMATION = "animation";
const ELT_AREA_INPUT = "input-area";
const ELT_AREA_OUTPUT = "output-area";
const ELT_ARROW = "arrow-between-areas";
const ELT_ROM_FILE = "rom-file";
const ELT_ROM_BTN = "rom-btn";
const ELT_ROM_FILENAME = "rom-filename";
const ELT_MSG_INPUT = "msg-input";
const ELT_MSG_OUTPUT = "msg-output";
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
const ELT_ABOUT_OVERLAY = "about-window-overlay";
const ELT_ABOUT_CREDITS_TEXTS = "credits-texts";
const ELT_ABOUT_TRANSLATOR_CONTACT = "about-translator-contact";
const ELT_ABOUT_SOURCE = "about-source";
const ELT_ABOUT_ALL_TRANSLATIONS = "about-all-translations";
const ELT_ABOUT_VERSION = "about-version";

const CLASS_NO_FLAG_EMOJIS = "no-flag-emojis";
const CLASS_CLOSED_CREDITS = "closed-credits";
const CLASS_DISABLED = "disabled";
const CLASS_DRAG = "drag";
const CLASS_HIDDEN = "hidden"
const CLASS_HIDDEN_FIRST = "hidden-first-time"
const CLASS_OPTION_UNAVAILABLE = "unavailable";
const CLASS_DROP_FIRST = "drop-first-time";
const CLASS_WITH_MSG = "with-msg";

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

const IFRAME_ZOOM_THRESHOLD = 1.15;

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
const LANG_SP_MEXICO = 'es-MX';
const LANG_SP_ARGENT = 'es-AR';
const LANG_CATALAN	 = 'ca';
const LANG_PORTUGUES = 'pt';
const LANG_PT_PORTUG = 'pt-PT';
const LANG_PT_BRAZIL = 'pt-BR';
const LANG_DUTCH	 = 'nl';
const LANG_POLISH	 = 'pl';
const LANG_RUSSIAN	 = 'ru';
const LANG_CHINESE	 = 'zh';
const LANG_KOREAN	 = 'ko';

const LANG_DEFAULT = LANG_ENGLISH;

// Replace varieties of Latin American Spanish with "Latin American Spanish"
const LANG_SUBSTIT = { [LANG_SP_MEXICO]: 'es-419', [LANG_SP_ARGENT]: 'es-419' };

// Default country flag for certain languages
const DEFAULT_FLAGS = {aa:'ET', ab:'GE', ae:'IR', af:'ZA', agq:'CM', ak:'GH', am:'ET', an:'ES', ar:'EG', arn:'CL', as:'IN', asa:'TZ', ast:'ES', av:'RU', ay:'BO', az:'AZ', ba:'RU', bas:'CM', be:'BY', bem:'ZM', bez:'TZ', bg:'BG', bh:'IN', bi:'VU', bm:'ML', bn:'BD', bo:'CN', br:'FR', brx:'IN', bs:'BA', byn:'ER', ca:'ES', ccp:'BD', ce:'RU', ceb:'PH', cgg:'UG', ch:'US', chr:'US', ckb:'IQ', co:'FR', cr:'CA', cs:'CZ', cu:'RU', cv:'RU', cy:'GB', da:'DK', dav:'KE', de:'DE', dje:'NE', dsb:'DE', dua:'CM', dv:'MV', dyo:'SN', dz:'BT', ebu:'KE', ee:'TG', el:'GR', en:'GB', eo:'Ũ', es:'ES', et:'EE', eu:'ES', ewo:'CM', fa:'IR', ff:'GN', fi:'FI', fil:'PH', fj:'FJ', fo:'FO', fr:'FR', fur:'IT', fy:'NL', ga:'IE', gaa:'GH', gd:'GB', gez:'ET', gl:'ES', gn:'PY', gsw:'CH', gu:'IN', guz:'KE', gv:'IM', ha:'NE', haw:'US', he:'IL', hi:'IN', ho:'PG', hr:'HR', hsb:'DE', ht:'HT', hu:'HU', hy:'AM', hz:'NA', ia:'Ũ', id:'ID', ie:'Ũ', ig:'NG', ii:'CN', ik:'US', io:'Ũ', is:'IS', it:'IT', iu:'CA', ja:'JP', jbo:'Ũ', jgo:'CM', jmc:'TZ', jv:'ID', ka:'GE', kab:'DZ', kaj:'NG', kam:'KE', kcg:'NG', kde:'TZ', kea:'CV', kg:'CD', khq:'ML', ki:'KE', kj:'AO', kk:'KZ', kkj:'CM', kl:'GL', kln:'KE', km:'KH', kn:'IN', ko:'KR', kok:'IN', kpe:'LR', kr:'NG', ks:'IN', ksb:'TZ', ksf:'CM', ksh:'DE', ku:'TR', kv:'RU', kw:'GB', ky:'KG', la:'IT', lag:'TZ', lb:'LU', lg:'UG', li:'NL', lkt:'US', ln:'CD', lo:'LA', lrc:'IR', lt:'LT', lu:'CD', luo:'KE', luy:'KE', lv:'LV', mas:'KE', mer:'KE', mfe:'MU', mg:'MG', mgh:'MZ', mgo:'CM', mh:'MH', mi:'NZ', mk:'MK', ml:'IN', mn:'MN', mni:'IN', moh:'CA', mr:'IN', ms:'MY', mt:'MT', mua:'CM', my:'MM', myv:'RU', mzn:'IR', naq:'NA', na:'NR', nb:'NO', nd:'ZW', nds:'DE', ne:'NP', ng:'NA', nl:'NL', nmg:'CM', nn:'NO', nnh:'CM', no:'NO', nqo:'GN', nr:'ZA', nso:'ZA', nus:'SS', nv:'US', ny:'MW', nyn:'UG', oc:'FR', oj:'CA', om:'ET', or:'IN', os:'RU', pa:'PK', pi:'IN', pl:'PL', ps:'AF', pt:'PT', qu:'PE', rm:'CH', rn:'BI', ro:'RO', rof:'TZ', ru:'RU', rw:'RW', rwk:'TZ', sa:'IN', sah:'RU', saq:'KE', sat:'IN', sbp:'TZ', sc:'IT', scn:'IT', sd:'PK', se:'SE', seh:'MZ', ses:'ML', sg:'CF', shi:'MA', si:'LK', sk:'SK', sl:'SI', sm:'WS', smn:'FI', sn:'ZW', so:'SO', sq:'AL', sr:'RS', ss:'SZ', st:'LS', su:'ID', sv:'SE', sw:'TZ', syr:'IQ', ta:'LK', te:'IN', teo:'UG', tg:'TJ', th:'TH', ti:'ER', tig:'ER', tk:'TM', tl:'PH', tn:'BW', to:'TO', tr:'TR', trv:'TW', ts:'ZA', tt:'RU', tw:'GH', twq:'NE', ty:'PF', tzm:'MA', ug:'CN', uk:'UA', ur:'PK', uz:'UZ', vai:'LR', ve:'ZA', vi:'VN', vo:'Ũ', vun:'TZ', wa:'BE', wae:'CH', wal:'ET', wo:'SN', xh:'ZA', xog:'UG', yav:'CM', yi:'Ũ', yo:'NG', yue:'CN', za:'CN', zgh:'MA', zh:'CN', zu:'ZA'};

const STATS_FAKE = false;                        // Change it use the real patch usage data!
const STATS_PHP_FOLDER = "php/";
const STATS_VALUE_URL = STATS_PHP_FOLDER + "getpatchusage.php";
const STATS_INCREMENT_URL = STATS_PHP_FOLDER + "addpatchusage.php";
const STATS_VALUE_PARAM = "patchId";
const STATS_INCREMENT_PARAM = "patchId";

const SFX_PATH = "assets/okdesuka.mp3";
const SFX_VOLUME = .2;

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
