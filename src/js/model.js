// [2.0] :- 
import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from "./config.js"; 
// API_URL From 1 of config.js used below in [2.2.extended]
// RES_PER_PAGE From 3 of config.js used below in [2.1] and [2.5]
// KEY used below at [2.11.c] :- 

import { getJSON, sendJSON } from './helper.js'; // From 1 and 2 of helper.js 
// getJSON used below at [2.2.extended] and at [2.4]
// sendJson used below at [2.11.c]

// [2.1] :- 
// Used below in [2.3] to store recipe data fromm fetch request and 
// then exported to be used in controller.js at [3.5.4] for making that recipe data availble to user through recipeView.js 
export const state = {
    stateRecipe: {},

    // Used this below at [2.4] here and at [] in controller.js 
    search: { // So that we can store query and query results and 
        query: '', // we store the query by user in this like pizza/pasta below at [2.4.1]
        results: [], // Like we cand store all recipes of pizza/pasta etc in results array below at [2.4.2.extended]
        page : 1, // Used below in getSearchResultsPage at [2.5]
        resultsPerPage: RES_PER_PAGE, // Imported above at [2.0] from config.js and 
    },                                // Used below in getSearchResultsPage() at [2.5] 
    bookmarks: [],
    // Stores bookmared recipes by [2.7] and [2.8] below :-
    // Using this bookmark array in [2.7.extended] below we make sure that if we click on other recipe then come back then it remains there 
    // bcs while laoding we make it appear on it see expla at [2.7.extended] bcs while laoding we make it appear on it see expla at [2.7.extended] 
    // Also used to store bookmarks from this bookmarks[] array below at [2.9] into localStorage then get back in bookmarks array at init() below at [2.10] at model.js 
    // then render it further [11] in controller.js
}


// [2.3] Create own recipe object from data received from API to use it to render by recipeViews.js at [3.3.2.2.extended]
// Then we created a whole recipe object using recipe variable and stored it in stateRecipe object of state object below at [2.3.extended] 
// Then used this stateRecipe object's data of recipe in controller.js at [someplaces] to make that recipe visible by recipeViews.js at [3.3.2.2.extended]
const createRecipeObject = function(data){
    // let recipe = data.data.recipe;
    const {recipe} = data.data; // Used object destructing and got recipe data into recipe variable 

    return state.stateRecipe = {
        id : recipe.id,
        title : recipe.title,
        publisher : recipe.publisher,
        sourceUrl : recipe.source_url,
        image : recipe.image_url,
        servings : recipe.servings,
        cookingTime : recipe.cooking_time,
        ingredients : recipe.ingredients,
        ...(recipe.key && {key: recipe.key})
        // If no recipe.key then recipe.key is falsy value then nothing happens 
        // then destructuring here will do nothing 
        // If recipe.key is a value then 2nd part of operator i.e. key: recipe.key is executed and returned 
        // so object will be returned then we spread(destructure) that object and it will be like key: recipe.key 
    }
}


