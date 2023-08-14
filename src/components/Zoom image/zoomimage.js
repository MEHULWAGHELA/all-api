export const openImage = (img) => {
    document.documentElement.style.setProperty('--display', 'flex')
    document.documentElement.style.setProperty('--image', `url(${img})`)
}
export const closeImage = () => {
    document.documentElement.style.setProperty('--display', 'none')
}