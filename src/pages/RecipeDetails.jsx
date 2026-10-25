import { Link, useParams } from "react-router-dom";
import { money } from "../components/RecipeCard";
export default function RecipeDetails({ recipes, onAdd, t }) {
  const { id } = useParams();
  const recipe = recipes.find((item) => item.id === id);
  if (!recipe)
    return (
      <section className="container section">
        <h1>{t.noRecipes}</h1>
        <Link to="/recipes">{t.back}</Link>
      </section>
    );
  return (
    <section className="container section">
      <Link to="/recipes">← {t.back}</Link>
      <div className="detailgrid">
        <img className="detailimage" src={recipe.image} alt={recipe.title} />
        <div>
          <span className="eyebrow">{recipe.category}</span>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
          <p>
            <b>
              {t.cost}: {money(recipe.baseCostAFN)}
            </b>
          </p>
          <p>
            {recipe.baseServings} {t.servings}
          </p>
          <button className="btn primary" onClick={() => onAdd(recipe)}>
            {t.add}
          </button>
        </div>
      </div>
      <div className="twocol">
        <article className="panel">
          <h2>{t.ingredients}</h2>
          {recipe.ingredients.map((item, index) => (
            <p className="listrow" key={index}>
              <span>{item.name}</span>
              <b>
                {item.quantity} {item.unit}
              </b>
            </p>
          ))}
        </article>
        <article className="panel">
          <h2>{t.instructions}</h2>
          <p>{recipe.instructions}</p>
        </article>
      </div>
    </section>
  );
}
