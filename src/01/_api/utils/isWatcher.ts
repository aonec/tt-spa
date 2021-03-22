const roles = localStorage.getItem('roles') || ['ManagingFirmSpectator'];
const watcher = 'ManagingFirmSpectator';
const isWatcher = () => {
    return roles.includes(watcher);
}
export default isWatcher;