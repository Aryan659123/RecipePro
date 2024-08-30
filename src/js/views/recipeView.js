// [3.1] :- 
// In index.html, we were referencing images from the img folder.
// When the project is bundled using Parcel, it creates a dist folder
// where it places the final bundled files, including index.html.
// This can lead to issues with paths to assets like images,
// because the project structure changes after bundling.
// After using Parcel, index.html gets converted to index.html inside the dist folder,
// which cannot access images from the img folder directly.
// To resolve this, we import images from icons.svg inside the img folder:
import icons from '../../img/icons.svg';

// [3.2] :- Used below in [3.3.2.2.extended.extended] 
// So that in case of quantity are 0.5 cups or 3.5 cups etc... then it gets converted to fractions like 1/5 cups or 3/5 cups etc...
// import Fraction from 'fractional'; // otherwise we need to do new Fraction.Fraction(ing.quantity)
// as Fraction is inside Fraction
// import {Fraction} from 'fractional'; // Can Also use => '../../../node_modules/fractional' in place of 'fractional' 
// now we need to do new Fraction(ing.quantity)


// [3.3] :- 
class RecipeView {
    // [3.3.2.9.extended] :- 
    _errorMessage = "We could not find that recipe. Please try another one!";
     

// [3.3.1] :- Choose the recipeContainer as parent element :- 
    _parentElement = document.querySelector('.recipe');

// [3.3.2] :- Make a private data variable 
    _data; // It will be used to store recipe data as data parameter from controller.js(which received from model) from [4.4] 
    render(data){ // render receives recipe data as data parameter from controller.js(which received from model) from [4.4] 
                  // and store this data in this._data 
        // [3.3.2.1] 
        this._data = data; // then we store that received recipe data into _data of this function 

        // [3.3.2.2] 
        const markup = this._generateMarkup(); // Now use data of recipe received and create html recipe element to be displayed into html

        // [3.3.2.3]
        this._clear(); // Once we load OR Once Hashchanges due to selecting an item we make parentElement(recipeContainer) empty before filling it with new one 

        // [3.3.2.4]
        this._parentElement.insertAdjacentHTML('afterbegin', markup); // then again fill parentElement(recipeContainer) with requested/received recipe's content 
    }

    // [3.3.2.3.extended]
    _clear(){
        this._parentElement.innerHTML = '';
    }
    
    // [3.3.2.5] :- 
    // We use this renderSpinner in controller.js at [4.2] while waiting for data in model.js 
    renderSpinner = function(){
        const markup =                          
          `
            <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
          `
        this._clear(); // while we wait for recipe data just make entire container empty 
        this._parentElement.insertAdjacentHTML('afterbegin', markup); // display spinner till data is received 
    }
    
    // [3.3.2.9] :- Error Handling in view 
    renderError = function(msg = this._errorMessage){
        const markup = 
        `<div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>`
      this._clear(); // while we wait for recipe data just make entire container empty 
      this._parentElement.insertAdjacentHTML('afterbegin', markup); // display error msg  
    }

    // [3.3.2.6] :- Call controlRecipe() on when hashchange and when page loads
    // addHandlerRender() is publisher function getting recipeController(subscribe_function as an argument as handler) of controller.js at [3.4.4]
    // from init()(publisher) of controller.js at [3.4.4]
    addHandlerRender(handler){ // This will be controlRecipe() of conroller.js at [3.5]
        window.addEventListener('hashchange', handler); // If recipe is clicked then hash changes and controlRecipe is called to display the recipe 
        window.addEventListener('load', handler); // If already a hash in url then and controlRecipe is called to display the recipe 
    }
    // Due to [6.2.2] of resulstsVie.js the results on side bar have links so when we click on them link changes then id in url changes i.e. hash changes 
    // Due to hash change addhandlerRender of recipeView at [3.3.2.6] gets called 
    // in which controlRecipe() was passed as subscriber_function by subscriber - init() below at [5] 
    // and due to controlRecipe render() of recipeView.js at [3.3.2] gets called which displays recipe and ingridents and all on right 
    
    
    // [3.3.2.7] :- 
    // 3 Phases and Event Delegation uses :- 
    // Every event goes throgh 3 phases :- Capturing, target, bubling phase 
    // Event Delegation is technique where we attach Event handler to parent element i.e. full recipe container 
    // and not to each child element and catch event during capturing or bubbling phase 
    // Event delegation via capturing can be used just add true as second parameter 
    // No we will see event delegation via bubbling :- 
    // When we click the increasde btn or decrease btn then event e happens 

