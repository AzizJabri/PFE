import React from 'react';

const InputWithLabel = ({ label, placeholder, type = 'text', optional = false }) => (
  <label className="input input-bordered flex items-center gap-2">
    {label}
    <input type={type} className="grow" placeholder={placeholder} />
    {optional && <span className="badge badge-info">Optional</span>}
  </label>
);

const SearchInputWithShortcut = () => (
  <label className="input input-bordered flex items-center gap-2">
    <input type="text" className="grow" placeholder="Search" />
    <kbd className="kbd kbd-sm">⌘</kbd>
    <kbd className="kbd kbd-sm">K</kbd>
  </label>
);

const Addcategory = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <InputWithLabel label="Name" placeholder="Daisy" />
        <InputWithLabel label="Email" placeholder="daisy@site.com" />
        <SearchInputWithShortcut />
        <InputWithLabel label="Search" placeholder="Search" optional />
      </div>
    </div>
  );
};

export default Addcategory;
