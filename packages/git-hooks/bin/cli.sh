#!/usr/bin/env sh

argCount=$#
allArgs=$@
packageDir=`npm explore @pretty-cozy/git-hooks -- pwd`
projectDir=`pwd`

fileExists() {
  local path=$1
  
  test -f $path
  if [ $? = 0 ]
  then
    return 0
  fi
  return 1
}

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

  if [ $force = true ]
  then
    cp -f $configSrc $configDest
    return 0
  fi

  fileExists $configDest
  if [ $? = 0 ]
  then
    printf "⚠️ $configName exists already, use -f to overwrite it\n"
    return 1
  fi
  
  cp -n $configSrc $configDest
}

copyLintStagedConfig() {
  
  # TODO: 
  #  - Add lint staged config
  #  - Copy lint staged config
  #  - Install lint staged hook
  printf ""
}

installHusky() {
  local hooksDir=`realpath $packageDir/hooks`
  # make husky silent
  npx husky install $hooksDir > /dev/null 2>&1
}

installGitHooks() {
  local success=true

  copyCommitlintConfig
  if [ $? = 0 ]
  then
    printf "✅ Copied .commitlintrc\n"
  else
    printf "❌ Failed to copy .commitlintrc\n"
    success=false
  fi

  installHusky
  if [ $? = 0 ]
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
  local force=false

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

      -f | --force) force=true ;;

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
