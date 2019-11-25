# Setup for my VPS

#### Download/Erase/Upload
- Backup all your important files<br>
`scp -r your_username@remotehost.edu:~/* .`
- Set SSH Key to your account settings
- Install Debian 10
- Remove old password entries from your hosts<br>
`ssh-keygen -R ip|hostname`
- `ssh root@ip|hostname`
- Change password<br>
`passwd`
- Restore all your important files<br>
`scp -r * your_username@remotehost.edu:~/`

#### Utilies
- `apt-get install curl htop git vim`

#### Web
- `apt-get install nginx`
- Copy previous configuration files into /etc/nginx and /etc/letsencrypt
- Install certbot the following way<br>
`mkdir ~/certbot && cd ~/certbot && wget https://raw.githubusercontent.com/certbot/certbot/master/certbot-auto`
- `./certbot-auto renew` OR `certbot renew`
- Install new nginx rule in `/etc/nginx/sites-enabled/default`
- Certbot register (sub)domain
`./certbot-auto --standalone certonly -w ~/PathToWebsite -d (subdomain.)domain.com`

#### Nodejs
- `curl -sL https://deb.nodesource.com/setup_13.x | bash -`
- `apt-get install -y nodejs`

#### PM2
- `npm install pm2 -g`
- `pm2 install pm2-logrotate`
- Set PM2 default settings
```linux
pm2 set pm2-logrotate:retain 7
pm2 set pm2-logrotate:compress false 
pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss 
pm2 set pm2-logrotate:max_size 10M 
pm2 set pm2-logrotate:retain 7 
pm2 set pm2-logrotate:rotateInterval '0 0 * * * '
pm2 set pm2-logrotate:rotateModule true 
pm2 set pm2-logrotate:workerInterval 30
```
- Copy dump.pm2 into ~/.pm2/ for loading the previous configuration
- `pm2 resurrect`
- `pm2 startup`

#### Help commands
- PM2 # Start app without autorestart with name test and pass option "-a 34" as argument<br>
`pm2 start app.js --no-autorestart --name="test" -- -a 34`
- `ssh-keygen -t rsa && ~/.ssh/id_rsa.pub`
- Check top max size inodes<br>
`sudo du / --inodes -xS | sort -rh | head -n 50`
- Check disk space<br>
`df -h`
- Unzip folder into new directory and update files to this archive<br>
`unzip myupdate.zip -d destfolder`<br>
`cp -r destfolder/* somefoldertoupdate/`
