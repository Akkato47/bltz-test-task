export function getCurrentDateISO() {
    return new Date().toISOString().split("T")[0];
}
