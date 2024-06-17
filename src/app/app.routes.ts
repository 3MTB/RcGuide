import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./Pages/Main/home/home.page').then(m => m.HomePage),
    title: 'HOME'
  },
  {
    path: 'menu',
    loadComponent: () => import('./Pages/Main/menu/menu.page').then(m => m.MenuPage)
  }
  , {
    path: 'characters',
    children: [
      {
        path: '',
        loadComponent: () => import('./Pages/AboutCharacters/characters/characters.page').then(m => m.CharactersPage)
      },
      {
        path: ':id',
        loadComponent: () => import('./Pages/AboutCharacters/details/details.page').then(m => m.DetailsPage)
      }
    ]
  },
  {
    path: 'favorites',
    loadComponent: () => import('./Pages/AboutCharacters/favorites/favorites.page').then(m => m.FavoritesPage)
  },



];
