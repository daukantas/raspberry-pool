include node_modules/alp-dev/tasks.mk

install:
	npm install
	cd browser && npm install
