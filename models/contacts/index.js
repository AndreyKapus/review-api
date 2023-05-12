const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

const getAll = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

module.exports = {
    getAll
}