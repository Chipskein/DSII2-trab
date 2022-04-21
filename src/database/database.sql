CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    img VARCHAR(350) DEFAULT 'https://polartalk.herokuapp.com/imgs/defaultUserProfile.png',
    name VARCHAR(350) NOT NULL, 
    email VARCHAR(350) NOT NULL UNIQUE,
    password VARCHAR(350) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at  TIMESTAMP,
    activated BOOLEAN DEFAULT true
);
CREATE TABLE IF NOT EXISTS groups(
    id SERIAL PRIMARY KEY,
    img VARCHAR(350) DEFAULT 'https://polartalk.herokuapp.com/imgs/groupDefault.png',
    name VARCHAR(350) NOT NULL,
    adminid INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,    
    activated BOOLEAN DEFAULT true,
    FOREIGN KEY (adminid) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS group_members(
    userid INTEGER NOT NULL,
    groupid INTEGER NOT NULL,
    participated_at TIMESTAMP DEFAULT NOW(),
    exit_at TIMESTAMP,
    permissions VARCHAR(2) DEFAULT 'RW',
    activated BOOLEAN DEFAULT true,
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (groupid) REFERENCES groups(id)
);
CREATE TABLE IF NOT EXISTS group_solicitations(
    userid INTEGER NOT NULL,
    groupid INTEGER NOT NULL,
    sended_at TIMESTAMP DEFAULT NOW(),
    answered_at TIMESTAMP,
    status VARCHAR(20) DEFAULT 'waiting',
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (groupid) REFERENCES groups(id)
);
CREATE TABLE IF NOT EXISTS messages(
    id SERIAL PRIMARY KEY,
    txt VARCHAR(350) NOT NULL,
    userid INTEGER NOT NULL,
    groupid INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    deleted_at TIMESTAMP,
    activated BOOLEAN DEFAULT true,
    FOREIGN KEY (userid) REFERENCES users(id),
    FOREIGN KEY (groupid) REFERENCES groups(id)
);