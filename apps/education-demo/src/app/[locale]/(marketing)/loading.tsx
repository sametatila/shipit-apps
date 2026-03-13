export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20 animate-pulse">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="h-4 w-32 bg-muted rounded mx-auto" />
        <div className="h-10 w-3/4 bg-muted rounded mx-auto" />
        <div className="h-6 w-2/3 bg-muted rounded mx-auto" />
      </div>
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-4 p-6 rounded-lg border">
            <div className="h-12 w-12 bg-muted rounded" />
            <div className="h-6 w-3/4 bg-muted rounded" />
            <div className="h-4 w-full bg-muted rounded" />
            <div className="h-4 w-5/6 bg-muted rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
