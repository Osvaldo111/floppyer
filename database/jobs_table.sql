CREATE TABLE generaljobs
(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_position VARCHAR(150) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    date_posted DATE NOT NULL,
    /*This is the only optional parameter*/
    job_hours VARCHAR(20),
    job_location VARCHAR(2000) NOT NULL,
    job_description VARCHAR(9000) NOT NULL,
    job_link VARCHAR(250) NOT NULL
);

CREATE TABLE stackoverflow
(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_position VARCHAR(150) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    date_posted DATE NOT NULL,
    /*This is the only optional parameter*/
    job_hours VARCHAR(20),
    job_location VARCHAR(2000) NOT NULL,
    job_description VARCHAR(9000) NOT NULL,
    job_link VARCHAR(250) NOT NULL
);

CREATE TABLE wwr
(
    id INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    job_position VARCHAR(150) NOT NULL,
    company_name VARCHAR(150) NOT NULL,
    date_posted DATE NOT NULL,
    /*This is the only optional parameter*/
    job_hours VARCHAR(20),
    job_location VARCHAR(2000) NOT NULL,
    job_description VARCHAR(9000) NOT NULL,
    job_link VARCHAR(250) NOT NULL
);