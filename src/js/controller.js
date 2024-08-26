// [-2] :- 
// Architectures to make projects (Structure + Maintainability + Expandibility) :- 
// MVC(Model View Controller), MVP(Model View Presenter), Flux 





///////////////// [-1] Without MVC ////////////////////////////////////////////////////////////////////////////////// 
// [1]
// [2]
// [3]
// [3.1]
// [3.2]
// [3.3]
// [3.3.1]
// [3.3.2]
// [3.3.3]
// [3.3.4]
// [3.3.5]
// [3.3.5.extended]
// [3.3.6]


// // [1] :- 
// // In index.html, we were referencing images from the img folder.
// // When the project is bundled using Parcel, it creates a dist folder
// // where it places the final bundled files, including index.html.
// // This can lead to issues with paths to assets like images,
// // because the project structure changes after bundling.
// // After using Parcel, index.html gets converted to index.html inside the dist folder,
// // which cannot access images from the img folder directly.
// // To resolve this, we import images from icons.svg inside the img folder:
// import icons from 'url:../img/icons.svg';

// // [2] :- 
// ////// Polyfill libraries :- 
// // npm i core-js // For installing core-js for polyfilling everything else 
// // npm i regenerator-runtime // // For installing regenerator-runtime for polyfilling Async/Await 
// // OR Both in one like :- npm i core-js regenerator-runtime 
// // then 
// import 'core-js/stable' 
// import 'regenerator-runtime/runtime' 



// // [3] :- 
// const recipeContainer = document.querySelector('.recipe');

// // [3.1] :- 
// // It took too long to load to load then means error or slow network connection 
// // So print error msg 
// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };



// // [3.2] :- 
// // This API for forkify Application        // 
// // https://forkify-api.herokuapp.com/v2 :- // 
// In Get all recipes/Create recipe section click on url 
// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>
// Choose id's of recipe from there 
// then 
// In Get recipe/Delete recipe section 
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=<insert your key>
// insert that id here to see it's recipe 
// This is the link we used below in [3.3.2] and 
// // in html we did : -
// <a href="#664c8f193e7aa067e94e89af">Recipe 1 </a>
// <a href="#664c8f193e7aa067e94e8454">Recipe 2 </a> 
// when we click on that button then url mein hash will change and we listen to it and take id from there 


// // [3.3.5.extended] :- 
// const renderSpinner = function(parentEl){ // Here we make the parentEl i.e. whole contaienr empty 
//   const markup =                          // and display spinner in whole container
//     `
//       <div class="spinner">
//         <svg>
//           <use href="${icons}#icon-loader"></use>
//         </svg>
//       </div>
//     `
//   parentEl.innerHTML = ''; // make 
//   parentEl.insertAdjacentHTML('afterbegin', markup);
// }

// // [3.3] :- 
// //// loading data 
// const showRecipe = async function name() {
//   try {

// // [3.3.1] :- 
//     const id = window.location.hash.slice(1);
//     // console.log(id);
//     // window.location = Whole url 
//     // window.location.id = #664c8f193e7aa067e94e8610
//     // we want without # 
//     // so started from index-1

//     if(!id) return; // gaurd class 
//     // vrna agar !id ki jgh id krenge then yeh niche vala sara if mein and na return else 
//     // no need of such type of nesting bu use guard class 
 
// // [3.3.5] :- Here call the spinner and make it appear in whole continer till data is fetched 
//     renderSpinner(recipeContainer);

// // [3.3.2] :- 
//     const res = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);
//     // fetch returns a promise and that promise is awaited and is value will be stored in res variable 
//     // all this waiting happens in background bcs its an async function 

//     const data = await res.json();
//     // .json() is available on all res objects(which are returned as values by promises)
//     // it also returns a promise and we wait for value from that promise using await 
//     // console.log(data);

//     if(!res.ok) throw new Error(`${data.message} (${res.status})`);


// // [3.3.3] :- 
//     // let recipe = data.data.recipe;
//     let {recipe} = data.data; // Used object destructing 
//     recipe = {
//       id : recipe.id,
//       title : recipe.title,
//       publisher : recipe.publisher,
//       sourceUrl : recipe.source_url,
//       image : recipe.image_url,
//       servings : recipe.servings,
//       cookingTime : recipe.cooking_time,
//       ingredients : recipe.ingredients
//     }
//     console.log(recipe);


