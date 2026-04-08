@echo off
echo Backing up project to GitHub...
git add .
git commit -m "Auto backup %date% %time%"
git push
echo Backup complete.
pause
