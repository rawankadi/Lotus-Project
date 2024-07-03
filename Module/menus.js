const db = require('./dataBase');

const getPagesByMenuId = (menuID) => {
    console.log(menuID);
    // SQL query to fetch PageID, PageName, and URL from pages based on the given MenuID
    const sql = `
        SELECT pages.PageID, pages.PageName, pages.URL 
        FROM pages 
        INNER JOIN contain ON pages.PageID = contain.PageID 
        WHERE contain.MenuID = ?
    `;
    return new Promise((resolve, reject) => {
        db.query(sql, [menuID], (err, results) => {
            if (err) return reject(err);
            resolve(results);
        });
    });
};

module.exports = { getPagesByMenuId };
