import express from "express";

import { ValidationError } from "objection"

import cleanUserInput from "../../../services/cleanUserInput.js"

import { Show } from "./../../../models/index.js"



const showsRouter = new express.Router()

showsRouter.get("/", async (req, res) => {
    try {
        const shows = await Show.query()
        return res.status(200).json({ shows })
    }
    catch (err) {
        return res.status(500).json({ errors: err })
    }  
})

showsRouter.post("/", async (req, res) => {
    const showData = cleanUserInput(req.body)
    console.log(showData)
    try {
        const newShow = await Show.query().insertAndFetch(showData)
        return res.status(201).json({ show: newShow })
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log(error)
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }

})

showsRouter.get("/:id", async (req, res) => {
    try {
        const show = await Show.query().findById(req.params.id)
        return res.status(200).json({ show })
    }
    catch (err) {
        return res.status(500).json({ errors: err })
    }
})


export default showsRouter;
