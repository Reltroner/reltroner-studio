export default function Heading({
    children,
    as: Tag = "h1",
    className = "",
}) {
    return (
        <Tag
            className={`pb-3 text-center font-display text-3xl font-semibold tracking-[-0.03em] text-balance text-black dark:text-white sm:text-4xl lg:text-5xl ${className}`}
        >
            {children}
        </Tag>
    );
}