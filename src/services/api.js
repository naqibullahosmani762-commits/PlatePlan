const API = '/api';

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options
  });
  if (!response.ok) throw new Error('Could not connect to the server.');
  return response.json();
}

export const getRecipes = () => request(`${API}/recipes`);
export const createRecipe = recipe => request(`${API}/recipes`, { method: 'POST', body: JSON.stringify(recipe) });
export const updateRecipe = recipe => request(`${API}/recipes/${recipe.id}`, { method: 'PUT', body: JSON.stringify(recipe) });
export const deleteRecipe = id => request(`${API}/recipes/${id}`, { method: 'DELETE' });
export const getPlan = () => request(`${API}/plan`);
export const savePlan = plan => request(`${API}/plan`, { method: 'PUT', body: JSON.stringify(plan) });
