const transition = (action) => {
    if (!document) return
    if (!document.startViewTransition) return;
    document.startViewTransition(action);
}
export default transition