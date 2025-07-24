import EnterpriseLayout from './components/Layout/EnterpriseLayout';
import './styles/globals.css';

const App: React.FC = () => {
  return (
    <EnterpriseLayout>
      {/* Main content area - can be replaced with different views/pages */}
      <div style={{ 
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h1 style={{ 
          fontSize: '24px', 
          fontWeight: '700', 
          color: '#333',
          marginBottom: '16px'
        }}>
          받은메일함
        </h1>
        
        <div style={{
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '1px solid #e9ecef'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#495057',
            marginBottom: '12px'
          }}>
            메일 목록
          </h2>
          <p style={{ 
            color: '#6c757d',
            fontSize: '14px',
            lineHeight: '1.5'
          }}>
            이곳에 메일 목록이 표시됩니다. 현재는 예시 콘텐츠입니다.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          marginTop: '20px'
        }}>
          {[1, 2, 3].map(item => (
            <div key={item} style={{
              padding: '16px',
              backgroundColor: '#fff',
              border: '1px solid #dee2e6',
              borderRadius: '6px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ 
                fontSize: '16px', 
                fontWeight: '600', 
                color: '#343a40',
                marginBottom: '8px'
              }}>
                메일 제목 {item}
              </h3>
              <p style={{ 
                fontSize: '14px', 
                color: '#6c757d',
                marginBottom: '8px'
              }}>
                발신자: example{item}@company.com
              </p>
              <p style={{ 
                fontSize: '12px', 
                color: '#adb5bd'
              }}>
                2024.01.0{item} 09:3{item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </EnterpriseLayout>
  );
};

export default App;
