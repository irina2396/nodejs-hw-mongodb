import { ContactsCollection } from '../db/models/contacts.js';

export function getAllContacts() {
    return ContactsCollection.find();
};

export function getContactById(contactId) {
    return ContactsCollection.findById(contactId);
};

export function createContact(payload) {
    return ContactsCollection.create(payload);
};

export async function updateContact(contactId, payload) {
    const result = await ContactsCollection.findByIdAndUpdate(contactId, payload, {
        new: true,
        upsert: true,
        includeResultMetadata: true,
    });
    return {
        value: result.value,
        isNew: Boolean(result?.lastErrorObject?.upserted),
    };
};

export function deleteContact(contactId) {
    return ContactsCollection.findOneAndDelete({ _id: contactId });
}