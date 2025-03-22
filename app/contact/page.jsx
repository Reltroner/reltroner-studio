import Heading from "@/components/Heading";
export default function Contact() {
    return (
        <div>
            <>
            <Heading>Contact Us</Heading>
            <form>
                <label htmlFor="name">Name:</label><br />
                <input type="text" id="name" name="name" /><br /><br />
                
                <label htmlFor="email">Email:</label><br />
                <input type="email" id="email" name="email" /><br /><br />
                
                <label htmlFor="message">Message:</label><br />
                <textarea id="message" name="message" rows="4" cols="50" /><br /><br />
                
                <button type="submit">Submit</button>
            </form>
            </>
        </div>    
    );
}
