const LOCALIZATION = {
	'en':
	{
		'txtHtmlTitle':				'Mother International', /* I encourage to translate the word 'International' into all the languages! */
		'txtTitleBottom':			'International',
		'txtSubtitle':				'All-in-one MOTHER Translation Patcher',

		'txtBrowse':				'Browse…', /* a classic button to let the user browse their files */
		'txtNoRom':					'Please select a MOTHER game ROM',

		'txtDropRom':				'Please drop any MOTHER game ROM',
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
		'txtCreditsTexts':			'Texts',
		'txtCreditsAnimations':		'Animations',
		'txtCreditsLegacy':			'Legacy App', /* to give credits for the older versions of the program, v1.0 and v2.0 */
		'txtCreditsPlayer':			'Player',
		'txtCreditsPlayerYou':		'You!',

		'txtAboutIntro':			'Mother International is an online patching application that can translate any game in the MOTHER series.', /* or: web application */
		'txtAboutFreeProg':			'Mother International is a free to use program.\r\nThis program is not for sale.', /* Don’t put the new line (\r\n) if your language tends to take up a lot of space */
		'txtAboutSource':			'The source code of Mother International is % under the ‰.', /* % and ‰ are two clickable links */
		'txtAboutSourceGitHub':		'distributed', /* the text for the first clickable link I’ve just talked about */
		'txtAboutSourceLicense':	'MIT license', /* the second one */
		'txtAboutTeams':			'All rights reserved to the teams who created each translation patch packaged into this program. Special thanks to them!',
		'txtAboutSaturn':			'POTENTIAL!', /* followed by a Mr. Saturn sprite ("POTENTIAL" is one of their famous quotes) */
		'txtAboutAllTranslations':	'All supported translations:',
		'txtAboutAllTransLabel':	'– Select to access webpage –', /* the top entry in a list of translations */
		'txtAboutAllTransNoSite':	'No registered webpage for %.', /* the text in an alert window */
		'txtAboutAllTransSiteAsk':	'Do you want to access %’s webpage at ‰?', /* the text in an alert window; % and ‰ are the author and base url */
		'txtAboutTranslator1':		'If you’re a translator, feel free to %!', /* % is the text 'contact us' as a clickable link */
		'txtAboutTranslator2':		'contact us', /* this is what I was just referring to */
		'txtAboutVersion':			'Version % – ‰', /* % is a version number; ‰ is a date in local format (automatic) */
	},
	'fr':
	{
		'txtHtmlTitle':				'Mother International',
		'txtTitleBottom':			'International',
		'txtSubtitle':				'Le tout-en-un des patchs de traduction MOTHER',

		'txtBrowse':				'Parcourir…',
		'txtNoRom':					'Veuillez spécifier une ROM de jeu MOTHER',

		'txtDropRom':				'Déposez n’importe quelle ROM d’un jeu MOTHER',
		'txtApplyPatch':			'Appliquer le patch',
		'txtUpdate':				'Mettre à jour',

		'txtAnalyzingFile':			'Analyse du fichier…',
		'txtAnalyzingRom':			'Analyse de la ROM…',
		'txtRomIdentified':			'ROM reconnue !',

		'txtDownloading':			'Téléchargement du patch%…',
		'txtUnzipping':				'Décompression…',
		'txtApplyingPatch':			'Application du patch%…',
		'txtZipping':				'Création de l’archive zip…',
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

		'txtUsage':					'Nombre d’utilisations : %',
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
		'txtCreditsTexts':			'Textes',
		'txtCreditsAnimations':		'Animations',
		'txtCreditsLegacy':			'Ancienne application',
		'txtCreditsPlayer':			'Joueur',
		'txtCreditsPlayerYou':		'Vous !',

		'txtAboutIntro':			'Mother International est une application permettant d’appliquer des patchs de traduction sur tous les jeux MOTHER.',
		'txtAboutFreeProg':			'Mother International est un programme libre d’utilisation. Il n’est pas destiné à la vente.',
		'txtAboutSource':			'Le code source de Mother International est % sous la ‰.',
		'txtAboutSourceGitHub':		'distribué',
		'txtAboutSourceLicense':	'licence MIT',
		'txtAboutTeams':			'Tous droits réservés aux équipes qui ont créé les patchs de traduction inclus dans ce programme. Merci à elles !',
		'txtAboutSaturn':			'POTENTIEL !',
		'txtAboutAllTranslations':	'Toutes les traductions prises en charge :',
		'txtAboutAllTransLabel':	'– Sélectionnez pour accéder au site web –',
		'txtAboutAllTransNoSite':	'Pas de page web connue pour %.',
		'txtAboutAllTransSiteAsk':	'Voulez-vous accéder à la page de % sur ‰ ?',
		'txtAboutTranslator1':		'Si vous êtes un traducteur, n’hésitez pas à % !',
		'txtAboutTranslator2':		'nous contacter',
		'txtAboutVersion':			'Version % – ‰',
	},
	'it':
	{
		'txtHtmlTitle':				'Mother International',
		'txtTitleBottom':			'International',
		'txtSubtitle':				'Il patcher tutto in uno per tradurre la serie di MOTHER',

		'txtBrowse':				'Sfoglia…',
		'txtNoRom':					'Seleziona una ROM di MOTHER',

		'txtDropRom':				'Trascina qui una ROM di MOTHER',
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
		'txtVisitSiteAt':			'su %',
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
		'txtCreditsDesign':			'Progettazione',
		'txtCreditsProgramming':	'Programmazione',
		'txtCreditsTexts':			'Testo',
		'txtCreditsAnimations':		'Animazioni',
		'txtCreditsLegacy':			'App precedente',
		'txtCreditsPlayer':			'Giocatore',
		'txtCreditsPlayerYou':		'Tu!',

		'txtAboutIntro':			'Mother International è un’applicazione online che applica qualsiasi patch di traduzione della serie MOTHER.',
		'txtAboutFreeProg':			'L’utilizzo di Mother International è gratuito.\r\nQuesto programma non è in vendita.',
		'txtAboutSource':			'Il codice sorgente di Mother International è % sotto la ‰.',
		'txtAboutSourceGitHub':		'distribuito',
		'txtAboutSourceLicense':	'licenza MIT',
		'txtAboutTeams':			'Tutti i diritti riservati al team che ha creato ciascuna patch di traduzione inclusa in questo programma. Grazie di cuore a tutti loro!',
		'txtAboutSaturn':			'POTENZIALE!',
		'txtAboutAllTranslations':	'Traduzioni supportate:',
		'txtAboutAllTransLabel':	'– Seleziona per accedere alla pagina –',
		'txtAboutAllTransNoSite':	'Nessuna pagina registrata per %.',
		'txtAboutAllTransSiteAsk':	'Vuoi accedere alla pagina di % su ‰?',
		'txtAboutTranslator1':		'Se sei un traduttore, sentiti libero di %!',
		'txtAboutTranslator2':		'contattarci',
		'txtAboutVersion':			'Versione % – ‰',
	},
	'nl':
	{
		'txtHtmlTitle':				'Mother Internationaal',
		'txtTitleBottom':			'Internationaal',
		'txtSubtitle':				'Alles-in-een MOTHER Vertalingspatcher',

		'txtBrowse':				'Zoeken…',
		'txtNoRom':					'Selecteer alsjeblieft een MOTHER-game ROM',

		'txtDropRom':				'Plaats alsjeblieft een MOTHER-game ROM',
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
		'txtCreditsTexts':			'Tekst',
		'txtCreditsAnimations':		'Animaties',
		'txtCreditsLegacy':			'Legacy App',
		'txtCreditsPlayer':			'Speler',
		'txtCreditsPlayerYou':		'Jij!',

		'txtAboutIntro':			'Mother Internationaal is een online patchingsapplicatie die enige game in de MOTHER reeks kan vertalen.',
		'txtAboutFreeProg':			'Mother Internationaal is een gratis te gebruiken programma. Dit programma is niet bedoeld voor verkoop.',
		'txtAboutSource':			'De broncode van Mother Internationaal is % onder de ‰.',
		'txtAboutSourceGitHub':		'uitgegeven',
		'txtAboutSourceLicense':	'MIT licentie',
		'txtAboutTeams':			'Alle rechten voorbehouden aan de teams die elke vertalingspatch hebben ontwikkeld verpakt in dit programma. Speciale dank aan hen!',
		'txtAboutSaturn':			'POTENTIEEL!',
		'txtAboutAllTranslations':	'Alle ondersteunde vertalingen:',
		'txtAboutAllTransLabel':	'– Kies om webpagina te bezoeken –',
		'txtAboutAllTransNoSite':	'Geen registreerde webpagina voor %.',
		'txtAboutAllTransSiteAsk':	'Wil je %’s webpagina bezoeken op ‰?',
		'txtAboutTranslator1':		'Als je een vertaler bent, neem dan %!',
		'txtAboutTranslator2':		'contact met ons op',
		'txtAboutVersion':			'Versie % – ‰',
	},
	'es':
	{
		'txtHtmlTitle':				'Mother Internacional',
		'txtTitleBottom':			'Internacional',
		'txtSubtitle':				'Parcheador todo-en-uno para traducciones de MOTHER',

		'txtBrowse':				'Buscar…',
		'txtNoRom':					'Por favor selecciona una ROM de MOTHER',

		'txtDropRom':				'Arrastra cualquier ROM de MOTHER',
		'txtApplyPatch':			'Aplicar traducción',
		'txtUpdate':				'Actualizar',

		'txtAnalyzingFile':			'Analizando archivo…',
		'txtAnalyzingRom':			'Analizando ROM…',
		'txtRomIdentified':			'¡ROM identificada!',
		'txtDownloading':			'Descargando parche%…',
		'txtUnzipping':				'Descomprimiendo…',
		'txtApplyingPatch':			'Aplicando parche%…',
		'txtZipping':				'Creando archivo zip…',
		'txtFinalizing':			'Finalizando…',
		'txtEndMsg':				'¡Tu ROM parcheada está lista!',

		'txtChecksum':				'Checksum CRC-32: %',

		'txtAllTranslations':		'Opciones disponibles para %:',
		'txtNoTranslation':			'No hay traducción disponible',
		'txtShowAllVersions':		'Mostrar todas las versiones',

		'txtDescVersion':			'v',
		'txtDescBy':				'de',
		'txtPatched':				'parche %',
		'txtUnpatched':				'%, sin parche',
		'txtDescOfficial':			'oficial',
		'txtDescUpdate':			'(actualización)',
		'txtDescIncompatible':		'(incompatible)',
		'txtVisitSite':				'Página web de %',
		'txtVisitSiteAt':			'en %',
		'txtUpdateInfo':			'Información de versión',
		'txtReadDoc':				'Archivo Léeme',

		'txtUsage':					'Usado: %',
		'txtUsageXTimes':			'% veces',
		'txtUsageUnknown':			'desconocido',

		'txtReadmeFile':			'léeme',

		'error_no_rom':				'No existe ROM especificada',
		'error_no_rom_info':		'Esta ROM no ha sido analizada',
		'error_already_patched':	'Esta ROM ya ha sido parcheada',
		'error_unknown_rom':		'ROM desconocida',
		'error_no_rom_in_zip':		'No se encontró ningúna ROM en este archivo zip',
		'error_crc_output':			'ROM de salida errónea',
		'error_crc_input':			'ROM de entrada errónea',
		'error_patching':			'Error de parcheo',
		'error_no_patch_route':		'No se pudo desparchear tu ROM parcheada',
		'error_downloading':		'Error de descarga',
		'error_unzipping':			'Error de descompresión',
		'error_invalid_patch':		'Archivo de parche no identificado',
		'error_crc_patch':			'Archivo de parche erróneo',
		'warning_too_big':			'Tamaño de archivo muy grande',
		'Not Found':				'No se encontró algún archivo de parche',

		'txtAbout':					'Créditos & Acerca de',

		'txtCredits':				'Créditos',
		'txtCreditsDesign':			'Diseño',
		'txtCreditsProgramming':	'Programación',
		'txtCreditsTexts':			'Textos',
		'txtCreditsAnimations':		'Animaciones',
		'txtCreditsLegacy':			'Aplicación anterior',
		'txtCreditsPlayer':			'Jugador',
		'txtCreditsPlayerYou':		'¡Tú!',

		'txtAboutIntro':			'Mother Internacional es una aplicación en línea de parcheo que puede traducir cualquier juego de la serie de MOTHER.',
		'txtAboutFreeProg':			'Mother Internacional es un programa de libre uso. No está a la venta.',
		'txtAboutSource':			'El código fuente de Mother Internacional es % bajo la ‰.',
		'txtAboutSourceGitHub':		'distribuido',
		'txtAboutSourceLicense':	'licencia MIT',
		'txtAboutTeams':			'Todos los derechos reservados a los equipos que crearon cada parche de traducción incluido en este programa. ¡Un agradecimiento especial para ellos!',
		'txtAboutSaturn':			'¡POTENCIAL!',
		'txtAboutAllTranslations':	'Todas las traducciones disponibles:',
		'txtAboutAllTransLabel':	'– Selecciona para accedar a la página web –',
		'txtAboutAllTransNoSite':	'No hay página web registrada para %.',
		'txtAboutAllTransSiteAsk':	'¿Quieres accedar a la página web de % en ‰?',
		'txtAboutTranslator1':		'Si eres un traductor, ¡no dudes en %!',
		'txtAboutTranslator2':		'contactarnos',
		'txtAboutVersion':			'Versión % – ‰',
	},
 	'de':
	{
		'txtHtmlTitle':				'Mother International',
		'txtTitleBottom':			'International',
		'txtSubtitle':				'Universaler Patcher für MOTHER-Übersetzungen',

		'txtBrowse':				'Durchsuchen …',
		'txtNoRom':					'Bitte wähle eine MOTHER-ROM aus',

		'txtDropRom':				'Bitte ziehe eine MOTHER‑ROM in dieses Fenster',
		'txtApplyPatch':			'Übersetzung anwenden',
		'txtUpdate':				'Aktualisieren',

		'txtAnalyzingFile':			'Analysiere Datei …',
		'txtAnalyzingRom':			'Analysiere ROM …',
		'txtRomIdentified':			'ROM identifiziert!',
		'txtDownloading':			'Patch wird heruntergeladen% …',
		'txtUnzipping':				'Entpacke …',
		'txtApplyingPatch':			'Wende Patch an% …',
		'txtZipping':				'Erzeuge Zip-Datei …',
		'txtFinalizing':			'Vorgang wird beendet …',
		'txtEndMsg':				'Deine ROM wurde erfolgreich gepatched!',

		'txtChecksum':				'CRC-32 Prüfsumme: %',

		'txtAllTranslations':		'Verfügbare Optionen für %:',
		'txtNoTranslation':			'Keine Übersetzungen verfügbar',
		'txtShowAllVersions':		'Zeige alle Versionen',

		'txtDescVersion':			'v',
		'txtDescBy':				'von',
		'txtPatched':				'% Patch',
		'txtUnpatched':				'%, kein Patch',
		'txtDescOfficial':			'offiziell',
		'txtDescUpdate':			'(Update)',
		'txtDescIncompatible':		'(inkompatibel)',
		'txtVisitSite':				'Website von %',
		'txtVisitSiteAt':			'unter %',
		'txtUpdateInfo':			'Infos zur Version',
		'txtReadDoc':				'Readme-Datei',

		'txtUsage':					'Anzahl Nutzungen: %',
		'txtUsageXTimes':			'%',
		'txtUsageUnknown':			'unbekannt',

		'txtReadmeFile':			'Readme',

		'error_no_rom':				'Keine ROM ausgewählt',
		'error_no_rom_info':		'Die ROM konnte nicht analysiert werden',
		'error_already_patched':	'Die ROM wurde bereits gepatched',
		'error_unknown_rom':		'Unbekannte ROM',
        'error_no_rom_in_zip':      'Keine ROM im Archiv gefunden',
		'error_crc_output':			'Falsche Ausgabe-ROM',
		'error_crc_input':			'Falsche Eingabe-ROM',
		'error_patching':			'Fehler beim Patchen',
		'error_no_patch_route':		'Entfernen des Patches nicht möglich',
		'error_downloading':		'Fehler beim Herunterladen',
		'error_unzipping':			'Fehler beim Entpacken',
		'error_invalid_patch':		'Unbekannte Patch-Datei',
		'error_crc_patch':			'Falsche Patch-Datei',
		'warning_too_big':			'Datei zu groß',
		'Not Found':				'Keine Patch-Datei gefunden',

		'txtAbout':					'Credits & Über',

		'txtCredits':				'Credits',
		'txtCreditsDesign':			'Design',
		'txtCreditsProgramming':	'Programmierung',
		'txtCreditsTexts':			'Texte',
		'txtCreditsAnimations':		'Animationen',
		'txtCreditsLegacy':			'Alte App',
		'txtCreditsPlayer':			'Spieler',
		'txtCreditsPlayerYou':		'Du!',

		'txtAboutIntro':			'Mother International ist eine Web-Applikation, welches jedes Spiel in der MOTHER-Serie übersetzen kann.',
		'txtAboutFreeProg':			'Mother International ist eine freie Anwendung.\r\nSie steht nicht zum Verkauf.',
		'txtAboutSource':			'Der Quellcode von Mother International ist unter der ‰ %.',
		'txtAboutSourceGitHub':		'veröffentlicht',
		'txtAboutSourceLicense':	'MIT-Lizenz',
		'txtAboutTeams':			'Alle Rechte liegen bei den Teams, die jede Übersetzung hier erstellt haben. Ihnen gilt ein besonderer Dank!',
		'txtAboutSaturn':			'POTENZIAL!',
		'txtAboutAllTranslations':	'Alle unterstützten Übersetzungen:',
		'txtAboutAllTransLabel':	'– Auswählen, um auf Projekt-Website zu kommen –',
		'txtAboutAllTransNoSite':	'Für % gibt es keine registrierte Website.',
		'txtAboutAllTransSiteAsk':	'Möchtest du die Website von % unter ‰ aufrufen?',
		'txtAboutTranslator1':		'Wenn du ein Übersetzer bist, dann % gerne!',
		'txtAboutTranslator2':		'kontaktiere uns',
		'txtAboutVersion':			'Version % – ‰',
	},
	'pl':
	{
		'txtHtmlTitle':				'Mother International',
		'txtTitleBottom':			'International',
		'txtSubtitle':				'Uniwersalny patcher tłumaczeń gier MOTHER',

		'txtBrowse':				'Przeglądaj…',
		'txtNoRom':					'Wybierz ROM z grą MOTHER',

		'txtDropRom':				'Upuść dowolny ROM z grą MOTHER',
		'txtApplyPatch':			'Nałóż łatkę',
		'txtUpdate':				'Aktualizuj',

		'txtAnalyzingFile':			'Analizowanie pliku…',
		'txtAnalyzingRom':			'Analizowanie ROM-u…',
		'txtRomIdentified':			'ROM zidentyfikowany!',
		'txtDownloading':			'Pobieranie łatki%…',
		'txtUnzipping':				'Rozpakowywanie…',
		'txtApplyingPatch':			'Nakładanie łatki%…',
		'txtZipping':				'Tworzenie archiwum…',
		'txtFinalizing':			'Finalizowanie…',
		'txtEndMsg':				'Twój załatany ROM jest gotowy!',

		'txtChecksum':				'Suma kontrolna CRC-32: %',

		'txtAllTranslations':		'Dostępne opcje dla %:',
		'txtNoTranslation':			'Brak dostępnego tłumaczenia',
		'txtShowAllVersions':		'Pokaż wszystkie wersje',

		'txtDescVersion':			'v',
		'txtDescBy':				'autorstwa',
		'txtPatched':				'%, załatany',
		'txtUnpatched':				'%, niezałatany',
		'txtDescOfficial':			'oficjalne',
		'txtDescUpdate':			'(aktualizacja)',
		'txtDescIncompatible':		'(niekompatybilna)',
		'txtVisitSite':				'Strona %',
		'txtVisitSiteAt':			'na %',
		'txtUpdateInfo':			'Informacje o wersji',
		'txtReadDoc':				'Czytajto',

		'txtUsage':					'Liczba użyć: %',
		'txtUsageXTimes':			'%',
		'txtUsageUnknown':			'nieznana',

		'txtReadmeFile':			'czytajto',

		'error_no_rom':				'Nie określono ROM-u',
		'error_no_rom_info':		'Ten ROM nie został przeanalizowany',
		'error_already_patched':	'Ten ROM został już załatany',
		'error_unknown_rom':		'Nieznany ROM',
		'error_no_rom_in_zip':		'W tym archiwum nie znaleziono żadnego ROM-u',
		'error_crc_output':			'Nieprawidłowe wyjście ROM-u',
		'error_crc_input':			'Nieprawidłowe wejście ROM-u',
		'error_patching':			'Błąd łatania',
		'error_no_patch_route':		'Nie można przywrócić już załatanego ROM-u',
		'error_downloading':		'Błąd pobierania',
		'error_unzipping':			'Błąd rozpakowywania',
		'error_invalid_patch':		'Niezidentyfikowany plik z łatką',
		'error_crc_patch':			'Nieprawidłowy plik z łatką',
		'warning_too_big':			'Za duże pliki',
		'Not Found':				'Nie znaleziono pliku z łatką',

		'txtAbout':					'O programie',

		'txtCredits':				'Autorzy',
		'txtCreditsDesign':			'Design',
		'txtCreditsProgramming':	'Programowanie',
		'txtCreditsTexts':			'Tekst',
		'txtCreditsAnimations':		'Animacje',
		'txtCreditsLegacy':			'Poprzednia aplikacja',
		'txtCreditsPlayer':			'Gracz',
		'txtCreditsPlayerYou':		'Ty!',

		'txtAboutIntro':			'Mother International to aplikacja do łatania online, która potrafi przetłumaczyć każdą grę z serii MOTHER.',
		'txtAboutFreeProg':			'Mother International to darmowy program.\r\nTen program nie jest na sprzedaż.',
		'txtAboutSource':			'Kod źródłowy Mother International jest % na ‰.',
		'txtAboutSourceGitHub':		'rozpowszechniany',
		'txtAboutSourceLicense':	'licencji MIT',
		'txtAboutTeams':			'Wszystkie prawa zastrzeżone dla zespołów, które stworzyły każdą łatkę tłumaczeniową. Specjalne podziękowania dla nich!',
		'txtAboutSaturn':			'POTENCJAŁ!',
		'txtAboutAllTranslations':	'Wszystkie obsługiwane tłumaczenia:',
		'txtAboutAllTransLabel':	'– Wybierz, aby wejść na stronę –',
		'txtAboutAllTransNoSite':	'Brak zarejestrowanej strony dla %.',
		'txtAboutAllTransSiteAsk':	'Czy chcesz wejść na stronę % na ‰?',
		'txtAboutTranslator1':		'Jeśli jesteś tłumaczem, %!',
		'txtAboutTranslator2':		'skontaktuj się z nami',
		'txtAboutVersion':			'Wersja % – ‰',
	},
	'pt':
	{
		'txtHtmlTitle':				'Mother Internacional',
		'txtTitleBottom':			'Internacional',
		'txtSubtitle':				'O patcher definitivo para traduções de MOTHER',

		'txtBrowse':				'Procurar…',
		'txtNoRom':					'Selecione uma ROM de MOTHER',

		'txtDropRom':				'Solte qualquer ROM de MOTHER aqui',
		'txtApplyPatch':			'Aplicar tradução',
		'txtUpdate':				'Atualizar',

		'txtAnalyzingFile':			'Analisando arquivo…',
		'txtAnalyzingRom':			'Analisando ROM…',
		'txtRomIdentified':			'ROM identificada!',
		'txtDownloading':			'Baixando patch%…',
		'txtUnzipping':				'Descompactando…',
		'txtApplyingPatch':			'Aplicando patch%…',
		'txtZipping':				'Criando arquivo zipado…',
		'txtFinalizing':			'Finalizando…',
		'txtEndMsg':				'Sua ROM está pronta!',

		'txtChecksum':				'CRC-32 checksum: %',

		'txtAllTranslations':		'Opções disponíveis para %:',
		'txtNoTranslation':			'Tradução não disponível',
		'txtShowAllVersions':		'Mostrar todas as versões',

		'txtDescVersion':			'v',
		'txtDescBy':				'por',
		'txtPatched':				'% patch',
		'txtUnpatched':				'%, não patcheado',
		'txtDescOfficial':			'oficial',
		'txtDescUpdate':			'(atualizar)',
		'txtDescIncompatible':		'(incompatível)',
		'txtVisitSite':				'Página de %',
		'txtVisitSiteAt':			'em %',
		'txtUpdateInfo':			'Informação da versão',
		'txtReadDoc':				'Arquivo leia-me',

		'txtUsage':					'Número de usos: %',
		'txtUsageXTimes':			'% vezes',
		'txtUsageUnknown':			'desconhecido',

		'txtReadmeFile':			'leia-me',

		'error_no_rom':				'Nenhuma ROM especificada',
		'error_no_rom_info':		'Esta ROM ainda não foi analisada',
		'error_already_patched':	'Esta ROM já foi patcheada',
		'error_unknown_rom':		'ROM desconhecida',
		'error_no_rom_in_zip':		'Nenhuma ROM foi encontrada dentro do arquivo',
		'error_crc_output':			'ROM de saída errada',
		'error_crc_input':			'ROM de entrada errada',
		'error_patching':			'Erro no processo de patch',
		'error_no_patch_route':		'Erro ao remover o patch da ROM',
		'error_downloading':		'Erro ao fazer o download',
		'error_unzipping':			'Erro ao descompactar',
		'error_invalid_patch':		'Patch não identificado',
		'error_crc_patch':			'Arquivo de patch incorreto',
		'warning_too_big':			'Arquivos grades demais',
		'Not Found':				'O arquivo de patch não foi encontrado',

		'txtAbout':					'Créditos e informações',

		'txtCredits':				'Créditos',
		'txtCreditsDesign':			'Projeto',
		'txtCreditsProgramming':	'Programação',
		'txtCreditsTexts':			'Texto',
		'txtCreditsAnimations':		'Animações',
		'txtCreditsLegacy':			'Programa legado',
		'txtCreditsPlayer':			'Jogador',
		'txtCreditsPlayerYou':		'Você!',

		'txtAboutIntro':			'Mother Internacional é um programa para aplicar patches online que pode traduzir qualquer jogo da série MOTHER.',
		'txtAboutFreeProg':			'Mother Internacional é um programa gratuito.\r\nEste programa não está à venda.',
		'txtAboutSource':			'O código fonte da Mother Internacional é % sob a ‰.',
		'txtAboutSourceGitHub':		'distribuído',
		'txtAboutSourceLicense':	'licença MIT',
		'txtAboutTeams':			'Todos os direitos reservados às equipes que criaram cada patch de tradução incluído neste programa. Agradecimentos especiais a eles!',
		'txtAboutSaturn':			'POTENCIAL!',
		'txtAboutAllTranslations':	'Todas as traduções disponíveis:',
		'txtAboutAllTransLabel':	'– Clique para accessar a página –',
		'txtAboutAllTransNoSite':	'Nenhuma página registrada por %.',
		'txtAboutAllTransSiteAsk':	'Você quer visitar a página de % encontrada em ‰?',
		'txtAboutTranslator1':		'Se você for tradutor(a), fique à vontade para %!',
		'txtAboutTranslator2':		'nos contatar',
		'txtAboutVersion':			'Versão % – ‰',
	},
	'ko':
	{
		'txtHtmlTitle':				'Mother International',
		'txtTitleBottom':			'International',
		'txtSubtitle':				'MOTHER 통합 번역 패치 사이트',

		'txtBrowse':				'찾아보기…',
		'txtNoRom':					'MOTHER 게임의 ROM 파일을 선택해 주세요.',

		'txtDropRom':				'MOTHER 게임의 ROM 파일을 넣어주세요.',
		'txtApplyPatch':			'번역 적용하기',
		'txtUpdate':				'업데이트하기',

		'txtAnalyzingFile':			'파일 분석 중…',
		'txtAnalyzingRom':			'ROM 파일 분석 중…',
		'txtRomIdentified':			'ROM 파일 확인!',
		'txtDownloading':			'패치 다운로드 중%…',
		'txtUnzipping':				'압축 해제 중…',
		'txtApplyingPatch':			'패치 적용%…',
		'txtZipping':				'압축 중…',
		'txtFinalizing':			'마무리 중…',
		'txtEndMsg':				'ROM 파일을 성공적으로 패치했습니다!',

		'txtChecksum':				'CRC-32 무결성 검사: %',

		'txtAllTranslations':		'%에 지원되는 번역:',
		'txtNoTranslation':			'선택된 번역이 없음',
		'txtShowAllVersions':		'모든 버전 표시',

		'txtDescVersion':			'v',
		'txtDescBy':				'by', /*I can't translate it into Korean because the word order is opposite to English. */
		'txtPatched':				'% 패치',
		'txtUnpatched':				'%, 패치 안 됨',
		'txtDescOfficial':			'공식',
		'txtDescUpdate':			'(업데이트)',
		'txtDescIncompatible':		'(호환되지 않음)',
		'txtVisitSite':				'%의 웹페이지',
		'txtVisitSiteAt':			'%으로',
		'txtUpdateInfo':			'버전 정보',
		'txtReadDoc':				'ReadMe 파일',

		'txtUsage':					'사용 횟수: %',
		'txtUsageXTimes':			'% 회', 
		'txtUsageUnknown':			'알 수 없음',

		'txtReadmeFile':			'readme',

		'error_no_rom':				'ROM 파일을 선택하지 않음',
		'error_no_rom_info':		'분석되지 않은 ROM 파일',
		'error_already_patched':	'이미 패치된 ROM 파일',
		'error_unknown_rom':		'알 수 없는 ROM 파일',
		'error_no_rom_in_zip':		'zip 파일에서 ROM 파일을 찾을 수 없음',
		'error_crc_output':			'잘못 출력된 ROM 파일',
		'error_crc_input':			'잘못 입력된 ROM 파일',
		'error_patching':			'패치 에러',
		'error_no_patch_route':		'이미 패치된 ROM 파일은 패치할 수 없음',
		'error_downloading':		'다운로드 에러',
		'error_unzipping':			'압축 해제 에러',
		'error_invalid_patch':		'불확실한 패치 파일',
		'error_crc_patch':			'잘못된 패치 파일',
		'warning_too_big':			'너무 큰 파일',
		'Not Found':				'패치 파일을 찾을 수 없음',

		'txtAbout':					'크레딧 & 정보',

		'txtCredits':				'크레딧',
		'txtCreditsDesign':			'디자인',
		'txtCreditsProgramming':	'프로그래밍',
		'txtCreditsTexts':			'텍스트',
		'txtCreditsAnimations':		'애니메이션',
		'txtCreditsLegacy':			'구버전 개발',
		'txtCreditsPlayer':			'플레이어',
		'txtCreditsPlayerYou':		'당신!',

		'txtAboutIntro':			'Mother International은 MOTHER 시리즈의 모든 게임을 번역할 수 있는 온라인 패치 사이트입니다.',
		'txtAboutFreeProg':			'Mother International은 누구나 무료로 사용할 수 있는 사이트입니다.\r\n절대 판매용이 아닙니다.',
		'txtAboutSource':			'소스 코드는 ‰에 따라 %됩니다.',
		'txtAboutSourceGitHub':		'배포',
		'txtAboutSourceLicense':	'MIT 라이선스',
		'txtAboutTeams':			'이 사이트의 모든 권리는 각 번역 패치를 만든 팀에게 있습니다. 번역에 참여해 주신 분들에겐 특히 감사드립니다.',
		'txtAboutSaturn':			'POTENTIAL!',
		'txtAboutAllTranslations':	'지원하는 번역:',
		'txtAboutAllTransLabel':	'– 확인하려면 클릭해주세요 –',
		'txtAboutAllTransNoSite':	'%에 등록된 웹 페이지가 없습니다.',
		'txtAboutAllTransSiteAsk':	'%의 웹페이지 ‰를 엑세스하시겠습니까?',
		'txtAboutTranslator1':		'번역가라면 %에게 연락해 주세요!',
		'txtAboutTranslator2':		'저희',
		'txtAboutVersion':			'버전 % – ‰',
	},
	'ru':
	{
		'txtHtmlTitle':				'Mother International',
		'txtTitleBottom':			'International',
		'txtSubtitle':				'Универсальный патчер переводов игр серии MOTHER',

		'txtBrowse':				'Выбрать файл…',
		'txtNoRom':					'Пожалуйста, выберите ROM-образ игры MOTHER',

		'txtDropRom':				'Перетащите сюда любой ROM-образ игры MOTHER',
		'txtApplyPatch':			'Применить патч',
		'txtUpdate':				'Обновить',

		'txtAnalyzingFile':			'Анализирование файла…',
		'txtAnalyzingRom':			'Анализирование ROM-образа…',
		'txtRomIdentified':			'Распознан ROM-образ!',
		'txtDownloading':			'Загрузка патча%…',
		'txtUnzipping':				'Распаковка…',
		'txtApplyingPatch':			'Применение патча%…',
		'txtZipping':				'Создание ZIP архива…',
		'txtFinalizing':			'Завершение…',
		'txtEndMsg':				'Ваш модифицированный ROM-образ готов!',

		'txtChecksum':				'Контрольная сумма CRC-32: %',

		'txtAllTranslations':		'Доступные варианты для %:', 
		'txtNoTranslation':			'Нет доступного перевода',
		'txtShowAllVersions':		'Показать все версии',

		'txtDescVersion':			'вер.',
		'txtDescBy':				'от',
		'txtPatched':				'% патч',
		'txtUnpatched':				'%, немодифицированный',
		'txtDescOfficial':			'официальный',
		'txtDescUpdate':			'(обновление)',
		'txtDescIncompatible':		'(несовместим)',
		'txtVisitSite':				'Веб-страница %',
		'txtVisitSiteAt':			'на %',
		'txtUpdateInfo':			'Информация о версии',
		'txtReadDoc':				'Файл README',

		'txtUsage':					'Применён: %',
		'txtUsageXTimes':			'% раз/раза',
		'txtUsageUnknown':			'неизвестно',

		'txtReadmeFile':			'README',

		'error_no_rom':				'Не выбран ROM-образ',
		'error_no_rom_info':		'Этот ROM-образ ещё не проанализирован',
		'error_already_patched':	'Этот ROM-образ уже модифицирован',
		'error_unknown_rom':		'Неизвестный ROM-образ',
		'error_no_rom_in_zip':		'В этом архиве не найден ROM-образ',
		'error_crc_output':			'Неверное значение CRC-32 выходного ROM-образа',
		'error_crc_input':			'Неверное значение CRC-32 исходного ROM-образа',
		'error_patching':			'Ошибка внедрения патча',
		'error_no_patch_route':		'Невозможно откатить патч уже модифицированного ROM-образа',
		'error_downloading':		'Ошибка загрузки',
		'error_unzipping':			'Ошибка распаковки',
		'error_invalid_patch':		'Нераспознаный файл патча',
		'error_crc_patch':			'Неверный файл патча',
		'warning_too_big':			'Файлы слишком велики',
		'Not Found':				'Файл патча не найден',

		'txtAbout':					'О нас',

		'txtCredits':				'Авторы',
		'txtCreditsDesign':			'Дизайн',
		'txtCreditsProgramming':	'Программирование',
		'txtCreditsTexts':			'Текст',
		'txtCreditsAnimations':		'Анимации',
		'txtCreditsLegacy':			'Старая версия приложения',
		'txtCreditsPlayer':			'Игрок',
		'txtCreditsPlayerYou':		'Вы!',

		'txtAboutIntro':			'Mother International — это веб-приложение, позволяющее внедрять патчи с переводами в любую игру серии MOTHER.',
		'txtAboutFreeProg':			'Mother International — это бесплатная программа.\r\nОна не продаётся.',
		'txtAboutSource':			'Исходный код Mother International % по ‰.',
		'txtAboutSourceGitHub':		'распространяется',
		'txtAboutSourceLicense':	'лицензии MIT',
		'txtAboutTeams':			'Все права принадлежат командам, создавшим каждый патч с переводом, находящиеся в этой программе. Огромное им спасибо!',
		'txtAboutSaturn':			'ПОТЕНЦИАЛ!',
		'txtAboutAllTranslations':	'Все поддерживающиеся переводы:',
		'txtAboutAllTransLabel':	'– Выберите, чтобы перейти на веб-страницу –',
		'txtAboutAllTransNoSite':	'Нет зарегистрированной веб-страницы переводчика %.',
		'txtAboutAllTransSiteAsk':	'Вы хотите перейти на веб-страницу переводчика % (‰)?',
		'txtAboutTranslator1':		'Если вы переводчик, не стесняйтесь %!',
		'txtAboutTranslator2':		'сообщить нам',
		'txtAboutVersion':			'Версия % – ‰',
	},
}
