export const fetchRecipes = async (limit, api) => {
  const response = await fetch(`https://www.${api}.com/api/json/v1/1/search.php?s=`);
  const result = await response.json();
  if (api === 'themealdb') {
    return result.meals.slice(0, limit);
  }
  return result.drinks.slice(0, limit);
};

export const fetchCategories = async (api, cat) => {
  const numberOfButtons = 5;
  const response = await fetch(`https://www.${api}.com/api/json/v1/1/list.php?${cat}=list`);
  const result = await response.json();
  if (cat === 'c' && api === 'themealdb') {
    return result.meals.slice(0, numberOfButtons);
  }
  if (cat === 'a') {
    return result.meals;
  }
  return result.drinks.slice(0, numberOfButtons);
};

export const fetchRecipesByCategory = async (api, category) => {
  const numberOfRecipes = 12;
  const response = await fetch(`https://www.${api}.com/api/json/v1/1/filter.php?c=${category}`);
  const result = await response.json();
  if (api === 'themealdb') {
    return result.meals.slice(0, numberOfRecipes);
  }
  return result.drinks.slice(0, numberOfRecipes);
};

export const fetchCountry = async (country) => {
  const numberOfRecipes = 12;
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`);
  const result = await response.json();
  if (country !== null) {
    const final = result.meals.slice(0, numberOfRecipes);
    return final;
  }
};