// // [3.3.4] :- rendering data and changing acc to data of recipe received from forkify API :- 
//     const markup = 
//       `
//         <figure class="recipe__fig">
//           <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
//           <h1 class="recipe__title">
//             <span>${recipe.title}</span>
//           </h1>
//         </figure>

//         <div class="recipe__details">
//           <div class="recipe__info">
//             <svg class="recipe__info-icon">
//               <use href="${icons}#icon-clock"></use>
//             </svg>
//             <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
//             <span class="recipe__info-text">minutes</span>
//           </div>
//           <div class="recipe__info">
//             <svg class="recipe__info-icon">
//               <use href="${icons}#icon-users"></use>
//             </svg>
//             <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
//             <span class="recipe__info-text">servings</span>

//             <div class="recipe__info-buttons">
//               <button class="btn--tiny btn--increase-servings">
//                 <svg>
//                   <use href="${icons}#icon-minus-circle"></use>
//                 </svg>
//               </button>
//               <button class="btn--tiny btn--increase-servings">
//                 <svg>
//                   <use href="${icons}#icon-plus-circle"></use>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           <div class="recipe__user-generated">
//             <svg>
//               <use href="${icons}#icon-user"></use>
//             </svg>
//           </div>
//           <button class="btn--round">
//             <svg class="">
//               <use href="${icons}#icon-bookmark-fill"></use>
//             </svg>
//           </button>
//         </div>

//         <div class="recipe__ingredients">
//           <h2 class="heading--2">Recipe ingredients</h2>
//           <ul class="recipe__ingredient-list">
//             ${recipe.ingredients
//               .map(function(ing){
//               return `
//                 <li class="recipe__ingredient">
//                   <svg class="recipe__icon">
//                 <svg class="recipe__icon">
//                   <use href="${icons}#icon-check"></use>
//                 </svg>
//                   <div class="recipe__quantity">${ing.quantity ? ing.quantity : ""}</div>
//                   <div class="recipe__description">
//                     <span class="recipe__unit">${ing.unit}</span>
//                     ${ing.description}
//                   </div> 
//                 </li> 
//               ` // Here we joined all elements (having ingredients and their quantities) using .join("") 
//               }).join("") // So that they appear like a list in a grid from 
//             }
//           </ul>
//         </div>

//         <div class="recipe__directions">
//           <h2 class="heading--2">How to cook it</h2>
//           <p class="recipe__directions-text">
//             This recipe was carefully designed and tested by
//             <span class="recipe__publisher">${recipe.publisher}</span>. Please check out
//             directions at their website.
//           </p>
//           <a
//             class="btn--small recipe__btn"
//             href="${recipe.sourceUrl}"
//             target="_blank"
//           >
//             <span>Directions</span>
//             <svg class="search__icon">
//               <use href="${icons}#icon-arrow-right"></use>
//             </svg>
//           </a>
//         </div>
//       `
//     recipeContainer.innerHTML = ""; // Once we load or hashchange due to selecting an item we make container empty 
//     recipeContainer.insertAdjacentHTML('afterbegin', markup); // then fill it again with recipe's content which is clicked 
//   }
//   catch (error) {
//     alert(error);
//   }
// }

// // [3.3.6] :- Call showRecipe on when hashchange and when page loads 
// window.addEventListener('hashchange', showRecipe); // If recipe is clicked then hash changes and showrecipe is called to display the recipe
// window.addEventListener('load', showRecipe); // If already a hash in url then and showrecipe is called to display the recipe
// // Below Should work but not know why not working
// // ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));












//////////////// [-1] With MVC //////////////////////////////////////////////////////////////////////////////////
// Using MVC(Model View Controller) model 
//// 3 Files in it = Model, Controller, Views Folder 

//// 1). Model(Web) => Business Logic, State, HTTP Library 
// 1 file for all Models but can split too 
//// 2) Controller => Application Logic (Bridge between model and views(Both idependent of each other)) 
// 1 file for all controllers but can split too 
//// 3) View(User) => Presentation Logic 
// Views fodler will have different files for different views 


// [-1] :- Numbering Sequence in Numbering.txt (Out of src below index.html)

