import {createServer, Model, Response} from "miragejs"

export function makeServer({environment = "test"} = {}) {
    return createServer({
        environment,
        models: {
            user: Model,
        },
        routes() {
            this.namespace = "api"
            this.get("/users", (schema) => {
                return schema.users.all()
            })
            this.post("/register", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                if (schema.users.where({email: attrs.email}).models.length > 0) {
                    return new Response(400, { some: 'header' }, { errors: [ 'this email is occupied by another person'], resultCode:1});
                }
                console.log(attrs)
                schema.users.create(attrs)
                return new Response(201, { some: 'header' }, {resultCode:0})
            })
            this.delete("/users/change-password", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                schema.users.where({email: attrs.email}).destroy()
                schema.users.create({email: attrs.email, password: attrs.password})
                return new Response(201, { some: 'header' }, {password: attrs.password, resultCode:0})
            })
            this.post("/login", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                if (schema.users.where({email: attrs.email, password: attrs.password}).models.length > 0) {
                    return new Response(200, { some: 'header' }, {attrs, resultCode:0})
                } else return new Response(400, { some: 'header' }, {errors: ['NOT FOUND'], resultCode:1})
            })
        },
    })
}