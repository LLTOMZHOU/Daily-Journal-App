async function GetNotes(noteId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
    {
      next: {
        revalidate: 10,
      },
    }
  );
  const data = await res.json();
  console.log(data);
  return data as any;
}

export default async function NotePage({ params }: { params: { id: string } }) {
  const note = await GetNotes(params.id);
  // console.log(params.id);
  return (
    <div>
      <h2>{note?.title}</h2>
      <h2>{note?.content}</h2>
      <p>{note?.created}</p>
    </div>
  );
}
