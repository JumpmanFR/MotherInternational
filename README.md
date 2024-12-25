# Mother International
A web-based version and complete overheal of Mother International, the MOTHER-series focused multipatcher program from Mother Forever.

Although this new version is hosted on a web server, it does everything client-side, like unzipping and patching, so no ROM needs to be transfered from and to the server.

It’s been developped by JumpmanFR under the supervision of Kody NOKOLO from Mother Forever. The source code is available here under the [MIT license](https://opensource.org/licenses/MIT).\
The patching mechanism relies on a modified version of Marc Robledo’s [Rom Patcher JS](https://github.com/marcrobledo/RomPatcher.js/).

## Features

### Already known features from previous versions
* Ability to patch any game in the MOTHER series into many languages (22 translation patches included previously in version 2.1).
* Nice and user-friendly interface, consistent with Mother Forever’s visual identity.
* Cute animations.
* *(For operators)* Support for UPS and IPS patch formats.

### New features from this version 3 on the Web
* Includes 37 translation projects, or 89 translation patches if you count all included patch versions (as of December 22nd, 2024).
* Can *unpatch* ROMs and apply multiple patches successively, allowing to translate a game from any language to any other (no need to input the base Japanese ROM specifically).
* Based on the same principle, can update your ROM if you’re using an older version of the same translation.
* Supports special additional patches designed to be applied over existing translations (like better sound and such); the program automatically finds a route from your current ROM to the translation and special features you want.
* Identifies your patched ROMs and gives more info about them: language, patch version, extra patches included, translators’ website, etc.
* Automatically invites you to translate into your language based on your Web browser settings, or to update your current ROM into a more recent translation from the same team.
* Supports zipped ROMs.
* Supports translation teams better by including links to their websites and readme files.
* Compatible and suited for mobile devices, thanks to a responsive UI.
* Features a multilingual UI, currently in English, Dutch, French, German, Italian, Polish, Portuguese and Spanish (as of December 22nd, 2024).\
*(For operators)* Other languages can be easily added; supports right-to-left writing.
* *(For operators)* Also supports BPS and VCDIFF/xdelta patch formats, in addition to UPS and IPS. That said, only the UPS format can *unpatch* ROMS, making possible three of the biggest new features listed above. For now, all included patches have been converted to UPS so everything’s fine. But for future patches, you’ll probably want to import them as UPS patches all well. Otherwise, the program will fallback to more limited features in the impacted situations.

### Other specificities of version 3
* Hosted on a website, so that people don’t have to download a full executable package that includes all the translations for a minimal use.
* Does everything (unzipping, patching) client-side, just downloads the patch and applies it. That way, no ROM has to be transfered from and to the server.
* *(For operators)* Scalable, can support more and more translations over time by simply adding patch files and a few lines in the database.
* Open source project available [on GitHub](https://github.com/JumpmanFR/MotherInternational).

## Supported translations
* MOTHER 1 / EarthBound Beginnings
	* French v1.0 by Terminus Traduction
	* German v1.0a1 by G-TRANS ***(new!)***
	* Italian v1.2a-v2.2 by GiAnMMV ***(new!)***
	* Polish v1.0 by Voxar
	* Russian v0.9 by CHIEF-NET
	* Latin American Spanish v2.2 by OAD
	* European Spanish v0.99 by Jackic ***(new!)***
* MOTHER 2 / EarthBound
	* Catalan v1.2a by AndreuMB ***(new!)***
	* French v1.1 by Team MAMBO
	* German v1.0-v1.2.3 by GlostU ***(updated!)***
	* Italian v1.0-v1.1 by CRefice
	* Italian v1.0-v1.47 by Vecna ***(new!)***
	* Polish v1.0-v1.1 by Voxar ***(updated!)***
	* Russian v20.05.13-v23.07.15 by MAGNAT2645 ***(new!)***
	* Brazilian Portuguese v1.0 by EarthBound Brazil
	* Latin American Spanish v2.0-v4.0 by ShadowOne333
	* European Spanish v1.0a by josete2k ***(new!)***
* MOTHER 1+2
	* English v1.0.1 by Tomato
	* French v1.0 by MotherVF ***(new!)***
	* German v1.0 by domflo
	* German v1.1.0 by BetaDream ***(new!)***
	* Italian v1.0 by SilverM ***(new!)***
	* Italian v1.1 by Team MODRE
	* Korean v19.09.29 by 아루미 & pjs
	* Brazilian Portuguese v1.0 by EarthBound Brazil
	* European Spanish v0.5.1 by Z3R0 ***(new!)***
* MOTHER 3
	* Chinese v1.0(+fix) by 漫游汉化组
	* Dutch v1.0 by PrismaticAngel ***(new!)***
	* English v1.0-v1.3a by Tomato ***(updated!)***
	* French v1.0-v1.9.1 by MotherVF ***(updated!)***
	* German v1.0-v1.1 by Madokami
	* Italian v1.0-v1.1.1 by Lorenzooone
	* Italian v1.0-v1.2 by Snifit ***(updated!)***
	* Korean v19.03.01 by pjs
	* Polish v1.0-v1.1 by Voxar ***(new!)***
	* Brazilian Portuguese v1.0 by EarthBound Brazil
	* Russian v1.0-v1.06 by ThatOneMeganium ***(new!)***
	* European Spanish v1.0-v1.1 by Jimmytrius and Danionel ***(updated!)***

Thanks to these 31 talented teams and their dedicated work, the MOTHER series is now accessible to people speaking 13 different languages: Catalan, Chinese, Dutch, English, French, German, Italian, Japanese, Korean, Polish, Portuguese, Russian and Spanish.\
Ten of these languages allow their speakers to play the entire MOTHER series from beginnings to end: English, French, German, Italian, Japanese, Korean, Polish, Portuguese, Russian and Spanish.\
Sometimes, this was all thanks to one single team working on several translations: Tomato & co. for English, MotherVF for French, pjs for Korean, Voxar for Polish and EarthBound Brazil for Portuguese. The last three even translated the entire series in their respective languages!

Many thanks and congrats to all the people involved!

## Changelog
* Version 3.3
	* Updated translation: Spanish MOTHER 3 (1.1, 1.1+fix)
	* Added date of last update in credits
	* UI now translated into Korean
* Version 3.2.1
	* Updated translation: Italian MOTHER 3 by Snifit (1.2)
* Version 3.2
	* Added translations: MOTHER 2 in Russian, MOTHER 1+2 in German (new translation), MOTHER 2 in Catalan, MOTHER 1 in Italian
	* Updated translation: English MOTHER 3 (1.3a)
* Version 3.1
	* Added translation: MOTHER 3 in Russian
	* Updated translations: Polish MOTHER 2 (1.1), Polish (1.1) and French (1.9.1) MOTHER 3
	* Added stats page (recaps download counts for all translations)
	* Added a new page to make it easier to add new translations
	* Progress messages also on the right panel
	* Other small UI improvements
* Version 3.0
	* Initial release

## How to translate the UI into more languages
The file is `js/locale.js`. It currently includes eight top-level entries, one for each supported language: `'en'`, `'fr'`, `'it'`, `'nl'`, `'es'`, `'de'`, `'pl'`, `'pt'`. All localized texts are listed there.

To add a new language, just add another entry and name it with a 2-letter language code as specified by [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes). It’s important because the user’s language is selected automatically based on their browser settings.\
Then, you’ll have to specify every localized text in the desired language, just like they are currently listed for already supported languages. If a field is omitted, the program will fallback to English for that field.

To test your changes, you can force the program to load in the language of your choice. To that end, complete the URL in the address bar with `?lang=` followed by your 2-letter language code.

## How to include more translation patches
Translation patches need to be added to the `patches` folder, optionally zipped, and renamed to follow a specific naming convention.\
Then, `js/database.js` has to be updated to add new entries.

To find out about the detailed procedure, please read this document: [How to add more translations to the database](doc_database.md).

## Credits
* Design
	* [JumpmanFR](https://twitter.com/JumpmanFR)
	* [Kody NOKOLO](https://twitter.com/KodyNOKOLO)
* Programming
	* [JumpmanFR](https://twitter.com/JumpmanFR)
	* Patching lib taken from [Marc Robledo](https://twitter.com/marc_robledo)’s [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/)
* UI texts
	* [Kody NOKOLO](https://twitter.com/KodyNOKOLO), [JumpmanFR](https://twitter.com/JumpmanFR) (English)
	* [PrismaticAngel](https://www.romhacking.net/community/6327/) (Dutch)
	* [JumpmanFR](https://twitter.com/JumpmanFR) (French)
	* [GlostU](https://twitter.com/Glost_U), [Madokami](https://twitter.com/_madokami) (German)
	* [Snifit](https://www.romhacking.net/community/3612/), [Benz](https://twitter.com/benzuccio) (Italian)
	* [ShadowOne333](https://twitter.com/ShadowOne333) (Spanish)
	* [Voxar](https://twitter.com/VoxarPL) (Polish)
	* [TragicManner](https://twitter.com/TragicManner), [Foffano](https://twitter.com/Foffano) (Portuguese)
* Graphic elements
	* [Benz](https://twitter.com/benzuccio) (SVG logo)
	* [Sam the Salmon](https://twitter.com/SamThe_Salmon) (animations)
* Legacy Java program
	* [Kody NOKOLO](https://twitter.com/KodyNOKOLO)
	* [Shen Lu](https://twitter.com/otakureborn)
	* [thequickslash](https://twitter.com/thequickslash)
* Player
	* You!