// [0] :- 
////// Polyfill libraries :- 
// npm i core-js // For installing core-js for polyfilling everything else 
// npm i regenerator-runtime // // For installing regenerator-runtime for polyfilling Async/Await 
// OR Both in one like :- npm i core-js regenerator-runtime 
// then 
import 'core-js/stable' 
import 'regenerator-runtime/runtime' 
if(module.hot) module.hot.accept(); // part of parcel and not part of js 
// Used to see the update immediately 
// if (module.hot) checks if the module system supports HMR.
// module.hot.accept() tells the module system that the current module accepts updates. 
// When a module is updated, the bundler (like Webpack or Parcel) will replace the old module with the updated one without reloading the entire page. 

// [1] :- 
import {MODAL_CLOSE_SEC} from './config.js';

// [2] :- 
import * as model from './model' 
// imported everything exported from model 
// i.e. exported state object having recipe object and loadRecipe function 

// [3] :- 
import recipeView from './views/recipeView.js';
// imported an exported instance of RecipeView class from recipeView.js at [3.4]
// changes made to it will be visible in all other modules too 

// [4] :- 
import searchView from './views/searchView.js';

// [6] :- 
import resultsView from './views/resultsView.js';

// [7] :- 
import paginationView from './views/paginationView.js';

// [10] :- 
import bookmarksView from './views/bookmarksView.js';

// [12] :-
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

///// [3.5] :- loading data 
const controlRecipe = async function() {
  try {
// [3.5.-1] :- 
    const id = window.location.hash.slice(1);
    // console.log(id);
    // window.location = Whole url 
    // window.location.id = #664c8f193e7aa067e94e8610
    // we want without # 
    // so started from index-1

    if(!id) return; // gaurd class 
    // vrna agar !id ki jgh id krenge then yeh niche vala sara if mein and na return else 
    // no need of such type of nesting bu use guard class 

// [3.5.0] :- 
// Here call the renderSpinner from recipeView.js from [3.3.2.5] 
// and make it appear in whole continer till data is fetched 
    recipeView.renderSpinner();

// [3.5.1] :- Giving select effect to the recipe that we select from left side search result list 
// such that it looks like it remained selected 
    // when we click on a recipe then we have to render left side results list too so as to make the selected recipe highlighted 
    // we can do this in 2 ways 
    // 1 - render whole left side recipe list 
    // using resultsView.render(model.getSearchResultsPage()); 
    // 2 - update and render only that selected recipe and let others remain same 
    //     by traversing on each element of list and making making clicked one remain selected 
    //     For how explanation there at [6.2.2.5] of resultsView.js 
    resultsView.update(model.getSearchResultsPage());

    // [3.5.2] :- Giving select effect to the that recipe in right side bookmarked recipes list 
    //            if it is also opened right-side below in recipe container also 
    //            such that it looks like it is selected bcs it is opened right-side below in recipe container
    //            i.e. showing that recipe opened is also bookmarked 
    // when we click on a recipe then we have to render left side results list too so as to make the selected recipe highlighted 
    // we can do this in 2 ways 
    // 1 - render whole right side bookmarked recipe list
    // using bookmarksView.render(model.state.bookmarks); 
    // 2 - update and render only that bookemarked recipe and let others remain same 
    //     by traversing on each element of list and making making opened below one remain selected 
    //     i.e. if a recipe is opened below and is also in bookmark list then in bookmark is it will look selected 
    //     For how explanation there at [6.2.2.5] of bookmarksView.js 
    bookmarksView.update(model.state.bookmarks);

// [3.5.3] :- 
// loadRecipe is an async function which will return a promise 
// so we need to await this promise 
// we can use await here bcs this controlRecipe is also an async function 
    await model.loadRecipe(id); 
    // Here when data will come then this will load data into recipe of stateRecipe object in model.js at [2.2] 

// [3.5.4] :- rendering data :- 
    // const recipeView = new recipeView(model.state.recipe);
    recipeView.render(model.state.stateRecipe); 
    // Data recived in model.js form fetch will be stored in stateRecipe object of state object in model.js 
    // then as we exported an instance of recipeView from recipeView.js and imported above in [2] 
    // We use that state.stateRecipe data from model and put it in render function of recipeView instance imported above in [2]
    // where it is in data parameter and gets used by generateMarkup to genrate html element to display the recipe  
    // At [3.3.2.2.extended] direction button is not a button but a link 
    // It becomes workable this link points to sourceURL that we get from API 
  }
  catch (error) {
    // if (error.message.includes('took')) recipeView.renderError(error); 
    if (error.message.includes('Timeout')) recipeView.renderError(error);  // I.E. any keyword os Timeout message 
    else recipeView.renderError();
    // This error was thrown from 
    // This msg was thrown from below of [2.3] in model.js to be caught here and to be rendered in UI from renderError() at [3.3.2.7] in recipeView.js 
  }


}

