// [12.1] :- 
// In index.html, we were referencing images from the img folder.
// When the project is bundled using Parcel, it creates a dist folder
// where it places the final bundled files, including index.html.
// This can lead to issues with paths to assets like images,
// because the project structure changes after bundling.
// After using Parcel, index.html gets converted to index.html inside the dist folder,
// which cannot access images from the img folder directly.
// To resolve this, we import images from icons.svg inside the img folder:
import icons from '../../img/icons.svg';

// [12.2] :- 
class AddRecipeView {
    // [12.2.8.extended] :- 
    _errorMessage = "We could not find that recipe. Please try another one!";

    // [12.2.9.extended] :- 
    _successMessage = "Recipe was successfully uploaded";

// // [12.2.1] :- Selecting Required Buttons :- 
    // [12.2.1.1]
    _parentElement = document.querySelector('.FormContainer'); // div containing form 

    // [12.2.1.2] :- 
    _formContainerWindow = document.querySelector('.add-recipe-window');

    // [12.2.1.3] :- 
    _overlay = document.querySelector('.overlay');

    // [12.2.1.4] :- 
    _btnOpen = document.querySelector('.nav__btn--add-recipe');

    // [12.2.1.5] :- 
    _btnClose = document.querySelector('.btn--close-modal');


// [12.2.2] :- To Show or Hide Form window (Used below in [12.2.3.4] and [12.2.6])
    // When we click on open/close btn to open/close form window then we toggle the hidden class on overlay and form window :-
    // If form is close then window and overlay are hidden and then, when we click on open button then hidden gets removed from window and overlay and they become visible 
    // If form is open then window and overlay are not hidden and then, when we click on close button then hidden gets added on form window and overlay and they become hidden  
    toggleWindow(){
        this._overlay.classList.toggle('hidden');
        this._formContainerWindow.classList.toggle('hidden');
    }

// [12.2.3] :- Creat and Display form when we click btnOpen i.e. add recipe button 
    // When we click on openBtn i.e. addRecipe btn then _addHandlerFormView below at [12.2.6] 
    // will call controlFormView with a formStatus as open at [12.4] of controller.js 
    // Then as we sent formStatus as open means we want to open form 
    // then it will call this renderShowForm() at [12.2.3]
    // which will create form everytime when openBtn i.e. addRecipe btn is clicked 
    renderShowForm(){ 
        // [12.2.3.1] 
        const markup = this._generateMarkup(); // Make that form 

        // [12.2.3.2]
        this._clear(); // When we click for first tym then okk. But when we click again After uploading a recipe/After doing some error
                       // Then we clear the success or error msg before loading the form again  

        // [12.2.3.3]
        this._parentElement.insertAdjacentHTML('afterbegin', markup); // then fill parent element with addRecipe form 

        // [12.2.3.4]
        this.toggleWindow(); // Then use toggle window of above at [12.2.2] to open form  
    }
    
// [12.2.3.2.extended] :- 
    _clear(){
        this._parentElement.innerHTML = '';
    }
    

// [12.2.4] :- Hide form and overlay window when we click on closeBtn i.e. X or somewhere on overlay(blur) window :- 
//          Overlay is the blur window everywhere except form 
//          So if click anywhere out of form i.e. on overlay window then form should close 
    // When we click on closeBtn i.e. X btn then 
    // _addHandlerFormView of below at [12.2.6] will call controlFormView with a formStatus as close at [12.4] of controller.js 
    // Then as we sent formStatus as close means we want to close form 
    // then it will call this below renderHideForm below at [12.2.4]
    // which will use toggleWindow() above of [12.2.2] to close form and close overlay window  
    renderHideForm(){
        this.toggleWindow();   
    }

// [12.2.5] :- 
    renderSpinner = function(){
        const markup = 
            `
            <div class="spinner">
                <svg>
                <use href="${icons}#icon-loader"></use>
                </svg>
            </div>
            `
        this._clear(); // while we wait for till success msg/error msg to be displayed just make entire container empty 
        this._parentElement.insertAdjacentHTML('afterbegin', markup); // display spinner till success msg/error msg is displayed 
    }    

// [12.2.6] 
    _addHandlerFormView(handler){
    // [12.2.6.1] :- Create and Display form when we click btnOpen i.e. add recipe button :- 
        // When we click on openBtn i.e. addRecipe btn then 
        // this will call controlFormView with a formStatus as open at [12.4] of controller.js 
        // Then as we sent formStatus as open means we want to open form 
        // then it will call renderShowForm of above at [12.2.3]
        // which will create form everytime when openBtn i.e. addRecipe btn is clicked 
        this._btnOpen.addEventListener('click',function(){
            handler("open")
        });    


    // [12.2.6.2] :- Hide form and overlay window when we click on closeBtn i.e. X or somewhere on overlay(blur) window :- 
        //           Overlay is the blur window everywhere except form 
        //           So if click anywhere out of form i.e. on overlay window then form should close 
        // When we click on closeBtn i.e. X btn then 
        // this will call controlFormView with a formStatus as close at [12.4] of controller.js 
        // Then as we sent formStatus as close means we want to close form 
        // then it will call renderHideForm of above at [12.2.4]
        // which will use toggleWindow() above of [12.2.2] to close form and close overlay window 
        this._btnClose.addEventListener('click',function(){
            handler("close")
        });
        this._overlay.addEventListener('click',function(){
            handler("close")
        });
    }

// [12.2.7] :-  Due to handler which is controlAddRecipe() at [12.5] of controller.js :- 
//              Upload recipe to API 
//              which will show load spinner recipe till succcess msg/error msg 
//              upload new recipe to API to specifice API key 
//              and in bookmarks and localStrage also 
//              render it in bookmarks 
//              display success message 
    addHandlerUpload(handler){ // This handler is controlAddRecipe() at [12.5] of controller.js 
        // _parentElement is the form container and we attached eventListner to this _parentElement(formContainer)
        // and not attached eventListner to form 
        // as e.target will be form 

        // Since Click event happened on submit button(upload btn). 
        // this._parentElement.addEventListener('click', function(e){}). So in this e.target will be upload btn 

        // But sumbit event happened of on form and not of submit button(upload btn) 
        // this._parentElement.addEventListener('sumbit', function(e){}). So in this e.target will be form btn 
        
        this._parentElement.addEventListener('submit', function(e){
            // [12.2.7.0] :- 
            e.preventDefault();
            
            // [12.2.7.1] :- 
            // sumbit event happened on form and not of submit button(upload btn) 
            const form = e.target; // e.target is form element(full form element)
            // Then use this form variable below in [12.2.7.3]to get its data 
            
            // [12.2.7.2] :- 
            // Can get form data by traversing on each field of form and using .textContent 

            // [12.2.7.3] :- 
            // Can get form data using FormData API
            // Syntax :- new FormData(formElement-HTML element from which data is to be collected) 
            const dataArr = [...new FormData(form)]; // this form we got from just above at [12.2.7.1] of this method 
            // As it returns an object of weired fields 
            // So we spread that data into dataArr - an array of 2_length_arrays having [recipe_keys,value_keys] using spread operator 

            // [12.2.7.4] :- 
            // As recipe data is always an object. 
            // So converting recipe data from dataArr - array of 2_length_arrays having [recipe_keys,value_keys] 
            // into an object of recipe_keys as property and value_keys as values
            const data = Object.fromEntries(dataArr); // Takes an array of entries and convert it into object

            // [12.2.7.5] :- 
            // Then pass this data to controlAddRecipes() at [12.5] of controller.js 
            // to do the furter things 
            handler(data);
        })
    }
    

// [12.2.8] :- Error Handling in view 
    renderError = function(msg = this._errorMessage){ // If no msg passed from controller.js then this default message at [12.2.8.extended] 
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


// [12.2.9] :- Success Message
    renderSuccess = function(msg = this._successMessage){ // If no msg passed from controller.js then this default message at [12.2.9.extended]
        const markup = 
        `<div class="message">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${msg}</p>
      </div>`
      this._clear(); // while we wait for recipe data just make entire container empty 
      this._parentElement.insertAdjacentHTML('afterbegin', markup); // display error msg  
    }


// [12.2.3.1.extended] :-  
    _generateMarkup(){
        return `
            <form class = "upload">
                <div class="upload__column">
                <h3 class="upload__heading">Recipe data</h3>

                <label>Title</label>
                <input 
                    value="" 
                    required 
                    name="title" 
                    type="text" 
                    placeholder="Recipe Name (minimum 3 characters)" 
                />

                <label>URL</label>
                <input 
                    value="" 
                    required 
                    name="sourceUrl" 
                    type="text"  
                    placeholder = "Cooking Directions URL (minimum 5 chars)"
                />

                <label>Image URL</label>
                <input 
                    value="" 
                    required 
                    name="image" 
                    type="text" 
                    placeholder="Image URL (minimum 4 characters)" 
                />

                <label>Publisher</label>
                <input 
                    value="" 
                    required 
                    name="publisher" 
                    type="text" 
                    placeholder="Publisher Name (minimum 4 characters)" 
                />

                <label>Prep time</label>
                <input 
                    value="" 
                    required 
                    name="cookingTime" 
                    type="number" 
                    placeholder="Cooking Time(minutes, up to 1000)"
                />

                <label>Servings</label>
                <input 
                    value="" 
                    required 
                    name="servings" 
                    type="number" 
                    placeholder="Number of Servings (up to 1000)"
                />
                </div>

                <div class="upload__column">
                <h3 class="upload__heading">Ingredients</h3>
                <label>Ingredient 1</label>
                <input
                    type="text"
                    required
                    name="ingredient-1"
                    placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 2</label>
                <input
                    type="text"
                    name="ingredient-2"
                    placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 3</label>
                <input
                    type="text"
                    name="ingredient-3"
                    placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 4</label>
                <input
                    type="text"
                    name="ingredient-4"
                    placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 5</label>
                <input
                    type="text"
                    name="ingredient-5"
                    placeholder="Format: 'Quantity,Unit,Description'"
                />
                <label>Ingredient 6</label>
                <input
                    type="text"
                    name="ingredient-6"
                    placeholder="Format: 'Quantity,Unit,Description'"
                />
                </div>

                <button class="btn upload__btn">
                <svg>
                    <use href="${icons}#icon-upload-cloud"></use>
                </svg>
                <span>Upload</span>
                </button>
            <form>
        `
    }
}


// [12.3] :- Exported to be used in controller 
export default new AddRecipeView();
// Not exporting the original class.
// Exporting an instance(object) of the class.
// This way, changes made to this instance will be reflected across all modules that import it,
// ensuring consistency without modifying the original class definition.



