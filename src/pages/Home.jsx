import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Clock3, Leaf, Sparkles } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';

export default function Home({ recipes, onAdd, t }) {
  return (
    <>
      <section className="editorial-hero">
        <div className="container editorial-grid">
          <div className="editorial-copy">
            <span className="editorial-kicker"><Sparkles size={15} /> YOUR EVERYDAY FOOD COMPANION</span>
            <h1>{t.hero}</h1>
            <p className="editorial-lead">{t.intro}</p>
            <div className="editorial-actions">
              <Link className="editorial-primary" to="/recipes">{t.explore}<ArrowUpRight size={18} /></Link>
              <Link className="editorial-secondary" to="/meal-plan">{t.plan}<ArrowRight size={17} /></Link>
            </div>
            <div className="editorial-points">
              <span><Clock3 size={16} /> Simple planning</span>
              <span><Leaf size={16} /> Fresh ideas</span>
            </div>
          </div>
          <div className="editorial-visual">
            <img src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1200&q=85" alt="A colorful fresh meal" />
            <div className="image-label"><span className="image-label-icon"><Leaf size={19} /></span><span><b>Good food, made simpler</b><small>Plan a week you’ll enjoy</small></span></div>
            <div className="image-number">01 <span> / PLATEPLAN</span></div>
          </div>
        </div>
        <div className="container editorial-stats">
          <div><span className="stat-number">{String(recipes.length).padStart(2, '0')}</span><span className="stat-caption">{t.recipes}</span></div>
          <div><span className="stat-number">AFN</span><span className="stat-caption">{t.cost}</span></div>
          <div><span className="stat-number">01</span><span className="stat-caption">A simpler meal plan</span></div>
          <div className="stats-note">A little planning goes a long way.</div>
        </div>
      </section>

      <section className="container section editorial-recipes">
        <div className="editorial-section-head">
          <div><span className="section-kicker">FIND YOUR NEXT FAVORITE</span><h2>{t.explore}</h2><p>Practical recipes, clear costs, and inspiration for your table.</p></div>
          <Link className="editorial-view-all" to="/recipes">{t.recipes}<ArrowUpRight size={17} /></Link>
        </div>
        <div className="cards">{recipes.slice(0, 3).map(recipe => <RecipeCard key={recipe.id} recipe={recipe} onAdd={onAdd} t={t} />)}</div>
        <div className="editorial-bottom-cta"><div><span className="section-kicker">MAKE IT WORK FOR YOU</span><h2>From recipe ideas to a plan that fits your budget.</h2></div><Link className="editorial-primary" to="/meal-plan">{t.plan}<ArrowUpRight size={18} /></Link></div>
      </section>
    </>
  );
}
