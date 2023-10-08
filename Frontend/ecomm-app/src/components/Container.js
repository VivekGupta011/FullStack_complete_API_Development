import React from 'react';

const Container = ({ children, class1 }) => {
  return (
    <section className={ class1 }>
        <div className="container-xxl">{ children }</div>
    </section>
  );
}

export default Container;
