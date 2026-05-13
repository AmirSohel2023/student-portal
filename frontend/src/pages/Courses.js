import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { Clock, Users, BookOpen } from 'lucide-react';

const COLORS = { programming:'#6366f1', design:'#ec4899', data_science:'#14b8a6', business:'#f59e0b', mathematics:'#10b981' };
const EMOJI = { programming:'💻', design:'🎨', data_science:'📊', business:'💼', mathematics:'🧮' };

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolling, setEnrolling] = useState(null);

  useEffect(() => { API.get('/courses/').then(r => setCourses(r.data)); }, []);

  const enroll = async (courseId) => {
    setEnrolling(courseId);
    try {
      await API.post(`/enroll/${courseId}/`);
      setCourses(courses.map(c => c.id === courseId ? {...c, is_enrolled: true} : c));
      toast.success('Enrolled successfully! 🎉');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Already enrolled');
    } finally { setEnrolling(null); }
  };

  return (
    <div>
      <div className="page-header">
        <h1>Browse Courses</h1>
        <p>{courses.length} courses available</p>
      </div>
      <div className="courses-grid">
        {courses.map(course => {
          const color = COLORS[course.category] || '#6366f1';
          return (
            <div key={course.id} className="course-card">
              <div className="course-banner" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)` }}>
                <span>{EMOJI[course.category] || '📚'}</span>
              </div>
              <div className="course-body">
                <span className="course-category" style={{ background:`${color}22`, color }}>{course.category.replace('_',' ')}</span>
                <div className="course-title">{course.title}</div>
                <div style={{ color:'var(--muted)', fontSize:13, marginBottom:12, lineHeight:1.5 }}>{course.description.slice(0,100)}...</div>
                <div className="course-meta">
                  <span><Clock size={13}/> {course.duration_hours}h</span>
                  <span><BookOpen size={13}/> {course.total_lessons} lessons</span>
                  <span><Users size={13}/> {course.enrollment_count}</span>
                </div>
                <div style={{ fontSize:13, color:'var(--muted)', marginBottom:14 }}>
                  By <strong style={{ color:'var(--text)' }}>{course.instructor}</strong>
                </div>
                {course.is_enrolled ? (
                  <span className="badge badge-success" style={{ width:'100%', justifyContent:'center', padding:'10px' }}>✓ Enrolled</span>
                ) : (
                  <button className="btn btn-primary" onClick={() => enroll(course.id)} disabled={enrolling === course.id}>
                    {enrolling === course.id ? 'Enrolling...' : 'Enroll Now'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}