
// reusable player for a given data-key (works with numeric or string values)
function playForDataKey(dataKey) {
    const audio = document.querySelector(`audio[data-key="${dataKey}"]`);
    const key = document.querySelector(`.key[data-key="${dataKey}"]`);
    if (!audio || !key) return; // nothing to do if missing

    audio.currentTime = 0; // rewind so repeated presses replay from start
    key.classList.add("playing");
    audio.play();
}

window.addEventListener('keydown', function(e){
    playForDataKey(e.keyCode);
})

const keys = document.querySelectorAll('.key');

keys.forEach(key => {
    key.addEventListener('click', function () {
        const dataKey = this.getAttribute('data-key');
        playForDataKey(dataKey);
    });
    
    // Listen for animation end (for the pulse animation)
    key.addEventListener('animationend', function (e) {
        if (e.animationName === 'pulse') {
            this.classList.remove('playing');
        }
    });
    
    // Also listen for transition end (fallback for any transitions)
    key.addEventListener('transitionend', function (e) {
        if (e.propertyName === 'transform') {
            this.classList.remove('playing');
        }
    });
});
