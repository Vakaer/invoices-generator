export function currentDate() {
    const currentDate = new Date();
    
    // Get the individual date components (month, day, year)
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const yy = String(currentDate.getFullYear()).slice(0);
    
    // Format the date in "mm/dd/yy" format
    const formattedDate = `${yy}-${mm}-${dd}`;
    
    return formattedDate;
}