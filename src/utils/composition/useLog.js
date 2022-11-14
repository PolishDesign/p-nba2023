export function useLog() {
    const debug = (message) => {
        import.meta.env.DEV && console.log(message)
    }
    return {
        debug
    }
}