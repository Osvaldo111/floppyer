INSERT INTO jobs(
    id,
    job_position,
    company_name,
    date_posted,
    job_hours,
    job_location,
    job_description,
    job_link
) VALUES (
    0, 
    'Software DevOps',
    'Clement LLC',
    curdate(),
    'Full-Time',
    'New York, USA',
    'We require a well skilled programmer bla!~',
    'www.techshore.com'
);

/*Merge the two tables stackoverflow and we work remotely*/
INSERT INTO generaljobs( id,
     job_position,
     company_name,
     date_posted,
     job_hours,
     job_location,
     job_description,
     job_link
 )
 SELECT 0 AS id,
     job_position,
     company_name,
     date_posted,
     job_hours,
     job_location,
     job_description,
     job_link
 FROM (
 SELECT * FROM stackoverflowjobs
 UNION ALL SELECT * FROM wwr ORDER BY id) AS data;

 SELECT id, job_link
 FROM (
 SELECT * FROM stackoverflowjobs
 UNION ALL SELECT * FROM wwr ORDER BY id) AS data ORDER BY date_posted DESC;


