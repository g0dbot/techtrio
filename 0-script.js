const searchBtn = document.getElementById('search-btn');
const recipeList = document.getElementById('recipe');
const recipeContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//event listeners
searchBtn.addEventListener('click', searchRecipeList);
recipeList.addEventListener('click', getIndividRecipe);
recipeCloseBtn.addEventListener('click', () => {
    recipeContent.parentElement.classList.remove('showMeal');
});

//nav show


//search recipe list
async function searchRecipeList()
{
	let searchInputText = document.getElementById('search-input').value.trim();
	let apiSearchCall='https://x8ki-letl-twmt.n7.xano.io/api:zGiTYQFx/SEARCH?searchTxt=';
	
	let response = await fetch(apiSearchCall+searchInputText);
	let result = await response.json();
	createResultList(result);
}

//create results of recipes
function createResultList(records)
{
	console.log()
	let html = '';
	for(let record of records)
	{
		//console.log(record);
		html +=
		`
			<div class="recipe-item" data-id="${record.id}">
				
					<div class="recipe-img">
						<img src ="${record.dispimage.url}" alt="recipe">
					</div>
								
					<div class="recipe-name">
						<h3>${record.dishName}</h3>
					</div>
					
					<div class="buttonex">
					<a href="#" class="recipe-btn">Get Recipe</a>
					</div>
			</div>
		`;
		
		recipeList.innerHTML = html;
	}
}

//get individual recipe
async function getIndividRecipe(e){
	e.preventDefault();
	if(e.target.classList.contains('recipe-btn'))
	{
		let recipeItem = e.target.parentElement.parentElement;
		let response = await fetch(`https://x8ki-letl-twmt.n7.xano.io/api:zGiTYQFx/recipes/${recipeItem.dataset.id}`);
		//console.log(response);
		let result = await response.json();
		//console.log(result);
		expandRecipe(result);
	}
}

//expand a recipe
function expandRecipe(recipe){
	console.log(recipe);
	let html = ' ';
	html +=
	`
		<h2 class="recipe-title">${recipe.dishName}</h2>

		<div class="recipe-img">
			<img src="${recipe.dispimage.url}" alt="">
		</div>

		<div class="recipe-infobar">
			<p class="recipe-country">${recipe.country}</p>
							
			<p class="recipe-prep-time">${recipe.cooktime} minutes</p>
		</div>
		<div class ="recipe-instruct">
		<h3>Ingredients</h3>
		<h3>${recipe.mainName}</h3>
	`

	let ingredientsMainArr = recipe.ingredientsMain;

	if (ingredientsMainArr != null){
		var ingredientCounter = 0;	
		while(ingredientCounter < ingredientsMainArr.length)
		{
			//console.log(recipe.ingredientsMain[ingredientCounter]);
			html +=
			`
			<p>${ingredientsMainArr[ingredientCounter]}</p>
			`
			ingredientCounter++;
		}
	}
	
	if(recipe.subName != null){
			html +=
		`
		<h2>${recipe.subName}</h2>
		`
	}

	let ingredientsSubArr = recipe.ingredientsSub;

	if (ingredientsSubArr != null)
	{
		var ingredientSubCounter = 0;

		while(ingredientSubCounter < ingredientsSubArr.length)
		{
			//console.log(recipe.ingredientsMain[ingredientCounter]);
			html +=
			`
			<p>${ingredientsSubArr[ingredientSubCounter]}</p>
			`
			ingredientSubCounter++;
		}
	}

	html +=
	`
	<h3>Instructions</h3>
	`

	var stepCounter = 0;

	let stepArr = recipe.steps;

	if (stepArr != null)
	{
		while(stepCounter < stepArr.length)
		{
			//console.log(recipe.ingredientsMain[ingredientCounter]);
			html +=
			`
			<p>${stepCounter+1}.  ${stepArr[stepCounter]}</p>
			`
			stepCounter++;
		}
	}
	

	html +=
	`
	</div>
		${recipe.vidlink}
	`

	
	recipeContent.innerHTML = html;
	recipeContent.parentElement.classList.add('showMeal');
}

//night mode
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');

function switchTheme(e) {
	if (e.target.checked) {
		document.documentElement.setAttribute('data-theme', 'dark');
	}
	else {
		document.documentElement.setAttribute('data-theme', 'light');
	}    
}

toggleSwitch.addEventListener('change', switchTheme, false);

function switchTheme(e) {
if (e.target.checked) {
	document.documentElement.setAttribute('data-theme', 'dark');
	localStorage.setItem('theme', 'dark'); //add this
}
else {
	document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem('theme', 'light'); //add this
	}    
}

//store settings
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
	document.documentElement.setAttribute('data-theme', currentTheme);

	if (currentTheme === 'dark') {
		toggleSwitch.checked = true;
	}
}
