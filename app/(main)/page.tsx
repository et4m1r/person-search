import UserSearch from "@/app/components/user-search";
import { TechnicalOverview } from "@/app/components/technical-overview";
import { UserDialog } from "@/app/components/user-dialog";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home({ searchParams }: { searchParams: Promise<{ userId?: string }> }) {
  const session = await auth.auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Search</h1>
      <UserSearch searchParams={searchParams} />
      <UserDialog />
      <TechnicalOverview />
    </div>
  );
}
