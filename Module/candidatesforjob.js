const db = require('./dataBase');

const getCandidatesForJob = async (jobID) => {
    let sql = `
        SELECT 
        u.userID, 
        u.firstName, 
        u.lastName, 
        u.Email, 
        u.phoneNumber, 
        u.linkedIn, 
        u.work_experience, 
        u.address,
        u.languages
    FROM 
        users u
    INNER JOIN 
        applications a ON u.userID = a.userID
    WHERE 
        a.jobID = ?;
    `;

    return new Promise((resolve, reject) => {
        db.query(sql, [jobID], (err, results) => {
            if (err) {
                console.error('Database query error:', err);
                return reject(err);
            }
            console.log('Query results:', results); // הדפס את התוצאות שהתקבלו
            if (!Array.isArray(results)) {
                return reject(new TypeError('Expected results to be an array'));
            }
            resolve(results);
        });
    });
};


module.exports = { getCandidatesForJob };
