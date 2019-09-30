#!/bin/bash

echo "============================="
echo "Mapshoter auto deploying tool"
echo "deploy to all accounts? y/n"
echo "============================="

read runMode


# Iterate for all accounts list
IFS=$'\n'
for line in $(cat "deployingBase.sh")
	do	
	i=0

	# Load data for current account
	IFS=:
	for rowValue in $line
		do

		case $i in
	     	0)      
	          	serverName=$rowValue
	          	;;
	     	*)
				login=$rowValue
	          	;;
		esac

		((i++))
	done


	
	# Alert to manual sing in
	afplay /System/Library/Sounds/Sosumi.aiff
	/usr/bin/open -a "/Applications/Google Chrome.app" 'https://dashboard.heroku.com/apps'

	echo; echo
	echo "=========================="
	echo "$login" | pbcopy
	echo "$login"
	echo "Login copied to clipboard"
	echo "Sing in with the browser to this Heroku account and press Enter"
	echo "=========================="
	read justEnter


	# Heroku deploying 
	echo "$serverName"
	yes y | heroku login
	heroku container:login
	heroku git:remote -a "$serverName"
	heroku container:push web
	heroku container:release web
	echo "done"

	# For OneAccountDeploying finish here
	if [ "$runMode" = 'n' ] 
		then
        	break
		fi 
done



echo; echo
echo "================================="
echo "Mapshoter auto deploying is DONE!"
echo "================================="
afplay /System/Library/Sounds/Purr.aiff
afplay /System/Library/Sounds/Purr.aiff
afplay /System/Library/Sounds/Purr.aiff
