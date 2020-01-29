CREATE TABLE postJobs
(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(150) NOT NULL,
    job_position VARCHAR(150) NOT NULL,
    /*This is the only optional parameter*/
    schedule VARCHAR(20) NOT NULL,
    contact VARCHAR(2000) NOT NULL,
    comments VARCHAR(9000) NOT NULL
);