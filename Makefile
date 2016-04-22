.PHONY: prod-js
prod-js:
	./node_modules/webpack/bin/webpack.js --config webpack.prod.config.js
