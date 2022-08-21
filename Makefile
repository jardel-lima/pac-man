run:
	docker run --rm -v $(PATH)/pacman:/var/www/html -p 80:80 php:7-apache
