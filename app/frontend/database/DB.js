import * as SQLite from 'expo-sqlite';

export async function initializeDatabaseTables(db) {
    if (!db) return;
    try {
        await db.execAsync(
            `CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        createdAt TEXT,
         notificationID TEXT
        );`
        )
        await db.execAsync(
            `CREATE TABLE IF NOT EXISTS task (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        content TEXT,
        createdAt Text,
        tag INTEGER DEFAULT 0,
        notificationID TEXT 
        );`
        )
        await db.execAsync(
            `CREATE TABLE IF NOT EXISTS settings (
    id TEXT PRIMARY KEY,
    mode TEXT NOT NULL
    );`
        );

        console.log('DB READY');
    } catch (e) {
        console.error('Error initializing database tables:', e);
    }
}

export async function insertnote(db, title, content, notificationID) {
    if (!db) return;
    try {
        const createdAt = new Date().toISOString();
        return await db.runAsync(
            'INSERT INTO notes (title,content,createdAt,notificationID) VALUES (?,?,?,?)',
            [title, content, createdAt, notificationID]
        );
    } catch (e) {
        console.error('insertnote error:', e);
    }
}

export async function inserttask(db, title, content, notificationID) {
    if (!db) return;
    try {
        const createdAt = new Date().toISOString();
        return await db.runAsync(
            'INSERT INTO task (title,content,createdAt,notificationID) VALUES (?,?,?,?)',
            [title, content, createdAt, notificationID]
        );
    } catch (e) {
        console.error('inserttask error:', e);
    }
}

export async function getAllNotes(db) {
    if (!db) return [];
    try {
        return await db.getAllAsync('SELECT * FROM notes ORDER BY id DESC');
    } catch (e) {
        console.error('getAllNotes error:', e);
        return [];
    }
}

export async function getAllTask(db) {
    if (!db) return [];
    try {
        return await db.getAllAsync('SELECT * FROM task ORDER BY id DESC');
    } catch (e) {
        console.error('getAllTask error:', e);
        return [];
    }
}

export async function deleteNotes(db, id) {
    if (!db) return;
    try {
        return await db.runAsync('DELETE FROM notes WHERE id = ?', [id]);
    } catch (e) {
        console.error('deleteNotes error:', e);
    }
}

export async function deletetask(db, id) {
    if (!db) return;
    try {
        return await db.runAsync('DELETE FROM task WHERE id = ?', [id]);
    } catch (e) {
        console.error('deletetask error:', e);
    }
}

export async function toogleTaskTag(db, id, currentStatus) {
    if (!db) return;
    try {
        const NewStatus = currentStatus === 1 ? 0 : 1;
        return await db.runAsync(
            'UPDATE task SET tag = ? WHERE id = ?',
            [NewStatus, id]
        );
    } catch (e) {
        console.error('toogleTaskTag error:', e);
    }
}

export async function updatenotes(db, id, title, content) {
    if (!db) return;
    try {
        return await db.runAsync(
            'UPDATE notes SET title = ?, content = ? WHERE id = ?',
            [title, content, id]
        );
    } catch (e) {
        console.error('updatenotes error:', e);
    }
}

export async function updatetask(db, id, title, content) {
    if (!db) return;
    try {
        return await db.runAsync(
            'UPDATE task SET title = ?, content = ? WHERE id = ?',
            [title, content, id]
        );
    } catch (e) {
        console.error('updatetask error:', e);
    }
}

export async function getSettings(db, id, mode) {
    if (!db) return mode;
    try {
        const result = await db.getFirstAsync(
            'SELECT mode FROM settings WHERE id = ?',
            [id]
        );
        return result ? result.mode : mode;
    } catch (e) {
        return mode;
    }
}

export async function setSettings(db, id, mode) {
    if (!db) return;
    try {
        return await db.runAsync(
            'INSERT OR REPLACE INTO settings (id,mode) VALUES (?,?)',
            [id, mode]
        );
    } catch (e) {
        console.error('setSettings error:', e);
    }
}

export async function getNoteByID(db, id) {
    if (!db) return null;
    try {
        return await db.getFirstAsync("SELECT * FROM notes WHERE id = ?", [id]);
    } catch (e) {
        console.error('getNoteByID error:', e);
        return null;
    }
}

export async function getTaskByID(db, id) {
    if (!db) return null;
    try {
        return await db.getFirstAsync("SELECT * FROM task WHERE id = ?", [id]);
    } catch (e) {
        console.error('getTaskByID error:', e);
        return null;
    }
}

export async function setTaskTag(db, id, value) {
    if (!db) return;
    try {
        return await db.runAsync('UPDATE task SET tag = ? WHERE id = ?', [value, id]);
    } catch (e) {
        console.error('setTaskTag error:', e);
    }
}