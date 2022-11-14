#!/bin/bash
rm -rf server/public
rm -rf server/views
mkdir -p server/public
mkdir -p server/views
cp polish-test/index.html server/views/index.html
cp -r polish-test/* server/public/
rm server/public/index.html
rm -f server/views/index.ejs
oldstr1='Polish-2nd'
newstr1='<%=title%>'
oldstr2='meta name="description" content=""' 
newstr2='meta name="description" content="\<%=description%>"'
oldstr3='meta property="og:title" content=""' 
newstr3='meta property="og:title" content="\<%=title%>"'
oldstr4='meta property="og:description" content=""' 
newstr4='meta property="og:description" content="\<%=description%>"'
oldstr5='meta property="og:image" content=""' 
newstr5='meta property="og:image" content="\<%=image%>"'
oldstr6='meta property="og:type" content=""' 
newstr6='meta property="og:type" content="\<%=type%>"'
oldstr7='meta property="og:url" content=""' 
newstr7='meta property="og:url" content="\<%=url%>"'
sed -e "s/$oldstr1/$newstr1/g" -e "s/$oldstr2/$newstr2/g" -e "s/$oldstr3/$newstr3/g" -e "s/$oldstr4/$newstr4/g" -e "s/$oldstr5/$newstr5/g" -e "s/$oldstr6/$newstr6/g" -e "s/$oldstr7/$newstr7/g" server/views/index.html > server/views/index.ejs
rm -f server/views/index.html