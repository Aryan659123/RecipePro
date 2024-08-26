// [6.1] :- 
// In index.html, we were referencing images from the img folder.
// When the project is bundled using Parcel, it creates a dist folder
// where it places the final bundled files, including index.html.
// This can lead to issues with paths to assets like images,
// because the project structure changes after bundling.
// After using Parcel, index.html gets converted to index.html inside the dist folder,
// which cannot access images from the img folder directly.
// To resolve this, we import images from icons.svg inside the img folder:
// import { concat } from 'core-js/core/array';
import icons from '../../img/icons.svg';

// [6.2] :- 
class ResultsView {
    // [6.2.2.6.extended] :- 
    _errorMessage = "No Recepies found for your query! Please try again ;)";
    // [6.2.2.7.extended] :- 
    _successMessage = "";

// [6.2.1] :- Choose the resultsContainer on left side as parent element :- 
    _parentElement = document.querySelector('.results');

// [6.2.2] :- Make a private data variable 
    _data; // It will be used to store array of recipes as data parameter from controller.js(which received from model) from [4.3.3] 
    render(data){ // render receives an array of recipes as data parameter from controller.js(which received from model) from [4.3.3] 
                  // and store this data in this._data 
        
        if(!data || (Array.isArray(data) && data.length===0)){ // If there is data and that data is an array and that array is empty then return error 
            // document.querySelector('.recipe') = '';
            // No need to empty this bcs it already do this in renderError() 
            return this.renderError(); // No need to pass message as set default in errorMessage
        }
        // [6.2.2.1] 
        this._data = data; // then we store that received recipe data into _data of this function 

        // [6.2.2.2] 
        const markup = this._generateMarkup(); // Now use data of array of result recipe received and create html element to be displayed into left side search results list
        // now markup variable is an HTML string having HTML items of left side search results list received from [6.2.2.extended] 

        // [6.2.2.3]
        this._clear(); // Once we search a query in search then we need to clear container having previous then display then new results 

        // [6.2.2.4]
        this._parentElement.insertAdjacentHTML('afterbegin', markup); 
        // then fill parentElement(resultsContainer) with markup i.e. list of HTML items of left side search results list  
    }

    // [6.2.2.3.extended]
    _clear(){
        this._parentElement.innerHTML = '';
    }

    // [6.2.2.5] :- Giving select effect to the recipe that we click in left side search result list such that it looks like it remained selected 
    // When we click on recipe then id in url changes then due to [3.3.2.6] of recipeViews controlRecipe() at [3.5] of controller.js is called 
    // which is responsible to render recipe on right side in recipeContainer and due to which url of page changes with id of clicked recipe
    // called recipeView.update() here in controlRecipe() at [3.5] of controller.js 
    // bcs it gets called when we click on a recipe from left side search result list 
    // then the changed id due to that recipe link can help to update the the same recipe in left side search result list also 
    // In it we also call this resultsView.update() function of below at [6.2.2.5] is called at [3.5.1] of controller.js before rendering resultant recipe on right side (Aise hii)
    // the update function got called with existing left side search result list and we stored it into this.data  
    // So below In update() We again make a newMarkup using _generateMarkup() using this.data which is same as previous left side search results 
    // As we clicked on a recipe then id of url becomes the id of clicked recipe as recipes are not buttons but are links 
    // So _generateMarkupPreview() at [6.2.2.2.extended.2] resposible for making items of left side search results list 
    // checks if id of recipe is same as id of url of window  i.e. if recipe is loaded on right side 
    // id is same then we give it preview__link--active class which makes it appear as selected 
    // Now due to that if check of _generateMarkup() at [6.2.2.2.extended.2] 
    // in newMarkup we again made the list with only change the recipe we clicked on got preview__link--active class due to that if check 
    // Now instead of re-rendering entire left side searh results container with newMarkup 
    // we want to just update the search result that got this preview__link--active class
    // we made newDOM from newMarkup 
    // then converted that newDom into newElements array which is array of child nodes of newDom
    // then converted exisiting DOM into curElements array which is array of child nodes of existing Dom
    // Then we traverse on newElements and curElements array and see which node(element) is not same
    // Then we simply traverse on all attributes of that different node(element) of newElements array 
    // and put all those attriutes with their values on that different node(element) of curElements array
    // Since we were updating nodes meaning actualy child Nodes of existing DOM 
    // So existing DOM got with that preview__link--active class elemnt 
    update(data){ // Receives existing search results data [3.5.1] of controller.js
      this._data = data; // Store this received data into _data which is at [6.2.2.1] used to generate newMarkup  
      const newMarkup = this._generateMarkup(); // No using update _data we generate newMarkup 
      
      // newMarkup is a string of html that we actually render on left side search results 
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

          // Update search result that got new attribute of selected class 
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

    // [6.2.2.6] :- Error Handling in view 
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
      this._clear(); // If we received null or undefined or an empty array due to incorrect search then  
      this._parentElement.insertAdjacentHTML('afterbegin', markup); // display error msg  
    }

