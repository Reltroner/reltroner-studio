export default function CultureLayout({ children }) {
  return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          
          <div>
          {children}
          </div>
      </div>
  )
}