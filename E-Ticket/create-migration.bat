@REM This file is possible to create migration files in a specific directory only on Windows operating systems
@echo off

set migrationName=%1

typeorm migration:create -n %migrationName% --dir src/database/Migrations
