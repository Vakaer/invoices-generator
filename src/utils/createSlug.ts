export function createSlug(tool: any): string {
    if (tool === undefined) {
        // Return empty string if tool is undefined
        return '';
    }

    if (tool.includes('-')) {
        // Replace hyphens with spaces and convert to lowercase
        return tool.replace(/-/g, ' ').toLowerCase();
    } else {
        // Replace spaces with hyphens and convert to lowercase
        return tool.replace(/\s+/g, '-').toLowerCase();
    }
}

