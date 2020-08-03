function redirect (ctx, path) {
  if (ctx.res != null) {
    ctx.res.writeHead(302, { Location: path })
    ctx.res.end()
  } else {
    document.location.href = path
  }
}

module.exports = redirect
