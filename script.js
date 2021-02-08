// Adding event listener to search button

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", () => {
    const errorMessage = document.getElementById('invalid-search-message');
    errorMessage.innerHTML = "";
    const MealIngredientDiv = document.getElementById("meal-detail");
    MealIngredientDiv.innerHTML = "";
    
    // display alert if hit search button without typing anything
    let x = document.getElementById("input").value;
    if (x == "") {
        alert("Please type a meal name in the search bar");
        return false;
    }
    else {

    // to get the data from api link and error message
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${input.value}`)
            .then(response => response.json())
            .then(data => displayMeals(data.meals))
            .catch(error => displayMealError('Your meal is not available. Please try another item.'))

        const displayMealError = error => {
            const errorMessage = document.getElementById('invalid-search-message');
            errorMessage.innerHTML = "";
            errorMessage.innerText = error;
        }
    // display meal list and showing ingredients list once Details button clicked
        function displayMeals(item) {
            const mealsDiv = document.getElementById("meals");
            mealsDiv.innerHTML = null;
            for (let i = 0; i < item.length; i++) {
                const element = item[i].strMeal;

                const mealDiv = document.createElement("div");
                mealDiv.className = "meal";
                const mealInfo = `
                <img class="thumbnail" src="${item[i].strMealThumb}" >
                <h3 class="meal-name">${item[i].strMeal}</h3>
                <button onclick="displayMealIngredient(${item[i].idMeal})">Details</button>
                `
                mealDiv.innerHTML = mealInfo;
                mealsDiv.appendChild(mealDiv);
            }
        }
    }
})

// To get the ingredients data from api
const displayMealIngredient = mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => renderMealInfo(data.meals[0]));
}

// Displaying ingredients data in the website
const renderMealInfo = meals => {
    const MealIngredientDiv = document.getElementById("meal-detail");
    MealIngredientDiv.innerHTML =
        `<h2>Ingredient List</h2>
                <h4 class="meal-name">${meals.strMeal}</h4>
                <ul>
                <li><p> ${meals.strIngredient1} </p></li>
                <li><p> ${meals.strIngredient2} </p></li>
                <li><p> ${meals.strIngredient3} </p></li>
                <li><p> ${meals.strIngredient4} </p></li>
                <li><p> ${meals.strIngredient5} </p></li>
                <li><p> ${meals.strIngredient6} </p></li>
                <li><p> ${meals.strIngredient7} </p></li>
                <li><p> ${meals.strIngredient8} </p></li>
                <li><p> ${meals.strIngredient9} </p></li>
                <li><p> ${meals.strIngredient10}</p></li>
               </ul>`
}

