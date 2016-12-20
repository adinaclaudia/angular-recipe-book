import {Injectable, EventEmitter} from '@angular/core';
import {Recipe} from './recipe';
import {Ingredient} from './ingredient';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {Observable, Subscription} from 'rxjs/Rx';

@Injectable()
export class RecipeService {

  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Schnitzel', 'Very tasty',
      'http://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-7_edited.jpg',
      [new Ingredient('French fries', 2), new Ingredient('Pork meat', 1)]),
    new Recipe('Summer salad', 'Okaish',
      'http://cdn.iowagirleats.com/wp-content/uploads/2013/05/Triple-Berry-Summer-Salad-03_mini.jpg', [])
  ];
  constructor(private http: Http) { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    // remove a part of the array
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData(): Observable<Response> {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers( {
      'Content-Type': 'application/json'
    });
    return this.http.put('https://recipebook-75a22.firebaseio.com/recipes.json', body, {headers: headers});
  }

  fetchData(): Subscription {
    return this.http.get('https://recipebook-75a22.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }

}
