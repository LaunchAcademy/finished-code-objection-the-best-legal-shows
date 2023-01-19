const Model = require("./Model.js")

const uniqueFactory = require("objection-unique")

const unique = uniqueFactory({
    fields: ["title"],
    identifiers: ["id"]
})

class Show extends unique(Model) {
    static get tableName(){
        return "shows"
    }

    static get jsonSchema(){
        return {
            type: "object",
            required: ["title", "premiereYear"],
            properties: {
                title: { type: "string"},
                network: { type: "string"},
                premierYear: { type: ["string", "integer"]},
                description: { type: "string"},
            }
        }
    }
}

module.exports = Show