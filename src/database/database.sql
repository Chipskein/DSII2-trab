CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    img VARCHAR(350),
    name VARCHAR(350), 
    email VARCHAR(350) UNIQUE,
    password VARCHAR(350),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    activate BOOLEAN
);
CREATE TABLE IF NOT EXISTS groups(
    id SERIAL PRIMARY KEY,
    img VARCHAR(350),
    name VARCHAR(350),
    adminid INTEGER,
    email VARCHAR(350),
    password VARCHAR(350),
    birthdate DATE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    activate BOOLEAN,
    FOREIGN KEY (adminid) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS group_members(
    userid INTEGER,
    groupid INTEGER,
    participated_at TIMESTAMP,
    permissions VARCHAR(350),
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (groupid) REFERENCES groups(id)
);
CREATE TABLE IF NOT EXISTS group_solicitations(
    userid INTEGER,
    groupid INTEGER,
    sended_at TIMESTAMP,
    status VARCHAR(20),
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (groupid) REFERENCES groups(id)
);
CREATE TABLE IF NOT EXISTS messages(
    id SERIAL PRIMARY KEY,
    txt VARCHAR(350),
    userid INTEGER,
    groupid INTEGER,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    activate BOOLEAN,
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (groupid) REFERENCES groups(id)
);