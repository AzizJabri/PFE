import React from 'react';

function Statics() {
  return (
    <div className="hero min-h-screen" style={{backgroundImage: 'url(/shop.webp)'}}>
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-8xl mx-auto">
          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-semibold text-white">Experience the magic of shopping </h1>
          <br></br>
          <h1 className="text-3xl font-bold mb-4 text-white">where every item is a treasure waiting to be found</h1>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default Statics;
