import express from 'express';
import { CallbackError } from 'mongoose';

// import the Contact Model
import Contact from '../Models/contact';

import { UserDisplayName  } from '../Util';

export function DisplayContactListPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
    Contact.find(function(err, contactsCollection)
    {
      // Database error
      if(err)
      {
        console.error(err.message);
        res.end(err);
      }
      res.render('index', { title: 'Contact List', page: 'contact-list', contacts: contactsCollection.sort((a, b) => a.First_name.localeCompare(b.First_name)), displayName:  UserDisplayName(req)  });
    });
}

export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  res.render('index', { title: 'Add', page: 'edit', contact: '', displayName:  UserDisplayName(req) })
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the db and read the contact into the edit page
  Contact.findById(id, {}, {}, function(err, contactToEdit)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // show the edit view with the data
    res.render('index', { title: 'Edit', page: 'edit', contact: contactToEdit, displayName:  UserDisplayName(req), id: id })
  });
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  // instantiate a new contact to Add
  let newContact = new Contact
  ({
    "First_name": req.body.firstName,
    "Last_name": req.body.lastName,
    "Contact_number": req.body.contactNumber,
    "Email_address": req.body.emailAddress
  });

  // Insert the new Contact object into the database (contacts collection)
  Contact.create(newContact, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // new contact has been added -> refresh the contact-list
    res.redirect('/contact-list');
  })
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // instantiate a new Contact to Edit
  let updatedContact = new Contact
  ({
    "_id": id,
    "First_name": req.body.firstName,
    "Last_name": req.body.lastName,
    "Contact_number": req.body.contactNumber,
    "Email_address": req.body.emailAddress
  });

  // update the contact in the database
  Contact.updateOne({_id: id}, updatedContact, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // edit was successful -> go to the contact-list page
    res.redirect('/contact-list');
  });
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the database and delete the contact
  Contact.remove({_id: id}, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // delete was successful
    res.redirect('/contact-list');
  });
}
