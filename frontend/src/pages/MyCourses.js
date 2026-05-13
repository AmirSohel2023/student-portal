import React, { useEffect, useState, useCallback } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { CheckCircle, Play } from 'lucide-react';

export default function MyCourses() {
  const [enrollments, setEnrollments] = useState([]);

  const load = useCallback(() => API.get('/my-enrollments/').then(r => setEnrollments(r.data)), []);
  useEffect(() => { load(); }, [load]);

  const completeLesson = async (enrollment) => {
    if (enrollment.completed_lessons >= enrollment.course.total_lessons) return;
    try {
      const res = await API.put(`/progress/${enrollment.id}/`, {
        completed_lessons: enrollment.completed_lessons + 1
      });
      setEnrollments(prev => prev.map(e => e.id === enrollment.id ? res.data : e));
      if (res.data.is_completed) toast.success('🎉 Course completed! Certificate generated!');
      else toast.success('Lesson completed!');
    } catch { toast.error('Error updating progress'); }
  };

  return (
    <div>
      <div className="page-header">
        <h1>My Courses</h1>
        <p>{enrollments.length} enrolled courses</p>
      </div>
      {enrollments.length === 0 ? (
        <div className="card" style={{ textAlign:'center', padding:48 }}>
          <p style={{ color:'var(--muted)' }}>No enrolled courses yet.</p>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {enrollments.map(e => (
            <div key={e.id} className="card">
              <div style={{ display:'flex', justifyContent:'space-between', flexWrap:'wrap', gap:12 }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                    <h3 style={{ fontSize:18 }}>{e.course.title}</h3>
                    {e.is_completed
                      ? <span className="badge badge-success"><CheckCircle size={12}/> Completed</span>
                      : <span className="badge badge-accent"><Play size={12}/> In Progress</span>}
                  </div>
                  <p style={{ color:'var(--muted)', fontSize:13, marginBottom:16 }}>
                    By {e.course.instructor} · {e.course.total_lessons} lessons · {e.course.duration_hours}h
                  </p>
                  <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
                    <div className="progress-bar" style={{ flex:1 }}>
                      <div className="progress-fill" style={{ width:`${e.progress}%` }}></div>
                    </div>
                    <span style={{ color:'var(--accent)', fontWeight:700, minWidth:40 }}>{Math.round(e.progress)}%</span>
                  </div>
                  <p style={{ color:'var(--muted)', fontSize:13 }}>{e.completed_lessons} of {e.course.total_lessons} lessons completed</p>
                </div>
                <div style={{ display:'flex', alignItems:'center' }}>
                  {!e.is_completed && (
                    <button className="btn btn-primary" onClick={() => completeLesson(e)}>
                      Complete Lesson
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}