// [3.5.5] :- 
// // Call controlRecipe on when hashchange and when page loads 
// window.addEventListener('hashchange', controlRecipe); // If recipe is clicked then hash changes and controlRecipe is called to display the recipe 
// window.addEventListener('load', controlRecipe); // If already a hash in url then and controlRecipe is called to display the recipe 
// // Below Should work but not know why not working 
// // ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe)); 

// Events like Application Functions like controlRecipe() should be handled in controller.js i.e. handler in controller.js 
// Events listening like commented above should be listned for in views must be in views folder i.e. controller in view 
// But problem is we can't import funcitons in views from controller bcs views must no nothing about controller 
// So publisher-subscriber method is needed 

// controlRecipe(); 
// We can't call it like this as we don't want it to be called initally when application starts
// but want it to be called when specific event happens like when a recipe is clicked to see it info

// So used pub-sub :- 
// publishers knows when to react to event using which funciton 
// like is addHandlerRender() in recipeView.js at [3.3.2.6] knows to react on when event is called using handler(recipeController function)
// subscriber wants to react by using subscriber_funciton 
// like subscriber-init() uses subscribe_function-recipeController() to subscribe to publisher-addHandlerRender() in recipeView at [3.3.2.6]

// In Summary :- 
// init() funciton(Subscriber) of contoller.js below at [5]
// subscribes using recipeController() funciton(subscriber_funciton) of controller.js 
// I.E. passes recipeController() funciton(subscriber_funciton) of controller.js as an argument(handler) to 
// addHandlerRender() funciton(publisher) in recipeView.js who knows when to react I.E. when it is called 
// Here difference is :- 
// Previously addHandlerRender() function(publisher) for recipeController() function in recipeView.js was calling for recipeController() function from contoller.js 
// Now Due to subscriber(init()) with a subscribe_function recipeController() funciton, 
// addHandlerRender()(Publisher) is getting recipeController()(a subscriber_function)of controller.js as an argument(handler) due to init()(Subscriber) in controller.js and 
// addHanlderRender() has to run recipeController() when ever addHandlerRender() gets called 


// [4.3] :-Fetching and Rendering Search Results based on query searched  
const controlSearchResults = async function () {
  try{
// [4.3.1] Get search query :- 
    const query = searchView.getQuery();
    if(!query) return;

// [4.3.2] get search results of query into an array :- 
    await model.loadSearchResults(query); // This does not return any result. So nothing to return
    
// [4.3.3] Render initial results into side search bar :- 
    resultsView.render(model.getSearchResultsPage()); // It renders first 10 pages i.e. 0 to 9 
    // User searches query on search bar and press enter or clicks on search 
    // then model.loadSearchResults at [2.5] of model.js loads result into result array of state object of model.js 
    // this model.getSearchResultsPage() receives a page number and if not passes then by default 1 is set
    // like here it will be 1 and then acc to page(page_number) variable and resultsPerPage variable 
    // model.getSearchResultsPage() will return a part of result array which was storing all recipe results of query searched
    // resultsView.render() receives an array and displays it on side search bar 

///////////////////// Important - How full recipe is getting displayed on right side //////////////////////////////////////////////////     
    // As these results on side bar have links so when we click on them link changes the id changes i.e. hash changes 
    // Due to hash change addhandlerRender of recipeView at [3.3.2.6] gets called 
    // in which controlRecipe() was passed as subscriber_function by subscriber - init() below at [5] 
    // and due to controlRecipe render() of recipeView.js at [3.3.2] recipe and ingridents and all gets displayed on right side 

////////////// Directions button is already working due to sourceUrl returned from API and used it in markup in link in recipeViews at [3.3.2.2.extended] ///////////////////////////////////////////


// [4.3.4] :- Render initial pagination buttons 
    paginationView.render(model.state.search); 
    // paginationView.render takes entire search object of state object of model.js as input 
    // which has page and resultsperpage 
    // paginationView.render() uses this page numbers at bottom 
    // like <-page 1  page 2  page 3-> 
    // depending on it has 
    // only current (if only one page) page number 
    // OR  
    // current page + next page button only(If more than one page)
    // OR
    // prev page + current page + next page button only(If more than one page)
    // Remember this same page number is used in model.js at [2.5] by getSearchResultsPage() to cit out the array acc to page number
    // and then send that sliced array acc to page number above at [4.3.3] to resultsView.render()  of resultsView.js   
    // to display the side results 
    // So ya first results will be displayed then pag numbers 
    // Also page number at tmy of resultsView.render() and paginationView.render() are same 
  }
  catch(err){
    console.error(err);
  }
}

