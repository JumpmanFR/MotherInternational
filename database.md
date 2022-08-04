# HOW TO ADD MORE TRANSLATIONS TO THE DATABASE
## GENERAL PROCEDURE
### NEW PROJECT OR NEW VERSION
There are two possibilites when you want to add a new patch into Mother International: either you want to include a new version of an existing translation project already supported by the program, or you want to include an all-new translation that has never been included into Mother International.

In the former case, you’ll just have to create a new Version, by specifying a new patchId and adding a new entry in the Versions Table.\
In the latter case, however, you’ll have to create a new Project first, with a new projectId and a new entry in the Projects Table, and then, you’ll **also** create a new Version as stated before.\

In both cases though, you’ll need to know what your projectId and patchId are, before editing both tables. So please read the following sections to learn how to put them together.

#### projectId
Let’s start with the projectId. It starts with a *gameId* which can be `m1`, `m2`, `m12` or `m3` depending on the relevant game, respectively MOTHER 1 (EarthBound Beginnings), MOTHER 2 (EarthBound), MOTHER 1+2 or MOTHER 3. Then, it’s followed by a dash. Next is the language code for the relevant language, which is a 2-letter code as specified by [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes). Finally, an upper-case letter can be added to distinguish multiple translation projects for the same game in the same language, when necessary.\
You’ll notice the official, untranslated games also have a projectId and patchId!

Examples:
* `m3-ja` means MOTHER 3 in Japanese
* `m12-pl` means MOTHER 1+2 in Polish
* `m2-esA` and `m2-esB` are two Spanish translations for EarthBound made by two different teams

#### patchId
For the patchId, simply append an abbreviated form of the version number to the projectId.

Examples:
* `m3-fr19` means MOTHER 3 in French version 1.9
* `m2-esA33b` means MOTHER 2 in Spanish, ShadowOne333’s translation (which is project `A`), version 3.3.3 January 2018 build (here called `b`)

### ADDING THE PATCH FILE
At this point, you should now the projectId and the patchId of your new translation. You’ll need them throughout this process.

First, you’ll need to add your patch file to the server. Translation patches need to be added to the `patches` folder, optionally zipped, and renamed to match your patchId. For example, if the patchId is `m3-vi10` (MOTHER 3 in Vietnamese, why not!), your patch file should be named `m3-vi10.zip`, `m3-vi10.ups`, `m3-vi10.ips` or something similar. To take advantage of the full features of Mother International, it’s much better if your patch file is in the UPS format (zipped or not).

The translation you’re adding probably includes a readme file. If so, please put it in the `patches` folder as well. Its name should match the patchId as well, followed by `.txt`.