// [2.2] :- load the recipe and export it to be used in controller for filling id in it at [3.5]
export const loadRecipe = async function(id){ // This id will be set in controller.js 
    try{
// [2.2.extended] 
// This API for forkify Application        //  
// // https://forkify-api.herokuapp.com/v2 :- // 
// In Get all recipes/Create recipe section click on url 
// https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>
// Choose id's of recipe from there 
// then 
// In Get recipe/Delete recipe section 
// https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=<insert your key>
// insert that id here to see it's recipe  
// when we click on that button then url mein hash will change and 
// we listen to it and take id from windows url in controlRecipe in [3.5] at controller.js 
// then call loadRecipe by putting id in it at [] of controller.js at [3.5.3]

// API with KEY = API key :- 
// We can generally fetch the recipe data using the API URL and the recipe ID.
// But for own uploaded recipe we are need to fetch the recipe data using the API URL, the recipe ID, and our API key.
// When we upload a recipe, it doesn’t go to the public API openly to avoid contaminating the public data.
// Instead, it gets stored in the API under our API key.
// This means we can access our uploaded recipes only using our API key 
// although they are also on the public API but are stored under our API key so not accessible without API key 
// Therefore, when we search for recipes with our API key, the search results will include all recipes, including our uploaded ones.
// Additionally, when we click on one of our own recipes, the data is retrieved from the API only when using our API key = KEY of [4] of config.js
        const data = await getJSON(`${API_URL}${id}?key=${KEY}`);
        // getJSON From 1 of helper.js imported above in [2.0]
        // API_URL From 1 of config.js imported above in [2.0]
        // KEY From 4 of config.js imported above in [2.0]
        // Async function always returns a promise so wait for promise to get fulfiled and get that data then 



// [2.3.extended]
        // Then above at [2.3] we created a whole recipe object using recipe variable and stored it in stateRecipe object of state object 
        // Then used this stateRecipe object's data of recipe in controller.js at someplaces to make that recipe visible by recipeViews.js at [3.3.2.2.extended]
        state.recipe = createRecipeObject(data);


// [2.7.extended] :- After bookmarking when visit on some other recipe and then comeback 
        //           If we click on then even bookmark remains there bcs it was added in bookmarks array which helps this 
        // When we click on a recipe on left side search results 
        // then clicking on them changes id in url 
        // as id changes in url that is hashchange happened then controlRecipe() at [3.5] above is called 
        // controlRecipe() then updates left side search result list and right side bookmarke recipes list with selected class item
        // then using this load function get recipe data from id and store it in stateRecipe object 
        // then this we see if this recipe was in bookmarks array also then make its bookmarked property to be true
        // by using this some below 
        // This some returns true if there is atleast an one element in bookmarks array having same id as we clicked else returns false 
        // then if true then we make it's bookmarked property to be true 
        // else false 
        // then controlRecipe() after this loadRecipe returns the data 
        // makes recipe markup of right side recipeContainer 
        // And depending on the if check of generateMarkup of recipeViews at [3.3.2.2.extended] as explained below in ** ** in [2.7.b] 
        // if it is in bookmarks[] array then bookmaked=true i.e. then display filled bookmark button showing it is bookmakred 
        // else it is not in bookmarks[] array then bookmaked=false i.e. then display empty bookmark button showing it is not bookmakred 
        // renders that markup on in right side recipe container 
        if(state.bookmarks.some(function(bookmark){ // This some returns if there is atleast an one element in bookmarks array having same id as we clicked on 
                return bookmark.id === id;
            })
        ){
            state.stateRecipe.bookmarked = true;
        }
        else{
            state.stateRecipe.bookmarked = false;
        }
    }
    catch(err){
        // console.error(err); // This error will be caught from getJson() of helper.js 
        throw err; // Throwing this error to be catch in controller.js below [3.5.4]/above[3.5.5] and render that error in UI from renderError() at [3.3.2.7] in recipeViews.js  
    }
}


// [2.4] :- Based on query used to load search results into an array then display in side search bar used in controller.js in [4.3.2]
export const loadSearchResults = async function(query){ // used at [4.3.2] in controller.js 
    try{
    // [2.4.1] :- 
        state.search.query = query; // We store the query like "pizza" in query in state object above in [2.1]

    // [2.4.2] :- 
    // In forkify API go to Get all recipes :- 
    // Then click on the given link then copy url from search of new page opened 
    // https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza 

    // getJSON() from 1 of helper.js imported above in [2.0]
    // API_URL from 1 of config.js imported above in [2.0]

        // In Object-Destructuring-Way :- 
        // const result = await getJSON(`${API_URL}?search=${query}`)
        // const {data} = result;  // As data is prop of results object 
        // const {recipes} = data; // As recipes is prop of data object 
        
// API with KEY = API key :- 
// We can generally fetch the recipe data using the API URL and the recipe ID.
// const data = await getJSON(`${API_URL}?search=${query}`) 
// But for own uploaded recipe we are need to fetch the recipe data using the API URL, the recipe ID, and our API key.
// When we upload a recipe, it doesn’t go to the public API openly to avoid contaminating the public data.
// Instead, it gets stored in the API under our API key.
// This means we can access our uploaded recipes only using our API key 
// although they are also on the public API but are stored under our API key so not accessible without API key 
// Therefore, when we search for recipes with our API key, the search results will include all recipes, including our uploaded ones.
// Additionally, when we click on one of our own recipes, the data is retrieved from the API only when using our API key = KEY of [4] of config.js

        const data = await getJSON(`${API_URL}?search=${query}&key=${KEY}`); 

        // await as getJSON will return a promise so waiting asynchronously to get results from API 
        // data.data.recipes is an array of same things as our state.search.results array 
        // only difference is that we just named those porperties with our desired names in our desired array 
        // the names we used are also the names we used to display the recipe with all its info above in [2.3]
    // [2.4.2.extended] :- 
        state.search.results = data.data.recipes.map(function(recipe){
            return {
                id : recipe.id,
                title : recipe.title,
                publisher : recipe.publisher,
                image : recipe.image_url,
                ...(recipe.key && {key: recipe.key})
                // If no recipe.key then recipe.key is falsy value then nothing happens 
                // then destructuring here will do nothing 
                // If recipe.key is a value then 2nd part of operator i.e. key: recipe.key is executed and returned 
                // so object will be returned then we spread(destructure) that object and it will be like key: recipe.key                 
            }
        })
        state.search.page=1; 
        // Whenever we load a new search we make the page number again back to 1 
        // and not remain it as we visited in previous result   
    }
    catch(err){
        console.error(`${err}`);
    }
}

