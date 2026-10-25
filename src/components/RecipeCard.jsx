import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
export const money = (value) => `${Math.round(value).toLocaleString()} AFN`;
export default function RecipeCard({ recipe, onAdd, t }) {
  return (
    <article className="recipe">
      <Link to={`/recipes/${recipe.id}`}>
        <img
          src={
            recipe.image ||
            "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
          }
          alt={recipe.title}
        />
      </Link>
      <div className="recipebody">
        <div className="tags">
          <span>{recipe.category}</span>
          {recipe.vegetarian && (
            <span>
              <Leaf size={13} />
              {t.vegetarianLabel}
            </span>
          )}
        </div>
        <h3>
          <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
        </h3>
        <p className="muted">{recipe.description}</p>
        <div className="recipefoot">
          <div>
            <small>{t.cost}</small>
            <b>{money(recipe.baseCostAFN)}</b>
          </div>
          <button className="btn tiny" onClick={() => onAdd(recipe)}>
            {t.add}
          </button>
        </div>
      </div>
    </article>
  );
}
