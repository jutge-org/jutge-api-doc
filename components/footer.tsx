
export default function Footer() {
    const now = new Date()
    return <footer className="mt-[5em] min-h-[4em] text-center text-xs text-muted">
        &copy; 2023 &ndash; {now.getFullYear()}, The Jutge Team
    </footer>
}