// [2.5] :- This method will store 
// [2.1] above mein ek page and ek resultsPerPage hai varaible 
// Due to [2.4] results array in state object above at [2.1] stores all recipes of the query searched by user
// This getSearchResultsPage() is used for pagination 
// Bascially getSearchResultsPage() returns a part fo array depending on which page we are 
// It returns part of array to config.js at [4.3.3] and we pass this part of    
export const getSearchResultsPage = function(page = state.search.page){ // Setting default value to 1 as stored above 
    state.search.page = page; 
    // This method will receive page number 
    // from [4.3.3] of controller.js but empty value so default used and 
    // from [7.5] of controller.js which receives page number from [7.3] of paginationView.js when the button is clicked  
    // and the store it above in state object 
    // Then returns a sliced array from start till end-1 
    const start = (page-1) * state.search.resultsPerPage 
    // Start will be page-1*resultsPerPage. eg:- (1-1)*10 => 0 (0 to 9) or (11-1)*10 = 10(10 to 19)
    // As 0-based indexing 

    const end = page * state.search.resultsPerPage // as for 
    // end will be page*10. 
    // eg:- 1*10 => 10. But in slice we take end-1. So 10-1=9. So (0 to 9)
    // eg:- 2*10 => 20. But in slice we take end-1. So 20-1=19. So (10 to 19)
    // As 0-based indexing 
    
    return state.search.results.slice(start, end); 
    // Then it will slice array from start to end-1 and return it to [4.3.3] of model.js
    // Where it will get render to side search bar due to render method of resultsView of resultsView.js
}


// [2.6] :- Updates quantity of each ingredient and number of servings above at [2.1] and [2.3] :- 
// When we click on incr or decr servings button then 
// from [3.3.2.7] of recipeView.js it will send either servings-1 or servings+1 from data in html in markup 
// to controlServings at [8] of controller.js 
// then from [8.1] of controller.js we sent that updated number to here at updateServings() at [2.6] of model.js 
// to update the quantity of each ingredient acc to servings received in original state object above at [2.1] and [2.3] using a simple math calculation
// Read below-inside updateServings() at [2.6] of model.js to understand how to update qunatity of each ingridient of recipe
// and also store the new servings in state object above at [2.1] 
// so that when we re-render using [3.3.2] of recipView.js 
// at [8.2] of controller.js using stateRecipe then it displays the actual dcreased/increased servings 
export const updateServings = function(newServings){
    // In [2.3] above got we stored data from url in recipe object 
    // and in recipe object we stored recipe.servings in state.stateRecipe.servings  
    // and in recipe object we stored recipe.indgredients in state.stateRecipe.ingredients 
    // this ingredients object has quantity which stores the amount of quantity of each ingredient 
    // We need to now update this servings inside stateRecipe object in [2.6.2] below
    // and quantity object inside ingredients object which is inside stateRecipe object in [2.6.1] below

    // [2.6.1] :- 
    state.stateRecipe.ingredients.forEach(function(ing){
        ing.quantity = ing.quantity * newServings / state.stateRecipe.servings;
        // newQuantity = oldQuantity * newServings/oldServings
    });

    // [2.6.2] :- 
    state.stateRecipe.servings = newServings;
}


// [2.9] :- Stroing bookmarks in local storage 
// When we click a bookmark button and if it was not bookmarked 
// then we call addBookmark below at [2.7] is called which pushes that recipe to bookmarks[] array at [2.7.b]
// make bookmarked property of recipe on it as true
// then we will use this presistBookmarks() below to store updated bookmarks[] array with this recipe in it in localStorage 
// So that whenever we load we see it on bookmarks section as it was also bookmarked 
// then in controller.js we update the recipe to update that bookmark button
// then even after reloading page, we render the bookmarks section to display bookmarks with this recipe also in it as it was bookmarked  

