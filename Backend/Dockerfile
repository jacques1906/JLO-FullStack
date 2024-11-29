FROM php:8.2-fpm

WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    nginx

# Configuration de Nginx
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Create necessary directories
RUN mkdir -p /var/www/html/resources/views \
    && mkdir -p /var/www/html/storage/framework/views \
    && mkdir -p /var/www/html/storage/framework/cache \
    && mkdir -p /var/www/html/storage/framework/sessions \
    && mkdir -p /var/www/html/storage/logs

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage

# Copy application files
COPY . .

# Copy .env.example to .env
COPY .env.example .env

# Install dependencies
RUN composer install

# Generate key and optimize
RUN php artisan key:generate
RUN php artisan optimize

EXPOSE 8000

CMD service nginx start && php-fpm