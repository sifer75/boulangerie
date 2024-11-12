#! /bin/sh

until pg_isready -h postgres -U "$DB_USER" -d "$DB_DATABASE"; do
    echo 'En attente de la base de donnée ...'
    sleep 2
done

export PGPASSWORD=${DB_PASSWORD}

table_exist=$(psql "postgresql://${DB_USER}:${DB_PASSWORD}@postgres/${DB_DATABASE}" -t -c "
SELECT EXISTS (
    SELECT 1
    FROM pg_tables
    WHERE schemaname = 'public'
    AND tablename = 'products'
)" | xargs)

if [ "$table_exist" = "f" ]; then
    echo 'Création des migrations ...'
    node ace make:migration products
    node ace migration:run --force
    echo 'Les migrations sont appliquées.'

    if [ -f "database/seeders/product_seeder.ts" ]; then
        node ace db:seed
        echo 'Le seed est effectué.'
    else
        echo 'Création du seed'
        node ace make:seeder product_seeder
        node ace db:seed
        echo 'Le seed est effectué.'
    fi
    
else
    echo 'Les migration existent déjà.'
fi

npm start