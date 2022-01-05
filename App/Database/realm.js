import Realm from "realm";

// Declare Schema
class WaterSchema extends Realm.Object {}
WaterSchema.schema = {
    name: 'Water',
    properties: {
        date: 'date',
        current:  'float',
        goal: 'float'
    }
};

// Create realm
let realm = new Realm({schema: [WaterSchema], schemaVersion: 1});

// Export the realm
export default realm;