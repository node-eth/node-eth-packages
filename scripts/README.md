# Scripts

## ainstaller

Due to Docker networking issues we encountered with nodeRED image, we decided to go with the local filesystem installations.
Using the alternate nodeRED installer will allow you to directly interfere with the filesystem and will create clean NodeRED installations for your dev environment.

You will need to run `./ainstaller.sh` after which you should be able to use `alternate node red installer` by running:

`alternate-node-red-installer -f <root folder name>`

Or if you're not fan of long names:

`nrinstall -f ~/nrtest`
