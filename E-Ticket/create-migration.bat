@echo off

set migrationName=%1

typeorm migration:create -n %migrationName% --dir src/database/Migrations