// [4.3.5] :- 
// controlSearchResults(); 
// We can't call it like this as we don't want it to be called initally when application starts 
// but want it to be called when specific event happens like when a query is searched n search bar 

// So used pub-sub :- 
// publishers knows when to react to event using which funciton 
// like is addHandlerSearch() in searchView.js at [4.1.4] knows to react when event is called using handler(recipeController function)
// subscriber wants to react by using subscriber_funciton 
// like subscriber-init() uses subscribe_function-recipeController() to subscribe to publisher-addHandlerSearch() in searchView at [4.1.4]

// In Summary :- 
// init() funciton(Subscriber) of contoller.js below at [5]
// subscribes using controlSearchResults() funciton(subscriber_funciton) of controller.js 
// I.E. passes controlSearchResults() funciton(subscriber_funciton) of controller.js as an argument(handler) to 
// addHandlerSearch() funciton(publisher) in searchView.js who knows when to react I.E. when it is called 
// Here difference is :- 
// Previously addHandlerSearch() function(publisher) for controlSearchResults() function in searchView.js was calling for controlSearchResults() function from contoller.js 
// Now Due to subscriber(init()) with a subscribe_function controlSearchResults() funciton, 
// addHandlerSearch()(Publisher) is getting controlSearchResults()(a subscriber_function)of controller.js as an argument(handler) due to init()(Subscriber) in controller.js and 
// addHanlderSearch() has to run controlSearchResults() when ever addHandlerSearch() gets called 


// [7.5] :- render new results and page number acc to next button or previous button clicked 
// When a button is clicked then its page-number then addHandlerClick() sends that page number whose button is clicked 
// to this controlPaginaton function due to which the page number is sent to 
// getSearchResultsPage() of model.js at [2.5] where page number is also updated 
const controlPagination = function(gotoPage){
  // Render new results 
  // Then acc to page number a sliced array is returned to resultsView.render() which display the recipes acc to page number 
  resultsView.render(model.getSearchResultsPage(gotoPage));

  // Render new pagination buttons 
  // Then paginationView.render() acc to updated page number in model.state.search also displays buttons
  paginationView.render(model.state.search);
}


// controlPagination();
// We can't call it like this as we don't want it to be called initally when application starts 
// but want it to be called when specific event happens like when page number button is clicked 
// So used pub-sub :- 
// publishers knows when to react to event using which funciton 
// like is addHandlerClick() in paginationView.js at [7.3] knows to react when event is called using handler(controlPagination function)
// subscriber wants to react by using subscriber_funciton 
// like subscriber-init() uses subscribe_function-controlPagination() to subscribe to publisher-addHandlerClick() in pagiantionView at [7.3]

// In Summary :- 
// init() funciton(Subscriber) of contoller.js below at [5]
// subscribes using controlPagination() funciton(subscriber_funciton) of controller.js 
// I.E. passes controlPagination() funciton(subscriber_funciton) of controller.js as an argument(handler) to 
// addHandlerClick() funciton(publisher) in recipeView.js who knows when to react I.E. when it is called 
// Here difference is :- 
// Previously addHandlerClick() function(publisher) for controlPagination() function in recipeView.js was calling for controlPagination() function from contoller.js 
// Now Due to subscriber(init()) with a subscribe_function controlPagination() funciton, 
// addHandlerClick()(Publisher) is getting controlPagination()(a subscriber_function)of controller.js as an argument(handler) due to init()(Subscriber) in controller.js and 
// addHanlderSearch() has to run controlPagination() when ever addHandlerClick() gets called 


