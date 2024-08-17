const Feature = () => {
  return (
    <div className="bg-skin text-center h-[80vh] ">
      <h1 className="font-normal text-gray-900 text-4xl md:text-4xl leading-none mb-8">
        Features
      </h1>
      <ul>
        <li className="ml-4 float-left max-w space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 ">
          Used Swiggy's live APIs to display restaurants on home page and
          restaurant's menu page. Please install chrome's cors extension.
        </li>
        <li className=" ml-4 float-left max-w space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 ">
          Cart can have food items for only one restaurant, if user adds items
          from different restaurant, re-confirmation prompt will be generated.
        </li>

        <li className=" ml-4 float-left max-w space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 ">
          Upon confirmation, previous cart is cleared and new cart is generate.
        </li>

        <li className="ml-4 float-left max-w space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
          Items added in cart will remain in the cart after reloading the page.
          Storing cart items in local storage, and managing the cart state
          globally.
        </li>
        <li className=" ml-4 float-left max-w space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 ">
          Shows Empty cart when cart is Empty (Error handling).
        </li>
        <li className=" ml-4 float-left max-w space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400 ">
          I have kept this particular module to demo lazy loading in this app.
          Feel free to check Network tab resources. Along with index.js, one
          separate file would be generated (On-demand).
        </li>
      </ul>

    </div>
  );
};

export default Feature;
