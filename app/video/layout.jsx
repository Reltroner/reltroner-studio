export default function VideoLayout({ children }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div>
            {children}
            </div>
        </div>
    )
}
