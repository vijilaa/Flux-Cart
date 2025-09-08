const ContactSchema = require('./ContactSchema'); 

const AddContact = (req, res) => {
    const contact = new ContactSchema({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message,
    });

    contact.save()
        .then((result) => {
            res.json({
                data: result,
                msg: "Message sent successfully"
            });
        })
        .catch((error) => {
            console.log(error);
         
        });
};


const ViewContacts = (req, res) => {
    ContactSchema.find()
        .then((result) => {
            res.json({
                data: result,
                msg: "All messages retrieved successfully"
            });
        })
        .catch((error) => {
            console.log(error);
        });
};


const viewContactById = (req, res) => {
    const contactId = req.params.id;

    ContactSchema.findById(contactId)
     .then((result) => {
            res.json({
                data: result,
                msg: "successful"
            })
        })
        .catch((error) => {
            console.log(error);

        })
};


const deleteContact = (req, res) => {
    const contactId = req.params.id;

    ContactSchema.findByIdAndDelete(contactId)
         .then((result) => {

            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error)
        })
};

const ContactUpdate = (req, res) => {
    const contactId = req.params.id;
    const updateData = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    };

    ContactSchema.findByIdAndUpdate(contactId, updateData, { new: true })
          .then((result) => {
            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error)
        })
};

const Resolve = (req, res) => {
    const contactId = req.body.id;
    const updateData = {
        status: "Resolve"
    };

    ContactSchema.findByIdAndUpdate(contactId, updateData, { new: true })
          .then((result) => {
            res.json({
                data: result,
                msg: "sucessful"
            })
        })
        .catch((error) => {
            console.log(error)
        })
};
module.exports = {
    AddContact,
    ViewContacts,
    viewContactById,
    deleteContact,
    ContactUpdate,
    Resolve
};