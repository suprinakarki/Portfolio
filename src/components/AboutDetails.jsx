import { useState } from 'react';
import { portfolio } from '../data/portfolio';

const tabs = ['Skills', 'Experience', 'Education'];

export default function AboutDetails() {
  const [active, setActive] = useState('Skills');
  function moveFocus(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setActive(tabs[next]);
    document.getElementById(`about-tab-${tabs[next]}`).focus();
  }
  return <div className="about-details">
    <div className="about-tabs" role="tablist" aria-label="About details">
      {tabs.map((tab, index) => <button key={tab} id={`about-tab-${tab}`} type="button" role="tab" aria-selected={active === tab} aria-controls={`about-panel-${tab}`} tabIndex={active === tab ? 0 : -1} onClick={() => setActive(tab)} onKeyDown={event => moveFocus(event, index)}>{tab}</button>)}
    </div>
    {tabs.map(tab => <div key={tab} id={`about-panel-${tab}`} role="tabpanel" aria-labelledby={`about-tab-${tab}`} hidden={active !== tab} tabIndex={0}>
      {tab === 'Skills' && <dl className="about-skill-list">{portfolio.skills.filter(group => group.confirmed.length).map(group => <div key={group.category}><dt>{group.category}</dt><dd>{group.confirmed.join(', ')}</dd></div>)}</dl>}
      {tab === 'Experience' && <dl className="about-skill-list"><div><dt>Learning & personal projects</dt><dd>Developing my skills through academic learning and hands-on projects. I have no professional experience yet.</dd></div></dl>}
      {tab === 'Education' && <dl className="about-skill-list"><div><dt>{portfolio.education.abbreviation} · {portfolio.education.start} – Present</dt><dd>{portfolio.education.college}<br/>{portfolio.education.university}</dd></div></dl>}
    </div>)}
  </div>;
}
