export const fetchRecipes = async (limit, api) => {
  const response = await fetch(`https://www.${api}.com/api/json/v1/1/search.php?s=`);
  const result = await response.json();
  if (api === 'themealdb') {
    return result.meals.slice(0, limit);
  }
  return result.drinks.slice(0, limit);
};

export const fetchCategories = async (api) => {
  const response = await fetch(`https://www.${api}.com/api/json/v1/1/list.php?c=list`);
  console.log('teste');
  const result = await response.json();
  if (api === 'themealdb') {
    return result.meals.slice(0, 5);
  }
  return result.drinks.slice(0, 5);
};

export const fetchRecipesByCategory = async (api, category) => {
  const response = await fetch(`https://www.${api}.com/api/json/v1/1/filter.php?c=${category}`);
  const result = await response.json();
  if (api === 'themealdb') {
    return result.meals.slice(0, 12);
  }
  return result.drinks.slice(0, 12);
};
