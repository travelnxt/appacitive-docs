node scripts/buildScripts/web.js 

return_code=$?

if [ "$return_code" -gt "0" ]; then
	echo "Error generating static html";
	exit 1;
fi
