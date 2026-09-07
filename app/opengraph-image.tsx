import { ImageResponse } from 'next/og';

export const alt = 'John Marie Naidas — Senior Full Stack Engineer. Backend · Full Stack · Architecture.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: '#0d0d0c', color: '#f1eee8', padding: '60px 68px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#c3b9aa', fontSize: 17, letterSpacing: 3 }}><span>BACKEND · FULL STACK · ARCHITECTURE</span><span>JM</span></div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: 66, letterSpacing: -3 }}>John Marie Naidas</span><span style={{ fontSize: 30, color: '#b5a590', marginTop: 22 }}>Senior Full Stack Engineer</span></div>
        <div style={{ display: 'flex', position: 'relative', width: 220, height: 220 }}>
          {[0, 1, 2, 3, 4].map(i => <div key={i} style={{ position: 'absolute', top: i * 33 + 10, left: i % 2 ? 26 : 8, width: i % 2 ? 155 : 185, height: 55, border: '1px solid #a3947a', background: '#292a26', transform: 'rotate(-18deg)' }} />)}
        </div>
      </div>
      <div style={{ display: 'flex', borderTop: '1px solid #30302b', paddingTop: 25, color: '#a7a39c', fontSize: 18, letterSpacing: 2 }}>THOUGHTFULLY ENGINEERED.</div>
    </div>, size,
  );
}
