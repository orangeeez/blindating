NODE_VERSION="v0.10.26"

SCRIPT_PATH="${BASH_SOURCE[0]}"
SCRIPT_PATH="$( cd -P "$( dirname "$SCRIPT_PATH" )" && pwd )"
cd $SCRIPT_PATH/..

# Install nvm and node
if [[ `dpkg -s curl | grep Status` != "Status: install ok installed" ]]; then
    sudo apt-get update
    sudo apt-get install curl
fi

hash nvm 2>/dev/null || {
    echo "Installing nvm."
    if [ -d "deps/nvm" ]; then
        # Install nvm from server package.
        mkdir "${HOME}/.nvm/"
        cp -r "deps/nvm/." "${HOME}/.nvm/"
    else
        # Install nvm from Internet
        wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
    fi
}

[[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh

[[ ! -d "${HOME}/.nvm/${NODE_VERSION}" ]] && nvm install ${NODE_VERSION}

nvm use ${NODE_VERSION}

# Install node modules
npm install .
