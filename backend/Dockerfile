FROM php:8.4-fpm

# Installation des dépendances système
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libzip-dev

# Nettoyage du cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Installation des extensions PHP requises par Laravel
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Récupération de Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Copie des fichiers de l'application
COPY . .

# Installation des dépendances Composer
RUN composer install --no-interaction --optimize-autoloader

# Gestion des permissions
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]