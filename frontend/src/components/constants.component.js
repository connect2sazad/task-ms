import favicon from '../assets/images/favicon.png';

export const SiteTitle = "Task MS";
export const Author = "Sazad Ahemad";
export const AuthorURL = "https://www.github.com/connect2sazad";
export const Favicon = favicon;

export const Keywords = ["Best Site", "Best Site 2", "Best Site 3"];
export const Description = 'Test Description';

export const facebook = "https://www.facebook.com";
export const twitter = "https://www.twitter.com";
export const instagram = "https://www.instagram.com";
export const linkedin = "https://www.linkedin.com";


// basic functions
export function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    // Format date and time parts separately
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Combine date and time parts
    return `${formattedDate}`;
}

export const BACKEND_PORT = 5555;

export function api(link){
    return `http://localhost:${BACKEND_PORT}/${link}`;
}