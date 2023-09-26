async function sayHello(ctx) {
  ctx.response.body = 'OK';
  return ctx.send({message: "data from plugin controller"}, 302)
}

module.exports = { sayHello }