// When we click a bookmark button and if it was already bookmarked  
// then we call deleteBookmark below at [2.8] is called which deletes that recipe from bookmarks[] array at [2.8.2]
// make bookmarked property of recipe on it as false 
// then we will use this presistBookmarks() below to store updated bookmarks[] array with this recipe deleted from it in localStorage 
// So that whenever we load we don't see it on bookmarks section as it's bookmark was removed 
// then in controller.js we update the recipe to update that bookmark button 
// then even after reloading page, we render the bookmarks section to display bookmarks with this recipe not in it as it was removed  
const presistBookmarks = function(){
    // Syntax :- 
    // localStorage.setItem(name with which item will be stored in localStroage and with which it will be retrieved from localAStorage, string of item thart we want to store)
    localStorage.setItem('savedBookmarks', JSON.stringify(state.bookmarks));
}


// [2.7] :- 
// This mehtod is called at [9.1.a]
// Ṭhis method passes the bookmarked recipe to bookmarks[] array    
// and use this bookmarks[] array we will show bookmarks in dedicated bookmarks section 
// and makes bookmarked property of that recipe to be true in original object 
// then at [9.2.b] we call update to update right-side recipe 
// this updates and bookmark button and makes the recipe appear bookmarked due to if check explained below at [2.7.b]
export const addBookmark = function(recipe){ // Will receive a recipe and give it a boookmark
    // [2.7.a] :- Add bookmark in bookmarks[] array above at [2.1] used to load all bookmarks in bookmark section 
    state.bookmarks.push(recipe);

    // [2.7.b] :- Makes bookmarked property of that recipe to be true in original object bcs then we again render it using update 
// ***** Actually we have an if check in generateMarkup of recipeViews.js at [3.3.2.2.extended] that 
    // if bookmarked property of recipe is true while rendering it to html then display filled bookmarked button showing that it is bookmarked 
    // else display empty bookmarked button showing that it is not bookmakred 
// ***** 

    // Mark current recipe as bookmark 
    // When we click on a recipe in left side results bar 
    // then those arfe links so id in url changes to that which link was clicked from left search results bar
    // and then at [3.5.3] of controlRecipe.js controlRecipe() which has that changed id of url is called  
    // this then calls loadRecipe of above at [2.2]
    // then we pass this state.stateRecipe in that [3.5.3] only to render recipe on left side of UI
    // ** So basically this state.stateRecipe.id is id of recipe loaded on right side due to being clicked from left menu 
    // ** And recipe.id is id also same state.stateRecipe.id passed from controller.js at [9.1.a] 
    if(recipe.id === state.stateRecipe.id){ // If received recipe's id === recipe loaded in right-side is same 
        state.stateRecipe.bookmarked = true; // Then make bookmarked property of that recipe to be true 
    } // Then we update the right side view then due to if check in markup as explained above at [2.7.b] in ****
      // it will make recipe bookmark
      
    presistBookmarks(); // After adding this recipe in bookmarks array store the updated bookmarks array in local storage above at [2.9]
}


// [2.8] :- 
// When we add something we get full data as in [2.8.1] below bcs this is needed
// and when we delete we onlty get id as in [2.8.2] below bcs this is needed

