const notesCrrl = {};

const NoteModel = require("../models/Note");

notesCrrl.getNotes = async (req, res) => {
  const notes = await NoteModel.find();
  res.json(notes);
};

notesCrrl.createNote = async (req, res) => {
  const { title, author, content, date } = req.body;
  const newNote = new NoteModel({
    title,
    author,
    content,
    date
  });
  await newNote.save();
  res.json({ message: "Note Saved" });
};

notesCrrl.getNote = async (req, res) => {
  const note = await NoteModel.findById(req.params.id);
  res.json(note);
};

notesCrrl.updateNote = async (req, res) => {
  try {
    const { title, author, content } = req.body;

    await NoteModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        author,
        content
      }
    );
    res.json({ message: "Update Note" });
  } catch (error) {
    console.error(error);
  }
};

notesCrrl.deleteNote = async (req, res) => {
  await NoteModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
};
module.exports = notesCrrl;
