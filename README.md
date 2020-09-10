# Login-and-Register API 
# it version 1.0.0
Login and Register By Laravel 7 and jwt backend and nuxt.js frontend with style vuesax-4 and bootstrap-4 
backend : https://github.com/Kemal-Helios/Login-and-Register-backend/tree/master/backend
## Build Setup

Folder PATH listing in your Apache

+--Login-and-Register >>>>>backend Files #Laravel.
+--Login-and-Register >>>>>frontend Files #Nuxt.

#Frontend files separate from backend

# Run the following command:

-1 npm update 

-2 composer update

-3 php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"
---------------------------

Add File in backend :.env
Add in .env : database name
Add in .env :JWT_SECRET=
---------------------------
# Run the following command:

-3 php artisan jwt:secret

-4 php artisan migrate:fresh

-4 npm run dev

-5 php artisan serve
---------------------------
# Register a new Admin You must modify in pages/auth/register 

Before: middleware: 'auth',

After: middleware: 'guest',
---------------------------
# And edit in layouts/partials/TopNav. Transferred Register from template v-if="authenticated"  to  template v-else 
