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

class SettingsSchema extends Realm.Object {}
SettingsSchema.schema = {
    name: 'Settings',
    properties: {
        goalAmount: 'float',
        preferredUnits: 'string',
        standardDrinkSize: 'float?',
    }
}

// Create realm
let realm = new Realm({schema: [WaterSchema, SettingsSchema], schemaVersion: 1});

// Export the realm
export default realm;