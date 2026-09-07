import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function AppleIcon() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0d0d0c' }}><svg width="150" height="150" viewBox="0 0 64 64"><path d="M12 21h12v20c0 8-12 8-12 0M34 45V21l9 14 9-14v24" fill="none" stroke="#d5c8b7" strokeWidth="5" /></svg></div>, size);
}
