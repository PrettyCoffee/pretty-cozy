#!/usr/bin/env sh

arg1=$1
packageDir=`npm explore @pretty-cozy/git-hooks -- pwd`
projectDir=`pwd`

notAvailable() {
  printf "Error: $1 is not available\n"
  printf "\n"
}

printHelp() {
  printf "Usage:\n"
  printf "  cozy-git-hooks install\n"
}

copyCommitlintConfig() {
  local configName=".commitlintrc"
  local configSrc="$packageDir/$configName"
  local configDest="$projectDir/$configName"
  
  cp $configSrc $configDest
}

installHusky() {
  local hooksDir=`realpath $packageDir/../hooks`
  npx husky install $hooksDir
}

install() {
  local success=true

  if [ copyCommitlintConfig ]
  then
    printf "✅ Copied .commitlintrc\n"
  else
    printf "❌ Failed to copy .commitlintrc\n"
    success=false
  fi

  if [ installHusky ]
  then
    printf "✅ Installed git hooks\n"
  else
    printf "❌ Failed to install git hooks\n"
    success=false
  fi

  if [ $success = true ]
  then
    printf "✅ Successfully installed comfy-git-hooks\n"
  else 
    printf "⚠️ Something went wrong when installing cozy-git-hooks\n"
  fi
}

run() {
  case $arg1 in
    install) install ;;

    "") printHelp;;
    -h,--help,help) printHelp;;

    # TODO: -f, --force

    *) 
      notAvailable $arg1
      printHelp
      ;;
  esac
}

run
