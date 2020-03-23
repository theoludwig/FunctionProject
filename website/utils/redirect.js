function redirect (ctx, path) {
    ctx.res.writeHead(302, { Location: path });
    ctx.res.end();
}

module.exports = redirect;