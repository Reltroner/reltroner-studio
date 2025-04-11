import Heading from "@/components/Heading"

export default function EventLayout({ children }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            
            <div>
            {children}
            </div>
        </div>
    )
}