export const deleteBookmark = function(id){ // Will receive a currently loaded recipe id  

    // [2.8.1] :- 
    // We check if there is any elements in bookamrks array 
    // whose id is same as id received
    // then return that element's index so as to remove that elements from bookmarks[] array 
    // Using this bookmark array in [2.7.extended] above we make sure that if we click on other recipe then come back then it remains there 
    // and also using this bookmarks[] array we will show bookmarks in dedicated bookmarks section bcs while laoding we make it appear on it see expla at [2.7.extended] 
    // Also used to store bookmarks from this bookmarks[] array below at [2.9] into localStorage then get back in bookmarks array at init() below at [2.10] at model.js 
    // then render it further [11] in controller.js
    const index = state.bookmarks.findIndex(function(el){
        return el.id === id;
    })
    // Then using that index we remove it from bookmarks[] array 
    // Using this bookmark array in [2.7.extended] above we make sure that if we click on other recipe then come back then it remains there 
    // and also using this bookmarks[] array we will show bookmarks in dedicated bookmarks section bcs while laoding we make it appear on it see expla at [2.7.extended] 
    // Also used to store bookmarks from this bookmarks[] array below at [2.9] into localStorage then get back in bookmarks array at init() below at [2.10] at model.js 
    // then render it further [11] in controller.js
    
    state.bookmarks.splice(index, 1); // index, number of items to be deleted 
    // splice removes elements from array starting from first parameter i.e. index and removes number of items as second parameter
    // As second parameter is 1 so it will remove only element at given index  


    // [2.8.2] :- 
    // Then we add/make bookarmed property of that that recipe to be false
    // bcs at [9.2.b] we will update the reipce vies in right side
    // and due to if check as ecplained above in [2.7.b] in ** **  
    // empty bookmark btton is shown meaning not bookmared i.e. bookmark removed 

    // Again clicking bookmark on same recipe  
    // When we click on a recipe in left side results bar 
    // then those are links so id in url changes to that which link was clicked from left search results bar
    // and then at [3.5.3] of controlRecipe.js controlRecipe() which has that changed id of url is called  
    // this then calls loadRecipe of above at [2.2]
    // then we pass this state.stateRecipe in that [3.5.3] only to render recipe on left side of UI
    // ** So basically this state.stateRecipe.id is id of recipe loaded on right side due to being clicked from left menu 
    // ** And id received is id also same state.stateRecipe.id passed from controller.js at [9.2.a] 
    if(id === state.stateRecipe.id){ // If received recipe's id === recipe loaded in right-side is same 
        state.stateRecipe.bookmarked = false; // Then make bookmarked property of that recipe to be false 
    } // Then we update the right side view then due to if check in markup as explained above at [2.7.b] in ** **
      // it will remove recipe bookmark

    presistBookmarks(); // After removing this recipe from bookmarks array store the updated bookmarks array in local storage above at [2.9]
}


// [2.10] :- 
// This init() function will be called when we import this model.js in controller.js at [2]
// This store savedBookmarks[] array from localStrage into storage variabel 
// As storage variable has string of savedBookmarks[] array so JSON.parse it then store it in bookmarks[] array 
// then as page load happend then due to [10.2.2.5] of recipeViews.js, controlBookmarks at [11] of controller.js will be called
// which will render this bookmarks[] array from localStrage into bookmarks section 
const init = function(){
    const storage = localStorage.getItem('savedBookmarks');
    if(storage) state.bookmarks = JSON.parse(storage);
}
init();


