import { getAllContacts, getContactById, updateContact } from "../services/contacts.js";
import createHttpError from 'http-errors';
import { createContact, deleteContact } from "../services/contacts.js";

export const getContactsController = async (req, res, next,) => {
    try {
        const contacts = await getAllContacts();

        res.json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
    } catch (err) {
        next(err);
    }
};

export const getContactByIdController = async (req, res) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.json({
            status: 200,
            message: `Successfully found with id ${contactId}!`,
            data: {
                contact,
            }
        });
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: 'Successfully created a contact!',
        data: contact,
    });
};

export const patchContactController = async (req, res) => {
    const contact = await updateContact(req.params.contactId, req.body);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: contact,
    });
};

export const deleteContactController = async (req, res) => {
    const { contactId } = req.params; 
    const contact = await deleteContact(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
};