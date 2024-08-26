// [7.1] :- 
// In index.html, we were referencing images from the img folder.
// When the project is bundled using Parcel, it creates a dist folder
// where it places the final bundled files, including index.html.
// This can lead to issues with paths to assets like images,
// because the project structure changes after bundling.
// After using Parcel, index.html gets converted to index.html inside the dist folder,
// which cannot access images from the img folder directly.
// To resolve this, we import images from icons.svg inside the img folder:
import icons from '../../img/icons.svg';


// [7.2] :- 
class PagenationView {
    // [7.2.1] :- 
    _parentElement = document.querySelector('.pagination');

    // [7.2.2] :- 
    _data; // It will be used to store search object of state object of model.js at [2.1] 
    // sent from [4.3.3] of controller.js for initial and [7.5] of controller.js when next page button or prev page button is clicked 

    // [7.2.3] :- 
    render(data){ // render receives recipe data as data parameter from controller.js(which received from model) from [4.4] 
                  // and store this data in this._data 
        // [7.2.3.1] :- 
        this._data = data; // then we store that data into _data of this function so as to use below in markup 
        
        // [7.2.3.2] :- 
        const markup = this._generateMarkup(); // Now use data of recipe received and create html recipe element to be displayed into html 

        // [7.2.3.3] :- 
        this._clear(); // Once we load OR Once Hashchanges due to selecting an item we make parentElement(paginationContainer) empty before filling it with new one 

        // [7.2.3.4] :- 
        this._parentElement.insertAdjacentHTML('afterbegin', markup); // then again fill parentElement(paginationContainer) with page number button prev current next depending acc to situation 
    }

    // [7.2.3.3.extended] :- 
    _clear(){
        this._parentElement.innerHTML = '';
    }
    

    // [7.3] :- 
    addHandlerClick(handler){
        // Using event delgation via bubbling 
        // means we add event listner to paretnElement and we bubble up 
        // see who was clciked i.e. see nearest to parent element that was clicked 
        // then listen to it 
        this._parentElement.addEventListener('click', function(e){
            const btn = e.target.closest('.btn--inline') 
            // closest() listens up till parent
            // similar to querySelector() who listens down till end 
            // Now when we click on prev or next 
            // i.e. something-somewhere on parent element was clicked 
            // now listening to which btn was clicked nearby parent element  
            
            if(!btn) return;
            const gotoPage = +btn.dataset.goto; // dataset.goto bcs data-goto is a class on every button
            // + to type cast or use Number(btn.dataset.goto)

            handler(gotoPage);
            // then we send the page number button clicked to the contorolPagination(subscriber_function) received as handler from init() at [5] of controller.js 
            // then page number received to this controlPagination() at [7.5] of controller.js :-
            // updates page number in model and renders only some search results acc to page number and page number buttons acc to received page button 
        })
    }

    // [7.2.3.2.extended] :- 
    _generateMarkup(){
        const curPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage); 
        // To round of to next integer like 5.9 to 6 or 4.5 to 5 etc........ 


        /// a. /// Chose 3 conditions to display :- 
        // current + next for 1st page
        // prev + current for last page 
        // prev + current + next for page in btw 1st and last 
        // only current(If one page)
        /// b. /// Used 3 css classes from _components.scss :- 
        // btn--empty for empty btn means should not be displayed but displayed invisible as to make symmetry
        // btn--current for current btn 
        // btn--inline for next or prev btns  

        // Page 1 and there are other pages 
        if(curPage === 1 && numPages>1){
            // means at first page but multiple pages so display current + next button
            return `
                <button data-goto="${curPage}" class="btn--empty">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage-1}</span>
                </button>

                <button data-goto="${curPage}" class="btn--current">
                    <span>Page ${curPage}</span>
                </button>

                <button data-goto="${curPage + 1}" data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            `
        }
        
        // Last page 
        else if(curPage === numPages && numPages>1){ 
            // means at last page but multiple pages so display prev + current button
            return `      
                <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage-1}</span>
                </button>

                <button data-goto="${curPage}" class="btn--current">
                    <span>Page ${curPage}</span>
                </button> 

                <button data-goto="${curPage}" class="btn--empty">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>                    
            `
        }

        // Other pages  
        else if(curPage < numPages){
            // means at some mid page from 1st and last and also multiple pages so display prev + current + next button
            return `
                <button data-goto="${curPage - 1}" class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${curPage-1}</span>
                </button>

                <button data-goto="${curPage}" class="btn--current">
                    <span>Page ${curPage}</span>
                </button>

                <button data-goto="${curPage + 1}" class="btn--inline pagination__btn--next">
                    <span>Page ${curPage + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>

            `
        }        
        
        // Page 1 and there are no other pages 
        // means only 1 page and we are at it 
        return `
            <button data-goto="${curPage}" class="btn--empty">
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${curPage-1}</span>
            </button>

            <button data-goto="${curPage}" class="btn--current">
                <span>Page ${curPage}</span>
            </button> 

            <button data-goto="${curPage}" class="btn--empty">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                    <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button>   
        `
    }
}


// [7.4] :- Exported to be used in controller.js at [7] 
export default new PagenationView();
// Not exporting the original class.
// Exporting an instance(object) of the class.
// This way, changes made to this instance will be reflected across all modules that import it,
// ensuring consistency without modifying the original class definition.



