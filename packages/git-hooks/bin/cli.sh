#!/usr/bin/env sh

argCount=$#
allArgs=$@
packageDir=`npm explore @pretty-cozy/git-hooks -- pwd`
projectDir=`pwd`

argNotAvailable() {
  printf "Error: $1 is not available\n"
}

printHelp() {
  printf "\n"
  printf "Usage:\n"
  printf "  cozy-git-hooks install\n"
}

copyCommitlintConfig() {
  local configName=".commitlintrc"
  local configSrc="$packageDir/$configName"
  local configDest="$projectDir/$configName"

  cp -n $configSrc $configDest
}

installHusky() {
  local hooksDir=`realpath $packageDir/../hooks`
  npx husky install $hooksDir
}

installGitHooks() {
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
  local help=false
  local install=false

  if [ $argCount = 0 ]
  then
    help=true
  fi

  for arg in $allArgs
  do
    case $arg in
      install) install=true ;;

      "") help=true ;;
      -h | --help | help) help=true ;;

      # TODO: -f, --force

      *) 
        argNotAvailable $arg
        help=true
        ;;
    esac
  done

  if [ $help = true ]
  then
    printHelp
    exit 0
  fi

  if [ $install = true ]
  then
    installGitHooks
    exit 0
  fi
}

run
