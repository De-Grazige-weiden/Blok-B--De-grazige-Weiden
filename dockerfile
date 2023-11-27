FROM php:8.2.12-apache

# This allows for rewrite mods in .htaccess
RUN a2enmod rewrite

# Install the MySQL extension so we can connect the database
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli