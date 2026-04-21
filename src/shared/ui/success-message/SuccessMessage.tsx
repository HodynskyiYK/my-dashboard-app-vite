export function SuccessMessage({ message }: { message: string }) {
  return (
    <div style={{ color: "green", border: "1px solid green" }}>
      {message}
    </div>
  );
}
