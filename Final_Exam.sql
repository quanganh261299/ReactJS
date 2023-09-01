-- Drop the database if it already exists
DROP DATABASE IF EXISTS final_exam;
-- Create database
CREATE DATABASE IF NOT EXISTS final_exam;
USE final_exam;

-- Create table Department
DROP TABLE IF EXISTS 	`Department`;
CREATE TABLE IF NOT EXISTS `Department` (
	id 						INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`name` 					NVARCHAR(50) NOT NULL UNIQUE KEY,
    total_members			INT	UNSIGNED DEFAULT 0,
    `type`					ENUM('DEVELOPER', 'TESTER', 'SCRUM_MASTER', 'PROJECT_MANAGER') NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- create table: Account
DROP TABLE IF EXISTS `Account`;
CREATE TABLE `Account`(
	id						INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username				VARCHAR(50) NOT NULL UNIQUE KEY,
	`password` 				VARCHAR(72) NOT NULL,
    first_name				NVARCHAR(50) NOT NULL,
    last_name				NVARCHAR(50) NOT NULL,
    `role` 					ENUM('ADMIN','EMPLOYEE','MANAGER') NOT NULL DEFAULT 'EMPLOYEE',
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    department_id 			INT UNSIGNED,
    FOREIGN KEY(department_id) REFERENCES Department(id) ON DELETE SET NULL
);

-- =============================================
-- INSERT DATA 
-- =============================================
-- Add data Department
INSERT INTO Department(	`name`			, 		 		`type`, 		created_at) 
VALUES
						(N'Marketing'	, 				'DEVELOPER', 			'2023-03-05'),
						(N'Sale'		, 				'TESTER', 		'2023-03-05'),
						(N'Bảo vệ'		, 				'SCRUM_MASTER', 	'2023-03-07'),
						(N'Nhân sự'		, 				'PROJECT_MANAGER', 			'2023-03-08'),
						(N'Kỹ thuật'	, 				'DEVELOPER', 			'2023-03-10'),
						(N'Tài chính'	, 				'SCRUM_MASTER', 	NOW()		),
						(N'Phó giám đốc', 				'PROJECT_MANAGER', 			NOW()		),
						(N'Giám đốc'	, 				'TESTER', 		'2023-04-07'),
						(N'Thư kí'		, 				'PROJECT_MANAGER', 			'2023-04-07'),
						(N'Bán hàng'	, 				'DEVELOPER', 			'2023-04-09');
                    
-- Add data Account
-- Password: 123456
INSERT INTO `Account`(	username		,						`password`									,	first_name	,	last_name		,		`role`		,	department_id	)
VALUES 				(	'dangblack'		,   '$2a$04$MvFnY6d9zUTYVS8DCwPWCeM2WHUnL1BocoeIP9CxZXBa6O68/3UHS'	,	'Nguyen Hai'	,	'Dang'		,		'ADMIN'		,		'5'			),
					(	'quanganh'		,	'$2a$04$MvFnY6d9zUTYVS8DCwPWCeM2WHUnL1BocoeIP9CxZXBa6O68/3UHS'	,	'Doan Quang'	,	'Anh'		,		'ADMIN'	,			'1'			),
                    (	'vanchien'		,	'$2a$04$MvFnY6d9zUTYVS8DCwPWCeM2WHUnL1BocoeIP9CxZXBa6O68/3UHS'	,	'Tran Van'		,	'Chien'		,		'ADMIN'		,		'1'			),
                    (	'cocoduongqua'	,	'$2a$04$MvFnY6d9zUTYVS8DCwPWCeM2WHUnL1BocoeIP9CxZXBa6O68/3UHS'	,	'Nguyen Co'		,	'Co'		,		'EMPLOYEE'	,		'1'			),
                    (	'doccocaubai'	,   '$2a$04$MvFnY6d9zUTYVS8DCwPWCeM2WHUnL1BocoeIP9CxZXBa6O68/3UHS'	,	'Nguyen Doc'	,	'Co'		,		'ADMIN'		,		'2'			),
                    (	'khabanh'		,   '$2a$04$MvFnY6d9zUTYVS8DCwPWCeM2WHUnL1BocoeIP9CxZXBa6O68/3UHS'	,	'Phan Kha'		,	'Bang'		,		'EMPLOYEE'	,		'2'			),
                    (	'huanhoahong'	,   '$2a$04$MvFnY6d9zUTYVS8DCwPWCeM2WHUnL1BocoeIP9CxZXBa6O68/3UHS'	,	'Tran Van'		,	'Huan'		,		'ADMIN'		,		'2'			),
                    (	'tungnui'		,   '$2a$04$MvFnY6d9zUTYVS8DCwPWCeM2WHUnL1BocoeIP9CxZXBa6O68/3UHS'	,	'Nguyen Tung'	,	'Nui'		,		'MANAGER'	,		'8'			),
                    (	'duongghuu'		,   '$2a$04$MvFnY6d9zUTYVS8DCwPWCeM2WHUnL1BocoeIP9CxZXBa6O68/3UHS'	,	'Phan Duong'	,	'Huu'		,		'ADMIN'		,		'9'			),
                    (	'vtiaccademy'	,   '$2a$04$MvFnY6d9zUTYVS8DCwPWCeM2WHUnL1BocoeIP9CxZXBa6O68/3UHS'	,	'Tran'			,	'Academy'	,		'MANAGER'	,		'10'		);
				
                    
UPDATE Department AS d
SET d.total_members = (
    SELECT COUNT(a.department_id) 
    FROM `Account` AS a
    WHERE a.department_id = d.id
);

