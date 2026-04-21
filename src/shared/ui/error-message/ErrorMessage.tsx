export function ErrorMessage({ message }: { message: string }) {
  return (
    <div style={{ color: "red", border: "1px solid red" }}>
      {message}
    </div>
  );
}
