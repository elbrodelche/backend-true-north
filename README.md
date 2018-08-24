# API True North

​Rest​ ​API​ ​for​ ​restaurant/delivery with a RabbitMQ message broker.

## Install

```bash
npm install pm2 -g
npm install
npm run schema
npm start
```

After npm start, you can use pm2 commands to check the services status.

## Usage
### List of endpoints

| Type | URL |
| --- | --- |
| GET | http://127.0.0.1:9000/user/ |
| GET |http://127.0.0.1:9000/restaurant/|
| POST |http://127.0.0.1:9000/restaurant/1/review/|
| GET |http://127.0.0.1:9000/restaurant/rate/3|
| DELETE |http://127.0.0.1:9000/restaurant/10|
| PUT |http://127.0.0.1:9000/restaurant/1|
| GET |http://127.0.0.1:9000/restaurant/1|
| GET |http://127.0.0.1:9000/order/|
| POST |http://127.0.0.1:9000/order/1/|


### Import Postman File 

Configure PostMan app by importing the followin file: 
_True North Api.postman_collection.json_

### Mail
To be able send emails using GMail from any application (including Node.js) you need to generate application-specific password to access GMail:
[My Account](https://myaccount.google.com/) -> [Sign-in & security](https://myaccount.google.com/security) -> [Signing in to Google](https://myaccount.google.com/security#signin) -> [App passwords](https://security.google.com/settings/security/apppasswords?utm_source=OGB&pli=1)

Select 'Other (Custom name)' in 'Select app'/'Select device' drop-downs, enter descriptive name for your application and device and press 'GENERATE'.
Copy provided password.

Then put the correct data in __config/mail.yml__

### Config

All configuration are located in theirs self-contained config file in _/config__

### PM2 usefull commands
#### Listing
```
$ pm2 list               # Display all processes status
$ pm2 jlist              # Print process list in raw JSON
$ pm2 prettylist         # Print process list in beautified JSON

$ pm2 describe 0         # Display all informations about a specific process

$ pm2 monit              # Monitor all processes
```

####  Logs
```
$ pm2 logs               # Display all processes logs in streaming
$ pm2 ilogs              # Advanced termcaps interface to display logs
$ pm2 flush              # Empty all log file
$ pm2 reloadLogs         # Reload all logs
```
####  Actions
```
$ pm2 stop all           # Stop all processes
$ pm2 restart all        # Restart all processes

$ pm2 reload all         # Will 0s downtime reload (for NETWORKED apps)
$ pm2 gracefulReload all # Send exit message then reload (for networked apps)

$ pm2 stop 0             # Stop specific process id
$ pm2 restart 0          # Restart specific process id

$ pm2 delete 0           # Will remove process from pm2 list
$ pm2 delete all         # Will remove all processes from pm2 list
```

## Credits
[Juan Carlos Migliavacca](https://github.com/elbrodelche/)

## License

MIT
