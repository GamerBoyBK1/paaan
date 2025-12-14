<?php

use Illuminate\Support\Facades\Route;
use Pterodactyl\BlueprintFramework\Extensions\minecraftpluginmanager;
use Pterodactyl\Http\Middleware\Activity\ServerSubject;
use Pterodactyl\Http\Middleware\Api\Client\Server\ResourceBelongsToServer;
use Pterodactyl\Http\Middleware\Api\Client\Server\AuthenticateServerAccess;

/*
|--------------------------------------------------------------------------
| Client Control API
|--------------------------------------------------------------------------
|
| Endpoint: /api/client/servers/{server}
|
*/
Route::group([
    'prefix' => '/servers/{server}',
    'middleware' => [
        ServerSubject::class,
        AuthenticateServerAccess::class,
        ResourceBelongsToServer::class,
    ],
], function () {
    Route::group(['prefix' => '/minecraft-plugins'], function () {
        Route::get('/', [minecraftpluginmanager\MinecraftPluginController::class, 'index']);
        Route::get('/versions', [minecraftpluginmanager\MinecraftPluginController::class, 'versions']);
        Route::post('/install', [minecraftpluginmanager\MinecraftPluginController::class, 'installPlugin']);
        Route::get('/is-linked', [minecraftpluginmanager\MinecraftPluginController::class, 'isLinked']);
        Route::post('/link', [minecraftpluginmanager\MinecraftPluginController::class, 'linkPolymart'])->name('minecraft-plugins.link');
        Route::post('/link-back', [minecraftpluginmanager\MinecraftPluginController::class, 'handleBackPolymart'])->name('minecraft-plugins.link-back')->withoutMiddleware([\Pterodactyl\Http\Middleware\VerifyCsrfToken::class, ServerSubject::class, 'auth', 'api', \Pterodactyl\Http\Middleware\Api\Client\RequireClientApiKey::class, AuthenticateServerAccess::class]);
        Route::post('/disconnect', [minecraftpluginmanager\MinecraftPluginController::class, 'disconnectPolymart']);
    });
});
