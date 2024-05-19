import { responseHandler } from "@/middlewares/responseHandler";
import { NotFoundException } from "@/middlewares/throwError";
import { Note } from "@/models/Note";
import { User } from "@/models/User";
import { pagination } from "@/utils/pagination";
import { NextFunction, Request, Response } from "express";
import { Schema, Types } from "mongoose";

export const NoteController = {
  async createNote(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query["userId"];
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw NotFoundException();
      }
      const { title, content } = req.body;
      const newNote = new Note({
        title,
        content,
        owner: user,
      });
      await newNote.save();
      responseHandler(
        res,
        {
          item: newNote,
        },
        "Tạo ghi chú thành công"
      );
    } catch (error) {
      next(error);
    }
  },

  async getNotes(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query["userId"];
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw NotFoundException();
      }
      const { limit, offset } = req.query;
      const totalNotes = await Note.countDocuments();
      const notes = await Note.find({
        owner: userId,
      })
        .skip(Number(offset))
        .limit(Number(limit))
        .populate("owner", "-password")
        .exec();
      responseHandler(res, {
        items: notes,
        pagination: pagination(limit, offset, totalNotes),
      });
    } catch (error) {
      next(error);
    }
  },

  async updateNote(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query["userId"];
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw NotFoundException();
      }
      const { noteId } = req.params;
      const note = await Note.findById(noteId).populate("owner");
      if (!note) {
        throw NotFoundException("Ghi chú không tồn tại");
      }
      const { title, content } = req.body;
      note.title = title;
      note.content = content;
      await note.save();
      responseHandler(
        res,
        {
          item: note,
        },
        "Chỉnh sửa thành công"
      );
    } catch (error) {
      next(error);
    }
  },

  async deteteNotes(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.query["userId"];
      const user = await User.findById(userId).select("-password");
      if (!user) {
        throw NotFoundException();
      }
      const { noteIds } = req.query;
      const notes = await Note.deleteMany({
        _id: {
          $in: noteIds,
        },
      });
      responseHandler(res, { items: notes });
    } catch (error) {
      next(error);
    }
  },
};