Don’t include any translated ROM! But if you have used the patch before, please take note of [CRC-32](https://emn178.github.io/online-tools/crc32_checksum.html) checksum of your translated ROM. You’ll need it later.

Once you’re done putting the patch and readme files into the server, it’s time to update the database.

## DATABASE TABLES
Please open `js/database.js`. You’ll find two big tables there. One is the Projects Table, called `PATCH_PROJECTS`, and the other one is the Versions Table, called `PATCH_VERSIONS`.

You’ll have to add an entry to both of them if you’re adding an entirely new translation.\
On the other hand, if you’re adding a new version of an existing translation that Mother International already knows, then an entry already exists in the Project Table for this translation. Just edit the `latest` field (see below) in this entry to change the latest version, and then, head to the next section for the Versions Table.

### PROJECTS TABLE
This table is an array of objects. To add a new translation project, just add a new entry in the table and fill in the fields as specified below.\
All fields are strings unless otherwise stated.

#### projectId *(mandatory)*
You already know this one. If not, please read the first section. Then please fill in this field with the projectId for the new translation.\
Please note the original games and official translations also need to have a projectId, so that the program can identify these ROMs as well.

#### game *(mandatory)*
The gameId for the relevant game: `m1`, `m2`, `m3` or `m12`. They’ve been stored in JavaScript constants so you may want to use those identifiers instead: ID_MOTHER_1, ID_MOTHER_2, ID_MOTHER_3 and ID_MOTHER_1_2.

#### lang *(mandatory)*
Represents the language the game has been translated to. Should be written as a 2-letter language code, followed by a dash and by a 2-letter country code (`pt-BR` for Brazilian Portuguese). The language code should be as specified by [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) because the program checks the user’s browser settings to automatically suggest them the corresponding translation. The country part should be as specified by [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1), it’s not always mandatory (especially when it’s the same as the language code) but it allows the UI to display a flag in front of the corresponding language, so you may need to put it to make sure the right flag is displayed (the GB one for English, for example). Many language+country code pairings are already stored as constants (LANG_JAPANESE, LANG_ENGLISH, LANG_FRENCH, etc.) so it’s better to use these identifiers. Please refer to js/consts.js. If the language you’re looking for is not listed there, please refer to [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and [ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) to specify the right constant value and add it to consts.js.

#### latest *(strongly recommended)*
The version name or number (as a string) used by the translation team for the most recent version you’re including to Mother International. Can be any type of version number, like "1.0.2", "1.3+fix", or even the release date. Of course, you’ll have to respect the naming used by the translation team. If there’s only one version of this patch, you may omit to fill in this field, but it may lead to issues when a new version of this translation is released and added to Mother International. Also, please note the version number you put here allows the program to know which version to show first, so it also needs to be present for the relevant version in the Versions Table. Please make sure you wrote the exact same value in both tables.\
Optionally, this field may also be an array of strings, if you think two or more versions are worth appearing in the UI by default. In that case, the real latest version must be the first item in the array.

#### author *(mandatory\*)*
The name of the translation team, or alternatively, the project leader. Apart from the names themselves, please avoid putting English words in this field: the UI of Mother International is localized. Maybe just put a "&" for "and", or use the language of the associated translation. For the original games, we just specify that the author is "Nintendo".\
*\* In the Versions Table, there is also an author field that’s intended to override this one in the main UI if both of them are filled in. You have to fill in at least one of these two.*

#### website *(optional)*
The website URL for this translation project; the one that showcases it the best. Can be a page on romhacking.net or a forum post if nothing else was found. Must be entered as a full, absolute URL. If not filled in, the program will check the website field in the Versions Table as well.

#### extraNote *(optional)*
A short note you may want to add in case this translation is unconventional and has something specific about it. It may have a special flair to it, or be created with a specific intention. Or, it may be incomplete. But this field here has to apply to all versions of the translation. So in most cases, it may be preferable to fill in the corresponding field in the Versions Table instead.\
Ideally, this field should be written in the same language as the corresponding translation, because the UI of Mother International is localized as well and we can’t afford to add an extra note for every possible language.

#### isOfficial *(optional)*
A boolean field to indicate this is an official game. Like the English version of the first two games, or all the Japanese games. Treated as false if omitted.


### VERSIONS TABLE
All supported versions of the games need to be listed here, which means, all the translations, but also the original, unpatched games. Of course we’re not putting the ROM files on the site, but they must be "known" by the system, and the corresponding patches still need to be available on the server.\
Please don’t remove the old versions that appear in this table. The program will only suggest the most recent ones by default, but it needs to be able to identify and update/translate an old ROM if the user inputs it. That’s the other purpose of this table.

#### crc *(mandatory)*
The [CRC-32](https://emn178.github.io/online-tools/crc32_checksum.html) checksum for the translated/associated ROM (not the patch!). The program needs this field to identify the ROM in case it has been input by the user, and, in the other way around, to check the ROM integrity after the patching process. So, please be sure you wrote it right. You’ll have to write it as a hexadecimal string that starts with "0x" (that’s a zero!).

#### projectId *(mandatory)*
You already know this one. If not, please read the first section.\
Here, you’ll enter the projectId for the project this patch is associated to. This projectId also needs to be present in the Projects Table.\
This field allows the program to link the translation project and the associated versions together.

#### patchId *(mandatory)*
You should know this one as well, please refer to the first section. As already stated, the patchId should match the name of the included patch file and readme file.

#### patchExt *(mandatory\*)*
The extension to the patch file. It allows the program to fetch the right patch file, by appending this extension to the patchId. The dot must be included. The program supports multiple patch formats and also zip files, but the patch format is automatically detected and it doesn’t rely on the extension to identify it.\
*\* You don’t need to specify a patchExt field for the original, unpatched game because obviously there is no corresponding patch file on the server. But please consider that in our current database, the Japanese versions of MOTHER 1 and MOTHER 2 are treated technically as patched versions of the English games, because it allows the user to input any ROM, either English or Japanese (or other), and apply any patch to it. So don’t be surprised the Japanese versions still have a "patchExt".*

#### baseRom *(mandatory\*)*
The ROM for which the patch file is made. Patch files are intended to work with a specific ROM, that’s the one. But you won’t write any filename here. Instead, just specify the patchId that corresponds to that original, untranslated ROM, in this same table.\
*\* Of course, if you didn’t specify a patchExt, you won’t have to specify a baseRom either; please see above.*

#### isOneWayOnly *(mandatory\*)*
This program takes advantage of a special feature the UPS format has: the ability to apply patches in reverse, or, in other words, to "unpatch". That’s what allows the user to input just any ROM, already translated or not, that the program will then unpatch and re-patch into another language. If the patch file you’re including is not an UPS patch (and, as far as I know, only UPS patches can do that), then you’ll have to specify your patch is incompatible with the "unpatch" feature by setting this boolean field to true. Otherwise, you can set it to false.\
*\* Treated as false if omitted, so it’s not exactly mandatory but just make sure it’s false!*

#### hasDoc *(optional)*
This time, it must be a boolean, and the field will be interpreted as false if omitted. It specifies if this version of the translation includes a readme file. If included, the readme file must be a text file with the ".txt" extension, and it must be present in the "patches" folder. Its name must match the "patchId" field.

#### version *(strongly recommended)*
The version of the patch made by the translation team. Yeah, as a translator you can’t always get it perfectly right on the first try, so this table includes all versions and patches as opposed to the Projects Table which lists the translation projects in general. The version field can be any string, but generally follows a 1.2 / 1.2.3 format.\
You may omit this field if a translation only has one version, but I’d suggest just giving it a good old "1.0" number for future-proofness.

#### author *(optional\*)*
It happens that the author is different between two versions of a translation. That’s the purpose of this field. It overrides the author field in the Projects Table when this specific version is shown in the UI, and it acts as a fallback in other cases. Please refer to the indications about English and how to fill in the auhtor field in the Projects Table section above.\
*\* In case you didn’t specify an author for the project, you must specify an author here in the version table.*

#### website *(optional)*
In case there is a specific website for this version of the translation, that’s where you’ll put the URL. Also acts as a fallback for the project website if that one is omitted. Must be entered as a full, absolute URL.

#### extraNote *(optional)*
A short note you may want to add for this version of the translation, in case there is something special to know about it. Typically, that’s where you can indicate that a MOTHER 1+2 translation only includes the MOTHER 1 part. If you specified a website for this version, just above, then the extraNote will act as the text for the link in the UI.\
Ideally, this field should be in the same language as the corresponding translation, because the UI of Mother International is localized as well and we can’t afford to add an extra note for every possible language.

#### isSpecialHidden *(optional)*
Covers a very specific case. We included the support for ROMs that we wanted the program to recognize without displaying them in the list. That way, the user can use these ROMs as an input in order to patch them. For example, there are at least two known ROMs for the the EarthBound game: with headers, and without headers. The system has to support both of them. So for one of these two, this boolean field is set to true in order to hide it, just like older versions of translations but without the UI suggesting to update it.
