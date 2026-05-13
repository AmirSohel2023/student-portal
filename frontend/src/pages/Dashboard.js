import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { BookOpen, CheckCircle, TrendingUp, Award, ArrowRight } from 'lucide-react';

const CATEGORY_COLORS = { programming:'#6366f1', design:'#ec4899', data_science:'#14b8a6', business:'#f59e0b', mathematics:'#10b981' };
const CATEGORY_EMOJI = { programming:'💻', design:'🎨', data_science:'📊', business:'💼', mathematics:'🧮' };

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    API.get('/dashboard/stats/').then(r => setStats(r.data));
    API.get('/my-enrollments/').then(r => setEnrollments(r.data.slice(0, 3)));
  }, []);

  const name = user?.user?.first_name || 'Student';

  return (
    <div>
      <div className="page-header">
        <h1>Welcome back, {name} 👋</h1>
        <p>Here's your learning progress overview</p>
      </div>

      <div className="stats-grid">
        {[
          { label: 'Enrolled Courses', value: stats?.total_enrolled ?? '—', icon: <BookOpen size={22}/>, color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
          { label: 'Completed', value: stats?.completed_courses ?? '—', icon: <CheckCircle size={22}/>, color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
          { label: 'Avg. Progress', value: stats ? `${stats.average_progress}%` : '—', icon: <TrendingUp size={22}/>, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
          { label: 'Certificates', value: stats?.certificates_earned ?? '—', icon: <Award size={22}/>, color: '#14b8a6', bg: 'rgba(20,184,166,0.1)' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-icon" style={{ background: s.bg, color: s.color }}>{s.icon}</div>
            <div className="stat-info">
              <div className="value">{s.value}</div>
              <div className="label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <h2 style={{ fontSize:18 }}>Recent Courses</h2>
          <Link to="/my-courses" className="btn btn-outline btn-sm" style={{ display:'flex', alignItems:'center', gap:6 }}>View All <ArrowRight size={14}/></Link>
        </div>
        {enrollments.length === 0 ? (
          <div style={{ textAlign:'center', padding:'32px', color:'var(--muted)' }}>
            <BookOpen size={40} style={{ margin:'0 auto 12px', opacity:0.4 }}/>
            <p>No courses yet. <Link to="/courses" style={{ color:'var(--accent)' }}>Browse courses →</Link></p>
          </div>
        ) : enrollments.map(e => (
          <div key={e.id} style={{ display:'flex', alignItems:'center', gap:16, padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
            <div style={{ fontSize:28 }}>{CATEGORY_EMOJI[e.course.category] || '📚'}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, marginBottom:6 }}>{e.course.title}</div>
              <div className="progress-bar"><div className="progress-fill" style={{ width:`${e.progress}%` }}></div></div>
            </div>
            <div style={{ color:'var(--accent)', fontWeight:700 }}>{Math.round(e.progress)}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}