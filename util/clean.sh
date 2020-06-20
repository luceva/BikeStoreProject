#/bin/sh

#
# clear out compiled static files
#

echo "Clearing compiled files..."

find ./static/ \( -name "*.js" -o -name "*.css" \) -exec rm {} \; -print


