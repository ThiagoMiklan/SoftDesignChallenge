import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  autor: { type: String, default: null },
  titulo: { type: String, default: null },
  subtitulo: { type: String, unique: true },
  genero: { type: String },
  numeroPaginas: { type: String },
});

const BookSchema = mongoose.model("livros", bookSchema);

export default BookSchema;

//23037994000116