const LOCALIZATION = {
	'en':
	{
		'txtHtmlTitle':				'Mother International', /* 'Mother' should stay 'Mother', but 'International' can be translated */
		'txtTitleBottom':			'International', /* same here, but this one is for the logo */
		'txtSubtitle':				'All-in-one MOTHER Translation Patcher',

		'txtBrowse':				'Browse…', /* a classic button to let the user browse their files */
		'txtNoRom':					'', /* we decided to write nothing here, after all */

		'txtSpecifyRom':			'Please drop any MOTHER game ROM',
		'txtApplyPatch':			'Apply Translation', /* could be 'Apply Patch' as well */
		'txtUpdate':				'Update', /* the button changes to 'Update' instead of 'Apply Patch' when it’s a more recent translation */

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
		'txtDescOfficial':			'official', /* extra indications in the select menu for certain translation choices */
		'txtDescUpdate':			'(update)', /* extra indications in the select menu for certain translation choices */
		'txtDescIncompatible':		'(incompatible)', /* extra indications in the select menu for certain translation choices */
		'txtVisitSite':				'%’s webpage', /* % is the name of a translation team or individual */
		'txtVisitSiteAt':			'at %', /* % is the base name of a URL */
		'txtUpdateInfo':			'Version info', /* the text of a link to get more info on a specific version */
		'txtReadDoc':				'Readme file', /* the text of a link to download a readme file */

		'txtNbUses':				'Number of uses for this patch: %', /* if this text is long, % should preferably not be at the very end */
		'txtNbUsesUnknown':			'unknown', /* replaces the % if the server did not return the number of uses */

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
		'txtCreditsLegacy':			'Legacy App',
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

		'txtNbUses':				'Nombre d’utilisations pour ce patch : %',
		'txtNbUsesUnknown':			'inconnu',

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
};