// [8] Updating servings and updating only required parts/attributes of recipe on right acc to servings using [8.2] below :- 
// When we click on incr or decr servings button then 
// from [3.3.2.7] of recipeView.js it will send either servings-1 or servings+1 from data in html in markup 
// to controlServings at [8] of controller.js 
// then from [8.1] of controller.js we sent that updated number to updateServings() at [2.6] of model.js 
// to update the quantity of each ingredient acc to servings received in original state object above at [2.1] and [2.3] using a simple math calculation
// Read inside updateServings() at [2.6] of model.js to understand how to update qunatity of each ingridient of recipe
// and also store the new servings in state object at [2.1] of model.js 
// so that when we updating only required parts/attributes of recipe on right acc to servings using at [8.2] below 
const controlServings = function(newServings){
  // [8.1] UUpdates quantity of each ingredient(in original state object of model.js) and number of servings(in original state object of model.js) :- 
  model.updateServings(newServings);

  // [8.2] Updating the recipe view :- 
  // Due to [8.1] above, At [2.6.2] of model.js updated the origianl servings inside stateRecipe object at [2.1] of model.js so as to render on UI 
  // Again due to [8.1] above, 
  // At [2.6.1] of model.js updated the origianl quantity object inside ingredients object which is inside stateRecipe object at [2.1] and [2.3] both of model.js
  
  // Now using this updated data acc to servings we display only required parts/attributes of recipe on right acc to servings 
  recipeView.update(model.state.stateRecipe); 
  // Will only update required text and attrbtues in DOM instead of entire recipe in right 
}



// [9] :- To add and remove bookmarks icon mein bhi and right side bookmark list in right side bookmarkConatiner mein bhi  
// When we add something we send full data as in [9.1] below bcs this is needed
// and when we delete we onlty send id as in [9.2] below bcs this is needed

// When bookamrk button is clicked then event handler at [3.3.2.10] of recipeViews.js 
// calls this controlAddBook() funciton below due to pub-sub down at init()
// Expla of pub-sub all above 
const controlAddBookmark = function(){
  // [9.1] To add bookmark :- 
  // Here when this controlAddBookmark() method is 
  // then we call addBookmark() at [2.7] of model.js and pass 
  if(!model.state.stateRecipe.bookmarked){
    // [9.1.a] :- 
    // Sending full stateRecipe bcs we want to add bookmarked property with value=true 
    // and also add it in bookmarks[] array 
    // Using this bookmark array in [2.7.extended] above we make sure that if we click on other recipe then come back then it remains there 
    // and using this bookmarks[] array we will show bookmarks in dedicated bookmarks section bcs while laoding we make it appear on it see expla at [2.7.extended] 
    // Also used to store bookmarks from this bookmarks[] array in model.js at [2.9]  into localStorage then get back in bookmarks array at init() at [2.10] at model.js 
    // then render it further [11] in controller.js
    
    // And this makes bookmarked property of recipe as true
    model.addBookmark(model.state.stateRecipe);
  }

  // [9.2] To remove bookmark :- 
  else {
// When bookamrk button is clicked then event handler at [3.3.2.10] of recipeViews.js 
// calls this controlAddBook() funciton below due to pub-sub down at init()
// Expla of pub-sub all above 
    // [9.2.a] :- 
    // Sending only id and no need of full stateRecipe object 
    // bcs 
    // [[[[
    // we will just find index using id and remove it from bookmarks array 
    // also using just id only we will make recipe's bookmark id to be false 
    // See in 2.8 of model.js
    // ]]]] 
    // as we want to add bookmarked property with value=false 
    // and also remove it from bookmarks[] array 
    // Using this bookmark array at [2.7.extended] in model.js we make sure that if we click on other recipe then come back then it remains there 
    // and using this bookmarks[] array we will show bookmarks in dedicated bookmarks section bcs while laoding we make it appear on it see expla at [2.7.extended] 
    // Also used to store bookmarks from this bookmarks[] array in model.js at [2.9]  into localStorage then get back in bookmarks array at init() at [2.10] at model.js 
    // then render it further [11] in controller.js

    // And this makes bookmarked property of recipe as false 
    model.deleteBookmark(model.state.stateRecipe.id);
  }

    // [9.1.b] and [9.2.b] :- 
    // Then we update only updated part using update() at [3.3.2.8] of recipeViews.js 
    // ***** 
      // Actually we have an if check in generateMarkup at [3.3.2.2.extended] of recipeViews.js in recipeViews that 
      // if bookmarked property of recipe is true then while rendering it to html 
      // display filled bookmarked button showing that it is bookmarked 
      // else display empty bookmarked button showing that it is not bookmarked 
      // So due to full empty bookmark button will be shown means recipe is bookmakred that is bookmark is added 
    // ***** 
    recipeView.update(model.state.stateRecipe);

    // [9.3] :-After adding/removing bookmark(displaying full/empty bookmark) we render it on right side bookmark recipes list in right side bookmarkContainer 
    // bookmarksView imported above at [10]
    bookmarksView.render(model.state.bookmarks);
    // The bookmarked recipe items in right side bookamarked list are made same as recipe items in left side search result list 
    // So these are also not buttons but links and clicking on them changes id in url 
    // as id changes in url that is hashchange happened then controlRecipe() at [3.5] above is called 
    // controlRecipe() then updates left side search result list and right side bookmarke recipes list with selected class item
    // then using load function get recipe data from id and store it in stateRecipe object and then renders it in right side recipe container 
    // Thats why when we click any bookmarke item in bookmark list 
    // then it also gets selected in left side search result list
    // then it also gets selected right side bookmarke recipes list 
    // then it also gets rendered in right side recipe container 
}




