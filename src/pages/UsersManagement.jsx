import { useEffect, useState } from "react";
import axios from "axios";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', role: 'user' });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  function fetchUsers() {
    setLoading(true);
    axios.get('https://house-rent-bk.onrender.com/api/users').then(res => {
      setUsers(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }

  function startEdit(user) {
    setEditingUser(user._id);
    setEditForm({ name: user.name, email: user.email, role: user.role });
  }

  function cancelEdit() {
    setEditingUser(null);
    setEditForm({ name: '', email: '', role: 'user' });
  }

  async function saveEdit(userId) {
    setSaving(true);
    await axios.put(`https://house-rent-bk.onrender.com/api/users/${userId}`, editForm);
    setSaving(false);
    setEditingUser(null);
    fetchUsers();
  }

  async function deleteUser(userId) {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    setDeleting(userId);
    await axios.delete(`https://house-rent-bk.onrender.com/api/users/${userId}`);
    setDeleting(null);
    fetchUsers();
  }

  if (loading) return <div>Loading users...</div>;

  // User counts
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const userCount = users.filter(u => u.role === 'user').length;

  return (
    <div className="overflow-x-auto">
      {/* User count card */}
      <div className="flex gap-4 mb-6">
        <div className="bg-blue-100 border border-blue-300 rounded-xl p-4 flex-1 text-center">
          <div className="text-2xl font-bold text-blue-700">{totalUsers}</div>
          <div className="text-gray-700">Total Users</div>
        </div>
        <div className="bg-green-100 border border-green-300 rounded-xl p-4 flex-1 text-center">
          <div className="text-2xl font-bold text-green-700">{adminCount}</div>
          <div className="text-gray-700">Admins</div>
        </div>
        <div className="bg-gray-100 border border-gray-300 rounded-xl p-4 flex-1 text-center">
          <div className="text-2xl font-bold text-gray-700">{userCount}</div>
          <div className="text-gray-700">Regular Users</div>
        </div>
      </div>
      <table className="min-w-full bg-white border rounded-xl">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id} className={user.role === 'admin' ? 'bg-blue-50' : ''}>
              <td className="py-2 px-4 border-b">
                {editingUser === user._id ? (
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={editForm.name}
                    onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))}
                  />
                ) : user.name}
              </td>
              <td className="py-2 px-4 border-b">
                {editingUser === user._id ? (
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={editForm.email}
                    onChange={e => setEditForm(f => ({ ...f, email: e.target.value }))}
                  />
                ) : user.email}
              </td>
              <td className="py-2 px-4 border-b">
                <span className={user.role === 'admin' ? 'font-bold text-blue-700' : ''}>{user.role}</span>
              </td>
              <td className="py-2 px-4 border-b">
                {user.role === 'admin' ? (
                  editingUser === user._id ? (
                    <>
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded mr-2 disabled:opacity-50"
                        onClick={() => saveEdit(user._id)}
                        disabled={saving}
                      >
                        {saving ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        className="bg-gray-400 text-white px-3 py-1 rounded"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                      onClick={() => startEdit(user)}
                    >
                      Edit
                    </button>
                  )
                ) : (
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => deleteUser(user._id)}
                    disabled={deleting === user._id}
                  >
                    {deleting === user._id ? 'Deleting...' : 'Delete'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 