const pool = require('./dataBase');

const addJob = (jobData) => {
    return new Promise((resolve, reject) => {
        const { jobTitle, description, languages, employmentType, experience, location, postedDate } = jobData;
        const query = 'INSERT INTO jobs (jobTitle, description, languages, employmentType, experience, location, postedDate) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const values = [jobTitle, description, languages, employmentType, experience, location, postedDate];

        pool.query(query, values, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

module.exports = { addJob };
