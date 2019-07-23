import { respond } from './httpHelper';


export default respond(async (event) => {
  console.log(event);
  // const handler = routes[event.path];
  // if (handler) {
  //   const query = Object.assign({},
  //     event.queryStringParameters,
  //     JSON.parse(event.body),
  //     {
  //       cookie: Object.assign({}, parseCookie(event.headers.Cookie), parseCookie(event.headers['X-Cookie'])),
  //     });
  //   return handler(query, request);
  // }
  return { body: event };
});
