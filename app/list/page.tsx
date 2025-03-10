import UserList from "@/app/components/user-list";
export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">User List</h1>
        <UserList />
      </main>
    </div>
  );
}
