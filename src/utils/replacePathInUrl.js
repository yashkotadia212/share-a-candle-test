export default function replacePathInUrl(url, newPath) {
    const urlObj = new URL(url);

    // Get the part before the first "?" and after the last "/"
    const baseUrl = urlObj.origin;
    const queryString = urlObj.search;
    const newUrl = `${baseUrl}/${newPath}${queryString}`;

    return newUrl;
}