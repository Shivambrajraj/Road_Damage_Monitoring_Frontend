// frontend/src/pages/AdminPage.jsx
import React, { useEffect, useState, useCallback } from 'react';
import adminService from '../features/admin/services/adminService';
import { useAuth } from '../features/auth/context/AuthContext';
import StatsCard from '../features/dashboard/components/StatsCard';
import { SkeletonStatsCard, SkeletonTable } from '../shared/components/Skeleton';
import EmptyState from '../shared/components/EmptyState';
import ErrorMessage from '../shared/components/ErrorMessage';
import Button from '../shared/components/Button';

const AdminPage = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState('users'); // 'users' | 'reports'
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionErrorId, setActionErrorId] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [statsData, usersData] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers(),
      ]);
      setStats(statsData);
      setUsers(usersData);
    } catch (err) {
      setError(err.message || 'Failed to load admin console data.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const loadReports = useCallback(async () => {
    try {
      const data = await adminService.getAllReports();
      setReports(data);
    } catch (err) {
      setError(err.message || 'Failed to load reports.');
    }
  }, []);

  useEffect(() => {
    if (tab === 'reports' && reports.length === 0) {
      loadReports();
    }
  }, [tab, reports.length, loadReports]);

  const toggleActive = async (u) => {
    setActionErrorId(null);
    try {
      const updated = await adminService.setUserActive(u.id, !u.is_active);
      setUsers((prev) => prev.map((p) => (p.id === u.id ? updated : p)));
    } catch (err) {
      setActionErrorId(u.id);
      setError(err.message || 'Could not update that user.');
    }
  };

  const toggleAdmin = async (u) => {
    setActionErrorId(null);
    try {
      const updated = await adminService.setUserAdmin(u.id, !u.is_admin);
      setUsers((prev) => prev.map((p) => (p.id === u.id ? updated : p)));
    } catch (err) {
      setActionErrorId(u.id);
      setError(err.message || 'Could not update that user.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="space-y-1">
          <div className="h-6 w-56 bg-slate-900 rounded animate-pulse" />
          <div className="h-3 w-32 bg-slate-900 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <SkeletonStatsCard /><SkeletonStatsCard /><SkeletonStatsCard /><SkeletonStatsCard />
        </div>
        <SkeletonTable rows={6} cols={4} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-black text-white uppercase tracking-tight">Admin Console</h1>
        <p className="text-xs text-slate-500 font-mono">Signed in as {user?.username}</p>
      </div>

      {error && <ErrorMessage message={error} />}

      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatsCard title="Total Users" value={stats.total_users} icon="👥" />
          <StatsCard title="Admins" value={stats.total_admins} icon="🛡️" />
          <StatsCard title="Total Reports" value={stats.total_reports} icon="🛣️" />
          <StatsCard title="High Severity" value={stats.high_severity_reports} icon="⚠️" />
        </div>
      )}

      <div className="flex gap-2 border-b border-slate-800">
        {['users', 'reports'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wide border-b-2 -mb-px cursor-pointer transition-colors ${
              tab === t ? 'border-sky-500 text-sky-400' : 'border-transparent text-slate-500 hover:text-slate-300'
            }`}
          >
            {t === 'users' ? 'Users' : 'All Reports'}
          </button>
        ))}
      </div>

      {tab === 'users' ? (
        users.length === 0 ? (
          <EmptyState
            icon="folder"
            title="No users found"
            description="Once operators or administrators are added to the platform, they'll appear here for management."
          />
        ) : (
        <div className="overflow-x-auto bg-slate-950 border border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-wider">
                <th className="p-4">Username / Email</th>
                <th className="p-4">Status</th>
                <th className="p-4">Role</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-slate-900 last:border-0 hover:bg-slate-900/40 transition-colors">
                  <td className="p-4 text-slate-200 font-mono">{u.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        u.is_active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                      }`}
                    >
                      {u.is_active ? 'ACTIVE' : 'DEACTIVATED'}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                        u.is_admin ? 'bg-sky-500/10 text-sky-400' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {u.is_admin ? 'ADMIN' : 'USER'}
                    </span>
                  </td>
                  <td className="p-4 space-x-2">
                    <Button variant="secondary" onClick={() => toggleActive(u)} className="!px-3 !py-1.5 !text-[10px]">
                      {u.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button variant="secondary" onClick={() => toggleAdmin(u)} className="!px-3 !py-1.5 !text-[10px]">
                      {u.is_admin ? 'Revoke Admin' : 'Make Admin'}
                    </Button>
                    {actionErrorId === u.id && (
                      <span className="text-red-400 text-[10px] block mt-1">Action failed.</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )
      ) : (
        reports.length === 0 ? (
          <EmptyState
            icon="inbox"
            title="No reports submitted yet"
            description="Reports submitted by field inspectors and citizens will be listed here for review."
          />
        ) : (
        <div className="overflow-x-auto bg-slate-950 border border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 uppercase tracking-wider">
                <th className="p-4">ID</th>
                <th className="p-4">Damage Category</th>
                <th className="p-4">Severity</th>
                <th className="p-4">Reported By</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-b border-slate-900 last:border-0 hover:bg-slate-900/40 transition-colors">
                  <td className="p-4 text-slate-400 font-mono">#{r.id}</td>
                  <td className="p-4 text-slate-200">{r.damage_category}</td>
                  <td className="p-4 text-slate-300">{r.severity_level || '—'}</td>
                  <td className="p-4 text-slate-400 font-mono">{r.reported_by_id ?? 'anonymous'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )
      )}
    </div>
  );
};

export default AdminPage;