import React from 'react';
import { Link } from 'react-router-dom';

const callouts = [
  {
    name: 'Electronics',
    description: 'Innovative gadgets for connectivity & entertainment.',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '/products/?category=1',
  },
  {
    name: 'Books & Stationery',
    description: 'Inspiration for reading & creativity.',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '/products/?category=6',
  },
  {
    name: 'Home & Kitchen',
    description: 'Essentials for comfort & functionality.',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '/products/?category=3',
  },
];

export default function Category() {
  return (
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-center">Categories</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
            {callouts.map((callout) => (
              <div key={callout.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white aspect-w-2 aspect-h-1 group-hover:opacity-75">
                  <img
                    src={callout.imageSrc}
                    alt={callout.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-center">
                  <Link to={callout.href}>
                    <span className="absolute inset-0" />
                    {callout.name}
                  </Link>
                </h3>
                <p className="text-base font-semibold text-center">{callout.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
  );
}
