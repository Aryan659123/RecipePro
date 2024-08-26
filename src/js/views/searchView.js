// [4.1] :- To get all recipes of display all search results on side search bar  
class SearchView{
    // [4.1.1]
    #parentEl = document.querySelector('.search');

    // [4.1.2]
    getQuery(){
        const query = this.#parentEl.querySelector('.search__field').value;
        this.#clearInput(); // After getting the query 
        return query; // clear the input fields 
    }
    // [4.1.3]
    #clearInput(){ // Just make the input filed of search bar empty 
        this.#parentEl.querySelector('.search__field').value = "" 
    }

    // [4.1.4]
    addHandlerSearch(handler){
        this.#parentEl.addEventListener('submit', function(e){
            e.preventDefault(); // So that page does not reloads as this is default action of submit button 
            handler(); // This will be controlSearchResults function 
        }); 
        // This will work if user clicks enter or hits submit button
    }
}

// [4.2] :- 
export default new SearchView(); 
// Not exporting the original class.
// Exporting an instance(object) of the class.
// This way, changes made to this instance will be reflected across all modules that import it,
// ensuring consistency without modifying the original class definition.
