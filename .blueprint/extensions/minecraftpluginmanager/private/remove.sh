#!/bin/bash

PTERODACTYL_DIRECTORY="/var/www/pterodactyl"
DATA_DIRECTORY="/var/www/pterodactyl/.blueprint/extensions/minecraftpluginmanager/private"

echo "Pterodactyl Directory is $PTERODACTYL_DIRECTORY"
echo "Extension Data Directory is $DATA_DIRECTORY"

# Delete added files
rm -rf "$PTERODACTYL_DIRECTORY/app/Services/MinecraftPlugins"

# It is not necessary to clear route cache because Blueprint does it automatically
# after this removal script has been executed.
