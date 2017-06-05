## CRUD using MongoDB
- Replace memory datastore with MongoDB Mongoose connection
- Host MongoDB database using MLAB
- Simple CRUD with no relationships or associations
- Example of benefits of NoSQL database over RDBS

### Notes
- You can update a schema over time
- New documents that get created will follow the new schema
- Old documents that get updated will follow old schema. Older documents must be explicitly passed the new schema property to be updated
- [Example stackoverflow question](https://stackoverflow.com/questions/26373075/mongoose-add-new-schema-property-and-update-all-current-documents)