    // While bubbling phase i.e. while returning we listen for this event from bottom to top 
    // e.target is the element where the event e happend i.e. may be btn OR may be clicked on svg icon like (+) so <svg> tag id target
    // e.target.classList.contains('class-name') will check if the target element has the specified class, and will fail if the class is not found.
    // problem is that when we click on button we may click on svg icon or something in it but button is not clicked 
    // so e.target will be svg tag and not full button 
    // but due to closest it searches up the DOM tree till it finds the nearest ancestor/parent having class that we were looking for 
    // like we look for .btn--update-servings.  class but click on svg icon of btn 
    // then closest searches up the DOM tree till it finds the nearest ancestor/parent having .btn--update-servings. 
    // This ensures that even if our target was svg tag i.e. (+) icon still that correct button element is found.
    // If a matching element is found, it is assigned to the btn variable = <btn> tag  
    // If not, btn is null, and the function returns early.
    addHandlerUpdateServings(handler){ // This will be controlRecipeServings() at [8] of controller.js
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--update-servings');
            if(!btn) return;
            // "data-update-to" is dataset class on bth incr and drc btns  
            // "data-update-to = this.data.servings [+1 if incr btn clicked and -1 if decr btn clicked]"
            // as we updated the servings acc to which bt is clicked in this update class 
            // then save it and send it to controlRecipeServings() at [8] of controller.js 
            // to update only required parts of recipe in right using update() below at [3.3.2.8]
            // instead of re-rendering full-recipe in right. 
            // Changes in it = Update number of servings acc to btn clicked and updated quantity of each ingredient acc of number of servings
            // actual name is <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings-1}">                        
            // ** Js converted data-update-to to updateTo class ** 

            // Wihtout object destrcturing :- 
            // const updateTo = +(btn.dataset.updateTo); // + is for type-casting as in class its a string 

            // With object destrcturing :- 
            const {updateTo} = btn.dataset; // Will do type casting on updateTo but later down as it


            // ***** Basically when we are clicking on btn we are changing number of servings in its dataset property ***** 
            // but we are not storing it in original servings or rendering it at that moment 
            // We check below if the number became <1 i.e. 0 then don't do anything 
            // else pass it and store the number of servings actually and render it accordingly 

            // We can alert or do simply 
            // if(updateTo<1){ // or >0 smae thing means should not got to <=0 
            //     alert("Servings cannot be less than 1");
            //     return;
            // }
            // handler(updateTo);

            if(+updateTo>0){
                handler(+updateTo); // + is for type-casting 
            }
            // Using this handler, we sent this updated data to controlRecipeServings() at [8] of controller.js 
            // then from [8.2] of controller.js we sent this updated data back here 
            // to below [3.3.2.8] update() funtion to update only those texts/atributes 
            // which are changed in recipe in right
            // instead of re-rendering whole recipeContainer in right
        })
    }

    // [3.3.2.8] :- 
    // Receives updated data acc to new servings from [8.2] of controller.js
    // to use here at [3.3.2.8] in update() funtion to update only those texts/atributes 
    // which are changed in recipe in right
    // instead of re-rendering whole recipeContainer in right
    update(data){ // Receives updated data acc to new servings from [8.2] of controller.js
        this._data = data; // Store the received updated data here in _data at [3.3.2] used for _generateMarkup()
        const newMarkup = this._generateMarkup(); // Now using updated _data to generate newMarkup 
        
        // newMarkup is a string of html that we actually render in [3.3.2] 
        // But not here bcs we here want to compare 
        // Now converting that newMarkup string into virtual DOM 
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll('*')); 
        // returned a nodelist of nodes of DOM, So converted into array of nodes of DOM

        const curElements = Array.from(this._parentElement.querySelectorAll('*')); 
        // returned a nodelist of nodes, So converted into array of nodes of DOM
        
        // Now here we compare 
        // newElements(i.e. the elements of Updated DOM(i.e. stored in newDOM)) which are not rendered yet 
        // with 
        // curElements(i.e. the elements of already existing DOM on UI 
        newElements.forEach(function(newEl, i){ // each node of newElements array which is element of newDOM and index of array
            
            // now each node of curElements array which is element of existing DOM from same index i 
            // as both has newDom and existing DOM have same number of elements so same index i 
            const curEl = curElements[i]; 

            // Update changed text 
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ""){ 
                // If both nodes are not equal 
                // With optional chaining check whether firstChild with text exis or not like using this method for bookmark at [3.3.2.10]to but it has no first child ?
                // Then check only those child elements which have text content 
                // by getting their firstChild of newEl i.e. text node and seeing its value is not empty
                // now we know this first child i.e. text node of newEL is changed in curEl 
                // then we set the textContent of curEl to the textContent of newEl 
                curEl.textContent = newEl.textContent;
            }

            // Update changed data-update-to attributes of btns having servings number  
            if(!newEl.isEqualNode(curEl)){
                // Taking only those nodes which are changed 
                // Made an array of attributes of changed elemnts by Array.from(newEl.attributes)
                // Then Traversing on array of all attribues of newEl using forEach
                Array.from(newEl.attributes).forEach(function(attr){
                    curEl.setAttribute(attr.name, attr.value);
                    // Updating attribte names and values of curEl of with attribute names, values of newEl
                })
            }
        })
    }

   
    // [3.3.2.10] :- 
    // If bookmark button is clicked then it will call controlAddBookmark function at [9] of controller.js 
    // which will then render it to UI using [9.1] to add bookmark OR [9.2] to remove bookmark if already bookmarked then to remove
    addHandlerAddBookmark(handler){
        // Basically the btn not exist when we load page as we need to search a recipe 
        // So can't attach eventhandler to somthing that not exist
        // So event delegation is best 
        // Expla of event elegation is best in [3.3.2.7] 
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--bookmark');
            if(!btn) return;
            handler();
        })
    }

    // [3.3.2.2.extended] Displaying recipe in right side recipeContainer :- 
    // When we upload a recipe, it doesn’t go to the public API openly to avoid contaminating the public data.
    // Instead, it gets stored in the API under our API key.
    // This means we can access our uploaded recipes only using our API key 
    // although they are also on the public API but are stored under our API key so not accessible without API key 
    // Therefore, when we search for recipes with our API key, the search results will include all recipes, including our uploaded ones.
    // Additionally, when we click on one of our own recipes, the data is retrieved from the API only when using our API key = KEY of [4] of config.js
    // since data received from sendJSON at [2.11.c] of model.js has key property 
    // So createObject will store key property in its stateRecipe also
    // Now, we check if there is key then add user icon on left side of bookmark button 
    // using recipe__user-generated class vala div below
    _generateMarkup(){
        return `
            <figure class="recipe__fig">
                <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
                <h1 class="recipe__title">
                    <span>${this._data.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                    <use href="${icons}#icon-clock"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                    <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                    <use href="${icons}#icon-users"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>                    
                    <span class="recipe__info-text">servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings-1}">                        
                            <svg>
                            <use href="${icons}#icon-minus-circle"></use>
                            </svg>
                        </button>
                        <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings+1}">
                            <svg>
                            <use href="${icons}#icon-plus-circle"></use>
                            </svg>
                        </button>
                    </div>
                </div>

                <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
                    <svg>
                    <use href="${icons}#icon-user"></use>
                    </svg>
                </div>

                <button class="btn--round btn--bookmark">
                    <svg class="">
                    <use href="${icons}#icon-bookmark${this._data.bookmarked ? '-fill' : ''}"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                    ${this._data.ingredients
                    .map(this._generateMarkupIngredient).join("")}
                </ul>
            </div>

            <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__publisher">${this._data.publisher}</span>.
                    <br>
                    Please check out directions at their website.
                </p>
                <a
                    class="btn--small recipe__btn"
                    href="${this._data.sourceUrl}"
                    target="_blank"
                >
                    <span>Directions</span>
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </a>
            </div>
        `
        // At [3.3.2.2.extended] direction button is not a button but a link 
        // It becomes workable this link points to sourceURL that we get from API 
    }

    // [3.3.2.2.extended.extended]
    // This is [3.3.2.2.extended] ka vo part where we needed to map all ingredients (where .join() is used) 
    _generateMarkupIngredient(ing){
        return `
            <li class="recipe__ingredient">
            <svg class="recipe__icon">
            <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
            </svg>
            <div class="recipe__quantity">${ing.quantity ? ing.quantity : ""}</div>
            <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
            </div> 
            </li> 
        `; 
        // Here we joined all elements (having ingredients and their quantities) using .join("") 
        // So that they appear like a list in a grid from 
    }
}


// [3.4] :- Exported to be used in controller 
export default new RecipeView();
// Not exporting the original class.
// Exporting an instance(object) of the class.
// This way, changes made to this instance will be reflected across all modules that import it,
// ensuring consistency without modifying the original class definition.



