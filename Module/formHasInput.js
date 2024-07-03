const db = require('./dataBase');

const getFormById = (pageID) => {
    const sql = `
        SELECT 
            p.PageID, 
            p.PageName, 
            p.URL, 
            p.Title, 
            p.Content, 
            p.Button, 
            p.FormID,
            i.InputID, 
            i.InputTitle, 
            i.InputLable AS InputLabel, 
            i.Type AS InputType
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
                resolve(null); 
            } else {
                console.log('Database query results:', results); 
                const page = {
                    PageID: results[0].PageID,
                    PageName: results[0].PageName,
                    URL: results[0].URL,
                    Title: results[0].Title,
                    Content: JSON.parse(results[0].Content),
                    Button: JSON.parse(results[0].Button), // JSON.parse for the Button field as well
                    FormID: results[0].FormID,
                    Input: results.filter(row => row.InputID && row.InputLabel).map(row => ({
                        InputID: row.InputID,
                        InputTitle: row.InputTitle,
                        InputLabel: row.InputLabel,
                        InputType: row.InputType
                    }))
                };
                resolve(page);
            }
        });
    });
};

module.exports = { getFormById };
