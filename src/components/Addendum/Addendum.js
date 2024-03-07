import React from 'react';
import './Addendum.css';
import { headingAddendum, subtitleAddendum, paragraphAddendum1, paragraphAddendum2, textAddendum, buttonAddendum } from '../../utils/constants';

function Addendum({ onAddBook }) {
  function handleAddBookPopup() {
    onAddBook();
  }

  return (
    <section id="content1" className="addendum" aria-label="две колонки">
      <h2 className="title title_addendum">{headingAddendum}</h2>
      <div className="addendum__container">
        <h3 className="subtitle subtitle_addendum">{subtitleAddendum}</h3>
      </div>
      <article className="two-columns">
        <h3 className="two-columns__brief">{paragraphAddendum1}</h3>
        <div className="two-columns__main-text">
          <p className="paragraph paragraph_two-columns">{paragraphAddendum2}</p>
          <p className="paragraph paragraph_two-columns"><span className="two-columns__span-accent">{subtitleAddendum}</span>{textAddendum}</p>
        </div>
      </article>
      <button type="button" onClick={handleAddBookPopup} className="button button_add_addendum">{buttonAddendum}</button>
    </section>
  )
}

export default Addendum;