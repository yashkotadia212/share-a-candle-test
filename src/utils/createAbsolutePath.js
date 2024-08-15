export default function createAbsolutePath(path) {
    return `${import.meta.env.VITE_PUBLIC_URL}${path}`;
}