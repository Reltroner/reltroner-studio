
export default function ItemLayout({ children }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            
            <div>
            {children}
            </div>
        </div>
    )
}