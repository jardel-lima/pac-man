run:
	docker run --rm -d -v $pwd/pacman:/var/www/html -p 80:80 php:7-apache
