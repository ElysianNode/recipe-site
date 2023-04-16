// Get references to the search input field and the recipe list element
const searchInput = document.getElementById("search");
const recipeList = document.getElementById("recipes");


// Define a function to load recipes from a JSON file
function loadRecipes(callback) {
  const xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("GET", "recipes.json", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const recipes = JSON.parse(xhr.responseText);
      callback(recipes);
    }
  };
  xhr.send(null);
}

// Define a function to display recipes based on the user's search query
function displayRecipes(recipes, searchQuery) {
  // Clear the recipe list element
  recipeList.innerHTML = "";
  recipeList.appendChild(createOption("", "Select a recipe"));

  // Loop through the recipes and display any that match the search query
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const title = recipe.Title.toLowerCase();
    if (title.includes(searchQuery.toLowerCase())) {
      const option = createOption(recipe.Id, recipe.Title);
      recipeList.appendChild(option);
    }
  }
}

function createOption(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = text;
  return option;
}

// Define a function to display a single recipe
function displayRecipe(recipeId, recipes) {
  const numericRecipeId = parseInt(recipeId, 10);
  const recipe = recipes.find((recipe) => recipe.Id === numericRecipeId);
  if (!recipe) {
    return;
  }
  const recipeDiv = document.getElementById("recipe");
  recipeDiv.innerHTML = `
    <h2>${recipe.Title}</h2>
    <div class="recipe-details">
      <div class="recipe-image">
        <img src="images/${recipe.Title}.png" alt="${recipe.Title}" />
      </div>
      <div class="recipe-instructions">
        <div class="recipe-title">
          <h2>${recipe.Title}</h2>
        </div>
        <div class="recipe-ingredients">
          <h3>Ingredients</h3>
          <ul>
            ${recipe.Ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
          </ul>
        </div>
        <div class="recipe-steps">
          <h3>Instructions</h3>
          <ol>
            ${recipe.Instructions.map((step) => `<li>${step}</li>`).join("")}
          </ol>
        </div>
      </div>
    </div>
  `;
}

// Load the recipes and display them when the page is loaded
window.addEventListener("load", () => {
  loadRecipes((recipes) => {
    displayRecipes(recipes, "");

    // Add an event listener to the recipe list
    recipeList.addEventListener("change", () => {
      displayRecipe(recipeList.value, recipes);
    });
  });
});

// Add an event listener to the search input field to display recipes based on the user's input
searchInput.addEventListener("input", () => {
  loadRecipes((recipes) => {
    displayRecipes(recipes, searchInput.value);
  });
});

