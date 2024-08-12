const db = require('./dataBase');

const getPageById = (pageID) => {
    let sql;

    if (pageID == 7) {
        sql = `
            SELECT 
                p.PageID, 
                p.PageName, 
                p.URL, 
                p.Title, 
                p.Content, 
                p.Button, 
                p.FormID,
                j.jobID,
                j.jobTitle,
                j.description,
                j.location,
                j.languages,
                j.employmentType,
                j.experience,
                j.postedDate
            FROM 
                pages p
            LEFT JOIN 
                pagehasjobs phj ON p.PageID = phj.PageID
            LEFT JOIN 
                jobs j ON phj.jobID = j.jobID
            WHERE 
                p.PageID = ?;
        `;
    } else if (pageID == 9) {
        sql = `
            SELECT 
                u.userID, 
                u.RoleName, 
                u.firstName, 
                u.lastName, 
                u.Email, 
                u.phoneNumber, 
                u.linkedIn, 
                u.createdAt, 
                u.updatedAt, 
                u.work_experience, 
                u.address, 
                u.education,
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
                users u ON u.RoleName = 'Candidate'
            WHERE 
                p.PageID = ?;
        `;
    } else {
        sql = `
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
    }

    return new Promise((resolve, reject) => {
        db.query(sql, [pageID], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results.length === 0) {
                    resolve(null);
                } else {
                    let jobs = [];
                    if (pageID == 7) {
                        jobs = results.filter(row => row.jobID != null).map(row => ({
                            jobID: row.jobID,
                            jobTitle: row.jobTitle,
                            description: row.description,
                            location: row.location,
                            languages: row.languages,
                            employmentType: row.employmentType,
                            experience: row.experience,
                            postedDate: row.postedDate,
                        }));
                    }

                    let candidates = [];
                    if (pageID == 9) {
                        candidates = results.filter(row => row.userID != null).map(row => ({
                            userID: row.userID,
                            RoleName: row.RoleName,
                            firstName: row.firstName,
                            lastName: row.lastName,
                            Email: row.Email,
                            phoneNumber: row.phoneNumber,
                            linkedIn: row.linkedIn,
                            createdAt: row.createdAt,
                            updatedAt: row.updatedAt,
                            work_experience: row.work_experience,
                            address: row.address,
                            education: row.education,
                        }));
                    }

                    const page = {
                        PageID: results[0].PageID,
                        PageName: results[0].PageName,
                        URL: results[0].URL,
                        Title: results[0].Title,
                        Content: results[0].Content,
                        Button: results[0].Button,
                        FormID: results[0].FormID,
                        jobs: jobs,
                        candidates: candidates
                    };

                    console.log("Formatted page object:", page);
                    resolve(page);
                }
            }
        });
    });
};

module.exports = { getPageById };