///////// [11] Part of localStorage :- 
// Basically when page loads then 
// Due to [2], init() of model.js will run and 
// load savedBookmarks array from localStroage into bookmarks array 
// then 2 handler will be called controlBookmarks and controlRecipe
// In init() we called controlBookmarks first then controlRecipe
/// [[[[[[[[[[ Reason for calling controlBookmarks before controlRecipe in init() below :- 
// In init() we called controlBookmarks first then controlRecipe 
// bcs it could have created problem if called controlRecipe before controlBookmarks in init() below
// due to [2] init() of model.js would have stored savedBookmarks[] array from localStorage into bookmarks array 
// then since controlRecipe is called first, 
// it has update Bookmarks function that compares existing bookmarks on DOM from bookmarks array received 
// bcs bookmarks are not rendered yet which was duty of controlBookmarks 
// so there would be no existing bookmarks on DOM but bookmarks[] array would have bookmarks
// So it can't add but update only but as nothing existing on DOM so it couldn't compare 
// So error 
/// ]]]]]]]]]]
 
// So called controlBookmarks before controlRecipe in init() below :- 
// controleBookmarks() here at [11] called from [10.2.2.5] at bookmarksView.js 
// will render bookmarks from bookmarks[] array into bookmarks section
// and 
// controlRecipe() above at [3.5] called from [3.3.2.6] at recipeView.js 
// will also be called and since it also has bookmarksView.update() at [3.5.2]
// This won't update bookmarks anymore bcs already we rendered them from localStroage se bookmarks 
// So nothing new so no update in bookmarks  
///// How bookmark-button(Full/Empty) in recipe is also updated :- ///// 
// When we click on any bookmark in right side bookmark list then id in url changes and controlRecipe above at [3.5] is called 
// In it loadRecipe at [2.2] of model.js is also called at [3.5.3] above is also called 
// Due to [2.7.extended] in loadRecipe at [2.2] of model.js we check if the recipe we are gonna load also in bookmarsk array 
// and since it is bcs bookmarks[] is updated from localStroage due to [2] here above called init() in model.js 
// So its bookmarked property is true 
// then at [3.5.4] when we render it shows bookmark button(full/empty) accordingly 
const controlBookmarks = function(){
  // Duw to [2] init() of model.js will stored savedbookmarks[] array from local storage into bookmarks[] array 
  // This will called from [10.2.2.5] at bookmarksView.js here at [11] 
  // It will then render those bookmarks from bookmakrs[] array(from local storage) into bookmarks.section 
  bookmarksView.render(model.state.bookmarks);
};


