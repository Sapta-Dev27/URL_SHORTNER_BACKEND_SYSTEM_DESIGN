/*Info Middleware : This middleware is responsible for logging the incoming request method and url. It helps in monitoring the traffic and debugging the application.*/


const infoMiddleware = ( req , res , next ) => {
  const { method , url} = req ;
  console.log(`Incoming Request : ${method} ${url}`) 
  next();
}

export default infoMiddleware;