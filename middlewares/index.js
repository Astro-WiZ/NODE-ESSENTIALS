import { appendFile } from 'fs';

export function logReqRes(filename) {
    return (req, res, next) => {
        appendFile(
            filename,
            `\n${Date.now()}:${req.method}:${req.path}\n`,
            (err, data) => {
                next();
            }
        )
    }
}
