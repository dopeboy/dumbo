# dumbo

```
pip3 install -r requirements.txt
npm install
```

Make sure you have postgres installed and then:
 
```
sudo -u postgres createuser -P dev_dumbo_user
sudo -u postgres createdb -O dev_dumbo_user dev_dumbo_db
```

set the password to "dev" in the first step above

Make the virtual environment:

`virtualenv -p python3 venv`

In venv/bin/activate, add

```
DEBUG=True
export DEBUG
DATABASE_URL="postgres://dev_dumbo_user:dev@localhost/dev_dumbo_db"
export DATABASE_URL
```

## Deploying
Run
```
./node_modules/webpack/bin/webpack.js --config webpack.prod.config.js
```
and then commit and push.

heroku: https://thawing-earth-1925.herokuapp.com/

## Guidelines for writing solutions (work in progress)

Emphasis on understanding key phrases of the question. [parsing]

"Ramping up gradually" - giving as little mechanical help in the beginning steps of the solution. Spectrum goes conceptual -> mechanical.

Explicitly calling out misdirection in the question. 

Being as detailed and pedantic as possible.

Assuming a baseline understanding of arithmetic and terms like "systems of equations, inequalities, etc". 


