import Desktop from "@/components/desktop/Desktop";
import SemanticFallback from "@/components/SemanticFallback";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const open = typeof sp.open === "string" ? sp.open : undefined;
  return (
    <>
      <SemanticFallback />
      <Desktop openAppParam={open} />
    </>
  );
}
