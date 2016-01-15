# dumbo

Make sure you have postgres installed and then:

`sudo -u postgres createdb -O dev_dumbo_user dev_dumbo_db` set the password to "dev"
`sudo -u postgres createdb -O dev_dumbo_user dev_dumbo_db`

Make the virtual environment:

`virtualenv -p python3 venv`

In venv/bin/activate, add

`
DEBUG=True
export DEBUG
DATABASE_URL="postgres://dev_dumbo_user:dev@localhost/dev_dumbo_db"
export DATABASE_URL
`

heroku: https://thawing-earth-1925.herokuapp.com/

	


