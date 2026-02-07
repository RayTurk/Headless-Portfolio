/**
 * JSON-LD Script Component
 * Renders structured data in the page head
 */

export function JsonLd({ data }: { data: object | object[] }) {
  const jsonLd = Array.isArray(data) ? data : [data];
  return (
    <>
      {jsonLd.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