// [12.4] :- To show or hide form 
const controlFormView = async function(FormStatus){
  if(FormStatus === "open") addRecipeView.renderShowForm(); // Called at [12.2.4] of addRecipeView to show _formContainerWindow and overlay window 
  else addRecipeView.renderHideForm() // Called at [12.2.6] of addRecipeView to hide _formContainerWindow and overlay window 
}

// [12.5] :- addHandlerUpload at [12.2.7] of addRecipeViews.js calls this 
//              Upload recipe to API 
//              which will show load spinner recipe till succcess msg/error msg 
//              upload new recipe to API to specifice API key 
//              and in bookmarks and localStrage also 
//              render it in bookmarks 
//              display success message 
const controlAddRecipe = async function(newRecipe){
  // newRecipe is an object of received upload recipe form data passed from [12.2.7] of addRecipeView.js 
  try{
    // [12.5.1] Show loading Spinner :- 
    addRecipeView.renderSpinner();

    // [12.5.2] Upload the new recipe data :- 
    await model.uploadRecipe(newRecipe);
    // uploadRecipe is an async function which returns promise, so used await for pormise 
    // as await can be used inside async function only thats why made this function an async function 
    // So we await for promise and if got rejected due to wrong input format of ingredients 
    // then it gives an error 
    // if accepted then 
    // this will Upload user recipe to Forkify API 
    // And getting that user recipe data back also to 
    // Make it change it acc to our functions and then store it in stateRecipe to be rendered below at [12.5.3] 
    // Also used this stateRecipe below at [12.5.5] below and [12.5.6] below (expla below in it)
    // And Store it in bookmakrs[] array and in localStorage and make its bookmarked property true also

    // [12.5.3] Render recipe in right recipeContainer :- 
    recipeView.render(model.state.stateRecipe);

    // [12.5.4] Render it in right-side-bookmarks-list bookmarks too :- 
    bookmarksView.render(model.state.bookmarks); 
    
    // [12.5.5] Change ID in URL. So that id of url is same as id of new Recipe upoaded (Also useful below in [12.5.6] below (expla below in it)):- 
    // Syntax :- 
    // window.history.pushState(state, title, `#id`);
    // history API of browser 
    // puchState() method on history API - Change url without reloading the page 
    window.history.pushState(null, '', `#${model.state.stateRecipe.id}`);
    // Can use history to go back and forth also 
    // like :- 
    // window.history.back() - Automaically going back to previous page 
    

    // [12.5.6] Make that bookmark look selected in bookmarks list :- 
    // So when we render id of url is also the same id as of this new user recipe bcs of above [12.5.5]
    // This id concept is useful as it checks if id is same as that of url 
    // then add 'preview__link--active' class to make this class look selected 
    bookmarksView.update(model.state.bookmarks); 


    // [12.5.7] Display Success message :-  
    addRecipeView.renderSuccess();
  }
  catch(err){
    addRecipeView.renderError(err);
  }
}
// called controlAddRecipe due to pub-sub method called below in init() 
// can be expla in above functions about pub-sub


// [5] :- Here we just send the above subscriber_functions to their handler so that get called when specific events related to them happens
const init = function(){
  bookmarksView.addHandlerRender(controlBookmarks); // from [11] above 
  // Reason why controlBookmarks is called before controlRecipe is in [11] above 

  recipeView.addHandlerRender(controlRecipe); // from [3.5.5] above 
  recipeView.addHandlerUpdateServings(controlServings); // from [8] above 
  recipeView.addHandlerAddBookmark(controlAddBookmark); // from [9] above 
  searchView.addHandlerSearch(controlSearchResults); // from [4.3.4] above 
  paginationView.addHandlerClick(controlPagination); // from [7.5] above 
  addRecipeView._addHandlerFormView(controlFormView); // from [12.5] above 
  addRecipeView.addHandlerUpload(controlAddRecipe); // from [12.5] above 
}
init();


// [13] :- config.js 
// The config.js file is typically used to store configuration variables and 
// settings that are used throughout the project. 
// This can include API endpoints, timeout durations, and other constants 
// that might need to be adjusted without modifying the main codebase.
// See its parts and where they are used 


// [14] :- helper.js 
// The helper.js file contains utility functions that are used multiple times throughout your application. 
// See its parts and where they are used 

