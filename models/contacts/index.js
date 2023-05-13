const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require('nanoid');

const contactsPath = path.join(__dirname, "contacts.json");

const getAll = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getById = async (id) => {
    const contacts = await getAll();
    const result = contacts.find(contact => contact.id === id);
    return result || null
};

const add = async (data) => {
    const contacts = await getAll();
    const newContact = {
       id: nanoid(),
       ...data,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

module.exports = {
    getAll,
    getById,
    add
}