/* =========================================================================
Audio Book — table of contents
This mirrors the printed index of સમાધિ-સોપાન (Samadhi Sopan), minus
the handful of entries with no recording yet (so nothing in the list
is ever a dead end). 66 entries in total, numbered in reading order.
THIS IS THE FILE TO EDIT when adding or changing recordings.
HOW TO UPLOAD YOUR AUDIO FILES:
Every "audio" path below points inside assets/audio/, using the exact
folder and file names from your "Samadhi Sopan" folder on your Mac.
To connect everything:
1. Rename your "Samadhi Sopan" folder to "audio"
(or just create a folder called "audio" and copy everything
from inside "Samadhi Sopan" into it — the files AND the
sub-folders like "16 Karan", "Dharmadhyan", etc.)
2. Upload that "audio" folder into assets/ on your website,
so you end up with assets/audio/16 Karan/01.wav, and so on.
3. Don't rename any of the files or folders — the paths below
must match exactly, spaces and all.
Titles are given in Gujarati (title_gu) and phonetic English 
transliteration (title_en) so it reads like Gujarati.
========================================================================= */

/* Section headers, shown above their group of entries in the chapter list */
const AUDIOBOOK_SECTIONS = {
  s3: { num: 3, title_gu: "સભ્યક્દર્શન અષ્ટાંગ", title_en: "Samyak Darshan Ashtang", pageRange: "13–38" },
  s4: { num: 4, title_gu: "ધર્મધ્યાન (બાર ભાવના)", title_en: "Dharmadhyan (12 Bhavana)", pageRange: "41–128" },
  s5: { num: 5, title_gu: "સોળ કારણભાવના", title_en: "16 Karanbhavana", pageRange: "131–265" },
  s6: { num: 6, title_gu: "દશ લક્ષણરૂપ ધર્મ", title_en: "Dash Lakshanrup Dharma", pageRange: "261–314" },
  s7: { num: 7, title_gu: "સમાધિ મરણ", title_en: "Samadhi Maran", pageRange: "323–381" },
  s8: { num: 8, title_gu: "સમાધિ-સોપાન", title_en: "Samadhi-Sopan", pageRange: "384" }
};

