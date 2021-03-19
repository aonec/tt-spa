const roles = localStorage.getItem('roles') || ['ManagingFirmSpectator'];
const watcher = 'ManagingFirmSpectator';
function isWatcher() {
    return roles.includes(watcher);
}
export default isWatcher;