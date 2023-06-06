import React from "react";
import Link from "next/link";
import styles from "./Notes.module.css";

type Note = {
  id: string;
  title: string;
  content: string;
  created: string;
};
const getNotes = async () => {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/notes/records",
    {
      cache: "no-store",
    }
  );
  const data = await res.json();
  return data?.items as Note[];
};
export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <>
      <h1>Notes</h1>
      <div className={styles.grid}>
        {notes?.map((note) => (
          <Note note={note} key={note.id} />
        ))}
      </div>
    </>
  );
}

type NoteProps = {
  note: Note;
};
const Note: React.FC<NoteProps> = ({ note }) => {
  return (
    <Link href={`/notes/${note.id}`}>
      <div className={styles.note}>
        <h2>{note.title}</h2>
        <h2>{note.content}</h2>
        <p>{note.created}</p>
      </div>
    </Link>
  );
};
