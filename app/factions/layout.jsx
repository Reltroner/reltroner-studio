import Heading from "@/components/Heading"

export default function FactionLayout({ children }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            
            <div>
            {children}
            </div>
        </div>
    )
}