make an amazon linux instance. connect via session manager

yum update
(
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
)or
(
yum install epel-release
yum install npm
)
npm -v
node -v
npm install -g http-server
cd /var
mkdir www && chown ec2-user www && chgrp ec2-user www && cd www
touch index.html
http-server -p 80

now visit http://52.221.229.126/index.html