const AUDIOBOOK_CHAPTERS = [
  /* ---------- 3. Samyak Darshan Ashtang ---------- */
  { id: 1, audio: "assets/audio/SamyakDarshan 8 ang/Samyak Darshan 01.mp3", section: "s3", title_gu: "નિઃશંક્તિ અંગ (૧)", title_en: "Nishkankit Ang (1)", page: 13 },
  { id: 2, audio: "assets/audio/SamyakDarshan 8 ang/Samyak Darshan 02.mp3", section: "s3", title_gu: "નિષ્કાંક્ષિત અંગ (૨)", title_en: "Nishkankshit Ang (2)", page: 19 },
  { id: 3, audio: "assets/audio/SamyakDarshan 8 ang/SamyakDarshan 03.mp3", section: "s3", title_gu: "નિર્વિચિકિત્સા અંગ (૩)", title_en: "Nirvichikitsa Ang (3)", page: 26 },
  { id: 4, audio: "assets/audio/SamyakDarshan 8 ang/Samyak Darshan 04.mp3", section: "s3", title_gu: "અમૂઢદૃષ્ટિ અંગ (૪)", title_en: "Amudhadrushti Ang (4)", page: 27 },
  { id: 5, audio: "assets/audio/SamyakDarshan 8 ang/Samyak Darshan 05.mp3", section: "s3", title_gu: "ઉપગૂહન અંગ (૫)", title_en: "Upaguhan Ang (5)", page: 28 },
  { id: 6, audio: "assets/audio/SamyakDarshan 8 ang/SamyakDarshan 06.mp3", section: "s3", title_gu: "સ્થિતિકરણ અંગ (૬)", title_en: "Sthitikaran Ang (6)", page: 31 },
  { id: 7, audio: "assets/audio/SamyakDarshan 8 ang/SamyankDarshan 07.mp3", section: "s3", title_gu: "વાત્સલ્ય અંગ (૭)", title_en: "Vatsalya Ang (7)", page: 34 },
  { id: 8, audio: "assets/audio/SamyakDarshan 8 ang/SamyakDarshan 08.mp3", section: "s3", title_gu: "પ્રભાવના અંગ (૮)", title_en: "Prabhavana Ang (8)", page: 38 },
  
  /* ---------- 4. Dharmadhyan (12 Bhavana) ---------- */
  { id: 9,  audio: "assets/audio/Dharmadhyan/Samagrah.mp3", section: "s4", title_gu: "ધર્મધ્યાન સમગ્ર", title_en: "Dharmadhyan Samagra", page: 41 },
  { id: 10, audio: "assets/audio/Dharmadhyan/Agna Vichay.mp3", section: "s4", title_gu: "આજ્ઞા વિચય (૧)", title_en: "Aagna Vichay (1)", page: 45 },
  { id: 11, audio: "assets/audio/Dharmadhyan/Apay Vichay.mp3", section: "s4", title_gu: "અપાય વિચય (૨)", title_en: "Apay Vichay (2)", page: 48 },
  { id: 12, audio: "assets/audio/Dharmadhyan/Vipak Vichay.mp3", section: "s4", title_gu: "વિપાક વિચય (૩)", title_en: "Vipak Vichay (3)", page: 51 },
  { id: 13, audio: "assets/audio/Dharmadhyan/Sansthan Vichay.mp3", section: "s4", title_gu: "સંસ્થાન વિચય (૪)", title_en: "Sansthan Vichay (4)", page: 63 },
  { id: 14, audio: "assets/audio/Dharmadhyan/01.mp3", section: "s4", title_gu: "અનિત્ય ભાવના (૧)", title_en: "Anitya Bhavana (1)", page: 65 },
  { id: 15, audio: "assets/audio/Dharmadhyan/02.mp3", section: "s4", title_gu: "અશરણ ભાવના (૨)", title_en: "Asharan Bhavana (2)", page: 74 },
  { id: 16, audio: "assets/audio/Dharmadhyan/03.mp3", section: "s4", title_gu: "સંસાર ભાવના (૩)", title_en: "Sansar Bhavana (3)", page: 79 },
  { id: 17, audio: "assets/audio/Dharmadhyan/04.mp3", section: "s4", title_gu: "એકત્વ ભાવના (૪)", title_en: "Ekatva Bhavana (4)", page: 108 },
  { id: 18, audio: "assets/audio/Dharmadhyan/05.mp3", section: "s4", title_gu: "અન્યત્વ ભાવના (૫)", title_en: "Anyatva Bhavana (5)", page: 111 },
  { id: 19, audio: "assets/audio/Dharmadhyan/06.mp3", section: "s4", title_gu: "અશુચિ ભાવના (૬)", title_en: "Ashuchi Bhavana (6)", page: 115 },
  { id: 20, audio: "assets/audio/Dharmadhyan/07.mp3", section: "s4", title_gu: "આશ્રવ ભાવના (૭)", title_en: "Ashrav Bhavana (7)", page: 119 },
  { id: 21, audio: "assets/audio/Dharmadhyan/08.mp3", section: "s4", title_gu: "સંવર ભાવના (૮)", title_en: "Sanvar Bhavana (8)", page: 122 },
  { id: 22, audio: "assets/audio/Dharmadhyan/09.mp3", section: "s4", title_gu: "નિર્જરા ભાવના (૯)", title_en: "Nirjara Bhavana (9)", page: 123 },
  { id: 23, audio: "assets/audio/Dharmadhyan/10.mp3", section: "s4", title_gu: "લોક ભાવના (૧૦)", title_en: "Lok Bhavana (10)", page: 125 },
  { id: 24, audio: "assets/audio/Dharmadhyan/11.mp3", section: "s4", title_gu: "બોધિદુર્લભભાવના (૧૧)", title_en: "Bodhidurlabh Bhavana (11)", page: 125 },
  { id: 25, audio: "assets/audio/Dharmadhyan/12.mp3", section: "s4", title_gu: "ધર્મદુર્લભભાવના (૧૨)", title_en: "Dharmadurlabh Bhavana (12)", page: 128 },
  
  /* ---------- 5. 16 Karanbhavana ---------- */
  { id: 26, audio: "assets/audio/16 Karan/intro.mp3", section: "s5", title_gu: "સોળ કારણભાવના સમગ્ર", title_en: "16 Karanbhavana Samagra", page: 131 },
  { id: 27, audio: "assets/audio/16 Karan/01.mp3", section: "s5", title_gu: "દર્શનવિશુદ્ધિ ભાવના (૧)", title_en: "Darshanvishuddhi Bhavana (1)", page: 139 },
  { id: 28, audio: "assets/audio/16 Karan/02.mp3", section: "s5", title_gu: "વિનયસંપન્નતાભાવના (૨)", title_en: "Vinaysampannata Bhavana (2)", page: 168 },
  { id: 29, audio: "assets/audio/16 Karan/03.mp3", section: "s5", title_gu: "શીલવ્રતેષ્વનતિચાર ભાવના (૩)", title_en: "Shilavrateshvanatichar Bhavana (3)", page: 175 },
  { id: 30, audio: "assets/audio/16 Karan/04.mp3", section: "s5", title_gu: "અભીક્ષ્ણ જ્ઞાનોપયોગ ભાવના (૪)", title_en: "Abhikshna Gnanopayog Bhavana (4)", page: 180 },
  { id: 31, audio: "assets/audio/16 Karan/05.mp3", section: "s5", title_gu: "સંવેગ ભાવના (૫)", title_en: "Sanveg Bhavana (5)", page: 183 },
  { id: 32, audio: "assets/audio/16 Karan/06.mp3", section: "s5", title_gu: "શક્તિતઃ ત્યાગ ભાવના (૬)", title_en: "Shaktitah Tyag Bhavana (6)", page: 188 },
  { id: 33, audio: "assets/audio/16 Karan/07.mp3", section: "s5", title_gu: "શક્તિતઃ તપ ભાવના (૭)", title_en: "Shaktitah Tap Bhavana (7)", page: 192 },
  { id: 34, audio: "assets/audio/16 Karan/08.mp3", section: "s5", title_gu: "સાધુસમાધિ ભાવના (૮)", title_en: "Sadhusamadhi Bhavana (8)", page: 195 },
  { id: 35, audio: "assets/audio/16 Karan/09.mp3", section: "s5", title_gu: "વૈયાવૃત્તિ ભાવના (૯)", title_en: "Vaiyavrutti Bhavana (9)", page: 201 },
  { id: 36, audio: "assets/audio/16 Karan/10.mp3", section: "s5", title_gu: "અરિહંત ભક્તિ ભાવના (૧૦)", title_en: "Arihant Bhakti Bhavana (10)", page: 205 },
  { id: 37, audio: "assets/audio/16 Karan/11.mp3", section: "s5", title_gu: "આચાર્ય ભક્તિ ભાવના (૧૧)", title_en: "Acharya Bhakti Bhavana (11)", page: 214 },
  { id: 38, audio: "assets/audio/16 Karan/12.mp3", section: "s5", title_gu: "બહુશ્રુત ભક્તિ ભાવના (૧૨)", title_en: "Bahushrut Bhakti Bhavana (12)", page: 226 },
  { id: 39, audio: "assets/audio/16 Karan/13.mp3", section: "s5", title_gu: "પ્રવચન ભક્તિ ભાવના (૧૩)", title_en: "Pravachan Bhakti Bhavana (13)", page: 235 },
  { id: 40, audio: "assets/audio/16 Karan/14.mp3", section: "s5", title_gu: "આવશ્યક અપરિહાણિ ભાવના (૧૪)", title_en: "Avashyak Aparihani Bhavana (14)", page: 243 },
  { id: 41, audio: "assets/audio/16 Karan/15.mp3", section: "s5", title_gu: "સન્માર્ગ પ્રભાવના ભાવના (૧૫)", title_en: "Sanmarg Prabhavana Bhavana (15)", page: 251 },
  { id: 42, audio: "assets/audio/16 Karan/16.mp3", section: "s5", title_gu: "પ્રવચન વાત્સલ્ય ભાવના (૧૬)", title_en: "Pravachan Vatsalya Bhavana (16)", page: 265 },
  
  /* ---------- 6. Dash Lakshanrup Dharma ---------- */
  { id: 43, audio: "assets/audio/Das Lakshan/intro.mp3", section: "s6", title_gu: "દશ લક્ષણરૂપ ધર્મ પ્રસ્તાવના", title_en: "Dash Lakshanrup Dharma Prastavna", page: 261 },
  { id: 44, audio: "assets/audio/Das Lakshan/01.mp3", section: "s6", title_gu: "ઉત્તમ ક્ષમા", title_en: "Uttam Kshama", page: 262 },
  { id: 45, audio: "assets/audio/Das Lakshan/02.mp3", section: "s6", title_gu: "ઉત્તમ માર્દવ", title_en: "Uttam Mardav", page: 274 },
  { id: 46, audio: "assets/audio/Das Lakshan/03.mp3", section: "s6", title_gu: "ઉત્તમ આર્જવ", title_en: "Uttam Aarjav", page: 278 },
  { id: 47, audio: "assets/audio/Das Lakshan/04.mp3", section: "s6", title_gu: "ઉત્તમ સત્ય", title_en: "Uttam Satya", page: 280 },
  { id: 48, audio: "assets/audio/Das Lakshan/05.mp3", section: "s6", title_gu: "ઉત્તમ શૌચ", title_en: "Uttam Shauch", page: 289 },
  { id: 49, audio: "assets/audio/Das Lakshan/06.mp3", section: "s6", title_gu: "ઉત્તમ સંયમ", title_en: "Uttam Sanyam", page: 292 },
  { id: 50, audio: "assets/audio/Das Lakshan/07.mp3", section: "s6", title_gu: "ઉત્તમ તપ", title_en: "Uttam Tap", page: 296 },
  { id: 51, audio: "assets/audio/Das Lakshan/08.mp3", section: "s6", title_gu: "ઉત્તમ ત્યાગ", title_en: "Uttam Tyag", page: 301 },
  { id: 52, audio: "assets/audio/Das Lakshan/09.mp3", section: "s6", title_gu: "ઉત્તમ આકિંચન્ય", title_en: "Uttam Akinchanya", page: 306 },
  { id: 53, audio: "assets/audio/Das Lakshan/10.mp3", section: "s6", title_gu: "ઉત્તમ બ્રહ્મચર્ય", title_en: "Uttam Brahmacharya", page: 310 },
  { id: 54, audio: "assets/audio/Das Lakshan/upsanhar.mp3", section: "s6", title_gu: "ઉપસંહાર", title_en: "Upsanhar", page: 314 },
  
  /* ---------- 7. Samadhi Maran ---------- */
  { id: 55, audio: "assets/audio/Samadhi Maran/Samadhi Maran Intro.mp3", section: "s7", title_gu: "સમાધિ મરણ પ્રસ્તાવના", title_en: "Samadhi Maran Prastavna", page: 323 },
  { id: 56, audio: "assets/audio/Samadhi Maran/Maran Samadhi - Sallekhna No Avasar.mp3", section: "s7", title_gu: "સલ્લેખનાનો અવસર", title_en: "Sallekhana No Avasar", page: 324 },
  { id: 57, audio: "assets/audio/Samadhi Maran/Maran Samadhi - Samadhimaran Mahima .mp3", section: "s7", title_gu: "સમાધિમરણનો મહિમા", title_en: "Samadhimaran No Mahima", page: 325 },
  { id: 58, audio: "assets/audio/Samadhi Maran/Maran Samadhi - Sanyasmaran ni Sharuat.mp3", section: "s7", title_gu: "સંન્યાસસમરણની શરૂઆત", title_en: "Sanyas Smaran Ni Sharuat", page: 327 },
  { id: 59, audio: "assets/audio/Samadhi Maran/samadi marach ichhake karva yogya.mp3", section: "s7", title_gu: "સમાધિમરણના ઇચ્છકે કરવા યોગ્ય", title_en: "Samadhimaran Na Ichhake Karva Yogya", page: 330 },
  { id: 60, audio: "assets/audio/Samadhi Maran/18 MRITYU MAHOTSAV.mp3", section: "s7", title_gu: "મૃત્યુ-મહોત્સવ", title_en: "Mrityu-Mahotsav", page: 333 },
  { id: 61, audio: "assets/audio/Samadhi Maran/Sallekhna na prakar.mp3", section: "s7", title_gu: "સલ્લેખનાના પ્રકાર", title_en: "Sallekhana Na Prakar", page: 349 },
  { id: 62, audio: "assets/audio/Samadhi Maran/Kaaysallekhna.mp3", section: "s7", title_gu: "કાય સલ્લેખના", title_en: "Kay Sallekhana", page: 350 },
  { id: 63, audio: "assets/audio/Samadhi Maran/Kasay Sallekhna.mp3", section: "s7", title_gu: "કષાય સલ્લેખના", title_en: "Kashay Sallekhana", page: 353 },
  { id: 64, audio: "assets/audio/Samadhi Maran/Sahay Updeshahi.mp3", section: "s7", title_gu: "સલ્લેખના-સહાય-ઉપદેશાદિ", title_en: "Sallekhana-Sahay-Updeshadi", page: 354 },
  { id: 65, audio: "assets/audio/Samadhi Maran/Panch Atichar.mp3", section: "s7", title_gu: "સલ્લેખનાના પાંચ અતિચાર", title_en: "Sallekhana Na Pach Atichar", page: 381 },
  
  /* ---------- 8. Samadhi-Sopan ---------- */
  { id: 66, audio: "assets/audio/Samadhi - Antmangal.mp3", section: "s8", title_gu: "અંતમંગલ", title_en: "Antmangal", page: 384 }
];

/* Every chapter above has an explicit audio path (matching your real
files), so this just fills in a matching transcript path for each —
e.g. assets/text/chapter-01.txt for chapter 1. Add .txt files there
as you're ready; any chapter without one just shows "Transcript
coming soon" and nothing breaks. */
AUDIOBOOK_CHAPTERS.forEach(function (ch) {
  var num = String(ch.id).padStart(2, '0');
  if (!ch.text) ch.text = "assets/text/chapter-" + num + ".txt";
});