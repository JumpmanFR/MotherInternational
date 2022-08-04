# MOTHER INTERNATIONAL
A proposition for a Web version of Mother International, the MOTHER-series focused multipatcher program from Mother Forever.

Although this new version is hosted on a webpage, it does everything client-side, like unzipping and patching, so no ROM needs to be transfered from and to the server.

It’s been developped by JumpmanFR under the supervision of Kody NOKOLO from Mother Forever. The source code is available here under the [MIT license](https://opensource.org/licenses/MIT).\
The patching mechanism relies on a modified version of Marc Robledo’s [Rom Patcher JS](https://github.com/marcrobledo/RomPatcher.js/).

## FEATURES

### ALREADY KNOWN FEATURES FROM PREVIOUS VERSIONS
* Can patch any game in the MOTHER series into many languages (22 translation patches included previously in version 2.1).
* Features a nice and user-friendly interface consistent with Mother Forever’s visual identity.
* Features cute animations.
* *(for operators)* Supports UPS and IPS patch formats.

### NEW FEATURES
* Includes 31 translation projects, or 63 translation patches if you count all included patch versions.
* Can *unpatch* ROMs and apply multiple patches successively, allowing to translate a game for any language to any other (no need to input the base Japanese ROM specifically).
* Based on the same principle, can update your ROM if you’re using an older version of the same translation.
* Supports special additional patches designed to be applied over existing translations (like better sound and such); the program automatically finds a route from your current ROM to the translation and special features you want.
* Automatically invites you to translate into your language based on your Web browser settings, or to update your current ROM into a more recent translation from the same team.
* Supports zipped ROMs.
* Supports translation teams better by including links to their websites and readme files.
* Compatible and suited for mobile devices, thanks to a responsive UI.
* *(for operators)* Also supports BPS and VCDIFF/xdelta patch formats, in addition to UPS and IPS. That said, only the UPS format can *unpatch* ROMS, allowing the first three new features listed above. For now, all included patches have been converted to UPS so everything’s fine. But for future patches, you’ll probably want to import them as UPS patches all well. Otherwise, the program will fallback to more limited features whenever.
* *(for operators)* Features a localizable UI, currently in English and French. Other languages can be easily added; supports right-to-left writing.

### OTHER SPECIFICITIES IN THIS VERSION
* Hosted on a webpage, so that people don’t have to download a full executable package that includes all the translations for a minimal use.
* Does everything (unzipping, patching) client-side, just downloads the patch and applies it. That way, no ROM has to be transfered from and to the server.
* *(for operators)* Scalable, can support more and more translations over time by simply adding a patch file and 1 or 2 lines in the database.
* Open source project available [on GitHub](https://github.com/JumpmanFR/MotherInternational).

## HOW TO INCLUDE MORE TRANSLATION PATCHES
Translation patches need to be added to the `patches` folder, optionally zipped, and renamed to follow a specific naming convention.\
Then, `js/database.js` has to be updated to add new entries.

Please refer to [database.md](database.md) to find out about the detailed procedure.

## HOW TO TRANSLATE THE UI INTO MORE LANGUAGES
The file is `js/locale.js`. It currently includes two main entries, `'en'` for English and `'fr'` for French. All localized texts are listed there, for every supported language.

To add a new language, just add another entry and name it with a 2-letter language code as specified by [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes). It’s important because the user’s language is used automatically based on their browser settings.\
Then, you’ll have to specify every localized text in the desired language, just like they are currently listed for English and French. If a field is omitted, the program will fallback to English for this field.

To test your new translation, you can force the program to load in the language of your choice. To that end, complete the URL in the address bar with `?lang=` followed by your 2-letter language code.

## CREDITS
* Design
	* [Kody NOKOLO](https://twitter.com/KodyNOKOLO)
	* [JumpmanFR](https://twitter.com/JumpmanFR)
* Programming
	* [JumpmanFR](https://twitter.com/JumpmanFR)
	* Patching lib taken from [Marc Robledo](https://twitter.com/marc_robledo)’s [Rom Patcher JS](https://www.marcrobledo.com/RomPatcher.js/)
* Animations
	* [Sam the Salmon](https://twitter.com/Sam_the_SaImon)
* Legacy Java program
	* [Kody NOKOLO](https://twitter.com/KodyNOKOLO)
	* [OtakuReborn](https://twitter.com/otakureborn)
	* [thequickslash](https://twitter.com/thequickslash)
* Player
	* You!
