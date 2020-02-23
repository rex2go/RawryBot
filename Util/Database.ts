import * as app from "../App";

export function getConnection() {
    return new Promise((resolve, reject) => {
        app.pool.getConnection((err, connection) => {
            if (err) return reject(err);
            resolve(connection);
        });
    });
}

export async function query(sql: string, args: any[] = []) {
    let con: any = await this.getConnection();

    return new Promise((resolve, reject) => {
        con.query(sql, args, (err, results) => {
            if (err) return reject(err);
            con.release();
            return resolve(results);
        });
    });
}