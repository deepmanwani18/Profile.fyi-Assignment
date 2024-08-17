import { Link, useRouteError } from "react-router-dom"

export const ErrorComponent = () => {
    const error = useRouteError();
    console.log(error);
    return <h1><div class="h-screen bg-gradient-to-br from-white to-slate-100">
    <div class="flex flex-col justify-center h-screen max-w-6xl mx-auto p-5">
      <h1 class="text-8xl font-bold [font-size:_clamp(2.5em,8vw,7em)] mb-3">Oops!</h1>
      <hr class="mb-5 w-36 h-1 bg-teal border-0" />
      <p class="mb-5 text-xl sm:text-3xl">Sorry, there was an error loading this page.</p>
      <div class="mb-5 flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-base">
        
   
        <Link to="/" class="flex flex-nowrap whitespace-nowrap sm:px-3 sm:py-1 px-2 py-.5 gap-1 items-center font-semibold text-orange rounded-md border border-teal hover:bg-orange hover:text-white active:scale-95 transition" href="/">
          Go home
        </Link>
        
        
      </div>
     
    </div>
  </div></h1>
}