import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'QuickQuery - Developer Productivity Tools'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #1e293b, #0f172a)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 0 }}>
                    <div style={{ fontSize: 150, fontWeight: 900, color: '#3b82f6', marginRight: 20 }}>Q</div>
                    <div style={{ fontSize: 100, fontWeight: 800, color: 'white' }}>QuickQuery</div>
                </div>
                <div style={{ fontSize: 32, color: '#94a3b8', marginTop: 0 }}>Developer Productivity Tools</div>
                <div style={{ fontSize: 24, color: '#64748b', marginTop: 40 }}>SQL Builder • CRUD • Mapper • Interpolator</div>
            </div>
        ),
        { ...size }
    )
}