    // [6.2.2.7] :- Success Message
    renderSuccess = function(msg = this._successMessage){
        const markup = 
        `<div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>`
      this._clear();
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
    }
    
    // [6.2.2.2.extended]
    // [6.2.2.2.extended.1]
    _generateMarkup(){
        // Bascially data is an array of recipes 
        // We pass each elements of data i.e. each recipe into generateMarkupPreview 
        // and generateMarkupPreview makes each recipe into an HTML element which is to be an HTML item of left side search results list   
        // and map makes an array of HTML items of left side search results list 
        // and then we join that elements of array into a string 
        // i.e. we join all HTML items of left side search results list into a string 
        // then return it to above [6.2.2.2] to markup variable 
        // now markup variable is an HTML string having HTML items of left side search results list 
        // the string looks like below string in _generateMarkupPreview but more than one items depending upon size of recipe array received  
        // then we display that markup on UI at [6.2.2.4] 
        return this._data.map(this._generateMarkupPreview).join('');
    }

    // [6.2.2.2.extended.2] Generating search results list items for left-side-search-results-list :- 
    // When we upload a recipe, it doesn’t go to the public API openly to avoid contaminating the public data.
    // Instead, it gets stored in the API under our API key.
    // This means we can access our uploaded recipes only using our API key 
    // although they are also on the public API but are stored under our API key so not accessible without API key 
    // Therefore, when we search for recipes with our API key, the search results will include all recipes, including our uploaded ones.
    // Additionally, when we click on one of our own recipes, the data is retrieved from the API only when using our API key = KEY of [4] of config.js
    // since data received from sendJSON at [2.11.c] of model.js has key property 
    // So createObject will store key property in its stateRecipe also
    // Now, we check if there is key then add user icon on bottom right corner on search result in left-side-search-results-list
    // using recipe__user-generated class vala div below

    _generateMarkupPreview(dataEachRecipe){
        const id = window.location.hash.slice(1); 
        // i.e. leaving # from #664c8f193e7aa067e94e8742 

        return `
          <li class="preview">
            <a class="preview__link ${dataEachRecipe.id === id ? "preview__link--active" : ''}" href="#${dataEachRecipe.id}">
              <figure class="preview__fig">
                <img src="${dataEachRecipe.image}" alt="Test" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${dataEachRecipe.title}</h4>
                <p class="preview__publisher">${dataEachRecipe.publisher}</p>
                <div class="recipe__user-generated ${dataEachRecipe.key ? '' : 'hidden'}">
                  <svg>
                    <use href="${icons}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
        `
    }
}


// [6.3] :- Exported to be used in controller 
export default new ResultsView();

// Not exporting the original class.
// Exporting an instance(object) of the class.
// This way, changes made to this instance will be reflected across all modules that import it,
// ensuring consistency without modifying the original class definition.



