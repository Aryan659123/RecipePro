// [1] :-  Used at [2.2.extended] and at [2.4] in model.js
export const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes/' 

// [2] :-  Used in helper.js at [-1.extended] and [2.4]
export const TIMEOUT_SEC = 2;

// [3] :- Used in model.js at [2.1]
export const RES_PER_PAGE = 10;

// [4] :- Used at [2.2] and [2.4] and [2.11.c] in model.js 
// We can generally fetch the recipe data using the API URL and the recipe ID.
// But for own uploaded recipe we are need to fetch the recipe data using the API URL, the recipe ID, and our API key.
// When we upload a recipe, it doesn’t go to the public API openly to avoid contaminating the public data.
// Instead, it gets stored in the API under our API key.
// This means we can access our uploaded recipes only using our API key 
// although they are also on the public API but are stored under our API key so not accessible without API key 
// Therefore, when we search for recipes with our API key, the search results will include all recipes, including our uploaded ones.
// Additionally, when we click on one of our own recipes, the data is retrieved from the API only when using our API key = KEY.

// Foor generating API key 
// Visit https://forkify-api.herokuapp.com/v2 - Forkify API 
// Click on generate your API key and put it below here 
// export const KEY = '4a19c833-0372-460f-8ee9-b529acf79afa' // Practice 
export const KEY = '3ea2b0e9-f5d0-4239-8987-d87463d3922f'; // Professional_NEW

// [5] :- To close window after uploading recipe used in contorller.js at [1]
export const MODAL_CLOSE_SEC = 1.5; 


