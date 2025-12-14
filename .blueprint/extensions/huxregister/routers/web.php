<?php

use Illuminate\Support\Facades\Route;
use Pterodactyl\BlueprintFramework\Extensions\huxregister;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Log;

Route::post('/create-user', [\Pterodactyl\Http\Controllers\Admin\Extensions\huxregister\huxregisterExtensionController::class, 'createUser'])
    ->name('create-user');

Route::post('/updateTheme', [\Pterodactyl\Http\Controllers\Admin\Extensions\huxregister\huxregisterExtensionController::class, 'updateTheme'])
    ->name('updateTheme')
    ->middleware('auth');

Route::get('/getTheme', [\Pterodactyl\Http\Controllers\Admin\Extensions\huxregister\huxregisterExtensionController::class, 'getTheme'])
    ->name('getTheme');

