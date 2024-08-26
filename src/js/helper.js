// [-1] :- 
import { TIMEOUT_SEC } from "./config.js"; // imported from config.js 

// [0] :- 
const timeout = function(s){
    return new Promise(function(_, reject){
        setTimeout(function(){
            reject(new Error(`Request took too long! Timeout after ${s} second`));
        }, s*1000);
    })
};


// [1] :-  Used in [2.2.extended] and at [2.4] in model.js 
// getJSON() Will receive data in form of JSON formatted string and convert it into JSON object
// Eg:- 
// // JSON-formatted string (received from server) received 
// '{ "name": "Alice", "age": 25, "isStudent": false }'

// // Parsed into a JavaScript object using res.json()
// { name: "Alice", age: 25, isStudent: false }

export const getJSON = async function (url) {
    try{
        const fetchPro = fetch(url);
        
        // Here we will make 2 promises race and which ever wins will get executed so that it won't run forever 
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // from [-1] above 
        // Above can be like below also:-
        // const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
        // fetch returns a promise and that promise is awaited and is value will be stored in res variable 
        // all this waiting happens in background bcs its an async function 
    
        const data = await res.json();
        // converts JSON-formatted string into javascript object
        // .json also returns a promise and we wait for that converted javascript object value from that promise using await 
        // Eg:- 
        // // JSON-formatted string (received from server) received 
        // '{ "name": "Alice", "age": 25, "isStudent": false }'

        // // Parsed into a JavaScript object using res.json()
        // { name: "Alice", age: 25, isStudent: false } 
        // console.log(data);
    
        if(!res.ok) throw new Error(`${data.message} (${res.status})`);      
        return data; // This data will be resoved value of promise that getJSON() returns 
    }
    catch(err){
        // console.log(err);
        throw err; // catch this in model.js 
    }
}



// [2] :- Upload recipe data to forkify API at specific API key = KEY at [4] of config.js using POST request 
//        and receive back that data from forkify API also 
//        Used at [2.11.c] in model.js 
// sendJSON gets url and upload data(i.e. upload recipe data) as parameters from [2.11.c] at model.js
// url to which the data will be sent and uploadData(i.e. upload recipe data)  which will be sent to forkify API under specific API key = KEY of [4] of config.js 
// After fetchPro variable wins promise race from timeout function 
// data will be sent to forkify API at specific API key = KEY at [4] of config.js 

// When we upload a recipe, it doesn’t go to the public API openly to avoid contaminating the public data.
// Instead, it gets stored in the API under our API key.
// and sendJSON also receive that recipe data back as res object as json formatted string 
// then we convert that res object into javascript object and send it back to [2.11.c] of model.js 
// where sendJSON was called
// This also means we can access our uploaded recipes only using our API key 
// although they are also on the public API but are stored under our API key so not accessible without API key 
// this data is visible only to those who search for only those who will have that specific key on which this recipe is uploaded 
// https://forkify-api.herokuapp.com/api/v2/recipes/?key=<insert your key>
// ${API_URL}?key=${KEY}
// Therefore, when we search for recipes with our API key, the search results will include all recipes, including our uploaded ones.
// Additionally, when we click on one of our own recipes, the data is retrieved from the API only when using our API key = KEY of [4] of config.js


export const sendJSON = async function (url, uploadData) {
    try{
        // Syntax :- 
        // const fetchPro = fetch(url, {options})
        const fetchPro = fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(uploadData)
        });

        // Here we will make 2 promises race and which ever wins will get executed so that it won't run forever 
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // from [-1] above 
        // fetch in fetchPro variable returns a promise and that promise is awaited and is value will be stored in res variable 
        // all this waiting happens in background bcs its an async function 
        
        const data = await res.json();
        // converts JSON-formatted string into javascript object
        // .json also returns a promise and we wait for that converted javascript object value from that promise using await 
        // Eg:- 
        // // JSON-formatted string (received from server) received 
        // '{ "name": "Alice", "age": 25, "isStudent": false }'

        // // Parsed into a JavaScript object using res.json()
        // { name: "Alice", age: 25, isStudent: false } 
        // console.log(data);

        if(!res.ok) throw new Error(`${data.message} (${res.status})`);      
        return data; // This data will be resoved value of promise that getJSON() returns 
    }
    catch(err){
        throw err; // catch this in model.js 
    }
}



// // [3] Can combine both getJSON and sendJSON together in [1] and [2] 
// //     But then we have to change at every place by importing AJAX inplace of getJSON and sendJSON 
// //     and then use AJAX in place of getJSON and sendJSON :-
// //     Not doing that just telling this approach  
// export const AJAX = async function (url, uploadData=undefined) {
//     try{
//         const fetchPro = uploadData ? 
//         fetch(url, {
//             method: 'POST', 
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(uploadData)
//         })
//         // Syntax :- const fetchPro = fetch(url, {options})
//         : // This is else of above optional chaning operator 
//         fetch(url);

//         // Here we will make 2 promises race and which ever wins will get executed so that it won't run forever 
//         const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]); // from [-1] above 
//         // fetch in fetchPro variable returns a promise and that promise is awaited and is value will be stored in res variable 
//         // all this waiting happens in background bcs its an async function 
        
//         const data = await res.json();
//         // converts JSON-formatted string into javascript object
//         // .json also returns a promise and we wait for that converted javascript object value from that promise using await 
//         // Eg:- 
//         // // JSON-formatted string (received from server) received 
//         // '{ "name": "Alice", "age": 25, "isStudent": false }'

//         // // Parsed into a JavaScript object using res.json()
//         // { name: "Alice", age: 25, isStudent: false } 
//         // console.log(data);

//         if(!res.ok) throw new Error(`${data.message} (${res.status})`);      
//         return data; // This data will be resoved value of promise that getJSON() returns 
//     }
//     catch(err){
//         throw err; // catch this in model.js 
//     }
// }
