export function showToast(text){
    const el = document.getElementById('toast');
    el.textContent = text ;
    el.classList.add('show');
    setTimeout(() => {
        el.classList.toggle('show');
        el.textContent = ''
    }, 3000)
}