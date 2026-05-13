import React, { useEffect, useState } from 'react';
import API from '../api/axios';
import { Award } from 'lucide-react';

export default function Certificates() {
  const [certs, setCerts] = useState([]);

  useEffect(() => { API.get('/certificates/').then(r => setCerts(r.data)); }, []);

  return (
    <div>
      <div className="page-header">
        <h1>My Certificates</h1>
        <p>{certs.length} certificate{certs.length !== 1 ? 's' : ''} earned</p>
      </div>
      {certs.length === 0 ? (
        <div className="card" style={{ textAlign:'center', padding:48 }}>
          <Award size={48} style={{ margin:'0 auto 16px', color:'var(--muted)', opacity:0.4 }}/>
          <p style={{ color:'var(--muted)' }}>Complete a course to earn your first certificate!</p>
        </div>
      ) : (
        <div className="courses-grid">
          {certs.map(cert => (
            <div key={cert.id} className="cert-card">
              <div style={{ fontSize:40, marginBottom:12 }}>🏆</div>
              <div className="cert-id">{cert.certificate_id}</div>
              <div className="cert-title">{cert.course.title}</div>
              <div style={{ color:'var(--muted)', fontSize:13, marginBottom:12 }}>
                Issued on {new Date(cert.issued_at).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}
              </div>
              <span className="badge badge-success">✓ Verified Certificate</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}