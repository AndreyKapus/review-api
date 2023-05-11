const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const getAll = () => {
    const data = fs.readFile(contactsPath);
    return JSON.parse(data);
};

module.exports = {
    getAll,
}