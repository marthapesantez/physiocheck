export function formatDay(iso: string): string{
    const d= new Date(iso);
    return `${d.getDate()}/${d.getMonth()+1}`;
}

export function formatDateTime(iso:string): string{
    return new Date(iso).toLocaleString();
}

