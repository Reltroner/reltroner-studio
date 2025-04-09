

export default function Heading({ children }) {
    return (
        <div>
            <h1 className={`text-3xl font-bold pb-3 text-center font-roboto text-black dark:bg-gray-900 dark:text-white`}>{children}</h1>
        </div>
    );
}