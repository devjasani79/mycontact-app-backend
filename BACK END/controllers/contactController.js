const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const contactModel = require("../models/contactModel");


//@desc get all contacts
// @route get/api/contacts
// @access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

// ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
// 

//@desc create new contacts
// @route POST/api/contacts
// @access private
const createContact = asyncHandler(async (req, res) => {
    console.log("the request body is=", req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("THESE ARE MANDOTARY");

    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });

    res.status(201).json(contact);
})

//@desc GET contacts\
// @route GET/api/contacts/:id
// @access private
const getContact = asyncHandler(
    async (req, res) => {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("CONTACT NOT FOUND");
        }
        res.status(200).json(contact);
    })

//@desc UPDATE contacts
// @route PUT/api/contacts/:id
// @access private
const updateContact = asyncHandler(
    async (req, res) => {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("CONTACT NOT FOUND");
        }

        if (contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("USER DOESN'T HAVE PERMISSION TO HANDLE OTHER CONTACTS");

        }

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(updatedContact);
    })

//@desc DELETEE contacts
// @route DELETE/api/contacts/:id
// @access private
const deleteContact = asyncHandler(
    async (req, res) => {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("CONTACT NOT FOUND");
        }

        if (contact.user_id.toString() !== req.user.id) {
            res.status(403);
            throw new Error("USER DOESN'T HAVE PERMISSION TO HANDLE OTHER CONTACTS");
        }

        await Contact.deleteOne({_id: req.params.id});
        res.status(200).json(contact);
    })


module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };