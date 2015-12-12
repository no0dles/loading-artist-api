# loading-artist-api

[![wercker status](https://app.wercker.com/status/a1939e33954145074717c054cbc13aed/m "wercker status")](https://app.wercker.com/project/bykey/a1939e33954145074717c054cbc13aed)

## 1. Install
```
npm install grunt-cli -g
npm install
```

## 2. Configure
Create file "config/default.json" with your configuration

```
{
  "db": {
    "connectionLimit": 20,
    "host": "localhost",
    "database": "loadingartist",
    "user": "root",
    "password": "toor"
  },
     "pageLimit": 50
}
```

## 3. Run
```
grunt
```