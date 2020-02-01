#!/bin/sh
ng build --prod
rm -rf ./dist/firebase/public
cp -r ./dist/MUNITimetablePlanner ./dist/firebase/public
cd ./dist/firebase/public
firebase deploy