// [2.11] :- Uploading user recipe to Forkify API 
//           And getting that user recipe data back also to 
//           Make it change it acc to our functions and then store it in stateRecipe to be rendered 
//           And Store it in bookmakrs[] array and in localStorage and make its bookmarked property true also 
// When upload button is clicked and submit event happens 
// then addHandlerUpload(handler) at [12.2.7] of addRecipViews.js calls and passes upload-recipe-from-data as an object to controlAddRecipe(newRecipe) at [12.4] of controller.js 
// Then after rendering spinner controlAddRecipe() at [12.4] of controller.js calls this uploadRecipe(newRecipe) of model.js with that upload-recipe-from-data as newRecipe object 
export const uploadRecipe = async function(newRecipe){
    // newRecipe is an object of received upload recipe form data passed from [12.4] of controller.js who received it from [12.2.7] of addRecipeView.js to 

// [2.11] :- 
    try{
    // [2.11.a] :- 
        // First we take out all ingredients with their quantity, unit, description from newRecipe object and put it in ingredients array of objects  
        const ingredients = // this ingredients is an array of objects 
        Object.entries(newRecipe) 
        // We again made them in array of 2_length_arrays having [recipe_keys,value_keys] 
        // (2) ['title', 'TEST12345678910'] 
        // (2) ['sourceUrl', 'TEST12345678910'] 
        // (2) ['image', 'TEST12345678910'] 
        // (2) ['publisher', 'TEST12345678910'] 
        // (2) ['cookingTime', '23'] 
        // (2) ['servings', '23'] 
        // (2) ['ingredient-1', '0.5,kg,Rice'] 
        // (2) ['ingredient-2', '1,,Tomato Suace'] 
        // (2) ['ingredient-3', ',,salt'] 
        // (2) ['ingredient-4', '']
        // (2) ['ingredient-5', '']
        // (2) ['ingredient-6', '']
        // then 
        .filter(function(entry){
            return entry[0].startsWith('ingredient') && entry[1]!=='';
        })
        // Filtered all those properties from all 2_length_arrays whose [0] started with ingredient and [1] have something(quantity, unit, description)
        // then we map on all ingredients one by one 
        .map(function(ing){ // ing is sinle 2_length_array
            const ingArr = ing[1].split(',').map(function(element){
                return element.trim();
            })
            // ingArr is single 3_length_array which must of 3 size then go for destructuring 
            if(ingArr.length !== 3){
                throw new Error('Wrong ingredient format! Please use the correct format :)');
            }
            const [quantity, unit, description] = ingArr;
            return {quantity: quantity ? +quantity : null , unit, description};
        })
        // map returns a new array and here returned object 
        // now after filtering array was like 
        // (2) ['ingredient-1', '0.5,kg,Rice'] 
        // (2) ['ingredient-2', '1,,Tomato Sauce'] 
        // (2) ['ingredient-3', ',,salt'] 
        // then used map on each element of this above array which is a 2_length_array 
        // on [1] of each 2_length_Array we split it using ',' 
        // now single arrays are like :- 
        // (3) ['0.5', 'kg', 'Rice']
        // (3) ['1', '', 'Avocado']
        // (3) ['', '', 'salt']
        // then again map on it and use trim on each elemnt of those arrays 
        // like :- if [''. '    ', salt] :- ['','',salt] 
        // map returned array of 3_length_Array and name it as ingArr :- 
            // (They are getting printed but actually after every round of loop bit look like this bcs we print only this na 
            // Actually ingArr is a single 3_length_array):- 
        // (3) ['0.5', 'kg', 'Rice']
        // (3) ['1', '', 'Avocado']
        // (3) ['', '', 'salt']
        // Then If length of any array of ingArr[] is less than 3 means wrong format so error 
        // now that array will look like :- 
            // (They are getting printed but actually after every round of loop bit look like this bcs we print only this na 
            // Actually ingArr is a single 3_length_array):- 
        // (3) ['0.5', 'kg', 'Rice']
        // (3) ['1', '', 'Tomato Suace']
        // (3) ['', '', 'salt']
        // now we destructure each of above ingArr[] array into 3 variables 
        // then we make an object of each of above array 
        // and due to map a new object will be created with all these little objects 
        // and named as ingreditents 
        
        // now ingredients array of object looks like :- 
        // (3) [{…}, {…}, {…}]
        // 0:{quantity: 0.5, unit: 'kg', description: 'Rice'}
        // 1:{quantity: 1, unit: '', description: 'Tomato Suace'}
        // 2:{quantity: null, unit: '', description: 'salt'}
        // length:3
        // [[Prototype]]: Array(0)

        
    // [2.11.b] :- 
        // newRecipe is object of upload form data received 
        // now we make that newRecipe into our same format as that of forkify so as to upload it on forkiy api 
        // ans also. so that our methods can render this also    
        const user_recipe = {
            title: newRecipe.title,
            source_url: newRecipe.sourceUrl,
            image_url: newRecipe.image, 
            publisher: newRecipe.publisher,
            cooking_time: +newRecipe.cookingTime,
            servings: +newRecipe.servings,
            // ingredients: ingredients,
            ingredients
        }

    // [2.11.c] :- 
        // Now at https://forkify-api.herokuapp.com/v2 - Forkify API 
        // Click on generate your API key 
        // store that API key in config.js at [4] and import it above at [2.0] above 
        // Now using sendJSON imported above at [2.0]
 
        // When we upload a recipe, it doesn’t go to the public API openly to avoid contaminating the public data.
        // Instead, it gets stored in the API under our API key.
        // and sendJSON also receive that recipe data back and store it in data varaible 
        // This also means we can access our uploaded recipes only using our API key 
        // although they are also on the public API but are stored under our API key so not accessible without API key 
        // Therefore, when we search for recipes with our API key, the search results will include all recipes, including our uploaded ones.
        // Additionally, when we click on one of our own recipes, the data is retrieved from the API only when using our API key = KEY of [4] of config.js

        const data = await sendJSON(`${API_URL}?key=${KEY}`, user_recipe);

        // Then we createRecipeObject will take out that recipe data 
        // since data recceived from sendJSON has key property so createObject will store key property in its stateRecipe also
        // which will be further used :- 
        // at [10.2.2.2.extended.2] of bookmarksView.js and [6.2.2.2.extended.2] of resultsView.js and [6.2.2.2.extended.2] of recipeViews.js 
        // and format that accordingly that to be rendered further using existing functions 
        // then store it into state.stateRecipe to be rendered easily at [12.4.3] of controller.js 
        state.stateRecipe = createRecipeObject(data);

        // Also put this recipe into addBookmark() function of above at [2.7] 
        // which will add this in bookmarks array and make its bookmarkde property to be true and then push it into local storage 
        addBookmark(state.stateRecipe);
    }
    catch(err){
        throw(err);
    }
}


