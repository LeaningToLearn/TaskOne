const fs = require('fs');

function requestHandler(req, res) {
    const { url, method } = req;

    console.log('ok')
    if (url === "/") {
        return fs.readFile('./templates/index.html', 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                return res.end("File not found")
            }
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.write(data);
            return res.end()
        })
    }

    if (url === "/users") {
        return fs.readFile('./templates/users.html', 'utf-8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                return res.end("File not found")
            }
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.write(data);
            return res.end()
        })
    }

    if (url === "/create-user" && method === "POST") {
        const body = [];
        req.on('data', (chunk)=> {
            body.push(chunk)
        })
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const [, newUser] = parsedBody.split("=");
            console.log(newUser)
            res.statusCode = 302;
            res.setHeader('Location', '/users');
            return res.end();
        })
    }
    res.statusCode = 404;
    res.end("File not Found");

}

module.exports = { requestHandler };