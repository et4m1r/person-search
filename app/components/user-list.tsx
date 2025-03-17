"use client";

import { useEffect, useState } from "react";
import { listUsers, deleteUser } from "@/app/(main)/actions/actions";
import { User } from "@/app/(main)/actions/schemas";
import { Button } from "@/components/ui/button";
import { Pagination } from "./pagination";
import { UserEditDialog } from "./user-edit-dialog";

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 9;

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await listUsers(search, page, pageSize);
      setUsers(result.users);
      setTotal(result.total);
    };

    fetchUsers();
  }, [search, page]);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Search Input */}
      <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="border p-2 mb-4" />

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border">
                  <td className="border p-2">{user.name}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.phoneNumber}</td>
                  <td className="border p-2 flex gap-2">
                    <UserEditDialog user={user} />
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="border p-2 text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination currentPage={page} totalItems={total} pageSize={pageSize} onPageChange={setPage} />
      </div>
    </div>
  );
}
