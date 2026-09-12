SRSMD website update — what's in this zip
==========================================

WHAT'S INCLUDED
===============

  index.html   <- your original homepage, byte-for-byte the same, with
                  exactly ONE new line added: an "Audio Book" link in
                  the navigation menu. Nothing else was touched.

  krupaludevs-jeevancharitra.html   <- your original file, completely
  prabhushreejis-bodh.html            untouched, included here again
                                       since you needed a fresh copy.

  audiobook/   <- a completely separate, self-contained folder holding
                  the new Audio Book page and everything it needs
                  (its own CSS, JavaScript, and a spot for your audio
                  files). It does not share or touch any files from
                  your existing site.


HOW TO DEPLOY
=============

1. Unzip this file:
     unzip srsmd-update.zip

2. Upload the two things inside to your website's root folder
   (wherever your current index.html and "assets" folder already
   live), using whatever method you normally use — FTP, cPanel file
   manager, or a terminal command if you have direct server access:

     - Replace your current index.html with the one in this zip.
     - Upload krupaludevs-jeevancharitra.html and prabhushreejis-bodh.html
       the same way if you need fresh copies of those.
     - Upload the whole "audiobook" folder as a new folder alongside it.

   If you have terminal/SSH access to your server, it's just:
     scp -r index.html krupaludevs-jeevancharitra.html prabhushreejis-bodh.html audiobook you@yourserver:/path/to/your/website/

   (Replace "you@yourserver:/path/to/your/website/" with your actual
   server login and path — ask your host if you're not sure.)

3. Add your audio: after you run convert-to-mp3.sh (separate script,
   already shared with you) on your Mac, you'll get a folder called
   "Samadhi Sopan MP3". Copy everything INSIDE that folder into:

     audiobook/assets/audio/

   (There's a placeholder text file in that folder on your server —
   delete it once your real audio is in place.)

That's it — nothing else needs to change. Your homepage, the CD list,
Bhakti, Gallery, everything stays exactly as it was, with one new
"Audio Book" link that takes people to the new standalone page. The
Audio Book page can also be shared on its own, e.g.:

     https://yourdomain.com/audiobook/
