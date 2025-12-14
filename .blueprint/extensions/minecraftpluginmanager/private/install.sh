#!/bin/bash

PTERODACTYL_DIRECTORY="/var/www/pterodactyl"
DATA_DIRECTORY="/var/www/pterodactyl/.blueprint/extensions/minecraftpluginmanager/private"

echo "Pterodactyl Directory is $PTERODACTYL_DIRECTORY"
echo "Extension Data Directory is $DATA_DIRECTORY"

# Remove old version controller if exists
rm -f "$PTERODACTYL_DIRECTORY/app/Http/Controllers/Api/Client/Servers/MinecraftPluginController.php"

# Copy new files
mkdir -p "$PTERODACTYL_DIRECTORY/app/Services/MinecraftPlugins"
/bin/cp -f "$DATA_DIRECTORY/"*PluginService.php "$PTERODACTYL_DIRECTORY/app/Services/MinecraftPlugins"
/bin/cp -f "$DATA_DIRECTORY/MinecraftPluginProvider.php" "$PTERODACTYL_DIRECTORY/app/Services/MinecraftPlugins"

# Remove old modifications if they are there from `api-client` route file
ROUTE_FILE="$PTERODACTYL_DIRECTORY/routes/api-client.php"
INPUT=$(grep -v "MINECRAFTPLUGINMANAGER" "$ROUTE_FILE")
echo "$INPUT" > "$ROUTE_FILE"

# Clear route cache
# This is needed because currently Blueprint
# clears cache *before* running scripts.
php artisan route:clear
