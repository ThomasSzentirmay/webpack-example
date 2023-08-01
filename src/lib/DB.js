import {openDB} from 'idb';

class DB {
    static async init() {
        await openDB('noteDB', 1, {
            upgrade(db) {
                if(db.objectStoreNames.contains('notes')) {
                    return console.log('The notes store already exists');
                }

                db.createObjectStore('notes', {keyPath: 'id', autoIncrement: true});
                console.log('Notes store created');
            }
        });
    }

    static async getAll() {
        const db = await openDB('noteDB', 1);
        // create a permission transaction on the notes store
        const tx = db.transaction('notes', 'readonly');
        // grab the notes store using our transaction
        const store = tx.objectStore('notes');
        const notes = await store.getAll();
        // get one by key (for assignment 19)
        // const note1 = await store.get(1);

        return notes;
    }

    static async save(text) {
        const db = await openDB('noteDB', 1);
        const tx = db.transaction('notes', 'readwrite');
        const store = tx.objectStore('notes');

        await store.put({text});
    }

    static async delete(id) {
        const db = await openDB('noteDB', 1);
        const tx = db.transaction('notes', 'readwrite');
        const store = tx.objectStore('notes');

        await store.delete(id);
    }
}

export default DB;