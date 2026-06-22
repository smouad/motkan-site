import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
      <style>{`
        * {
          margin: 0;
          padding: 0;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          background: #f2e9d6;
          color: #1c1815;
        }
      `}</style>
      <div style={{ maxWidth: '500px' }}>
        <h1 style={{ fontSize: '96px', fontWeight: 'bold', marginBottom: '12px' }}>404</h1>
        <h2 style={{ fontSize: '32px', marginBottom: '16px', fontFamily: 'Georgia, serif' }}>Page not found</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '32px', color: '#524b40' }}>
          Sorry, we couldn't find the page you're looking for. Let's get you back on track.
        </p>
        <Link
          href="/"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: '#b8543a',
            color: '#f2e9d6',
            textDecoration: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
