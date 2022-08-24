const LOCALIZATION = {
	'en':
	{
		'txtHtmlTitle':				'Mother International', /* I encourage to translate the word 'International' into all the languages! */
		'txtTitleBottom':			'International',
		'txtSubtitle':				'All-in-one MOTHER Translation Patcher',

		'txtBrowse':				'Browse…', /* a classic button to let the user browse their files */
		'txtNoRom':					'', /* we decided to write nothing here, after all */

		'txtSpecifyRom':			'Please drop any MOTHER game ROM',
		'txtApplyPatch':			'Apply Translation', /* could be 'Apply Patch' as well */
		'txtUpdate':				'Update', /* the button changes to 'Update' (verb) instead of 'Apply Patch' when it’s a more recent translation */

		'txtAnalyzingFile':			'Analyzing file…',
		'txtAnalyzingRom':			'Analyzing ROM…',
		'txtRomIdentified':			'ROM identified!',
		'txtDownloading':			'Downloading patch%…', /* % is a progress indicator, like (1/2) or (50%); can also be an empty string (extra space not needed) */
		'txtUnzipping':				'Unzipping…',
		'txtApplyingPatch':			'Applying patch%…', /* % is a progress indicator, like (1/2) or (50%); can also be an empty string (extra space not needed) */
		'txtZipping':				'Creating zip file…',
		'txtFinalizing':			'Finalizing…',
		'txtEndMsg':				'Your patched ROM is ready!',

		'txtChecksum':				'CRC-32 checksum: %', /* if this text is long, % should preferably not be at the very end */

		'txtAllTranslations':		'Available options for %:', /* % is the name of a game */
		'txtNoTranslation':			'No translation available', /* in the select menu if empty */
		'txtShowAllVersions':		'Show all versions', /* this is a checkbox */

		'txtDescVersion':			'v', /* just before a version number */
		'txtDescBy':				'by', /* just before the name of a translation team or individual */
		'txtPatched':				'% patch', /* % is the adjective for the language; this string will appear of a file name */
		'txtUnpatched':				'%, unpatched', /* % is the adjective for the language; this string will appear of a file name */
		'txtDescOfficial':			'official', /* extra indication in the select menu for certain translation choices */
		'txtDescUpdate':			'(update)', /* extra indication (noun) in the select menu for certain translation choices */
		'txtDescIncompatible':		'(incompatible)', /* extra indication in the select menu for certain translation choices */
		'txtVisitSite':				'%’s webpage', /* % is the name of a translation team or individual */
		'txtVisitSiteAt':			'at %', /* % is the base name of a URL */
		'txtUpdateInfo':			'Version info', /* the text of a link to get more info on a specific version */
		'txtReadDoc':				'Readme file', /* the text of a link to download a readme file */

		'txtUsage':					'Usage: %', /* % will be replace with either 'x times' or 'unknown' */
		'txtUsageXTimes':			'% times', /* % is a number */
		'txtUsageUnknown':			'unknown',

		'txtReadmeFile':			'readme', /* will appear in a file name */

		'error_no_rom':				'No ROM specified',
		'error_no_rom_info':		'This ROM hasn’t been analyzed',
		'error_already_patched':	'This ROM has already been patched',
		'error_unknown_rom':		'Unknown ROM',
		'error_no_rom_in_zip':		'No ROM has been found in this zip file',
		'error_crc_output':			'Wrong output ROM',
		'error_crc_input':			'Wrong input ROM',
		'error_patching':			'Patching error',
		'error_no_patch_route':		'Couldn’t unpatch your already patched ROM',
		'error_downloading':		'Downloading error',
		'error_unzipping':			'Unzipping error',
		'error_invalid_patch':		'Unidentified patch file',
		'error_crc_patch':			'Wrong patch file',
		'warning_too_big':			'Too big files',
		'Not Found':				'A patch file was not found',

		'txtAbout':					'Credits & About', /* text for the credits button; could be just 'Credits' or 'About' as well */

		'txtCredits':				'Credits',
		'txtCreditsDesign':			'Design',
		'txtCreditsProgramming':	'Programming',
		'txtCreditsAnimations':		'Animations',
		'txtCreditsLegacy':			'Legacy App', /* to give credits for the older versions of the program, v1.0 and v2.0 */
		'txtCreditsPlayer':			'Player',
		'txtCreditsPlayerYou':		'You!',

		'txtAboutIntro':			'Mother International is an online patching application that can translate any game in the MOTHER series.',
		'txtAboutFreeProg1':		'Mother International is a free to use program.',
		'txtAboutFreeProg2':		'This program is not for sale.',
		'txtAboutSource':			'The source code of Mother International is % under the ‰.', /* % and ‰ are two clickable links */
		'txtAboutSourceGitHub':		'distributed', /* the text for the first clickable link I’ve just talked about */
		'txtAboutSourceLicense':	'MIT license', /* the second one */
		'txtAboutTeams':			'All rights reserved to the teams who created each translation patch packaged into this program. Special thanks to them! POTENTIAL!',
		'txtAboutAllTranslations':	'All supported translations:',
		'txtAboutAllTransLabel':	'– Select to access webpage –', /* the top entry in a list of translations */
		'txtAboutAllTransNoSite':	'No registered webpage for %.', /* the text in an alert window */
		'txtAboutAllTransSiteAsk':	'Do you want to access %’s webpage at ‰?', /* the text in an alert window */
		'txtAboutTranslator1':		'If you’re a translator, feel free to %!', /* % is the text 'contact us' as a clickable link */
		'txtAboutTranslator2':		'contact us', /* this is what I was just referring to */
		'txtAboutVersion':			'Version %', /* % is a version number */
	},
	'fr':
	{
		'txtHtmlTitle':				'Mother International',
		'txtTitleBottom':			'International',
		'txtSubtitle':				'Le tout-en-un des patchs de traduction MOTHER',

		'txtBrowse':				'Parcourir…',
		'txtNoRom':					'',

		'txtSpecifyRom':			'Déposez n’importe quelle ROM d’un jeu MOTHER',
		'txtApplyPatch':			'Appliquer le patch',
		'txtUpdate':				'Mettre à jour',

		'txtAnalyzingFile':			'Analyse du fichier…',
		'txtAnalyzingRom':			'Analyse de la ROM…',
		'txtRomIdentified':			'ROM reconnue !',

		'txtDownloading':			'Téléchargement du patch%…',
		'txtUnzipping':				'Décompression…',
		'txtApplyingPatch':			'Application du patch%…',
		'txtZipping':				'Création de l’archive',
		'txtFinalizing':			'Finalisation…',
		'txtEndMsg':				'Votre ROM patchée est prête !',

		'txtChecksum':				'Somme de contrôle CRC-32 : %',

		'txtAllTranslations':		'Options disponibles pour % :',
		'txtNoTranslation':			'Aucune traduction n’est disponible',
		'txtShowAllVersions':		'Afficher toutes les versions',

		'txtDescVersion':			'v',
		'txtDescBy':				'par',
		'txtPatched':				'patch %',
		'txtUnpatched':				'%, dépatché',
		'txtDescOfficial':			'officiel',
		'txtDescUpdate':			'(mise à jour)',
		'txtDescIncompatible':		'(incompatible)',
		'txtVisitSite':				'Page web de %',
		'txtVisitSiteAt':			'sur %',
		'txtUpdateInfo':			'Infos sur la version',
		'txtReadDoc':				'Fichier lisez-moi',

		'txtUsage':					'Nombre d’utilisations: %',
		'txtUsageXTimes':			'%',
		'txtUsageUnknown':			'inconnu',

		'txtReadmeFile':			'lisez-moi',

		'error_no_rom':				'Aucune ROM spécifiée',
		'error_no_rom_info':		'Cette ROM n’a pas été analysée',
		'error_already_patched':	'Cette ROM est déjà patchée',
		'error_unknown_rom':		'ROM non reconnue',
		'error_no_rom_in_zip':		'Aucune ROM trouvée dans l’archive',
		'error_crc_output':			'ROM générée invalide',
		'error_crc_input':			'La ROM spécifiée est incorrecte',
		'error_patching':			'Erreur lors de l’application du patch',
		'error_no_patch_route':		'Impossible de dépatcher votre ROM déjà patchée',
		'error_downloading':		'Erreur de téléchargement du patch',
		'error_unzipping':			'Erreur de décompression',
		'error_invalid_patch':		'Fichier de patch non reconnu',
		'error_crc_patch':			'Fichier de patch incorrect',
		'warning_too_big':			'Fichiers trop volumineux',
		'Not Found':				'Un fichier de patch n’a pas été trouvé',

		'txtAbout':					'À propos',

		'txtCredits':				'Crédits',
		'txtCreditsDesign':			'Conception',
		'txtCreditsProgramming':	'Programmation',
		'txtCreditsAnimations':		'Animations',
		'txtCreditsLegacy':			'Ancienne application',
		'txtCreditsPlayer':			'Joueur',
		'txtCreditsPlayerYou':		'Vous !',

		'txtAboutIntro':			'Mother International est une application Web permettant de traduire n’importe quel jeu de la série MOTHER.',
		'txtAboutFreeProg1':		'Mother International est un programme libre d’utilisation.',
		'txtAboutFreeProg2':		'Il n’est pas destiné à la vente.',
		'txtAboutSource':			'Le code source de Mother International est % sous la ‰.',
		'txtAboutSourceGitHub':		'distribué',
		'txtAboutSourceLicense':	'licence MIT',
		'txtAboutTeams':			'Tous droits réservés aux équipes qui ont créé les patchs de traduction inclus dans ce programme. Merci à elles ! POTENTIEL !',
		'txtAboutAllTranslations':	'Toutes les traductions prises en charge :',
		'txtAboutAllTransLabel':	'– Sélectionnez pour accéder au site web –',
		'txtAboutAllTransNoSite':	'Pas de page web connue pour %.',
		'txtAboutAllTransSiteAsk':	'Voulez-vous accéder à la page de % sur ‰ ?',
		'txtAboutTranslator1':		'Si vous êtes un traducteur, n’hésitez pas à % !',
		'txtAboutTranslator2':		'nous contacter',
		'txtAboutVersion':			'Version %',
	},
	'it':
	{
		'txtHtmlTitle':				'Mother Internazionale',
		'txtTitleBottom':			'Internazionale',
		'txtSubtitle':				'Il tutto-in-uno delle patch di traduzione MOTHER',

		'txtBrowse':				'Sfoglia…',
		'txtNoRom':					'',

		'txtSpecifyRom':			'Trascina qui una ROM di MOTHER',
		'txtApplyPatch':			'Applica Patch',
		'txtUpdate':				'Aggiorna',

		'txtAnalyzingFile':			'Analisi del file in corso…',
		'txtAnalyzingRom':			'Analisi della ROM in corso…',
		'txtRomIdentified':			'ROM identifica!',
		'txtDownloading':			'Download della patch%…',
		'txtUnzipping':				'Estrazione…',
		'txtApplyingPatch':			'Applicazione patch%…',
		'txtZipping':				'Creazione file zip…',
		'txtFinalizing':			'Finalizzazione…',
		'txtEndMsg':				'La tua ROM patchata è pronta!',

		'txtChecksum':				'CRC-32 checksum: %',

		'txtAllTranslations':		'Opzioni disponibili per %:',
		'txtNoTranslation':			'Nessuna traduzione disponibile',
		'txtShowAllVersions':		'Mostra tutte le versioni',

		'txtDescVersion':			'v',
		'txtDescBy':				'di',
		'txtPatched':				'% patch', /* % is the adjective for the language */
		'txtUnpatched':				'%, non patchata',
		'txtDescOfficial':			'ufficiale',
		'txtDescUpdate':			'(aggiornamento)',
		'txtDescIncompatible':		'(incompatibile)',
		'txtVisitSite':				'Pagina web di %',
		'txtVisitSiteAt':			'a %',
		'txtUpdateInfo':			'Info versione',
		'txtReadDoc':				'Leggimi',

		'txtUsage':					'Numero di usi: %',
		'txtUsageXTimes':			'%',
		'txtUsageUnknown':			'sconosciuto',

		'txtReadmeFile':			'leggimi',

		'error_no_rom':				'Nessuna ROM specificata',
		'error_no_rom_info':		'Questa ROM non è stata analizzata',
		'error_already_patched':	'Questa ROM è già stata patchata',
		'error_unknown_rom':		'ROM sconosciuta',
		'error_no_rom_in_zip':		'Nessuna ROM trovata in questo file zip',
		'error_crc_output':			'ROM d’output sbagliata',
		'error_crc_input':			'ROM d’input sbagliata',
		'error_patching':			'Errore nel processo',
		'error_no_patch_route':		'Impossibile trasformare la ROM patchata',
		'error_downloading':		'Errore di download',
		'error_unzipping':			'Errore nell’estrazione',
		'error_invalid_patch':		'Patch non identificata',
		'error_crc_patch':			'Patch sbagliata',
		'warning_too_big':			'File troppo grandi',
		'Not Found':				'Patch non trovata',

		'txtAbout':					'Crediti',

		'txtCredits':				'Crediti',
		'txtCreditsDesign':			'Design',
		'txtCreditsProgramming':	'Programmazione',
		'txtCreditsAnimations':		'Animazioni',
		'txtCreditsLegacy':			'App precedente',
		'txtCreditsPlayer':			'Giocatore',
		'txtCreditsPlayerYou':		'Tu!',

		'txtAboutIntro':			'Mother Internazionale è un’applicazione online che applica qualsiasi patch di traduzione della serie MOTHER.',
		'txtAboutFreeProg1':		'L’utilizzo di Mother Internazionale è gratuito.',
		'txtAboutFreeProg2':		'Questo programma non è in vendita.',
		'txtAboutSource':			'Il codice sorgente di Mother Internazionale è % sotto la ‰.',
		'txtAboutSourceGitHub':		'distribuito',
		'txtAboutSourceLicense':	'licenza MIT',
		'txtAboutTeams':			'Tutti i diritti riservati al team che ha creato ciascuna patch di traduzione inclusa in questo programma. Ringraziamenti speciali a loro! POTENTIAL!',
		'txtAboutAllTranslations':	'Traduzioni supportate:',
		'txtAboutAllTransLabel':	'– Seleziona per accedere alla pagina –',
		'txtAboutAllTransNoSite':	'Nessuna pagina registrata per %.',
		'txtAboutAllTransSiteAsk':	'Vuoi accedere alla pagina di %?',
		'txtAboutTranslator1':		'Se sei un traduttore, sentiti libero di %!',
		'txtAboutTranslator2':		'contattarci',
		'txtAboutVersion':			'Versione %',
	},
	'nl':
	{
		'txtHtmlTitle':				'Mother Internationaal',
		'txtTitleBottom':			'Internationaal',
		'txtSubtitle':				'Alles-in-een MOTHER Vertalingspatcher',

		'txtBrowse':				'Zoeken…',
		'txtNoRom':					'',

		'txtSpecifyRom':			'Plaats alsjeblieft een MOTHER-game ROM',
		'txtApplyPatch':			'Vertaling toepassen',
		'txtUpdate':				'Updaten',

		'txtAnalyzingFile':			'Bestand analyseren…',
		'txtAnalyzingRom':			'ROM analyseren…',
		'txtRomIdentified':			'ROM geïdentificeerd!',
		'txtDownloading':			'Patch aan het downloaden%…',
		'txtUnzipping':				'Uitpakken…',
		'txtApplyingPatch':			'Patch toepassen%…',
		'txtZipping':				'Zipbestand creëren…',
		'txtFinalizing':			'Finaliseren…',
		'txtEndMsg':				'Je gepatchde ROM is klaar!',

		'txtChecksum':				'CRC-32 checksum: %',

		'txtAllTranslations':		'Beschikbare opties voor %:',
		'txtNoTranslation':			'Geen vertaling beschikbaar',
		'txtShowAllVersions':		'Toon alle versies',

		'txtDescVersion':			'v',
		'txtDescBy':				'door',
		'txtPatched':				'% patch',
		'txtUnpatched':				'%, niet gepatched',
		'txtDescOfficial':			'officieel',
		'txtDescUpdate':			'(update)',
		'txtDescIncompatible':		'(onverenigbaar)',
		'txtVisitSite':				'%’s webpagina',
		'txtVisitSiteAt':			'op %',
		'txtUpdateInfo':			'Versie-info',
		'txtReadDoc':				'Readme-bestand',

		'txtUsage':					'Gerbruikt: %',
		'txtUsageXTimes':			'% keer',
		'txtUsageUnknown':			'onbekend',

		'txtReadmeFile':			'readme',

		'error_no_rom':				'Geen ROM gespecificeerd',
		'error_no_rom_info':		'Deze ROM is niet geanalyseerd',
		'error_already_patched':	'Deze ROM is al gepatched',
		'error_unknown_rom':		'Onbekende ROM',
		'error_no_rom_in_zip':		'Geen ROM gevonden in dit zipbestand',
		'error_crc_output':			'Verkeerde output ROM',
		'error_crc_input':			'Verkeerde input ROM',
		'error_patching':			'Patching error',
		'error_no_patch_route':		'Kon je gepatchde ROM niet ontpatchen',
		'error_downloading':		'Download error',
		'error_unzipping':			'Error met uitpakken',
		'error_invalid_patch':		'Ongeïdentificeerd patchbestand',
		'error_crc_patch':			'Verkeerd patchbestand',
		'warning_too_big':			'Bestanden zijn te groot',
		'Not Found':				'Een patchbestand is niet gevonden',

		'txtAbout':					'Credits & Over',

		'txtCredits':				'Credits',
		'txtCreditsDesign':			'Ontwerp',
		'txtCreditsProgramming':	'Programmering',
		'txtCreditsAnimations':		'Animaties',
		'txtCreditsLegacy':			'Legacy App',
		'txtCreditsPlayer':			'Speler',
		'txtCreditsPlayerYou':		'Jij!',

		'txtAboutIntro':			'Mother Internationaal is een online patchingsapplicatie die enige game in de MOTHER reeks kan vertalen.',
		'txtAboutFreeProg1':		'Mother Internationaal is een gratis te gebruiken programma.',
		'txtAboutFreeProg2':		'Dit programma is niet bedoeld voor verkoop.',
		'txtAboutSource':			'De broncode van Mother Internationaal is % onder de ‰.',
		'txtAboutSourceGitHub':		'uitgegeven',
		'txtAboutSourceLicense':	'MIT licentie',
		'txtAboutTeams':			'Alle rechten voorbehouden aan de teams die elke vertalingspatch hebben ontwikkeld verpakt in dit programma. Speciale dank aan hen! POTENTIEEL!',
		'txtAboutAllTranslations':	'Alle ondersteunde vertalingen:',
		'txtAboutAllTransLabel':	'– Kies om webpagina te bezoeken –',
		'txtAboutAllTransNoSite':	'Geen registreerde webpagina voor %.',
		'txtAboutAllTransSiteAsk':	'Wil je %’s webpagina bezoeken op ‰?',
		'txtAboutTranslator1':		'Als je een vertaler bent, neem dan %!',
		'txtAboutTranslator2':		'contact met ons op',
		'txtAboutVersion':			'Versie %',
	},
};
