#!/bin/bash

if test $# -eq 0; then
  echo; echo Usage: basename $0 PROJECT_NAME; echo
  exit 1
fi

PROJECT_NAME=$1

mvn archetype:generate  -DarchetypeArtifactId=android-quickstart  -DarchetypeGroupId=de.akquinet.android.archetypes  -DarchetypeVersion=1.0.11  -DarchetypeRepository=~/.m2/repository  -DgroupId=com.marcellomessori  -DartifactId=$PROJECT_NAME  -Dplatform=19  -Dandroid-plugin-version=3.8.2  -Dversion=1.0  -DinteractiveMode=false

sed -i 's/<platform.version>/<platform.version>4.1.1.4/' $PROJECT_NAME/pom.xml
