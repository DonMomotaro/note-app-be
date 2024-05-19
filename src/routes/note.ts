import { NoteController } from "@/controllers/noteController";
import { isAuthorized } from "@/middlewares/authorizedHandler";
import express from "express";

const noteRouter = express.Router();

noteRouter.post("/", isAuthorized, NoteController.createNote);

noteRouter.get("/", isAuthorized, NoteController.getNotes);

noteRouter.put("/:noteId", isAuthorized, NoteController.updateNote);

noteRouter.delete("/", isAuthorized, NoteController.deteteNotes);

export default noteRouter;
