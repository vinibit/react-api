let loader: HTMLElement | null
let isLoading = false

const trySelect = (selector: string) => {    
    if (!loader) {
        loader = document.querySelector(selector)
    }
    return loader
}

export default {    

    start() {
        // const loader = trySelect('#spinnerLoading')
        // if (loader) {
        //     loader.style.display = 'flex'
        // }
        isLoading = true        
    },

    stop() {
        // const loader = trySelect('#spinnerLoading')
        // if (loader) {
        //     loader.style.display = 'none'
        // }
        isLoading = false       
    },

    status: () => isLoading
}