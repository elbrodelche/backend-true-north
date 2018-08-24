# API True North

​Rest​ ​API​ ​for​ ​restaurant/delivery with a RabbitMQ message broker.

## Install

```bash
npm install pm2 --save   
npm install
npm run schema
npm start
```

## Usage

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

## Credits
[Juan Carlos Migliavacca](https://github.com/elbrodelche/)

## License

MIT
