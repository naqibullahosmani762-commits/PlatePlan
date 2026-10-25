import { Link } from 'react-router-dom';
import { ArrowUpRight, Heart, UtensilsCrossed } from 'lucide-react';

export default function Footer({ t }) {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link className="brand footer-logo" to="/">
            <span className="brandicon"><UtensilsCrossed size={20} /></span>
            <span>PlatePlan<span className="dot">.</span></span>
          </Link>
          <p>{t.intro}</p>
          <span className="footer-tagline">Plan smarter. Eat better.</span>
        </div>

        <div className="footer-links">
          <h3>{t.recipes}</h3>
          <Link to="/recipes">{t.explore}<ArrowUpRight size={14} /></Link>
          <Link to="/meal-plan">{t.plan}<ArrowUpRight size={14} /></Link>
          <Link to="/manage-recipes">{t.admin}<ArrowUpRight size={14} /></Link>
        </div>

        <div className="footer-links">
          <h3>{t.about}</h3>
          <Link to="/about">{t.about}<ArrowUpRight size={14} /></Link>
          <Link to="/contact">{t.contact}<ArrowUpRight size={14} /></Link>
          <Link to="/">{t.home}<ArrowUpRight size={14} /></Link>
        </div>

        <div className="footer-callout">
          <span className="footer-callout-icon"><Heart size={19} /></span>
          <h3>Made for everyday meals</h3>
          <p>Simple recipes, clearer budgets, and a meal plan that works for you.</p>
          <Link to="/recipes" className="footer-cta">{t.explore}<ArrowUpRight size={16} /></Link>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} PlatePlan. All rights reserved.</span>
          <span className="footer-made">Built with care <Heart size={13} /></span>
        </div>
      </div>
    </footer>
  );
}
