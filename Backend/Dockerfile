FROM php:8.2-fpm

WORKDIR /var/www/html


RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx \
    sqlite3 \
    libsqlite3-dev \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev


COPY docker/nginx.conf /etc/nginx/conf.d/default.conf


RUN apt-get clean && rm -rf /var/lib/apt/lists/*


RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd \
    && docker-php-ext-install pdo_mysql pdo_sqlite mbstring exif pcntl bcmath


COPY --from=composer:latest /usr/bin/composer /usr/bin/composer


COPY . .
COPY .env.example .env


RUN mkdir -p /var/www/html/database \
    && mkdir -p /var/www/html/resources/views \
    && mkdir -p /var/www/html/storage/framework/views \
    && mkdir -p /var/www/html/storage/framework/cache \
    && mkdir -p /var/www/html/storage/framework/sessions \
    && mkdir -p /var/www/html/storage/logs \
    && touch /var/www/html/resources/views/.gitkeep \
    && chown -R www-data:www-data /var/www/html/storage /var/www/html/database /var/www/html/resources

RUN composer install \
    && touch database/database.sqlite \
    && php artisan key:generate \
    && php artisan optimize

EXPOSE 8000

CMD service nginx start && php-fpm