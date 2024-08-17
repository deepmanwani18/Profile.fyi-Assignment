import { Link, useRouteError } from "react-router-dom"

export const ErrorComponent = ({noInternet}) => {
    const error = useRouteError();
    console.log(error);
    return <div className="h-screen bg-gradient-to-br bg-skin to-slate-100">
    <div className="flex flex-col justify-center h-screen max-w-6xl mx-auto p-5">
      <h1 className="text-8xl text-orange font-bold [font-size:_clamp(2.5em,8vw,7em)] mb-3">Oops!</h1>
      <hr className="mb-5 w-36 h-1 bg-teal border-0" />
      {noInternet ?  <p className="mb-5 text-xl sm:text-3xl text-orange" >Sorry, looks like you have lost network connection. Please check your network settings and reload the page.</p> :<p className="mb-5 text-xl sm:text-3xl text-orange" >Sorry, there was an error loading this page.</p>}
      <div className="mb-5 flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-base">
        
   
        {!noInternet && <Link to="/" className="flex flex-nowrap whitespace-nowrap sm:px-3 sm:py-1 px-2 py-.5 gap-1 items-center font-semibold text-orange rounded-md border border-teal hover:bg-orange hover:text-white active:scale-95 transition" href="/">
          Go home
        </Link>
        }
        
      </div>
     
    </div>
  </div>
}