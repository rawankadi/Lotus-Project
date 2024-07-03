const db = require('./dataBase');

const getPageById = (pageID) => {
    const sql = `
        SELECT 
            p.PageID, 
            p.PageName, 
            p.URL, 
            p.Title, 
            p.Content, 
            p.Button, 
            p.FormID
        FROM 
            pages p
        LEFT JOIN 
            has h ON p.FormID = h.FormID
        LEFT JOIN 
            input i ON h.InputID = i.InputID
        WHERE 
            p.PageID = ?;
    `;
    return new Promise((resolve, reject) => {
        db.query(sql, [pageID], (err, results) => {
            if (err) return reject(err);
            if (results.length === 0) {
                resolve(null); // אם אין תוצאות
            } else {
                // עיבוד התוצאות לאובייקט מאוחד
                const page = {
                    PageID: results[0].PageID,
                    PageName: results[0].PageName,
                    URL: results[0].URL,
                    Title: results[0].Title,
                    Content: results[0].Content,
                    Button: results[0].Button,
                    FormID: results[0].FormID,
                    Input: results.filter(row => row.InputTitle && row.InputLabel).map(row => ({
                        InputTitle: row.InputTitle,
                        InputLabel: row.InputLabel
                    }))
                };
                resolve(page);
            }
        });
    });
};

module.exports = { getPageById };
