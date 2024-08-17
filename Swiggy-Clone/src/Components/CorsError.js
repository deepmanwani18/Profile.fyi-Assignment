export const CorsError = () => {
  return (
    <div className=" bg-gradient-to-br bg-skin to-slate-100">
      <div className="flex flex-col justify-center h-[80vh] max-w-6xl mx-auto p-5">
        <h1 className="text-8xl text-orange font-bold [font-size:_clamp(2.5em,8vw,7em)] mb-3">
          Oops!
        </h1>
        <hr className="mb-5 w-36 h-1 bg-teal border-0" />
        <p className="mb-5 text-xl sm:text-3xl text-orange">
          This app is using Swiggy's live APIs to show restaurants on the app.
          You are facing CORS issue.
        </p>
        <p className="mb-5 text-xl sm:text-3xl text-orange">
          1. Please install{" "}
          <a
            className=" font-bold underline cursor-pointer"
            target="_blank"
            href="https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en"
          >
            chrome's CORS extension
          </a>{" "}
          and turn it on.{" "}
        </p>
        <p className="mb-5 text-xl sm:text-3xl text-orange">
          2. This app will work after step 1 and reloading the page.
        </p>
      </div>
    </div>
  );
};
